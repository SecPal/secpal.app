// SPDX-FileCopyrightText: 2026 SecPal Contributors
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const workflowsDirectory = new URL("../.github/workflows/", import.meta.url);
const immutableRevision = /^[0-9a-f]{40}$/;
const sourceReference = /^[A-Za-z0-9][A-Za-z0-9._/-]*$/;

function externalWorkflowReferences() {
  return readdirSync(workflowsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.ya?ml$/.test(entry.name))
    .flatMap((entry) => {
      const workflowPath = join(workflowsDirectory.pathname, entry.name);

      return readFileSync(workflowPath, "utf8")
        .split("\n")
        .flatMap((line, index) => {
          const match = line.match(
            /^\s*uses:\s*([^\s#]+)(?:\s+#\s*(\S+))?\s*$/
          );

          if (!match || match[1].startsWith("./")) {
            return [];
          }

          return [
            {
              file: entry.name,
              line: index + 1,
              reference: match[1],
              source: match[2],
            },
          ];
        });
    });
}

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
