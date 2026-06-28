// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Locale } from "../i18n/index.ts";

export const androidReleaseTracks = ["stable", "beta"] as const;

export type AndroidReleaseTrack = (typeof androidReleaseTracks)[number];

export const androidIntegrationPaths = [
  "play_store",
  "direct_download",
  "github_releases",
  "obtainium",
  "managed_device",
] as const;

export type AndroidIntegrationPath = (typeof androidIntegrationPaths)[number];

export const androidArtifactHost = "https://apk.secpal.app";
export const androidLandingPath = "/android/";
export const androidPlayStoreUrl =
  "https://play.google.com/store/apps/details?id=app.secpal";
export const androidAppSigningCertificateSha256 =
  "C3:E9:FD:07:69:F3:34:9B:B0:B0:56:BA:E6:69:47:23:40:E1:CB:28:66:26:DE:30:C9:C9:FA:F9:5F:1E:47:B5";

export function buildTrackMetadataPath(track: AndroidReleaseTrack): string {
  return `/android/${track}/latest.json`;
}

export function buildTrackArtifactPath(track: AndroidReleaseTrack): string {
  return `/android/${track}/app.secpal-latest.apk`;
}

export function buildTrackChecksumPath(track: AndroidReleaseTrack): string {
  return `/android/${track}/SHA256SUMS.txt`;
}

export function buildChannelAliasMetadataPath(): string {
  return "/android/latest.json";
}

export function buildLatestMetadataPath(): string {
  return buildChannelAliasMetadataPath();
}

export function buildLatestArtifactPath(): string {
  return "/android/app.secpal-latest.apk";
}

export function buildLatestChecksumPath(): string {
  return "/android/SHA256SUMS.txt";
}

export function buildVersionedMetadataPath(versionCode: string): string {
  return `/android/releases/${versionCode}/metadata.json`;
}

export function buildVersionedArtifactPath(versionCode: string): string {
  return `/android/releases/${versionCode}/app.secpal-${versionCode}.apk`;
}

export function buildVersionedChecksumPath(versionCode: string): string {
  return `/android/releases/${versionCode}/SHA256SUMS.txt`;
}

export function buildArtifactUrl(path: string): string {
  if (path.includes("{") || path.includes("}")) {
    return `${androidArtifactHost}${path}`;
  }

  return new URL(path, androidArtifactHost).toString();
}

export function buildPendingAndroidAssetMessage(
  requestedPath: string,
  siteUrl: URL
): string {
  return [
    `SecPal Android release artifacts are not published yet for ${requestedPath}.`,
    "Stable and beta release manifests stay reserved in advance so clients can keep the canonical endpoint model.",
    `See ${new URL(androidLandingPath, siteUrl).toString()} for the current Android distribution status.`,
  ].join("\n");
}

