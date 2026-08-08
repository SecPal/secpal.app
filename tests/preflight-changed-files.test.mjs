// SPDX-FileCopyrightText: 2026 SecPal Contributors
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import {
  chmod,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const preflight = await readFile(
  new URL("../scripts/preflight.sh", import.meta.url),
  "utf8"
);

async function writeExecutable(path, contents) {
  await writeFile(path, contents);
  await chmod(path, 0o755);
}

function encodeNulDelimitedFields(value) {
  if (!value) {
    return "";
  }

  return `${value
    .split("\n")
    .flatMap((line) => line.split("\t"))
    .map((field) => field.replaceAll("\\", "\\\\"))
    .join("\\0")}\\0`;
}

async function executePreflight(
  changedFiles,
  changedFileStatus,
  { baseRefAvailable = true, nulChangedFiles = changedFiles } = {}
) {
  const fixture = await mkdtemp(join(tmpdir(), "secpal-preflight-changes-"));

  try {
    const binDir = join(fixture, "bin");
    const scriptsDir = join(fixture, "scripts");
    const commandLog = join(fixture, "commands.log");
    await mkdir(binDir);
    await mkdir(scriptsDir);
    await writeExecutable(join(scriptsDir, "preflight.sh"), preflight);

    await writeExecutable(
      join(binDir, "git"),
      `#!/usr/bin/env bash
set -euo pipefail

if [[ "$*" == "rev-parse --show-toplevel" ]]; then
  printf '%s\\n' "$TEST_ROOT"
elif [[ "$*" == "symbolic-ref --short HEAD" ]]; then
  printf '%s\\n' "test-branch"
elif [[ "$*" == "symbolic-ref refs/remotes/origin/HEAD" ]]; then
  printf '%s\\n' "refs/remotes/origin/main"
elif [[ "$*" == "rev-parse --verify --quiet origin/main" ]]; then
  [[ "$TEST_BASE_REF_AVAILABLE" == "1" ]]
elif [[ "$*" == "diff --name-only origin/main...HEAD" ]]; then
  if [[ "$TEST_BASE_REF_AVAILABLE" != "1" ]]; then
    printf '%s\\n' "fatal: ambiguous argument 'origin/main...HEAD': unknown revision" >&2
    exit 128
  fi
  printf '%s\\n' "$TEST_CHANGED_FILES"
elif [[ "$*" == "diff --name-only -z origin/main...HEAD" ]]; then
  printf '%b' "$TEST_NUL_CHANGED_FILES"
elif [[ "$*" == "diff --name-status -z origin/main...HEAD" ]]; then
  printf '%b' "$TEST_NUL_CHANGED_FILE_STATUS"
fi
`
    );
    await writeExecutable(
      join(binDir, "npx"),
      `#!/usr/bin/env bash
printf 'npx %s\\n' "$*" >> "$TEST_COMMAND_LOG"
`
    );
    await writeExecutable(
      join(binDir, "reuse"),
      `#!/usr/bin/env bash
printf 'reuse %s\\n' "$*" >> "$TEST_COMMAND_LOG"
`
    );

    const result = spawnSync("bash", ["scripts/preflight.sh"], {
      cwd: fixture,
      encoding: "utf8",
      env: {
        ...process.env,
        PATH: `${binDir}:${process.env.PATH}`,
        TEST_BASE_REF_AVAILABLE: baseRefAvailable ? "1" : "0",
        TEST_CHANGED_FILES: changedFiles,
        TEST_COMMAND_LOG: commandLog,
        TEST_NUL_CHANGED_FILES: encodeNulDelimitedFields(nulChangedFiles),
        TEST_NUL_CHANGED_FILE_STATUS:
          encodeNulDelimitedFields(changedFileStatus),
        TEST_ROOT: fixture,
      },
    });

    const commands = await readFile(commandLog, "utf8").catch((error) => {
      if (error.code === "ENOENT") {
        return "";
      }
      throw error;
    });
    return { commands, result };
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
}

async function runPreflight(changedFiles, changedFileStatus, options) {
  const execution = await executePreflight(
    changedFiles,
    changedFileStatus,
    options
  );

  assert.equal(execution.result.status, 0, execution.result.stderr);
  return execution.commands;
}

test("runs markdownlint for a Markdown file changed on the branch", async () => {
  const commands = await runPreflight(
    "docs/existing-page.md",
    "M\tdocs/existing-page.md"
  );

  assert.match(commands, /^npx .*markdownlint/m);
  assert.doesNotMatch(commands, /^reuse lint$/m);
});

const licenseChangeCases = [
  ["REUSE metadata", "REUSE.toml", "M\tREUSE.toml"],
  ["license sidecars", "src/example.ts.license", "M\tsrc/example.ts.license"],
  ["deleted license texts", "LICENSES/MIT.txt", "D\tLICENSES/MIT.txt"],
  ["renamed license texts", "NOTICE", "R100\tLICENSE\tNOTICE"],
];

for (const [
  description,
  changedFiles,
  changedFileStatus,
] of licenseChangeCases) {
  test(`runs REUSE lint for ${description} changed on the branch`, async () => {
    const commands = await runPreflight(changedFiles, changedFileStatus);

    assert.match(commands, /^reuse lint$/m);
  });
}

test("runs REUSE lint for a file added on the branch", async () => {
  const commands = await runPreflight("src/new-file.ts", "A\tsrc/new-file.ts");

  assert.match(commands, /^reuse lint$/m);
});

test("runs REUSE lint for a file renamed on the branch", async () => {
  const commands = await runPreflight(
    ".node-version",
    "R100\t.nvmrc\t.node-version"
  );

  assert.match(commands, /^reuse lint$/m);
});

test("runs REUSE lint for a non-ASCII license path", async () => {
  const commands = await runPreflight(
    '"docs/\\303\\274ber/LICENSE"',
    "M\tdocs/über/LICENSE"
  );

  assert.match(commands, /^reuse lint$/m);
});

test("runs markdownlint for a non-ASCII Markdown path", async () => {
  const commands = await runPreflight(
    '"docs/\\303\\274ber.md"',
    "M\tdocs/über.md",
    { nulChangedFiles: "docs/über.md" }
  );

  assert.match(commands, /^npx .*markdownlint/m);
});

test("skips REUSE lint when the branch has no changes", async () => {
  const commands = await runPreflight("", "");

  assert.doesNotMatch(commands, /^reuse lint$/m);
});

test("reports an actionable error when the selected base ref is unavailable", async () => {
  const { result } = await executePreflight("", "", {
    baseRefAvailable: false,
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Base ref 'origin\/main' is unavailable/);
});
