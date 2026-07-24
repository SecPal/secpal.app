// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: CC0-1.0

import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { createLogger } from "vite";

const siteUrl = process.env.SECPAL_SITE_URL ?? "https://secpal.app";
const astroInternalHelpersWarning =
  '"matchHostname", "matchPathname", "matchPort" and "matchProtocol" are imported from external module "@astrojs/internal-helpers/remote" but never used in "node_modules/astro/dist/assets/utils/index.js"';
const viteLogger = createLogger();
const defaultWarn = viteLogger.warn.bind(viteLogger);
const defaultWarnOnce = viteLogger.warnOnce.bind(viteLogger);

function isKnownAstroWarning(message) {
  return (
    typeof message === "string" && message.includes(astroInternalHelpersWarning)
  );
}

function createFilteredWarn(defaultWarnFn) {
  return (message, options) => {
    if (isKnownAstroWarning(message)) {
      return;
    }

    defaultWarnFn(message, options);
  };
}

viteLogger.warn = createFilteredWarn(defaultWarn);

viteLogger.warnOnce = createFilteredWarn(defaultWarnOnce);

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
    customLogger: viteLogger,
    plugins: [tailwindcss()],
  },
});
