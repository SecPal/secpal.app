// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later
import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ?? new URL("https://secpal.app");
  const sitemapUrl = new URL("/sitemap.xml", siteUrl).toString();
  const body = ["User-agent: *", "Allow: /", `Sitemap: ${sitemapUrl}`, ""].join(
    "\n"
  );

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
