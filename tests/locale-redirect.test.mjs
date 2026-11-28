// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  buildPreferredLocalePath,
  detectPreferredLocale,
} from "../src/lib/locale-redirect.ts";

test("detectPreferredLocale prefers German variants and falls back to English", () => {
  assert.equal(detectPreferredLocale(["de-DE", "en-US"]), "de");
  assert.equal(detectPreferredLocale(["de", "en"]), "de");
  assert.equal(detectPreferredLocale(["fr-FR", "en-US"]), "en");
  assert.equal(detectPreferredLocale([]), "en");
  assert.equal(detectPreferredLocale(undefined), "en");
});

test("buildPreferredLocalePath keeps neutral entry routes locale-aware", () => {
  assert.equal(buildPreferredLocalePath("/", ["de-DE"]), "/de/");
  assert.equal(buildPreferredLocalePath("/", ["en-GB"]), "/en/");
  assert.equal(buildPreferredLocalePath("/android", ["de-AT"]), "/de/android/");
  assert.equal(
    buildPreferredLocalePath("/android/", ["fr-FR"]),
    "/en/android/"
  );
});

test("former roadmap routes redirect and are omitted from the sitemap", () => {
  const page = (name) =>
    readFileSync(new URL(`../src/pages/${name}`, import.meta.url), "utf8");
  assert.match(
    page("roadmap.astro"),
    /import HomeRedirect from "\.\/index\.astro"/
  );
  assert.match(page("roadmap.astro"), /<HomeRedirect \/>/);
  assert.match(page("index.astro"), /redirectPath="\/"/);
  assert.match(
    page("[locale]/roadmap.astro"),
    /Astro\.redirect\(\s*`\$\{getLocalizedPath\("\/", Astro\.props\.locale\)\}#focus`,\s*301,?\s*\)/
  );
  assert.doesNotMatch(page("sitemap.xml.ts"), /roadmap/);
});
