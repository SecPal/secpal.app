// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later
import type { APIRoute } from "astro";

const pages = [
  {
    path: "/en/",
    alternates: {
      en: "/en/",
      de: "/de/",
      "x-default": "/en/",
    },
  },
  {
    path: "/de/",
    alternates: {
      en: "/en/",
      de: "/de/",
      "x-default": "/en/",
    },
  },
  {
    path: "/android/",
    alternates: {
      en: "/en/android/",
      de: "/de/android/",
      "x-default": "/android/",
    },
  },
  {
    path: "/en/android/",
    alternates: {
      en: "/en/android/",
      de: "/de/android/",
      "x-default": "/android/",
    },
  },
  {
    path: "/de/android/",
    alternates: {
      en: "/en/android/",
      de: "/de/android/",
      "x-default": "/android/",
    },
  },
  {
    path: "/en/privacy/",
    alternates: {
      en: "/en/privacy/",
      de: "/de/privacy/",
      "x-default": "/en/privacy/",
    },
  },
  {
    path: "/de/privacy/",
    alternates: {
      en: "/en/privacy/",
      de: "/de/privacy/",
      "x-default": "/en/privacy/",
    },
  },
  {
    path: "/en/imprint/",
    alternates: {
      en: "/en/imprint/",
      de: "/de/imprint/",
      "x-default": "/en/imprint/",
    },
  },
  {
    path: "/de/imprint/",
    alternates: {
      en: "/en/imprint/",
      de: "/de/imprint/",
      "x-default": "/en/imprint/",
    },
  },
  {
    path: "/security/",
    alternates: {
      en: "/en/security/",
      de: "/de/security/",
      "x-default": "/security/",
    },
  },
  {
    path: "/en/security/",
    alternates: {
      en: "/en/security/",
      de: "/de/security/",
      "x-default": "/security/",
    },
  },
  {
    path: "/de/security/",
    alternates: {
      en: "/en/security/",
      de: "/de/security/",
      "x-default": "/security/",
    },
  },
];

const getLastModified = (): string => {
  const fromEnv = import.meta.env.BUILD_LAST_MODIFIED as string | undefined;
  if (fromEnv) {
    return fromEnv;
  }

  return new Date().toISOString().slice(0, 10);
};

const lastModified = getLastModified();

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ?? new URL("https://secpal.app");
  const urls = pages
    .map((page) => {
      const location = new URL(page.path, siteUrl).toString();
      const alternates = Object.entries(page.alternates)
        .map(([hreflang, href]) => {
          const alternateUrl = new URL(href, siteUrl).toString();

          return `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${alternateUrl}" />`;
        })
        .join("\n");

      return [
        "  <url>",
        `    <loc>${location}</loc>`,
        alternates,
        `    <lastmod>${lastModified}</lastmod>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    urls,
    "</urlset>",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
