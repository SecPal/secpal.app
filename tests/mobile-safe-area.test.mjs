// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

import { de } from "../src/i18n/de.ts";
import { en } from "../src/i18n/en.ts";

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
  assert.match(
    layout,
    /mobileMenu\.querySelectorAll\("a"\)[\s\S]*link\.addEventListener\("click"[\s\S]*setMobileMenuOpen\(false, false\)/
  );
  assert.match(
    layout,
    /backgroundElements[\s\S]*toggleAttribute\("inert", isOpen\)/
  );
  assert.match(layout, /document\.body\.style\.overflow = "hidden"/);
  assert.match(
    layout,
    /document\.body\.style\.overflow = previousBodyOverflow/
  );
  assert.match(layout, /returnFocus = document\.activeElement/);
  assert.match(layout, /mobileMenuClose\.focus\(\)/);
  assert.match(layout, /returnFocus\.focus\(\)/);
  assert.match(layout, /event\.key === "Escape"/);
  assert.match(layout, /event\.key !== "Tab"/);
  assert.match(layout, /lastFocusable\.focus\(\)/);
  assert.match(layout, /firstFocusable\.focus\(\)/);
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
    /hidden[^"]*min-\[360px\]:inline-flex[^"]*dark:hover:bg-indigo-600/
  );
  assert.match(
    nav,
    /class="[^"]*\bgap-x-3\b[^"]*\bpx-4\b[^"]*\bsm:gap-x-6\b[^"]*\bsm:px-6\b[^"]*\blg:px-8\b[^"]*"/
  );
  assert.match(nav, /class="[^"]*\bgap-x-1\b[^"]*\bsm:gap-x-4\b[^"]*"/);
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

test("homepage hero keeps the localized status and progress target with tighter copy", () => {
  const hero = readFileSync(
    new URL("../src/components/Hero.astro", import.meta.url),
    "utf8"
  );

  assert.equal(
    de.hero.subline,
    "SecPal entsteht für Sicherheitsdienste in Deutschland: Dienstplanung, Einsatzinformationen und Dokumentation an einem Ort – statt verteilt auf Papier, Tabellen und einzelne Programme."
  );
  assert.equal(de.hero.cta, "SecPal kennenlernen");
  assert.equal(de.hero.note, "SecPal befindet sich derzeit im Aufbau.");
  assert.equal(
    en.hero.subline,
    "SecPal is being built for security service providers in Germany: duty scheduling, assignment information, and documentation in one place—instead of being scattered across paper, spreadsheets, and separate applications."
  );
  assert.equal(en.hero.cta, "Learn about SecPal");
  assert.equal(en.hero.note, "SecPal is currently under development.");
  assert.match(hero, /href="#progress"/);
  assert.doesNotMatch(
    JSON.stringify({ de: de.hero, en: en.hero }),
    /Mehr über SecPal erfahren|Learn more about SecPal/
  );
  assert.ok(!("tagline" in de.hero));
  assert.ok(!("tagline" in en.hero));
  assert.ok(!("explanation" in de.hero));
  assert.ok(!("explanation" in en.hero));
  assert.ok(!("highlights" in de.hero));
  assert.ok(!("highlights" in en.hero));
  assert.ok(!("ctaSecondary" in de.hero));
  assert.ok(!("ctaSecondary" in en.hero));
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
