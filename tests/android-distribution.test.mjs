// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  androidDirectDownloadAvailable,
  androidArtifactHost,
  androidDistributionContent,
  androidPlayStoreUrl,
  androidPublicPlayStoreAvailable,
  androidReleaseTracks,
  buildArtifactUrl,
  buildAndroidDistributionContent,
  buildChannelAliasMetadataPath,
  buildLatestArtifactPath,
  buildLatestChecksumPath,
  buildLatestMetadataPath,
  buildTrackArtifactPath,
  buildTrackChecksumPath,
  buildTrackMetadataPath,
  buildVersionedArtifactPath,
  buildVersionedChecksumPath,
  buildVersionedMetadataDocument,
  buildVersionedMetadataPath,
} from "../src/lib/android-distribution.ts";
import { GET as getLatestArtifact } from "../src/pages/android/app.secpal-latest.apk.ts";
import { GET as getLatestChecksum } from "../src/pages/android/SHA256SUMS.txt.ts";
import { GET as getLatestMetadata } from "../src/pages/android/latest.json.ts";
import { GET as getStableMetadata } from "../src/pages/android/stable/latest.json.ts";
import { GET as getBetaMetadata } from "../src/pages/android/beta/latest.json.ts";
import { GET as getVersionedArtifact } from "../src/pages/android/releases/{versionCode}/app.secpal-{versionCode}.apk.ts";
import { GET as getVersionedChecksum } from "../src/pages/android/releases/{versionCode}/SHA256SUMS.txt.ts";

test("buildVersionedMetadataDocument returns stable versioned Android release URLs", () => {
  const version = "123456789";
  const siteUrl = new URL("https://secpal.app");

  const metadata = buildVersionedMetadataDocument(version, siteUrl);

  assert.equal(metadata.version, version);
  assert.equal(metadata.version_code, version);
  assert.equal(metadata.version_name, null);
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
    metadata.versioned_checksum_url,
    `https://apk.secpal.app${buildVersionedChecksumPath(version)}`
  );
  assert.equal(metadata.published_at, null);
  assert.equal(metadata.update_channel, null);
  assert.equal(metadata.release_available, false);
  assert.equal(
    metadata.app_signing_certificate_sha256,
    "C3:E9:FD:07:69:F3:34:9B:B0:B0:56:BA:E6:69:47:23:40:E1:CB:28:66:26:DE:30:C9:C9:FA:F9:5F:1E:47:B5"
  );
  assert.equal(metadata.signing_key_shared_with_google_play, true);
});

test("buildArtifactUrl preserves literal template placeholders", () => {
  assert.equal(
    buildArtifactUrl(buildVersionedMetadataPath("{versionCode}")),
    `https://apk.secpal.app${buildVersionedMetadataPath("{versionCode}")}`
  );
});

test("stable alias metadata points to the canonical stable manifest", async () => {
  const metadataResponse = await getLatestMetadata({
    params: {},
    site: new URL("https://secpal.app"),
  });

  assert.equal(metadataResponse.status, 200);

  const metadata = await metadataResponse.json();

  assert.equal(metadata.update_channel, "stable");
  assert.equal(
    metadata.metadata_url,
    `https://apk.secpal.app${buildTrackMetadataPath("stable")}`
  );
  assert.equal(
    metadata.alias_url,
    `https://apk.secpal.app${buildChannelAliasMetadataPath()}`
  );
  assert.equal(metadata.release_available, false);
  assert.equal(metadata.version_code, null);
  assert.equal(metadata.published_at, null);
});

test("track manifests split stable and beta while sharing the signing identity", async () => {
  const stableMetadataResponse = await getStableMetadata({
    params: {},
    site: new URL("https://secpal.app"),
  });
  const betaMetadataResponse = await getBetaMetadata({
    params: {},
    site: new URL("https://secpal.app"),
  });

  assert.equal(stableMetadataResponse.status, 200);
  assert.equal(betaMetadataResponse.status, 200);

  const stableMetadata = await stableMetadataResponse.json();
  const betaMetadata = await betaMetadataResponse.json();

  assert.equal(stableMetadata.update_channel, "stable");
  assert.equal(betaMetadata.update_channel, "beta");
  assert.equal(stableMetadata.alias_url, null);
  assert.equal(betaMetadata.alias_url, null);
  assert.equal(
    stableMetadata.latest_apk_url,
    `https://apk.secpal.app${buildTrackArtifactPath("stable")}`
  );
  assert.equal(
    betaMetadata.latest_apk_url,
    `https://apk.secpal.app${buildTrackArtifactPath("beta")}`
  );
  assert.equal(
    stableMetadata.checksum_url,
    `https://apk.secpal.app${buildTrackChecksumPath("stable")}`
  );
  assert.equal(
    betaMetadata.checksum_url,
    `https://apk.secpal.app${buildTrackChecksumPath("beta")}`
  );
  assert.equal(
    stableMetadata.app_signing_certificate_sha256,
    betaMetadata.app_signing_certificate_sha256
  );
  assert.equal(stableMetadata.signing_key_shared_with_google_play, true);
  assert.equal(betaMetadata.signing_key_shared_with_google_play, true);
});

