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

async function runPreflight(changedFiles, changedFileStatus) {
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
elif [[ "$*" == "diff --name-only origin/main...HEAD" ]]; then
  printf '%s\\n' "$TEST_CHANGED_FILES"
elif [[ "$*" == "diff --name-status origin/main...HEAD" ]]; then
  printf '%s\\n' "$TEST_CHANGED_FILE_STATUS"
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
        TEST_CHANGED_FILES: changedFiles,
        TEST_CHANGED_FILE_STATUS: changedFileStatus,
        TEST_COMMAND_LOG: commandLog,
        TEST_ROOT: fixture,
      },
    });

    assert.equal(result.status, 0, result.stderr);
    return await readFile(commandLog, "utf8");
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
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
