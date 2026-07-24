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
    assert.equal(content.heroPrimary, null);
    assert.equal(content.heroSecondary, null);
    assert.ok(!("action" in content.downloadOptions[0]));
    assert.ok(!("action" in content.downloadOptions[1]));
    assert.ok(!("secondaryLink" in content.downloadOptions[0]));
  }
});

test("unavailable public Android content does not expose public download or store URLs", () => {
  const publicContent = JSON.stringify(androidDistributionContent);

  assert.doesNotMatch(publicContent, /https:\/\/apk\.secpal\.app/);
  assert.ok(!publicContent.includes(androidPlayStoreUrl));
});

test("available direct downloads reuse the canonical latest alias builders", () => {
  for (const locale of ["en", "de"]) {
    const content = buildAndroidDistributionContent(locale, true, false);
    const directDownload = content.downloadOptions[0];

    assert.equal(
      content.heroPrimary?.href,
      buildArtifactUrl(buildLatestArtifactPath())
    );
    assert.equal(
      directDownload.action?.href,
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
    assert.equal(content.heroSecondary, null);
    assert.ok(!("action" in content.downloadOptions[1]));
  }
});

test("public Google Play links are emitted only for public availability", () => {
  for (const locale of ["en", "de"]) {
    const unavailable = buildAndroidDistributionContent(locale, false, false);
    const available = buildAndroidDistributionContent(locale, false, true);

    assert.equal(unavailable.heroSecondary, null);
    assert.ok(!("action" in unavailable.downloadOptions[1]));
    assert.equal(available.heroPrimary, null);
    assert.ok(!available.downloadOptions[0]?.action);
    assert.equal(
      available.badge,
      locale === "de"
        ? "Direkter Download in Vorbereitung"
        : "Direct download in preparation"
    );
    assert.equal(available.heroSecondary?.href, androidPlayStoreUrl);
    assert.equal(
      available.downloadOptions[1]?.action?.href,
      androidPlayStoreUrl
    );
  }
});

test("public Google Play availability changes only concise status and real actions", () => {
  const expectations = {
    en: {
      description:
        "Information about the SecPal Android release, direct downloads from secpal.app, and public availability on Google Play.",
      summary: "Available",
      intro: "Current and planned distribution paths for SecPal on Android.",
      cardDescription: "SecPal is also publicly available on Google Play.",
    },
    de: {
      description:
        "Informationen zur Android-Version von SecPal, zum direkten Download über secpal.app und zur öffentlichen Verfügbarkeit im Play Store.",
      summary: "Verfügbar",
      intro: "Aktuelle und geplante Bezugswege für SecPal auf Android.",
      cardDescription:
        "SecPal ist zusätzlich öffentlich im Play Store verfügbar.",
    },
  };

  for (const locale of ["en", "de"]) {
    for (const directDownloadAvailable of [false, true]) {
      const content = buildAndroidDistributionContent(
        locale,
        directDownloadAvailable,
        true
      );
      const expectation = expectations[locale];

      assert.equal(content.description, expectation.description);
      assert.ok(!content.subline.includes("Play"));
      assert.equal(content.summaryItems[3]?.value, expectation.summary);
      assert.equal(content.downloadIntro, expectation.intro);
      assert.equal(
        content.downloadOptions[1]?.description,
        expectation.cardDescription
      );
    }
  }
});

test("hero, summary, and distribution copy follow the concise public hierarchy", () => {
  const expectations = {
    en: {
      preparing:
        "The first SecPal Android release is being prepared for direct download from secpal.app. SecPal remains in an early 0.x development phase.",
      available:
        "The current SecPal Android release is available for direct download from secpal.app. SecPal remains in an early 0.x development phase.",
      distributionLabel: "Distribution",
      distributionValue: "Direct from secpal.app",
      playStatus: "Planned",
      sectionTitle: "Distribution",
      sectionIntro:
        "Current and planned distribution paths for SecPal on Android.",
      directPreparing:
        "The first public Android release will be provided through secpal.app.",
      directAvailable:
        "The current Android release is available directly through secpal.app. Its signature and checksum can be used to verify the package.",
      playPreparing:
        "A public release on Google Play is planned as an additional distribution path.",
    },
    de: {
      preparing:
        "Die erste Android-Version von SecPal wird für den direkten Download über secpal.app vorbereitet. SecPal befindet sich in einer frühen 0.x-Entwicklungsphase.",
      available:
        "Die aktuelle Android-Version von SecPal steht direkt über secpal.app zum Download bereit. SecPal befindet sich weiterhin in einer frühen 0.x-Entwicklungsphase.",
      distributionLabel: "Bereitstellung",
      distributionValue: "Direkt über secpal.app",
      playStatus: "Geplant",
      sectionTitle: "Bezugswege",
      sectionIntro: "Aktuelle und geplante Bezugswege für SecPal auf Android.",
      directPreparing:
        "Die erste öffentliche Android-Version wird über secpal.app bereitgestellt.",
      directAvailable:
        "Die aktuelle Android-Version steht direkt über secpal.app bereit. Signatur und Prüfsumme ermöglichen die Überprüfung des Pakets.",
      playPreparing:
        "Eine öffentliche Veröffentlichung im Play Store ist als zusätzlicher Bezugsweg vorgesehen.",
    },
  };

  for (const locale of ["en", "de"]) {
    const preparing = buildAndroidDistributionContent(locale, false, false);
    const available = buildAndroidDistributionContent(locale, true, false);
    const expectation = expectations[locale];

    assert.equal(preparing.subline, expectation.preparing);
    assert.equal(available.subline, expectation.available);
    assert.equal(
      preparing.summaryItems[1]?.label,
      expectation.distributionLabel
    );
    assert.equal(
      preparing.summaryItems[1]?.value,
      expectation.distributionValue
    );
    assert.equal(preparing.summaryItems[3]?.value, expectation.playStatus);
    assert.equal(preparing.downloadTitle, expectation.sectionTitle);
    assert.equal(preparing.downloadIntro, expectation.sectionIntro);
    assert.equal(
      preparing.downloadOptions[0]?.description,
      expectation.directPreparing
    );
    assert.equal(
      available.downloadOptions[0]?.description,
      expectation.directAvailable
    );
    assert.equal(
      preparing.downloadOptions[1]?.description,
      expectation.playPreparing
    );
  }
});

test("public actions exist only when their public targets are available", () => {
  for (const locale of ["en", "de"]) {
    const unavailable = buildAndroidDistributionContent(locale, false, false);
    const directOnly = buildAndroidDistributionContent(locale, true, false);
    const allPublic = buildAndroidDistributionContent(locale, true, true);

    assert.equal(unavailable.heroPrimary, null);
    assert.equal(unavailable.heroSecondary, null);
    assert.ok(unavailable.downloadOptions.every((option) => !option.action));

    assert.ok(directOnly.heroPrimary);
    assert.equal(directOnly.heroSecondary, null);
    assert.ok(directOnly.downloadOptions[0]?.action);
    assert.ok(!directOnly.downloadOptions[1]?.action);

    assert.ok(allPublic.heroPrimary);
    assert.ok(allPublic.heroSecondary);
    assert.ok(allPublic.downloadOptions.every((option) => option.action));
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

test("unavailable public action labels are absent from the content model", () => {
  const source = readFileSync(
    new URL("../src/lib/android-distribution.ts", import.meta.url),
    "utf8"
  );
  const removedActionLabels = [
    "Android-Version in Vorbereitung",
    "Play Store folgt später",
    "Android release in preparation",
    "Google Play release later",
    "Download in Vorbereitung",
    "Noch nicht öffentlich verfügbar",
    "Download in preparation",
    "Not publicly available yet",
    "Öffentliche Veröffentlichung später",
    "Public release later",
  ];

  for (const label of removedActionLabels) {
    assert.ok(
      !source.includes(`"${label}"`),
      `content model must not contain the action label ${label}`
    );
  }
});

test("Android distribution surface renders only real, accessible public actions", () => {
  const component = readFileSync(
    new URL(
      "../src/components/AndroidDistributionSurface.astro",
      import.meta.url
    ),
    "utf8"
  );

  assert.match(component, /\blg:grid-cols-2\b/);
  assert.match(
    component,
    /content\.heroPrimary\s*\|\|\s*content\.heroSecondary/
  );
  assert.match(component, /option\.action/);
  assert.match(component, /min-h-\[44px\]/);
  assert.doesNotMatch(component, /aria-disabled/);
  assert.doesNotMatch(component, /option\.href/);
  assert.doesNotMatch(component, /\bmin-h-\[1\.5rem\]\b/);
  assert.match(component, /content\.endpointGroups\.length\s*>\s*0/);
  assert.doesNotMatch(component, /androidDirectDownloadAvailable/);
  assert.match(component, /locale === "de" \? "break-words" : null/);
  assert.doesNotMatch(component, /content\.betaNotice/);
});
