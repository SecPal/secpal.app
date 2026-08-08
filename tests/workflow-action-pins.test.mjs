// SPDX-FileCopyrightText: 2026 SecPal Contributors
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { LineCounter, isMap, isScalar, isSeq, parseDocument } from "yaml";

const workflowsDirectory = new URL("../.github/workflows/", import.meta.url);
const immutableRevision = /^[0-9a-f]{40}$/;
const sourceReference = /^[A-Za-z0-9][A-Za-z0-9._/-]*$/;

function workflowPath(directory, entryName) {
  return join(fileURLToPath(directory), entryName);
}

function externalWorkflowReferencesFromSource(file, source) {
  const lineCounter = new LineCounter();
  const document = parseDocument(source, {
    lineCounter,
    prettyErrors: false,
    strict: true,
  });
  const parseErrors = document.errors.map((error) => error.message).join("; ");

  assert.equal(
    document.errors.length,
    0,
    `${file} must contain valid YAML${parseErrors ? `: ${parseErrors}` : ""}`
  );

  const lines = source.split("\n");
  const references = [];

  function visit(node) {
    if (isMap(node)) {
      for (const pair of node.items) {
        if (isScalar(pair.key) && pair.key.value === "uses") {
          const offset = pair.value?.range?.[0] ?? pair.key.range?.[0] ?? 0;
          const line = lineCounter.linePos(offset).line;

          assert.ok(
            isScalar(pair.value) && typeof pair.value.value === "string",
            `${file}:${line} uses must be a string scalar`
          );

          const reference = pair.value.value;

          if (!reference.startsWith("./")) {
            references.push({
              file,
              line,
              reference,
              source: lines[line - 1]?.match(/#\s*(.*?)\s*$/)?.[1],
            });
          }
        }

        visit(pair.value);
      }
    } else if (isSeq(node)) {
      for (const item of node.items) {
        visit(item);
      }
    }
  }

  visit(document.contents);

  return references;
}

function assertImmutableWorkflowReference({ reference, source, location }) {
  const revisionStart = reference.lastIndexOf("@");
  const revision =
    revisionStart === -1 ? "" : reference.slice(revisionStart + 1);
  const annotation = source ?? "";

  assert.notEqual(
    revisionStart,
    -1,
    `${location} must include an @ followed by a full commit SHA`
  );
  assert.ok(revision, `${location} must include a full commit SHA`);
  assert.ok(annotation, `${location} must identify the source tag or branch`);
  assert.match(
    revision,
    immutableRevision,
    `${location} must use a full commit SHA`
  );
  assert.match(
    annotation,
    sourceReference,
    `${location} must identify the source tag or branch`
  );
}

function externalWorkflowReferences() {
  return readdirSync(workflowsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.ya?ml$/.test(entry.name))
    .flatMap((entry) => {
      const path = workflowPath(workflowsDirectory, entry.name);

      return externalWorkflowReferencesFromSource(
        entry.name,
        readFileSync(path, "utf8")
      );
    });
}

test("external workflow references are discovered in valid YAML forms", () => {
  const revision = "a".repeat(40);

  assert.deepEqual(
    externalWorkflowReferencesFromSource(
      "fixture.yml",
      `steps:
  - uses: actions/checkout@v7 # v7
  - "uses": "actions/checkout@${revision}" # v7
  - 'uses': 'actions/checkout@v7' # v7
  - { name: Checkout, uses: "actions/checkout@${revision}" } # v7
  - uses: ./local-action
`
    ).map(({ reference, source }) => ({ reference, source })),
    [
      { reference: "actions/checkout@v7", source: "v7" },
      { reference: `actions/checkout@${revision}`, source: "v7" },
      { reference: "actions/checkout@v7", source: "v7" },
      { reference: `actions/checkout@${revision}`, source: "v7" },
    ]
  );
});

test("external workflow references are discovered in multiline YAML scalars", () => {
  assert.deepEqual(
    externalWorkflowReferencesFromSource(
      "fixture.yml",
      'steps:\n  - uses:\n      "actions/checkout@v7" # v7\n'
    ),
    [
      {
        file: "fixture.yml",
        line: 3,
        reference: "actions/checkout@v7",
        source: "v7",
      },
    ]
  );
});

test("workflow paths decode file URL path segments", () => {
  const directory = new URL(
    "file:///tmp/SecPal%20workspace/.github/workflows/"
  );

  assert.equal(
    workflowPath(directory, "quality.yml"),
    join(fileURLToPath(directory), "quality.yml")
  );
});

test("missing workflow pin details report actionable assertion failures", () => {
  assert.throws(
    () =>
      assertImmutableWorkflowReference({
        reference: "actions/checkout",
        source: "v7",
        location: "fixture.yml:1",
      }),
    /fixture\.yml:1 must include an @ followed by a full commit SHA/
  );
  assert.throws(
    () =>
      assertImmutableWorkflowReference({
        reference: "actions/checkout@",
        source: "v7",
        location: "fixture.yml:2",
      }),
    /fixture\.yml:2 must include a full commit SHA/
  );
  assert.throws(
    () =>
      assertImmutableWorkflowReference({
        reference: "actions/checkout@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        source: undefined,
        location: "fixture.yml:3",
      }),
    /fixture\.yml:3 must identify the source tag or branch/
  );
});

test("project automation secret checks have a bounded timeout", () => {
  const workflow = readFileSync(
    new URL("../.github/workflows/project-automation.yml", import.meta.url),
    "utf8"
  );

  assert.match(
    workflow,
    /  check-project-automation-secrets:\n(?:    [^\n]*\n)*?    timeout-minutes:/
  );
});

test("external workflow references use immutable revisions with source annotations", () => {
  const references = externalWorkflowReferences();

  assert.ok(
    references.length > 0,
    "expected at least one external workflow reference"
  );

  for (const { file, line, reference, source } of references) {
    assertImmutableWorkflowReference({
      reference,
      source,
      location: `${file}:${line}`,
    });
  }
});
