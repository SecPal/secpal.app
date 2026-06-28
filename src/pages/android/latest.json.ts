// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later
import type { APIRoute } from "astro";

import { buildLatestMetadataDocument } from "../../lib/android-distribution.ts";

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ?? new URL("https://secpal.app");
  const body = buildLatestMetadataDocument(siteUrl);

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};
