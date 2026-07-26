// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

import { de } from "../src/i18n/de.ts";
import { en } from "../src/i18n/en.ts";
import { androidDistributionContent } from "../src/lib/android-distribution.ts";

const classTokens = (classNames) =>
  new Set(classNames.trim().split(/\s+/).filter(Boolean));

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
    /mobileMenu\.querySelectorAll\("a"\)[\s\S]*link\.addEventListener\("click"[\s\S]*focusSamePageTarget\(link\)[\s\S]*setMobileMenuOpen\(false\)/
  );
  assert.match(layout, /new URL\(link\.href, window\.location\.href\)/);
  assert.match(
    layout,
    /url\.origin !== window\.location\.origin[\s\S]*url\.pathname !== window\.location\.pathname[\s\S]*url\.search !== window\.location\.search/
  );
  assert.match(
    layout,
    /document\.getElementById\([\s\S]*decodeURIComponent\(url\.hash\.slice\(1\)\)[\s\S]*\)/
  );
  assert.match(layout, /target\.setAttribute\("tabindex", "-1"\)/);
  assert.match(layout, /target\.focus\(\{ preventScroll: true \}\)/);
  assert.match(layout, /target\.removeAttribute\("tabindex"\)/);
  assert.match(layout, /window\.requestAnimationFrame/);
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

test("localized legal headings wrap without English auto-hyphenation", () => {
  const germanSecurity = readFileSync(
    new URL("../src/pages/de/security.astro", import.meta.url),
    "utf8"
  );
  const englishPrivacy = readFileSync(
    new URL("../src/pages/en/privacy.astro", import.meta.url),
    "utf8"
  );
  const englishPrivacyHeadings = [
    ...englishPrivacy.matchAll(/<h2\b[^>]*class="([^"]*)"[^>]*>/g),
  ];

  assert.match(
    germanSecurity,
    /<h2\b[^>]*class="[^"]*\bbreak-words\b[^"]*\bhyphens-auto\b[^"]*"[^>]*>\s*Sicherheitsmeldungen\s*<\/h2>/
  );
  assert.equal(englishPrivacyHeadings.length, 6);
  for (const [, classNames] of englishPrivacyHeadings) {
    const tokens = classTokens(classNames);
    assert.ok(tokens.has("break-words"));
    assert.ok(tokens.has("hyphens-none"));
    assert.ok(!tokens.has("hyphens-auto"));
  }
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
  const verificationItem = component.match(
    /content\.verificationItems\.map\(\(item\) => \(\s*<div\b[^>]*\bclass="([^"]*)"[^>]*>[\s\S]*?<dd\b[^>]*\bclass="([^"]*)"[^>]*>\s*\{item\.value\}\s*<\/dd>/
  );

  // download and rollout cards keep min-w-0 to prevent overflow
  assert.match(component, ARTICLE_WITH_MIN_W_0_PATTERN);
  // section endpoint groups have min-w-0 to prevent flex overflow
  assert.match(component, /<section\b[^>]*class="[^"]*\bmin-w-0\b[^"]*"[^>]*>/);
  // technical endpoints stay at the bottom of the page when a public download exists.
  assert.match(component, TECHNICAL_DETAILS_HEADING_PATTERN);
  assert.match(component, /content\.endpointGroups\.length\s*>\s*0/);
  assert.doesNotMatch(component, /androidDirectDownloadAvailable/);
  // individual endpoint links keep long machine paths wrapped on the rendered href element
  assert.match(component, ENDPOINT_LINK_PARAGRAPH_PATTERN);
  // verification items keep correct definition-list semantics for label/value pairs.
  assert.match(
    component,
    /<dl\b[^>]*class="[^"]*\bgrid\b[^"]*\bsm:grid-cols-2\b[^"]*"[^>]*>[\s\S]*<dt\b[\s\S]*<dd\b[\s\S]*<\/dl>/
  );
  assert.ok(verificationItem, "verification item markup must remain present");

  const verificationItemClasses = classTokens(verificationItem[1]);
  const verificationValueClasses = classTokens(verificationItem[2]);
  const forbiddenClasses = [
    "overflow-x-auto",
    "whitespace-nowrap",
    "truncate",
    "text-ellipsis",
  ];

  assert.ok(verificationItemClasses.has("min-w-0"));
  assert.ok(verificationValueClasses.has("break-all"));
  assert.ok(verificationValueClasses.has("font-mono"));
  assert.ok(verificationValueClasses.has("text-xs/5"));
  assert.ok(verificationValueClasses.has("sm:text-sm/6"));
  for (const className of forbiddenClasses) {
    assert.ok(!verificationItemClasses.has(className));
    assert.ok(!verificationValueClasses.has(className));
  }
});

test("long German roadmap and Android labels wrap without changing English typography", () => {
  const roadmap = readFileSync(
    new URL("../src/components/Roadmap.astro", import.meta.url),
    "utf8"
  );
  const androidDistribution = readFileSync(
    new URL(
      "../src/components/AndroidDistributionSurface.astro",
      import.meta.url
    ),
    "utf8"
  );

  assert.ok(
    de.roadmap.later.items.some(
      (item) => item.name === "Dienstanweisungskonfigurator"
    )
  );
  assert.ok(
    androidDistributionContent.de.downloadOptions.some(
      (option) => option.name === "Direkter Download"
    )
  );
  assert.match(
    roadmap,
    /<p\s+class:list=\{\[\s*"font-semibold text-gray-900 dark:text-white",\s*locale === "de" \? "break-words" : null,\s*\]\}/
  );
  assert.match(
    androidDistribution,
    /<h3\s+class:list=\{\[\s*"mt-2\.5 text-2xl font-semibold text-gray-900 dark:text-white",\s*locale === "de" \? "break-words" : null,\s*\]\}/
  );
});
