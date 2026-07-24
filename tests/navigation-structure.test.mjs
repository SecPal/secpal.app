// SPDX-FileCopyrightText: 2026 SecPal Contributors
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { de } from "../src/i18n/de.ts";
import { en } from "../src/i18n/en.ts";

const nav = readFileSync(
  new URL("../src/components/Nav.astro", import.meta.url),
  "utf8"
);
const layout = readFileSync(
  new URL("../src/layouts/Base.astro", import.meta.url),
  "utf8"
);
const workflow = readFileSync(
  new URL("../src/components/Workflow.astro", import.meta.url),
  "utf8"
);
const hero = readFileSync(
  new URL("../src/components/Hero.astro", import.meta.url),
  "utf8"
);
const features = readFileSync(
  new URL("../src/components/Features.astro", import.meta.url),
  "utf8"
);
const cta = readFileSync(
  new URL("../src/components/CTA.astro", import.meta.url),
  "utf8"
);
const footer = readFileSync(
  new URL("../src/components/Footer.astro", import.meta.url),
  "utf8"
);

function sectionBetween(start, end) {
  const startIndex = nav.indexOf(start);
  const endIndex = nav.indexOf(end, startIndex);

  assert.ok(startIndex >= 0, `Missing section marker: ${start}`);
  assert.ok(endIndex > startIndex, `Missing section marker: ${end}`);
  return nav.slice(startIndex, endIndex);
}

function anchorsForPath(pathName) {
  return (
    nav.match(
      new RegExp(`<a\\s+[^>]*href=\\{${pathName}\\}[\\s\\S]*?</a`, "g")
    ) ?? []
  );
}

test("desktop navigation contains only workflow, roadmap, and Android links", () => {
  const desktopLinks = sectionBetween(
    "<!-- Desktop nav links -->",
    "<!-- Right-side: language switcher + dark toggle + CTA -->"
  );

  assert.equal(desktopLinks.match(/<a\b/g)?.length, 3);
  assert.deepEqual(
    [...desktopLinks.matchAll(/href=\{(\w+Path)\}/g)].map((match) => match[1]),
    ["workflowPath", "roadmapPath", "androidPath"]
  );
  assert.match(desktopLinks, /\{t\.nav\.workflow\}/);
  assert.match(desktopLinks, /\{t\.nav\.roadmap\}/);
  assert.match(desktopLinks, /\{t\.nav\.android\}/);
  assert.doesNotMatch(desktopLinks, /contact|github/i);
});

test("mobile navigation contains the same content links followed by language", () => {
  const mobileLinks = sectionBetween(
    '<div class="space-y-2 py-6">',
    "</div>\n        </div>\n      </div>"
  );

  assert.equal(mobileLinks.match(/<a\b/g)?.length, 4);
  assert.deepEqual(
    [...mobileLinks.matchAll(/href=\{(\w+Path)\}/g)].map((match) => match[1]),
    ["workflowPath", "roadmapPath", "androidPath", "otherLocalePath"]
  );
  assert.match(mobileLinks, /\{t\.nav\.workflow\}/);
  assert.match(mobileLinks, /\{t\.nav\.roadmap\}/);
  assert.match(mobileLinks, /\{t\.nav\.android\}/);
  assert.doesNotMatch(mobileLinks, /contact|github/i);
});

test("navigation targets and section anchors keep their distinct purposes", () => {
  assert.match(
    nav,
    /const workflowPath = `\$\{getLocalizedPath\("\/", locale\)\}#workflow`;/
  );
  assert.match(
    nav,
    /const contactPath = `\$\{getLocalizedPath\("\/", locale\)\}#contact`;/
  );
  assert.match(
    nav,
    /const roadmapPath = getLocalizedPath\("\/roadmap", locale\);/
  );
  assert.match(
    nav,
    /const androidPath = getLocalizedPath\("\/android", locale\);/
  );
  assert.ok(!nav.includes(["progress", "Path"].join("")));
  assert.match(
    workflow,
    /<section\s+id="workflow"\s+aria-labelledby="workflow-heading"/
  );
  assert.match(hero, /href="#progress"/);
  assert.match(
    features,
    /<section\s+id="progress"\s+aria-labelledby="features-heading"/
  );
});

