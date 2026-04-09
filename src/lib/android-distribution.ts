// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Locale } from "../i18n/index.ts";

export const androidChannels = [
  "managed_device",
  "direct_apk",
  "github_release",
  "obtainium",
] as const;

export type AndroidChannel = (typeof androidChannels)[number];

export const androidArtifactHost = "https://apk.secpal.app";
export const androidLandingPath = "/android/";

export function buildLatestMetadataPath(channel: AndroidChannel): string {
  return `/android/channels/${channel}/latest.json`;
}

export function buildLatestArtifactPath(channel: AndroidChannel): string {
  return `/android/channels/${channel}/app.secpal-latest.apk`;
}

export function buildLatestChecksumPath(channel: AndroidChannel): string {
  return `/android/channels/${channel}/SHA256SUMS.txt`;
}

export function buildVersionedMetadataPath(version: string): string {
  return `/android/releases/${version}/metadata.json`;
}

export function buildVersionedArtifactPath(version: string): string {
  return `/android/releases/${version}/app.secpal-${version}.apk`;
}

export function buildVersionedChecksumPath(version: string): string {
  return `/android/releases/${version}/SHA256SUMS.txt`;
}

export function buildArtifactUrl(path: string): string {
  return new URL(path, androidArtifactHost).toString();
}

export interface AndroidVersionedReleaseMetadata {
  version: string;
  package_name: "app.secpal";
  human_landing_url: string;
  metadata_url: string;
  versioned_apk_url: string;
  checksum_url: string;
  artifact_host: typeof androidArtifactHost;
  release_available: false;
  storage_backend_status: "pending_release_decision";
  notes: string[];
}

export function buildVersionedMetadataDocument(
  version: string,
  siteUrl: URL
): AndroidVersionedReleaseMetadata {
  const metadataPath = buildVersionedMetadataPath(version);

  return {
    version,
    package_name: "app.secpal",
    human_landing_url: new URL(androidLandingPath, siteUrl).toString(),
    metadata_url: buildArtifactUrl(metadataPath),
    versioned_apk_url: buildArtifactUrl(buildVersionedArtifactPath(version)),
    checksum_url: buildArtifactUrl(buildVersionedChecksumPath(version)),
    artifact_host: androidArtifactHost,
    release_available: false,
    storage_backend_status: "pending_release_decision",
    notes: [
      "The URL structure is stable even before the first public Android release ships.",
      "Binary storage backing for apk.secpal.app remains an explicit release-time infrastructure decision.",
      "Channel latest endpoints remain available under /android/channels/{channel}/latest.json for rollout-specific clients.",
    ],
  };
}

