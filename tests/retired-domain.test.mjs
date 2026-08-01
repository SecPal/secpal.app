// SPDX-FileCopyrightText: 2026 SecPal Contributors
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const repositoryRoot = new URL("../", import.meta.url);
const retiredDomain = ["dev", "secpal", "app"].join(".");
const retiredChangelogDomain = ["changelog", "secpal", "app"].join(".");
const forbiddenDomain = ["secpal", "xyz"].join(".");
const domainCheckScript = fileURLToPath(
  new URL("../scripts/check-domains.sh", import.meta.url)
);

function findMatchingFiles(root) {
  const repositoryFiles = execFileSync(
    "git",
    ["ls-files", "--cached", "--others", "--exclude-standard", "-z"],
    {
      cwd: root,
      encoding: "utf8",
    }
  )
    .split("\0")
    .filter(Boolean);

  return repositoryFiles.filter((path) => {
    try {
      return readFileSync(new URL(path, root), "utf8")
        .toLowerCase()
        .includes(retiredDomain);
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        return false;
      }

      throw error;
    }
  });
}

test("the retired development domain is absent from the repository", () => {
  const matchingFiles = findMatchingFiles(repositoryRoot);

  assert.deepEqual(matchingFiles, []);
});

test("the repository scan ignores tracked files deleted from the worktree", (t) => {
  const temporaryRepository = mkdtempSync(
    join(tmpdir(), "secpal-retired-domain-")
  );
  t.after(() => rmSync(temporaryRepository, { recursive: true, force: true }));

  execFileSync("git", ["init", "--quiet"], { cwd: temporaryRepository });
  const deletedPath = join(temporaryRepository, "deleted.txt");
  writeFileSync(deletedPath, "temporary test fixture");
  execFileSync("git", ["add", "deleted.txt"], { cwd: temporaryRepository });
  rmSync(deletedPath);

  const temporaryRoot = pathToFileURL(`${temporaryRepository}/`);
  assert.deepEqual(findMatchingFiles(temporaryRoot), []);
});

test("the repository scan rejects mixed-case retired domains", (t) => {
  const temporaryRepository = mkdtempSync(
    join(tmpdir(), "secpal-retired-domain-")
  );
  t.after(() => rmSync(temporaryRepository, { recursive: true, force: true }));

  execFileSync("git", ["init", "--quiet"], { cwd: temporaryRepository });
  writeFileSync(
    join(temporaryRepository, "mixed-case.txt"),
    ["DEV", "SECPAL", "APP"].join(".")
  );

  const temporaryRoot = pathToFileURL(`${temporaryRepository}/`);
  assert.deepEqual(findMatchingFiles(temporaryRoot), ["mixed-case.txt"]);
});

test("the domain policy rejects the former changelog host beside an allowed host", (t) => {
  const temporaryDirectory = mkdtempSync(
    join(tmpdir(), "secpal-domain-policy-")
  );
  t.after(() => rmSync(temporaryDirectory, { recursive: true, force: true }));

  writeFileSync(
    join(temporaryDirectory, "mixed-host.md"),
    `Current site: secpal.app; former site: ${retiredChangelogDomain}`
  );

  assert.throws(
    () =>
      execFileSync("bash", [domainCheckScript], {
        cwd: temporaryDirectory,
        encoding: "utf8",
      }),
    (error) => {
      assert.equal(error?.status, 1);
      assert.match(error.stdout, /Found forbidden domains:/);
      assert.ok(error.stdout.includes(retiredChangelogDomain));
      return true;
    }
  );
});

test("the domain policy rejects a forbidden domain beside an allowed host", (t) => {
  const temporaryDirectory = mkdtempSync(
    join(tmpdir(), "secpal-domain-policy-")
  );
  t.after(() => rmSync(temporaryDirectory, { recursive: true, force: true }));

  writeFileSync(
    join(temporaryDirectory, "mixed-domain.md"),
    `Current site: secpal.app; forbidden site: ${forbiddenDomain}`
  );

  assert.throws(
    () =>
      execFileSync("bash", [domainCheckScript], {
        cwd: temporaryDirectory,
        encoding: "utf8",
      }),
    (error) => {
      assert.equal(error?.status, 1);
      assert.match(error.stdout, /Found forbidden domains:/);
      assert.ok(error.stdout.includes(forbiddenDomain));
      return true;
    }
  );
});
