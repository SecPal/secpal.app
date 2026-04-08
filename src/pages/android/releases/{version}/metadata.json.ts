// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { APIRoute } from "astro";
import {
  androidArtifactHost,
  androidLandingPath,
  buildVersionedArtifactPath,
  buildVersionedChecksumPath,
  buildVersionedMetadataPath,
} from "../../../../lib/android-distribution.ts";

const versionPlaceholder = "{version}";

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ?? new URL("https://secpal.app");
  const body = {
    version: versionPlaceholder,
    package_name: "app.secpal",
    human_landing_url: new URL(androidLandingPath, siteUrl).toString(),
    metadata_url: `${androidArtifactHost}${buildVersionedMetadataPath(versionPlaceholder)}`,
    versioned_apk_url: `${androidArtifactHost}${buildVersionedArtifactPath(versionPlaceholder)}`,
    checksum_url: `${androidArtifactHost}${buildVersionedChecksumPath(versionPlaceholder)}`,
    artifact_host: androidArtifactHost,
    release_available: false,
    storage_backend_status: "pending_release_decision",
    notes: [
      "Replace {version} with the concrete SecPal Android release identifier.",
      "The URL structure is stable even before the first public Android release ships.",
      "Binary storage backing for apk.secpal.app remains an explicit release-time infrastructure decision.",
    ],
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};
