// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { APIRoute, GetStaticPaths } from "astro";
import {
  androidChannels,
  buildLatestChecksumPath,
  buildPendingAndroidAssetResponse,
  isAndroidChannel,
} from "../../../../lib/android-distribution.ts";

export const getStaticPaths = (() =>
  androidChannels.map((channel) => ({
    params: { channel },
  }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params, site }) => {
  const channel = params.channel;

  if (!channel || !isAndroidChannel(channel)) {
    return new Response("Unknown Android channel", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const siteUrl = site ?? new URL("https://secpal.app");

  return buildPendingAndroidAssetResponse(
    buildLatestChecksumPath(channel),
    siteUrl
  );
};