export const androidDistributionContent = {
  en: {
    title: "SecPal Android distribution",
    description:
      "Human-facing Android landing flow on secpal.app with stable machine-facing apk.secpal.app endpoint patterns for latest and versioned SecPal releases.",
    eyebrow: "Android distribution surface",
    headline:
      "One Android package, channel-aware distribution, and stable public URLs.",
    subline:
      "SecPal keeps Device Owner provisioning, direct APK delivery, GitHub releases, and Obtainium compatibility on the same signed app package: app.secpal.",
    badge: "Tailored for the single-app Android distribution architecture",
    primaryCta: "View endpoint model",
    secondaryCta: "Follow Android work on GitHub",
    summaryTitle: "Canonical surfaces",
    summaryItems: [
      {
        label: "Human landing",
        value: "https://secpal.app/android",
      },
      {
        label: "Artifact host",
        value: "https://apk.secpal.app",
      },
      {
        label: "App package",
        value: "app.secpal",
      },
    ],
    channelsTitle: "Channels without a second app flavor",
    channelsIntro:
      "The APK stays identical. Channel metadata, provisioning context, and rollout policy decide how the same package is delivered and updated.",
    channels: {
      managed_device: {
        name: "Managed device",
        description:
          "Private provisioning QR flows for Device Owner enrollment. The machine-facing metadata stays stable while the tenant-bound bootstrap token remains short-lived.",
      },
      direct_apk: {
        name: "Direct APK",
        description:
          "Human-driven installs that should always resolve to a latest APK URL, checksum, and metadata document under apk.secpal.app.",
      },
      github_release: {
        name: "GitHub release",
        description:
          "Public release notes can continue to live on GitHub Releases while the canonical machine endpoints stay anchored on apk.secpal.app.",
      },
      obtainium: {
        name: "Obtainium",
        description:
          "Update tooling can poll a stable JSON endpoint instead of scraping HTML or guessing release filenames.",
      },
    },
    endpointsTitle: "Stable endpoints for humans and machines",
    endpointsIntro:
      "The landing route stays human-readable on secpal.app. All machine-facing URLs are defined against apk.secpal.app so later release automation can switch storage backends without changing clients.",
    endpointGroups: [
      {
        title: "Latest channel metadata",
        lines: [
          "https://apk.secpal.app/android/channels/{channel}/latest.json",
          "https://apk.secpal.app/android/channels/{channel}/app.secpal-latest.apk",
          "https://apk.secpal.app/android/channels/{channel}/SHA256SUMS.txt",
        ],
      },
      {
        title: "Versioned release assets",
        lines: [
          "https://apk.secpal.app/android/releases/{version}/metadata.json",
          "https://apk.secpal.app/android/releases/{version}/app.secpal-{version}.apk",
          "https://apk.secpal.app/android/releases/{version}/SHA256SUMS.txt",
        ],
      },
    ],
    infrastructureTitle:
      "Hosting is defined. Binary storage is still an explicit release decision.",
    infrastructureBody:
      "This repository now defines the public route structure and metadata contract. The backing APK storage choice, such as GitHub Releases, object storage, or a CDN, still needs an explicit release-time decision before automation is wired up.",
    infrastructurePoints: [
      "secpal.app/android stays the human-facing entry point.",
      "apk.secpal.app stays the canonical technical host for APKs, checksums, and metadata.",
      "The same signed APK must remain available across GitHub and apk.secpal.app.",
    ],
  },
  de: {
    title: "SecPal Android-Verteilung",
    description:
      "Öffentlicher Android-Einstieg auf secpal.app mit stabilen maschinenlesbaren URL-Modellen auf apk.secpal.app für aktuelle und versionierte SecPal-Releases.",
    eyebrow: "Android-Verteilungsfläche",
    headline:
      "Ein Android-Paket, kanalbewusste Verteilung und stabile öffentliche URLs.",
    subline:
      "SecPal hält Device-Owner-Provisioning, direkte APK-Verteilung, GitHub-Releases und Obtainium-Kompatibilität auf demselben signierten App-Paket: app.secpal.",
    badge: "Abgeleitet aus der Single-App-Android-Architektur",
    primaryCta: "Endpoint-Modell ansehen",
    secondaryCta: "Android-Entwicklung auf GitHub verfolgen",
    summaryTitle: "Kanonische Flächen",
    summaryItems: [
      {
        label: "Öffentlicher Einstieg",
        value: "https://secpal.app/android",
      },
      {
        label: "Artefakt-Host",
        value: "https://apk.secpal.app",
      },
      {
        label: "App-Paket",
        value: "app.secpal",
      },
    ],
    channelsTitle: "Kanäle ohne zweite App-Variante",
    channelsIntro:
      "Die APK bleibt identisch. Kanal-Metadaten, Provisioning-Kontext und Rollout-Regeln entscheiden, wie dasselbe Paket verteilt und aktualisiert wird.",
    channels: {
      managed_device: {
        name: "Managed Device",
        description:
          "Private Provisioning-QR-Flows für Device-Owner-Einschreibung. Die maschinenlesbaren Metadaten bleiben stabil, während der tenantgebundene Bootstrap-Token kurzlebig bleibt.",
      },
      direct_apk: {
        name: "Direkte APK",
        description:
          "Menschlich ausgelöste Installationen sollen immer auf eine stabile Latest-APK-URL, Prüfsumme und Metadaten-Datei unter apk.secpal.app zeigen.",
      },
      github_release: {
        name: "GitHub Release",
        description:
          "Öffentliche Release Notes können weiter auf GitHub Releases liegen, während die kanonischen Maschinen-Endpunkte auf apk.secpal.app verankert bleiben.",
      },
      obtainium: {
        name: "Obtainium",
        description:
          "Update-Werkzeuge können einen stabilen JSON-Endpunkt abfragen, statt HTML zu scrapen oder Dateinamen zu erraten.",
      },
    },
    endpointsTitle: "Stabile Endpunkte für Menschen und Maschinen",
    endpointsIntro:
      "Der Einstiegsweg für Menschen bleibt auf secpal.app lesbar. Alle technischen URLs werden gegen apk.secpal.app definiert, damit spätere Release-Automation das Storage-Backend wechseln kann, ohne Clients anzupassen.",
    endpointGroups: [
      {
        title: "Aktuelle Kanal-Metadaten",
        lines: [
          "https://apk.secpal.app/android/channels/{channel}/latest.json",
          "https://apk.secpal.app/android/channels/{channel}/app.secpal-latest.apk",
          "https://apk.secpal.app/android/channels/{channel}/SHA256SUMS.txt",
        ],
      },
      {
        title: "Versionierte Release-Artefakte",
        lines: [
          "https://apk.secpal.app/android/releases/{version}/metadata.json",
          "https://apk.secpal.app/android/releases/{version}/app.secpal-{version}.apk",
          "https://apk.secpal.app/android/releases/{version}/SHA256SUMS.txt",
        ],
      },
    ],
    infrastructureTitle:
      "Hosting ist definiert. Binäre Ablage bleibt eine explizite Release-Entscheidung.",
    infrastructureBody:
      "Dieses Repository definiert jetzt die öffentliche Routenstruktur und den Metadaten-Vertrag. Die eigentliche APK-Ablage, etwa GitHub Releases, Object Storage oder CDN, braucht vor Release-Automation weiterhin eine explizite Entscheidung.",
    infrastructurePoints: [
      "secpal.app/android bleibt der menschliche Einstiegspunkt.",
      "apk.secpal.app bleibt der kanonische technische Host für APKs, Prüfsummen und Metadaten.",
      "Dieselbe signierte APK muss auf GitHub und apk.secpal.app verfügbar bleiben.",
    ],
  },
} as const satisfies Record<Locale, unknown>;

export function getAndroidDistributionContent(locale: Locale) {
  return androidDistributionContent[locale];
}