test("stable alias artifact endpoints explain pending release availability", async () => {
  const artifactResponse = await getLatestArtifact({
    params: {},
    site: new URL("https://secpal.app"),
  });
  const checksumResponse = await getLatestChecksum({
    params: {},
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
    artifactText.includes(buildLatestArtifactPath()),
    `expected artifact body to contain ${buildLatestArtifactPath()}`
  );
  assert.ok(
    checksumText.includes(buildLatestChecksumPath()),
    `expected checksum body to contain ${buildLatestChecksumPath()}`
  );
});

test("versioned Android artifact routes explain pending release availability", async () => {
  // These handlers serve at literal /{versionCode}/ paths (not dynamic Astro segments);
  // they use a {versionCode} string placeholder rather than reading params.versionCode.
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
    artifactText.includes(buildVersionedArtifactPath("{versionCode}")),
    `expected artifact body to contain ${buildVersionedArtifactPath("{versionCode}")}`
  );
  assert.ok(
    checksumText.includes(buildVersionedChecksumPath("{versionCode}")),
    `expected checksum body to contain ${buildVersionedChecksumPath("{versionCode}")}`
  );
});

test("public Android status is independent from internal release tracks", () => {
  const source = readFileSync(
    new URL("../src/lib/android-distribution.ts", import.meta.url),
    "utf8"
  );

  assert.equal(androidDirectDownloadAvailable, false);
  assert.equal(androidPublicPlayStoreAvailable, false);
  assert.deepEqual(androidReleaseTracks, ["stable", "beta"]);
  assert.doesNotMatch(source, /androidStableDownloadAvailable/);
  assert.doesNotMatch(source, /androidBetaDownloadAvailable/);
});

test("public Android content exposes exactly direct download and public Google Play", () => {
  for (const locale of ["en", "de"]) {
    const content = androidDistributionContent[locale];

    assert.equal(content.summaryItems.length, 4);
    assert.equal(content.downloadOptions.length, 2);
    assert.equal(
      content.downloadOptions[0]?.name,
      locale === "de" ? "Direkter Download" : "Direct download"
    );
    assert.equal(
      content.downloadOptions[1]?.name,
      locale === "de" ? "Play Store" : "Google Play"
    );
    assert.equal(content.heroPrimary.href, null);
    assert.equal(content.heroSecondary.href, null);
    assert.equal(content.downloadOptions[0]?.href, null);
    assert.equal(content.downloadOptions[1]?.href, null);
    assert.ok(!("secondaryLink" in content.downloadOptions[0]));
  }
});

test("unavailable public Android content does not expose public download or store URLs", () => {
  const publicContent = JSON.stringify(androidDistributionContent);

  assert.doesNotMatch(publicContent, /https:\/\/apk\.secpal\.app/);
  assert.doesNotMatch(publicContent, new RegExp(androidPlayStoreUrl));
});

test("available direct downloads reuse the canonical latest alias builders", () => {
  for (const locale of ["en", "de"]) {
    const content = buildAndroidDistributionContent(locale, true, false);
    const directDownload = content.downloadOptions[0];

    assert.equal(
      content.heroPrimary.href,
      buildArtifactUrl(buildLatestArtifactPath())
    );
    assert.equal(
      directDownload.href,
      buildArtifactUrl(buildLatestArtifactPath())
    );
    assert.equal(
      directDownload.secondaryLink?.href,
      buildArtifactUrl(buildLatestMetadataPath())
    );
    assert.deepEqual(
      content.endpointGroups[0]?.entries.map((entry) => entry.href),
      [
        buildArtifactUrl(buildLatestMetadataPath()),
        buildArtifactUrl(buildLatestArtifactPath()),
        buildArtifactUrl(buildLatestChecksumPath()),
      ]
    );
    assert.equal(content.heroSecondary.href, null);
  }
});

test("public Google Play links are emitted only for public availability", () => {
  for (const locale of ["en", "de"]) {
    const unavailable = buildAndroidDistributionContent(locale, false, false);
    const available = buildAndroidDistributionContent(locale, false, true);

    assert.equal(unavailable.heroSecondary.href, null);
    assert.equal(unavailable.downloadOptions[1]?.href, null);
    assert.equal(available.heroSecondary.href, androidPlayStoreUrl);
    assert.equal(available.downloadOptions[1]?.href, androidPlayStoreUrl);
  }
});

test("public Android content contains no beta or restricted-testing language", () => {
  const publicContent = JSON.stringify(androidDistributionContent);
  const forbiddenPhrases = [
    "Beta-Version",
    "Beta-Kanal",
    "Beta-Download",
    "Beta folgt",
    "Beta verfügbar",
    "Beta version",
    "Beta channel",
    "Beta download",
    "Internal Testing",
    "interner Test",
    "closed testing",
    "geschlossener Test",
  ];

  for (const phrase of forbiddenPhrases) {
    assert.ok(
      !publicContent.includes(phrase),
      `public Android content must not contain ${phrase}`
    );
  }
});

test("Android distribution surface conditionally renders accessible public actions", () => {
  const component = readFileSync(
    new URL(
      "../src/components/AndroidDistributionSurface.astro",
      import.meta.url
    ),
    "utf8"
  );

  assert.match(component, /\blg:grid-cols-2\b/);
  assert.match(component, /aria-disabled="true"/);
  assert.match(component, /content\.heroPrimary\.href\s*\?/);
  assert.match(component, /content\.heroSecondary\.href\s*\?/);
  assert.match(component, /androidDirectDownloadAvailable\s*\?/);
  assert.doesNotMatch(component, /content\.betaNotice/);
});
