// SPDX-FileCopyrightText: 2026 SecPal Contributors
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const workflowsDirectory = new URL("../.github/workflows/", import.meta.url);
const immutableRevision = /^[0-9a-f]{40}$/;
const sourceReference = /^[A-Za-z0-9][A-Za-z0-9._/-]*$/;

function parseExternalWorkflowReference(line) {
  const blockMatch = line.match(
    /^\s*(?:-\s+)?(?:"uses"|'uses'|uses)\s*:\s*("[^"]+"|'[^']+'|[^\s#]+)(?:\s+#\s*(.*?))?\s*$/
  );
  const flowMatch = line.match(
    /^\s*-\s*\{.*?(?:"uses"|'uses'|uses)\s*:\s*("[^"]+"|'[^']+'|[^,\s#}]+).*?\}\s*(?:#\s*(.*?))?\s*$/
  );
  const match = blockMatch ?? flowMatch;
  const rawReference = match?.[1];
  const reference = rawReference?.replace(/^(?:"(.*)"|'(.*)')$/, "$1$2");

  if (!reference || reference.startsWith("./")) {
    return null;
  }

  return {
    reference,
    source: match[2],
  };
}

function workflowPath(directory, entryName) {
  return join(fileURLToPath(directory), entryName);
}

function externalWorkflowReferences() {
  return readdirSync(workflowsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.ya?ml$/.test(entry.name))
    .flatMap((entry) => {
      const path = workflowPath(workflowsDirectory, entry.name);

      return readFileSync(path, "utf8")
        .split("\n")
        .flatMap((line, index) => {
          const parsedReference = parseExternalWorkflowReference(line);

          if (!parsedReference) {
            return [];
          }

          return [
            {
              file: entry.name,
              line: index + 1,
              ...parsedReference,
            },
          ];
        });
    });
}

test("external workflow references are discovered in valid YAML forms", () => {
  const revision = "a".repeat(40);

  assert.deepEqual(
    parseExternalWorkflowReference("- uses: actions/checkout@v7 # v7"),
    {
      reference: "actions/checkout@v7",
      source: "v7",
    }
  );
  assert.deepEqual(
    parseExternalWorkflowReference(
      `"uses": "actions/checkout@${revision}" # v7`
    ),
    {
      reference: `actions/checkout@${revision}`,
      source: "v7",
    }
  );
  assert.deepEqual(
    parseExternalWorkflowReference("uses: 'actions/checkout@v7' # v7 release"),
    {
      reference: "actions/checkout@v7",
      source: "v7 release",
    }
  );
  assert.deepEqual(
    parseExternalWorkflowReference(
      `- { name: Checkout, uses: "actions/checkout@${revision}" } # v7`
    ),
    {
      reference: `actions/checkout@${revision}`,
      source: "v7",
    }
  );
  assert.equal(parseExternalWorkflowReference("- uses: ./local-action"), null);
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

test("external workflow references use immutable revisions with source annotations", () => {
  const references = externalWorkflowReferences();

  assert.ok(
    references.length > 0,
    "expected at least one external workflow reference"
  );

  for (const { file, line, reference, source } of references) {
    const [, revision] = reference.split("@");
    const location = `${file}:${line}`;

    assert.match(
      revision,
      immutableRevision,
      `${location} must use a full commit SHA`
    );
    assert.match(
      source,
      sourceReference,
      `${location} must identify the source tag or branch`
    );
  }
});
