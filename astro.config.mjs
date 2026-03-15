// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: CC0-1.0

import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

const siteUrl = process.env.SECPAL_SITE_URL ?? "https://secpal.app";

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
