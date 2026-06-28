// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { APIRoute } from "astro";

import {
  buildPendingAndroidAssetResponse,
  buildVersionedArtifactPath,
} from "../../../../lib/android-distribution.ts";

// Use a string placeholder rather than params.versionCode: Astro does not parse
// {versionCode} in the directory name as a dynamic route segment.
const versionCodePlaceholder = "{versionCode}";

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ?? new URL("https://secpal.app");

  return buildPendingAndroidAssetResponse(
    buildVersionedArtifactPath(versionCodePlaceholder),
    siteUrl
  );
};
