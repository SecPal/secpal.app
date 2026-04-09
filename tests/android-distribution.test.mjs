// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import test from "node:test";

import {
  androidArtifactHost,
  buildVersionedArtifactPath,
  buildVersionedChecksumPath,
  buildVersionedMetadataDocument,
  buildVersionedMetadataPath,
} from "../src/lib/android-distribution.ts";

test("buildVersionedMetadataDocument returns stable versioned Android release URLs", () => {
  const version = "1.2.3";
  const siteUrl = new URL("https://secpal.app");

  const metadata = buildVersionedMetadataDocument(version, siteUrl);

  assert.equal(metadata.version, version);
  assert.equal(metadata.package_name, "app.secpal");
  assert.equal(metadata.artifact_host, androidArtifactHost);
  assert.equal(metadata.human_landing_url, "https://secpal.app/android/");
  assert.equal(
    metadata.metadata_url,
    `https://apk.secpal.app${buildVersionedMetadataPath(version)}`
  );
  assert.equal(
    metadata.versioned_apk_url,
    `https://apk.secpal.app${buildVersionedArtifactPath(version)}`
  );
  assert.equal(
    metadata.checksum_url,
    `https://apk.secpal.app${buildVersionedChecksumPath(version)}`
  );
  assert.equal(metadata.release_available, false);
  assert.equal(metadata.storage_backend_status, "pending_release_decision");
  assert.ok(
    metadata.notes.some((note) =>
      note.includes("release-time infrastructure decision")
    )
  );
});
