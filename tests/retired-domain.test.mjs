// SPDX-FileCopyrightText: 2026 SecPal Contributors
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";

const repositoryRoot = new URL("../", import.meta.url);
const retiredDomain = ["dev", "secpal", "app"].join(".");

const repositoryFiles = execFileSync(
  "git",
  ["ls-files", "--cached", "--others", "--exclude-standard", "-z"],
  {
    cwd: repositoryRoot,
    encoding: "utf8",
  }
)
  .split("\0")
  .filter(Boolean);

test("the retired development domain is absent from the repository", () => {
  const matchingFiles = repositoryFiles.filter((path) =>
    readFileSync(new URL(path, repositoryRoot)).includes(retiredDomain)
  );

  assert.deepEqual(matchingFiles, []);
});
