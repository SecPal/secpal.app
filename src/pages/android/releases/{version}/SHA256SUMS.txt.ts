// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { APIRoute } from "astro";
import {
  buildPendingAndroidAssetResponse,
  buildVersionedChecksumPath,
} from "../../../../lib/android-distribution.ts";

export const GET: APIRoute = ({ params, site }) => {
  const version = params.version;

  if (!version) {
    return new Response("Unknown Android version", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const siteUrl = site ?? new URL("https://secpal.app");

  return buildPendingAndroidAssetResponse(
    buildVersionedChecksumPath(version),
    siteUrl
  );
};
