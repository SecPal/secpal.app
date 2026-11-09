// SPDX-FileCopyrightText: 2026 SecPal Contributors
// SPDX-License-Identifier: AGPL-3.0-or-later
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { parse } from "yaml";

test("accepted enrollment reconciles every PR under protected phase two", () => {
  const w = parse(
    readFileSync(".github/workflows/dependabot-auto-merge.yml", "utf8")
  );
  assert.equal(w.on.pull_request_target?.branches, undefined);
  for (const event of [
    "opened",
    "synchronize",
    "reopened",
    "ready_for_review",
    "labeled",
    "unlabeled",
    "edited",
    "converted_to_draft",
  ])
    assert.ok(w.on.pull_request_target.types.includes(event));
  assert.equal(w.on.pull_request, undefined);
  assert.equal(w["cache-mode"], "none");
  assert.equal(w.concurrency["cancel-in-progress"], true);
  const job = w.jobs["auto-merge"];
  assert.equal(job.if, undefined);
  assert.equal(
    job.uses,
    "SecPal/.github/.github/workflows/reusable-dependabot-auto-merge.yml@31555f23d459031248006f77785d872bc3947127"
  );
  assert.equal(job.steps, undefined);
  assert.equal(job.secrets, undefined);
  assert.equal(job.with.phase, "2");
  assert.equal(job.with["merge-method"], "squash");
  assert.equal(job.with["allowed-ecosystems"], "github_actions,npm_and_yarn");
  assert.deepEqual(w.permissions, {
    contents: "write",
    "pull-requests": "write",
    checks: "read",
    statuses: "read",
  });
});

test("Actions groups are homogeneous and shared immutable pins remain manual", () => {
  const config = parse(readFileSync(".github/dependabot.yml", "utf8"));
  const groups = config.updates.find(
    (entry) => entry["package-ecosystem"] === "github-actions"
  ).groups;
  assert.deepEqual(groups["shared-workflow-pins"].patterns, [
    "SecPal/.github*",
  ]);
  for (const kind of ["patch", "minor", "major"]) {
    assert.deepEqual(groups[`github-actions-${kind}`]["update-types"], [kind]);
    assert.deepEqual(groups[`github-actions-${kind}`]["exclude-patterns"], [
      "SecPal/.github*",
    ]);
  }
});
