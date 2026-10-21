// SPDX-FileCopyrightText: 2026 SecPal Contributors
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";
import { parse } from "yaml";

const load = (name) =>
  parse(
    readFileSync(
      new URL("../.github/workflows/" + name, import.meta.url),
      "utf8"
    )
  );
const quality = load("quality.yml");
const deployment = load("deploy-uberspace.yml");
const boundaries = [
  ["required quality build", quality.jobs.build],
  ["Uberspace publication", deployment.jobs.deploy],
];

function admission(job) {
  return job.steps?.find(
    (step) => step.name === "Require clean repository security"
  );
}

for (const [name, job] of boundaries) {
  test(name + " scans exact source read-only before build execution", () => {
    assert.deepEqual(job.permissions, { contents: "read" });
    const steps = job.steps;
    assert.deepEqual(steps[0].with, {
      ref: "${{ github.sha }}",
      "persist-credentials": false,
    });
    const scan = steps.find((step) => step.id === "repository-security");
    assert.equal(
      scan?.uses,
      "SecPal/.github/.github/actions/trivy-repository-scan@55bcdb6f00eb7d552da206f83fcdc87cf2c43375"
    );
    for (const key of ["with", "env", "if", "continue-on-error"]) {
      assert.equal(Object.hasOwn(scan, key), false);
    }
    const gate = admission(job);
    assert.equal(steps.indexOf(scan), 1);
    assert.equal(steps.indexOf(gate), 2);
    assert.equal(gate.if, "${{ always() }}");
    assert.equal(gate.shell, "bash");
    assert.equal(Object.hasOwn(gate, "continue-on-error"), false);
    assert.deepEqual(gate.env, {
      SCAN_OUTCOME: "${{ steps.repository-security.outcome }}",
      GATE_STATE: "${{ steps.repository-security.outputs.gate-state }}",
    });
    for (const step of steps.slice(3)) {
      assert.equal(
        step.if,
        undefined,
        "later steps must retain default success() admission"
      );
      assert.equal(Object.hasOwn(step, "continue-on-error"), false);
    }
    assert.ok(
      steps.slice(3).some((step) => step.run?.includes("npm run build"))
    );
  });

  test(
    name +
      " admits only successful CLEAN evidence and prints no untrusted state",
    () => {
      // Execute the real workflow guard. Before adoption, no admission phase runs.
      const command = admission(job)?.run ?? "";
      for (const outcome of [
        "success",
        "failure",
        "cancelled",
        "skipped",
        "",
      ]) {
        for (const state of [
          "CLEAN",
          "ACTIONABLE",
          "REVIEW_REQUIRED",
          "UNKNOWN_STALE",
          "",
          "CLEAN;true",
        ]) {
          const result = spawnSync(
            "bash",
            ["--noprofile", "--norc", "-eo", "pipefail", "-c", command],
            {
              encoding: "utf8",
              env: { ...process.env, SCAN_OUTCOME: outcome, GATE_STATE: state },
            }
          );
          assert.equal(
            result.status === 0,
            outcome === "success" && state === "CLEAN",
            outcome + "/" + state
          );
          assert.equal(result.stdout, "");
          assert.equal(result.stderr, "");
        }
      }
    }
  );
}

test("quality preserves its required build identity and never skips it through dependencies", () => {
  assert.equal(quality.jobs.build.name, "Astro Build / Build Project");
  assert.equal(quality.jobs.build.if, undefined);
  assert.equal(quality.jobs.build.needs, undefined);
  assert.deepEqual(quality.on.push.branches, ["main"]);
  assert.deepEqual(quality.on.pull_request.branches, ["main"]);
});

test("publication stays main-only with credentials and atomic SSH after security admission", () => {
  const job = deployment.jobs.deploy;
  const steps = job.steps;
  const credentials = steps.findIndex(
    (step) => step.name === "Install restricted SSH credentials"
  );
  const publish = steps.findIndex((step) => step.name === "Publish atomically");
  const build = steps.findIndex((step) => step.name === "Build static release");
  const gate = steps.indexOf(admission(job));
  assert.deepEqual(deployment.permissions, { contents: "read" });
  assert.deepEqual(job.permissions, { contents: "read" });
  assert.deepEqual(deployment.on.push.branches, ["main"]);
  assert.equal(Object.hasOwn(deployment.on, "workflow_dispatch"), true);
  assert.equal(Object.hasOwn(deployment.on, "pull_request"), false);
  assert.equal(job.if, "${{ github.ref == 'refs/heads/main' }}");
  assert.deepEqual(deployment.concurrency, {
    group: "deploy-uberspace-secpal-app",
    "cancel-in-progress": false,
  });
  assert.ok(
    gate >= 0 && build > gate && credentials > build && publish > credentials
  );
  assert.equal(
    steps
      .slice(0, credentials)
      .some((step) => JSON.stringify(step).includes("secrets.")),
    false
  );
  assert.deepEqual(steps[credentials].env, {
    UBERSPACE_KNOWN_HOSTS: "${{ secrets.UBERSPACE_KNOWN_HOSTS }}",
    UBERSPACE_SSH_KEY: "${{ secrets.UBERSPACE_SSH_KEY }}",
  });
  assert.deepEqual(steps[publish].env, { REVISION: "${{ github.sha }}" });
  assert.match(steps[publish].run, /StrictHostKeyChecking=yes/);
  assert.match(steps[publish].run, /UserKnownHostsFile=/);
  assert.match(steps[publish].run, /deploy-secpal-app \$REVISION/);
});
