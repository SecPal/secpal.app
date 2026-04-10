// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import test from "node:test";

import {
  androidArtifactHost,
  androidChannels,
  buildLatestArtifactPath,
  buildLatestChecksumPath,
  buildVersionedArtifactPath,
  buildVersionedChecksumPath,
  buildVersionedMetadataDocument,
  buildVersionedMetadataPath,
} from "../src/lib/android-distribution.ts";
import {
  GET as getLatestArtifact,
  getStaticPaths as getLatestArtifactStaticPaths,
} from "../src/pages/android/channels/[channel]/app.secpal-latest.apk.ts";
import {
  GET as getLatestChecksum,
  getStaticPaths as getLatestChecksumStaticPaths,
} from "../src/pages/android/channels/[channel]/SHA256SUMS.txt.ts";
import { GET as getVersionedArtifact } from "../src/pages/android/releases/{version}/app.secpal-{version}.apk.ts";
import { GET as getVersionedChecksum } from "../src/pages/android/releases/{version}/SHA256SUMS.txt.ts";

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

test("latest Android artifact routes stay stable before the first public release", async () => {
  assert.deepEqual(
    getLatestArtifactStaticPaths(),
    androidChannels.map((channel) => ({ params: { channel } }))
  );
  assert.deepEqual(
    getLatestChecksumStaticPaths(),
    androidChannels.map((channel) => ({ params: { channel } }))
  );

  const artifactResponse = await getLatestArtifact({
    params: { channel: "managed_device" },
    site: new URL("https://secpal.app"),
  });
  const checksumResponse = await getLatestChecksum({
    params: { channel: "managed_device" },
    site: new URL("https://secpal.app"),
  });

  assert.equal(artifactResponse.status, 404);
  assert.equal(checksumResponse.status, 404);
  assert.equal(
    artifactResponse.headers.get("Content-Type"),
    "text/plain; charset=utf-8"
  );
  assert.equal(
    checksumResponse.headers.get("Content-Type"),
    "text/plain; charset=utf-8"
  );
  assert.equal(artifactResponse.headers.get("Cache-Control"), "no-store");
  assert.equal(checksumResponse.headers.get("Cache-Control"), "no-store");
  const artifactText = await artifactResponse.text();
  const checksumText = await checksumResponse.text();
  assert.ok(
    artifactText.includes(buildLatestArtifactPath("managed_device")),
    `expected artifact body to contain ${buildLatestArtifactPath("managed_device")}`
  );
  assert.ok(
    checksumText.includes(buildLatestChecksumPath("managed_device")),
    `expected checksum body to contain ${buildLatestChecksumPath("managed_device")}`
  );
});

test("versioned Android artifact routes explain pending release availability", async () => {
  // These handlers serve at literal /{version}/ paths (not dynamic Astro segments);
  // they use a {version} string placeholder rather than reading params.version.
  const artifactResponse = await getVersionedArtifact({
    params: {},
    site: new URL("https://secpal.app"),
  });
  const checksumResponse = await getVersionedChecksum({
    params: {},
    site: new URL("https://secpal.app"),
  });

  assert.equal(artifactResponse.status, 404);
  assert.equal(checksumResponse.status, 404);
  const artifactText = await artifactResponse.text();
  const checksumText = await checksumResponse.text();
  assert.ok(
    artifactText.includes(buildVersionedArtifactPath("{version}")),
    `expected artifact body to contain ${buildVersionedArtifactPath("{version}")}`
  );
  assert.ok(
    checksumText.includes(buildVersionedChecksumPath("{version}")),
    `expected checksum body to contain ${buildVersionedChecksumPath("{version}")}`
  );
});
