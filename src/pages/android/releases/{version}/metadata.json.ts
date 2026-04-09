// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { APIRoute } from "astro";
import { buildVersionedMetadataDocument } from "../../../../lib/android-distribution.ts";

const versionPlaceholder = "{version}";

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ?? new URL("https://secpal.app");
  const metadata = buildVersionedMetadataDocument(versionPlaceholder, siteUrl);
  const body = {
    ...metadata,
    notes: [
      "Replace {version} with the concrete SecPal Android release identifier.",
      ...metadata.notes,
    ],
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};
