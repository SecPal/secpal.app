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
  href: string;
}

interface AndroidDistributionOption {
  badge: string;
  name: string;
  description: string;
  kind: "primary" | "secondary";
  action?: AndroidDistributionCallToAction;
  secondaryLink?: {
    label: string;
    href: string;
  };
}

interface AndroidDistributionEndpointGroup {
  title: string;
  entries: {
    label: string;
    href: string;
  }[];
}

interface AndroidDistributionContent {
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  subline: string;
  badge: string;
  heroPrimary: AndroidDistributionCallToAction | null;
  heroSecondary: AndroidDistributionCallToAction | null;
  summaryTitle: string;
  summaryItems: {
    label: string;
    value: string;
  }[];
  downloadTitle: string;
  downloadIntro: string;
  downloadOptions: AndroidDistributionOption[];
  releaseNoticeTitle: string;
  releaseNoticeBody: string;
  technicalDetailsTitle: string;
  technicalDetailsIntro: string;
  endpointGroups: AndroidDistributionEndpointGroup[];
  verificationTitle: string;
  verificationItems: {
    label: string;
    value: string;
  }[];
}

export const androidDirectDownloadAvailable = false;
export const androidPublicPlayStoreAvailable = false;

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

export function buildAndroidDistributionContent(
  locale: Locale,
  directDownloadAvailable: boolean,
  publicPlayStoreAvailable: boolean
): AndroidDistributionContent {
  const endpointGroups: AndroidDistributionEndpointGroup[] =
    directDownloadAvailable
      ? [
          {
            title: locale === "de" ? "Aktuelle Version" : "Current release",
            entries: [
              {
                label: "Manifest",
                href: buildArtifactUrl(buildLatestMetadataPath()),
              },
              {
                label: "APK",
                href: buildArtifactUrl(buildLatestArtifactPath()),
              },
              {
                label: locale === "de" ? "Checksummen" : "Checksums",
                href: buildArtifactUrl(buildLatestChecksumPath()),
              },
            ],
          },
          {
            title:
              locale === "de" ? "Versionierte Releases" : "Versioned releases",
            entries: [
              {
                label: locale === "de" ? "Metadaten" : "Metadata",
                href: buildArtifactUrl(
                  buildVersionedMetadataPath("{versionCode}")
                ),
              },
              {
                label: "APK",
                href: buildArtifactUrl(
                  buildVersionedArtifactPath("{versionCode}")
                ),
              },
              {
                label: locale === "de" ? "Checksummen" : "Checksums",
                href: buildArtifactUrl(
                  buildVersionedChecksumPath("{versionCode}")
                ),
              },
            ],
          },
        ]
      : [];

  if (locale === "de") {
    return {
      title: "SecPal für Android",
      description: publicPlayStoreAvailable
        ? "Informationen zur Android-Version von SecPal, zum direkten Download über secpal.app und zur öffentlichen Verfügbarkeit im Play Store."
        : "Informationen zur Android-Version von SecPal, zum direkten Download über secpal.app und zur späteren öffentlichen Veröffentlichung im Play Store.",
      eyebrow: "SecPal für Android",
      headline: "SecPal. Immer dabei.",
      subline: [
        directDownloadAvailable
          ? "Die aktuelle Android-Version von SecPal steht direkt über secpal.app zum Download bereit."
          : "Die erste Android-Version von SecPal wird für den direkten Download über secpal.app vorbereitet.",
        directDownloadAvailable
          ? "SecPal befindet sich weiterhin in einer frühen 0.x-Entwicklungsphase."
          : "SecPal befindet sich in einer frühen 0.x-Entwicklungsphase.",
      ].join(" "),
      badge: directDownloadAvailable
        ? "Direkter Download verfügbar"
        : "Direkter Download in Vorbereitung",
      heroPrimary: directDownloadAvailable
        ? {
            label: "Android-Version herunterladen",
            href: buildArtifactUrl(buildLatestArtifactPath()),
          }
        : null,
      heroSecondary: publicPlayStoreAvailable
        ? {
            label: "Im Play Store öffnen",
            href: androidPlayStoreUrl,
          }
        : null,
      summaryTitle: "Kurzüberblick",
      summaryItems: [
        {
          label: "App",
          value: "SecPal für Android",
        },
        {
          label: "Bereitstellung",
          value: "Direkt über secpal.app",
        },
        {
          label: "Entwicklungsphase",
          value: "Frühe 0.x-Versionen",
        },
        {
          label: "Play Store",
          value: publicPlayStoreAvailable ? "Verfügbar" : "Geplant",
        },
      ],
      downloadTitle: "Bezugswege",
      downloadIntro: "Aktuelle und geplante Bezugswege für SecPal auf Android.",
      downloadOptions: [
        {
          badge: directDownloadAvailable ? "Verfügbar" : "In Vorbereitung",
          name: "Direkter Download",
          description: directDownloadAvailable
            ? "Die aktuelle Android-Version steht direkt über secpal.app bereit. Signatur und Prüfsumme ermöglichen die Überprüfung des Pakets."
            : "Die erste öffentliche Android-Version wird über secpal.app bereitgestellt.",
          kind: "primary",
          ...(directDownloadAvailable
            ? {
                action: {
                  label: "APK herunterladen",
                  href: buildArtifactUrl(buildLatestArtifactPath()),
                },
                secondaryLink: {
                  label: "Manifest öffnen",
                  href: buildArtifactUrl(buildLatestMetadataPath()),
                },
              }
            : {}),
        },
        {
          badge: publicPlayStoreAvailable ? "Verfügbar" : "Geplant",
          name: "Play Store",
          description: publicPlayStoreAvailable
            ? "SecPal ist zusätzlich öffentlich im Play Store verfügbar."
            : "Eine öffentliche Veröffentlichung im Play Store ist als zusätzlicher Bezugsweg vorgesehen.",
          kind: "secondary",
          ...(publicPlayStoreAvailable
            ? {
                action: {
                  label: "Im Play Store öffnen",
                  href: androidPlayStoreUrl,
                },
              }
            : {}),
        },
      ],
      releaseNoticeTitle: "Hinweis zu frühen 0.x-Versionen",
      releaseNoticeBody:
        "Frühe 0.x-Versionen befinden sich in aktiver Entwicklung. Funktionen und Abläufe können sich mit weiteren Versionen verändern.",
      technicalDetailsTitle: "Technische Links",
      technicalDetailsIntro:
        "Für Direktdownloads, Verifikation und automatische Updates.",
      endpointGroups,
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
    };
  }

  return {
    title: "SecPal for Android",
    description: publicPlayStoreAvailable
      ? "Information about the SecPal Android release, direct downloads from secpal.app, and public availability on Google Play."
      : "Information about the SecPal Android release, direct downloads from secpal.app, and the later public release on Google Play.",
    eyebrow: "SecPal for Android",
    headline: "SecPal in your pocket.",
    subline: [
      directDownloadAvailable
        ? "The current SecPal Android release is available for direct download from secpal.app."
        : "The first SecPal Android release is being prepared for direct download from secpal.app.",
      "SecPal remains in an early 0.x development phase.",
    ].join(" "),
    badge: directDownloadAvailable
      ? "Direct download available"
      : "Direct download in preparation",
    heroPrimary: directDownloadAvailable
      ? {
          label: "Download Android release",
          href: buildArtifactUrl(buildLatestArtifactPath()),
        }
      : null,
    heroSecondary: publicPlayStoreAvailable
      ? {
          label: "Open Google Play",
          href: androidPlayStoreUrl,
        }
      : null,
    summaryTitle: "At a glance",
    summaryItems: [
      {
        label: "App",
        value: "SecPal for Android",
      },
      {
        label: "Distribution",
        value: "Direct from secpal.app",
      },
      {
        label: "Development phase",
        value: "Early 0.x releases",
      },
      {
        label: "Google Play",
        value: publicPlayStoreAvailable ? "Available" : "Planned",
      },
    ],
    downloadTitle: "Distribution",
    downloadIntro:
      "Current and planned distribution paths for SecPal on Android.",
    downloadOptions: [
      {
        badge: directDownloadAvailable ? "Available" : "In preparation",
        name: "Direct download",
        description: directDownloadAvailable
          ? "The current Android release is available directly through secpal.app. Its signature and checksum can be used to verify the package."
          : "The first public Android release will be provided through secpal.app.",
        kind: "primary",
        ...(directDownloadAvailable
          ? {
              action: {
                label: "Download APK",
                href: buildArtifactUrl(buildLatestArtifactPath()),
              },
              secondaryLink: {
                label: "Open manifest",
                href: buildArtifactUrl(buildLatestMetadataPath()),
              },
            }
          : {}),
      },
      {
        badge: publicPlayStoreAvailable ? "Available" : "Planned",
        name: "Google Play",
        description: publicPlayStoreAvailable
          ? "SecPal is also publicly available on Google Play."
          : "A public release on Google Play is planned as an additional distribution path.",
        kind: "secondary",
        ...(publicPlayStoreAvailable
          ? {
              action: {
                label: "Open Google Play",
                href: androidPlayStoreUrl,
              },
            }
          : {}),
      },
    ],
    releaseNoticeTitle: "About early 0.x releases",
    releaseNoticeBody:
      "Early 0.x releases are under active development. Features and workflows may change in later releases.",
    technicalDetailsTitle: "Technical links",
    technicalDetailsIntro:
      "For direct downloads, verification, and automated updates.",
    endpointGroups,
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
  };
}

export const androidDistributionContent = {
  en: buildAndroidDistributionContent(
    "en",
    androidDirectDownloadAvailable,
    androidPublicPlayStoreAvailable
  ),
  de: buildAndroidDistributionContent(
    "de",
    androidDirectDownloadAvailable,
    androidPublicPlayStoreAvailable
  ),
} satisfies Record<Locale, AndroidDistributionContent>;

export function getAndroidDistributionContent(locale: Locale) {
  return androidDistributionContent[locale];
}