test("contact is only the highlighted header action and GitHub stays secondary", () => {
  const headerCtaAnchors =
    nav
      .match(/<a\s+href=\{contactPath\}[\s\S]*?<\/a>/g)
      ?.filter((anchor) => anchor.includes("{t.nav.headerCta}")) ?? [];

  assert.equal(nav.match(/href=\{contactPath\}/g)?.length, 2);
  assert.equal(headerCtaAnchors.length, 2);
  assert.doesNotMatch(
    nav,
    /t\.nav\.contact|t\.nav\.github|github\.com\/SecPal/
  );
  assert.equal(cta.match(/https:\/\/github\.com\/SecPal/g)?.length, 1);
  assert.equal(footer.match(/https:\/\/github\.com\/SecPal/g)?.length, 1);
});

test("navigation translations are aligned and obsolete fields are removed", () => {
  assert.equal(de.nav.workflow, "Ablauf");
  assert.equal(en.nav.workflow, "Workflow");
  assert.equal(de.nav.headerCta, "Kontakt aufnehmen");
  assert.equal(en.nav.headerCta, "Get in touch");
  assert.deepEqual(Object.keys(de.nav), Object.keys(en.nav));

  for (const translations of [de, en]) {
    assert.ok(!("progress" in translations.nav));
    assert.ok(!("contact" in translations.nav));
    assert.ok(!("github" in translations.nav));
  }
});

test("roadmap and Android expose mutually exclusive active page states", () => {
  const workflowAnchors = anchorsForPath("workflowPath");
  const roadmapAnchors = anchorsForPath("roadmapPath");
  const androidAnchors = anchorsForPath("androidPath");

  assert.match(nav, /const isRoadmapCurrent = currentPath === "\/roadmap";/);
  assert.match(nav, /const isAndroidCurrent = currentPath === "\/android";/);
  assert.equal(
    nav.match(/aria-current=\{isRoadmapCurrent \? "page" : undefined\}/g)
      ?.length,
    2
  );
  assert.equal(
    nav.match(/aria-current=\{isAndroidCurrent \? "page" : undefined\}/g)
      ?.length,
    2
  );
  assert.match(nav, /text-indigo-600 dark:text-indigo-400/);
  assert.equal(workflowAnchors.length, 2);
  assert.equal(roadmapAnchors.length, 2);
  assert.equal(androidAnchors.length, 2);
  for (const anchor of workflowAnchors) {
    assert.doesNotMatch(anchor, /aria-current/);
  }
  for (const anchor of roadmapAnchors) {
    assert.match(
      anchor,
      /aria-current=\{isRoadmapCurrent \? "page" : undefined\}/
    );
    assert.doesNotMatch(anchor, /isAndroidCurrent/);
  }
  for (const anchor of androidAnchors) {
    assert.match(
      anchor,
      /aria-current=\{isAndroidCurrent \? "page" : undefined\}/
    );
    assert.doesNotMatch(anchor, /isRoadmapCurrent/);
  }
});

test("both language links preserve only existing homepage hashes", () => {
  assert.equal(nav.match(/\bdata-language-switch\b/g)?.length, 2);
  assert.match(layout, /querySelectorAll\("\[data-language-switch\]"\)/);
  assert.match(
    layout,
    /window\.location\.pathname === "\/de\/"[\s\S]*window\.location\.pathname === "\/en\/"/
  );
  assert.match(layout, /window\.location\.hash/);
  assert.match(layout, /document\.getElementById\(anchorId\)/);
  assert.match(layout, /targetUrl\.hash = window\.location\.hash/);
  assert.match(layout, /link\.href = targetUrl\.toString\(\)/);
});
