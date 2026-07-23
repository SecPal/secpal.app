// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

test("global layout accounts for mobile safe-area insets", () => {
  const css = readFileSync(
    new URL("../src/styles/global.css", import.meta.url),
    "utf8"
  );

  assert.match(css, /safe-area-inset-left/);
  assert.match(css, /safe-area-inset-right/);
  assert.match(
    css,
    /padding-inline:\s*var\(--secpal-safe-area-padding-inline-start\)/
  );
  assert.match(css, /var\(--secpal-safe-area-padding-inline-end\)/);
});

test("base layout opts into viewport-fit cover for mobile safe areas", () => {
  const layout = readFileSync(
    new URL("../src/layouts/Base.astro", import.meta.url),
    "utf8"
  );

  assert.match(layout, /viewport-fit=cover/);
});

test("mobile navigation avoids inline click handlers and is wired from script", () => {
  const nav = readFileSync(
    new URL("../src/components/Nav.astro", import.meta.url),
    "utf8"
  );
  const layout = readFileSync(
    new URL("../src/layouts/Base.astro", import.meta.url),
    "utf8"
  );

  assert.doesNotMatch(nav, /\bonclick=/);
  assert.doesNotMatch(nav, /class:list\(/);
  assert.match(layout, /mobile-menu-open/);
  assert.match(layout, /mobile-menu-close/);
  assert.match(layout, /mobile-menu/);
  assert.match(
    layout,
    /try\s*\{\s*stored = localStorage\.getItem\("theme"\);\s*\}\s*catch/
  );
  assert.match(layout, /classList\.toggle\("hidden", !isOpen\)/);
  assert.match(
    layout,
    /setAttribute\(\s*"aria-expanded",\s*isOpen \? "true" : "false"\s*\)/
  );
});

test("homepage primary actions preserve readable dark-mode hover contrast", () => {
  const hero = readFileSync(
    new URL("../src/components/Hero.astro", import.meta.url),
    "utf8"
  );
  const nav = readFileSync(
    new URL("../src/components/Nav.astro", import.meta.url),
    "utf8"
  );

  assert.match(hero, /dark:hover:bg-indigo-600/);
  assert.doesNotMatch(hero, /dark:hover:bg-indigo-400/);
  assert.doesNotMatch(nav, /dark:hover:bg-indigo-400/);
});

test("narrow navigation and footer can contract without page overflow", () => {
  const nav = readFileSync(
    new URL("../src/components/Nav.astro", import.meta.url),
    "utf8"
  );
  const footer = readFileSync(
    new URL("../src/components/Footer.astro", import.meta.url),
    "utf8"
  );

  assert.match(
    nav,
    /hidden\s+min-\[360px\]:inline-flex[^"]*dark:hover:bg-indigo-600/
  );
  assert.match(footer, /\bflex\b[^"]*\bflex-wrap\b/);
});

test("German hero heading provides a readable manual compound-word break", () => {
  const hero = readFileSync(
    new URL("../src/components/Hero.astro", import.meta.url),
    "utf8"
  );
  const translations = readFileSync(
    new URL("../src/i18n/de.ts", import.meta.url),
    "utf8"
  );

  assert.match(hero, /\bhyphens-manual\b/);
  assert.match(translations, /Sicherheits\\u00addienst/);
});

test("android distribution cards wrap long visible machine paths on mobile", () => {
  const component = readFileSync(
    new URL(
      "../src/components/AndroidDistributionSurface.astro",
      import.meta.url
    ),
    "utf8"
  );

  // Matches an <article> element whose class attribute contains the min-w-0 utility.
  const ARTICLE_WITH_MIN_W_0_PATTERN =
    /<article\b[^>]*class="[^"]*\bmin-w-0\b[^"]*"[^>]*>/;
  // Matches a <p> that carries break-all and renders the entry href token.
  const ENDPOINT_LINK_PARAGRAPH_PATTERN =
    /<p\b[^>]*class="[^"]*\bbreak-all\b[^"]*\bfont-mono\b[^"]*"[^>]*>\s*\{\s*entry\.href\s*\}\s*<\/p>/;
  const TECHNICAL_DETAILS_HEADING_PATTERN =
    /<h3\b[^>]*>\s*\{content\.technicalDetailsTitle\}\s*<\/h3>/;

  // download and rollout cards keep min-w-0 to prevent overflow
  assert.match(component, ARTICLE_WITH_MIN_W_0_PATTERN);
  // section endpoint groups have min-w-0 to prevent flex overflow
  assert.match(component, /<section\b[^>]*class="[^"]*\bmin-w-0\b[^"]*"[^>]*>/);
  // technical endpoints stay at the bottom of the page but remain visible by default.
  assert.match(component, TECHNICAL_DETAILS_HEADING_PATTERN);
  // individual endpoint links keep long machine paths wrapped on the rendered href element
  assert.match(component, ENDPOINT_LINK_PARAGRAPH_PATTERN);
  // verification items keep correct definition-list semantics for label/value pairs.
  assert.match(
    component,
    /<dl\b[^>]*class="[^"]*\bgrid\b[^"]*\bsm:grid-cols-2\b[^"]*"[^>]*>[\s\S]*<dt\b[\s\S]*<dd\b[\s\S]*<\/dl>/
  );
  // verification items also keep machine-readable values on break-all mono elements.
  assert.match(
    component,
    /<dd\b[^>]*class="[^"]*\bbreak-all\b[^"]*\bfont-mono\b[^"]*"[^>]*>\s*\{\s*item\.value\s*\}\s*<\/dd>/
  );
});