export function buildPendingAndroidAssetResponse(
  requestedPath: string,
  siteUrl: URL
): Response {
  return new Response(buildPendingAndroidAssetMessage(requestedPath, siteUrl), {
    status: 404,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

export interface AndroidTrackLatestMetadata {
  package_name: "app.secpal";
  update_channel: AndroidReleaseTrack;
  release_available: false;
  version: null;
  version_name: null;
  version_code: null;
  published_at: null;
  artifact_host: typeof androidArtifactHost;
  human_landing_url: string;
  metadata_url: string;
  alias_url: string | null;
  latest_apk_url: string;
  checksum_url: string;
  versioned_metadata_url: null;
  versioned_apk_url: null;
  versioned_checksum_url: null;
  app_signing_certificate_sha256: typeof androidAppSigningCertificateSha256;
  signing_key_shared_with_google_play: true;
}

export interface AndroidVersionedReleaseMetadata {
  version: string;
  version_name: null;
  version_code: string;
  package_name: "app.secpal";
  update_channel: null;
  release_available: false;
  published_at: null;
  artifact_host: typeof androidArtifactHost;
  human_landing_url: string;
  metadata_url: string;
  versioned_apk_url: string;
  versioned_checksum_url: string;
  app_signing_certificate_sha256: typeof androidAppSigningCertificateSha256;
  signing_key_shared_with_google_play: true;
}

interface AndroidDistributionCallToAction {
  label: string;
  href: string | null;
}

interface AndroidDistributionOption {
  badge: string;
  name: string;
  description: string;
  href: string | null;
  cta: string;
  kind: "primary" | "secondary";
  secondaryLink?: {
    eyebrow: string;
    label: string;
    href: string;
  };
}

const androidStableDownloadAvailable = false;
const androidBetaDownloadAvailable = false;

export function buildTrackLatestMetadataDocument(
  track: AndroidReleaseTrack,
  siteUrl: URL,
  aliasPath?: string
): AndroidTrackLatestMetadata {
  return {
    package_name: "app.secpal",
    update_channel: track,
    release_available: false,
    version: null,
    version_name: null,
    version_code: null,
    published_at: null,
    artifact_host: androidArtifactHost,
    human_landing_url: new URL(androidLandingPath, siteUrl).toString(),
    metadata_url: buildArtifactUrl(buildTrackMetadataPath(track)),
    alias_url: aliasPath ? buildArtifactUrl(aliasPath) : null,
    latest_apk_url: buildArtifactUrl(buildTrackArtifactPath(track)),
    checksum_url: buildArtifactUrl(buildTrackChecksumPath(track)),
    versioned_metadata_url: null,
    versioned_apk_url: null,
    versioned_checksum_url: null,
    app_signing_certificate_sha256: androidAppSigningCertificateSha256,
    signing_key_shared_with_google_play: true,
  };
}

export function buildLatestMetadataDocument(
  siteUrl: URL
): AndroidTrackLatestMetadata {
  return buildTrackLatestMetadataDocument(
    "stable",
    siteUrl,
    buildChannelAliasMetadataPath()
  );
}

export function buildVersionedMetadataDocument(
  versionCode: string,
  siteUrl: URL
): AndroidVersionedReleaseMetadata {
  return {
    version: versionCode,
    version_name: null,
    version_code: versionCode,
    package_name: "app.secpal",
    update_channel: null,
    release_available: false,
    published_at: null,
    artifact_host: androidArtifactHost,
    human_landing_url: new URL(androidLandingPath, siteUrl).toString(),
    metadata_url: buildArtifactUrl(buildVersionedMetadataPath(versionCode)),
    versioned_apk_url: buildArtifactUrl(
      buildVersionedArtifactPath(versionCode)
    ),
    versioned_checksum_url: buildArtifactUrl(
      buildVersionedChecksumPath(versionCode)
    ),
    app_signing_certificate_sha256: androidAppSigningCertificateSha256,
    signing_key_shared_with_google_play: true,
  };
}

export const androidDistributionContent = {
  en: {
    title: "SecPal Android distribution",
    description:
      "SecPal is also available as an Android app, with Play Store and direct download options on secpal.app.",
    eyebrow: "SecPal for Android",
    headline: "SecPal in your pocket.",
    subline:
      "Get SecPal from the Play Store. Direct download will also be available on secpal.app.",
    badge: "Play Store or direct download",
    heroPrimary: {
      label: "Open Play Store",
      href: androidPlayStoreUrl,
    } satisfies AndroidDistributionCallToAction,
    heroSecondary: {
      label: androidStableDownloadAvailable
        ? "Download APK"
        : "Direct download soon",
      href: androidStableDownloadAvailable
        ? "https://apk.secpal.app/android/app.secpal-latest.apk"
        : null,
    } satisfies AndroidDistributionCallToAction,
    summaryTitle: "At a glance",
    summaryItems: [
      {
        label: "App",
        value: "SecPal for Android",
      },
      {
        label: "Recommended",
        value: "Play Store",
      },
      {
        label: "Alternative",
        value: "Direct download from SecPal",
      },
      {
        label: "Also available",
        value: "Beta version",
      },
    ],
    downloadTitle: "Download options",
    downloadIntro:
      "SecPal is available in the Play Store. Direct download and beta will also be published on secpal.app.",
    downloadOptions: [
      {
        badge: "Recommended",
        name: "Play Store",
        description:
          "The simplest way to install SecPal and receive updates through the Play Store.",
        href: androidPlayStoreUrl,
        cta: "Open Play Store",
        kind: "primary",
      } satisfies AndroidDistributionOption,
      {
        badge: "Direct",
        name: "Direct Download",
        description: "The direct APK download on secpal.app will follow.",
        href: androidStableDownloadAvailable
          ? "https://apk.secpal.app/android/app.secpal-latest.apk"
          : null,
        cta: androidStableDownloadAvailable
          ? "Download APK"
          : "Direct download soon",
        secondaryLink: {
          eyebrow: "Update manifest",
          label: "Open Stable Manifest",
          href: "https://apk.secpal.app/android/latest.json",
        },
        kind: "secondary",
      } satisfies AndroidDistributionOption,
      {
        badge: "Optional",
        name: "Beta version",
        description:
          "The beta track will be published separately on secpal.app.",
        href: androidBetaDownloadAvailable
          ? "https://apk.secpal.app/android/beta/app.secpal-latest.apk"
          : null,
        cta: androidBetaDownloadAvailable
          ? "Download Beta APK"
          : "Beta coming soon",
        secondaryLink: {
          eyebrow: "Update manifest",
          label: "Open Beta Manifest",
          href: "https://apk.secpal.app/android/beta/latest.json",
        },
        kind: "secondary",
      } satisfies AndroidDistributionOption,
    ],
    betaNoticeTitle: "About the beta version",
    betaNoticeBody:
      "The beta version includes new features earlier, but it may still contain issues and can change before the regular release.",
    technicalDetailsTitle: "Technical links",
    technicalDetailsIntro:
      "For direct downloads, verification, and automated updates.",
    endpointGroups: [
      {
        title: "Stable",
        entries: [
          {
            label: "Manifest",
            href: "https://apk.secpal.app/android/stable/latest.json",
          },
          {
            label: "APK",
            href: "https://apk.secpal.app/android/stable/app.secpal-latest.apk",
          },
          {
            label: "Checksums",
            href: "https://apk.secpal.app/android/stable/SHA256SUMS.txt",
          },
          {
            label: "Stable alias",
            href: "https://apk.secpal.app/android/latest.json",
          },
        ],
      },
      {
        title: "Beta",
        entries: [
          {
            label: "Manifest",
            href: "https://apk.secpal.app/android/beta/latest.json",
          },
          {
            label: "APK",
            href: "https://apk.secpal.app/android/beta/app.secpal-latest.apk",
          },
          {
            label: "Checksums",
            href: "https://apk.secpal.app/android/beta/SHA256SUMS.txt",
          },
        ],
      },
      {
        title: "Versioned releases",
        entries: [
          {
            label: "Metadata",
            href: "https://apk.secpal.app/android/releases/{versionCode}/metadata.json",
          },
          {
            label: "APK",
            href: "https://apk.secpal.app/android/releases/{versionCode}/app.secpal-{versionCode}.apk",
          },
          {
            label: "Checksums",
            href: "https://apk.secpal.app/android/releases/{versionCode}/SHA256SUMS.txt",
          },
        ],
      },
    ],
    verificationTitle: "Technical summary",
    verificationItems: [
      {
        label: "Android package",
        value: "app.secpal",
      },
      {
        label: "Signing SHA-256",
        value: androidAppSigningCertificateSha256,
      },
    ],
  },
  de: {
    title: "SecPal Android-Verteilung",
    description:
      "SecPal gibt es auch als Android-App, mit Play Store und Direktdownload auf secpal.app.",
    eyebrow: "SecPal für Android",
    headline: "SecPal. Immer dabei.",
    subline:
      "Laden Sie SecPal aus dem Play Store. Der Direktdownload wird zusätzlich auf secpal.app bereitgestellt.",
    badge: "Play Store oder Direktdownload",
    heroPrimary: {
      label: "Play Store öffnen",
      href: androidPlayStoreUrl,
    } satisfies AndroidDistributionCallToAction,
    heroSecondary: {
      label: androidStableDownloadAvailable
        ? "APK herunterladen"
        : "Direktdownload folgt",
      href: androidStableDownloadAvailable
        ? "https://apk.secpal.app/android/app.secpal-latest.apk"
        : null,
    } satisfies AndroidDistributionCallToAction,
    summaryTitle: "Kurzüberblick",
    summaryItems: [
      {
        label: "App",
        value: "SecPal für Android",
      },
      {
        label: "Empfohlen",
        value: "Play Store",
      },
      {
        label: "Alternative",
        value: "Direktdownload von SecPal",
      },
      {
        label: "Außerdem verfügbar",
        value: "Beta-Version",
      },
    ],
    downloadTitle: "Download-Möglichkeiten",
    downloadIntro:
      "SecPal ist im Play Store verfügbar. Direktdownload und Beta werden zusätzlich auf secpal.app bereitgestellt.",
    downloadOptions: [
      {
        badge: "Empfohlen",
        name: "Play Store",
        description:
          "Der einfachste Weg, SecPal zu installieren und Updates über den Play Store zu erhalten.",
        href: androidPlayStoreUrl,
        cta: "Play Store öffnen",
        kind: "primary",
      } satisfies AndroidDistributionOption,
      {
        badge: "Direkt",
        name: "Direktdownload",
        description: "Der direkte APK-Download auf secpal.app folgt.",
        href: androidStableDownloadAvailable
          ? "https://apk.secpal.app/android/app.secpal-latest.apk"
          : null,
        cta: androidStableDownloadAvailable
          ? "APK herunterladen"
          : "Direktdownload folgt",
        secondaryLink: {
          eyebrow: "Update-Manifest",
          label: "Stable-Manifest öffnen",
          href: "https://apk.secpal.app/android/latest.json",
        },
        kind: "secondary",
      } satisfies AndroidDistributionOption,
      {
        badge: "Optional",
        name: "Beta-Version",
        description: "Die Beta wird separat auf secpal.app bereitgestellt.",
        href: androidBetaDownloadAvailable
          ? "https://apk.secpal.app/android/beta/app.secpal-latest.apk"
          : null,
        cta: androidBetaDownloadAvailable
          ? "Beta-APK herunterladen"
          : "Beta folgt",
        secondaryLink: {
          eyebrow: "Update-Manifest",
          label: "Beta-Manifest öffnen",
          href: "https://apk.secpal.app/android/beta/latest.json",
        },
        kind: "secondary",
      } satisfies AndroidDistributionOption,
    ],
    betaNoticeTitle: "Hinweis zur Beta-Version",
    betaNoticeBody:
      "Die Beta-Version enthält neue Funktionen früher, kann aber noch Fehler enthalten und sich bis zur regulären Veröffentlichung noch ändern.",
    technicalDetailsTitle: "Technische Links",
    technicalDetailsIntro:
      "Für Direktdownloads, Verifikation und automatische Updates.",
    endpointGroups: [
      {
        title: "Stable",
        entries: [
          {
            label: "Manifest",
            href: "https://apk.secpal.app/android/stable/latest.json",
          },
          {
            label: "APK",
            href: "https://apk.secpal.app/android/stable/app.secpal-latest.apk",
          },
          {
            label: "Checksummen",
            href: "https://apk.secpal.app/android/stable/SHA256SUMS.txt",
          },
          {
            label: "Stable-Alias",
            href: "https://apk.secpal.app/android/latest.json",
          },
        ],
      },
      {
        title: "Beta",
        entries: [
          {
            label: "Manifest",
            href: "https://apk.secpal.app/android/beta/latest.json",
          },
          {
            label: "APK",
            href: "https://apk.secpal.app/android/beta/app.secpal-latest.apk",
          },
          {
            label: "Checksummen",
            href: "https://apk.secpal.app/android/beta/SHA256SUMS.txt",
          },
        ],
      },
      {
        title: "Versionierte Releases",
        entries: [
          {
            label: "Metadata",
            href: "https://apk.secpal.app/android/releases/{versionCode}/metadata.json",
          },
          {
            label: "APK",
            href: "https://apk.secpal.app/android/releases/{versionCode}/app.secpal-{versionCode}.apk",
          },
          {
            label: "Checksummen",
            href: "https://apk.secpal.app/android/releases/{versionCode}/SHA256SUMS.txt",
          },
        ],
      },
    ],
    verificationTitle: "Technische Eckdaten",
    verificationItems: [
      {
        label: "Android-Paketname",
        value: "app.secpal",
      },
      {
        label: "Signing SHA-256",
        value: androidAppSigningCertificateSha256,
      },
    ],
  },
} as const satisfies Record<Locale, unknown>;

export function getAndroidDistributionContent(locale: Locale) {
  return androidDistributionContent[locale];
}
