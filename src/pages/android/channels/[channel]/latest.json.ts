// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later
import type { APIRoute, GetStaticPaths } from "astro";
import {
  type AndroidChannel,
  androidArtifactHost,
  androidChannels,
  buildArtifactUrl,
  buildLatestArtifactPath,
  buildLatestChecksumPath,
  buildLatestMetadataPath,
} from "../../../../lib/android-distribution.ts";

export const getStaticPaths = (() =>
  androidChannels.map((channel) => ({
    params: { channel },
  }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params, site }) => {
  const channel = params.channel;

  if (
    !channel ||
    !androidChannels.includes(channel as (typeof androidChannels)[number])
  ) {
    return new Response(
      JSON.stringify({ message: "Unknown Android channel" }),
      {
        status: 404,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      }
    );
  }

  const resolvedChannel = channel as AndroidChannel;

  const siteUrl = site ?? new URL("https://secpal.app");
  const metadataPath = buildLatestMetadataPath(resolvedChannel);
  const body = {
    channel: resolvedChannel,
    package_name: "app.secpal",
    human_landing_url: new URL("/android/", siteUrl).toString(),
    metadata_url: buildArtifactUrl(metadataPath),
    latest_apk_url: buildArtifactUrl(buildLatestArtifactPath(resolvedChannel)),
    checksum_url: buildArtifactUrl(buildLatestChecksumPath(resolvedChannel)),
    artifact_host: androidArtifactHost,
    release_available: false,
    storage_backend_status: "pending_release_decision",
    notes: [
      "The URL structure is stable even before the first public Android release ships.",
      "Binary storage backing for apk.secpal.app remains an explicit release-time infrastructure decision.",
      "Versioned releases are reserved under /android/releases/{version}/metadata.json, /app.secpal-{version}.apk, and /SHA256SUMS.txt.",
    ],
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};
