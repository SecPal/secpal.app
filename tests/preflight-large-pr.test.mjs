// SPDX-FileCopyrightText: 2026 SecPal Contributors
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import { chmod, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const preflightPath = new URL("../scripts/preflight.sh", import.meta.url);
const preflight = await readFile(preflightPath, "utf8");
const gitignore = await readFile(
  new URL("../.gitignore", import.meta.url),
  "utf8",
);

async function writeExecutable(path, contents) {
  await writeFile(path, contents);
  await chmod(path, 0o755);
}

async function runPreflight(changedLines) {
  const fixture = await mkdtemp(join(tmpdir(), "secpal-preflight-"));

  try {
    const binDir = join(fixture, "bin");
    const scriptsDir = join(fixture, "scripts");
    await mkdir(binDir);
    await mkdir(scriptsDir);
    await writeExecutable(join(scriptsDir, "preflight.sh"), preflight);
    await writeFile(join(fixture, ".preflight-allow-large-pr"), "");

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
elif [[ "\${1:-}" == "diff" && "\${2:-}" == "--shortstat" ]]; then
  printf ' 1 file changed, %s insertions(+)\\n' "$TEST_CHANGED_LINES"
elif [[ "\${1:-}" == "diff" && "\${2:-}" == "--stat" ]]; then
  printf ' 1 file changed, %s insertions(+)\\n' "$TEST_CHANGED_LINES"
fi
`,
    );
    await writeExecutable(join(binDir, "npx"), "#!/usr/bin/env bash\nexit 0\n");
    await writeExecutable(
      join(binDir, "reuse"),
      "#!/usr/bin/env bash\nexit 0\n",
    );

    const result = spawnSync("bash", ["scripts/preflight.sh"], {
      cwd: fixture,
      encoding: "utf8",
      env: {
        ...process.env,
        PATH: `${binDir}:${process.env.PATH}`,
        TEST_CHANGED_LINES: String(changedLines),
        TEST_ROOT: fixture,
      },
    });

    assert.equal(result.status, 0, result.stderr);
    return `${result.stdout}${result.stderr}`;
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
}

test("reports ordinary changes normally even with a stale local override file", async () => {
  const output = await runPreflight(119);

  assert.match(output, /PR size OK \(119\/600 lines\)/);
  assert.doesNotMatch(output, /override/i);
});

test("reports oversized changes as advisory without an override", async () => {
  const output = await runPreflight(601);

  assert.match(output, /WARNING: PR is large \(601 lines changed, limit is 600\)/);
  assert.doesNotMatch(output, /override/i);
});

test("does not retain the obsolete local override mechanism", () => {
  assert.doesNotMatch(preflight, /preflight-allow-large-pr|override/i);
  assert.doesNotMatch(gitignore, /preflight-allow-large-pr/);
});
