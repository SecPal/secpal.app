// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { APIRoute } from "astro";

import {
  buildPendingAndroidAssetResponse,
  buildTrackChecksumPath,
} from "../../../lib/android-distribution.ts";

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ?? new URL("https://secpal.app");

  return buildPendingAndroidAssetResponse(
    buildTrackChecksumPath("stable"),
    siteUrl
  );
};
