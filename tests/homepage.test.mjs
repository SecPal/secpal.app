// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { de } from "../src/i18n/de.ts";
import { en } from "../src/i18n/en.ts";

const source = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("both homepages introduce SecPal and cover the same four domains", () => {
  assert.equal(de.hero.headline, "Sicherheit organisieren");
  assert.equal(en.hero.headline, "Organizing security");
  assert.equal(
    de.hero.status,
    "Die Software befindet sich in aktiver Entwicklung."
  );
  assert.equal(en.hero.status, "The software is under active development.");
  assert.deepEqual(
    de.focus.items.map(({ name }) => name),
    ["Personal", "Objekte", "Operative Sicherheit", "Organisation"]
  );
  assert.deepEqual(
    en.focus.items.map(({ name }) => name),
    ["Personnel", "Sites", "Operational security", "Organization"]
  );

  for (const [locale, content] of Object.entries({ de, en })) {
    const page = source(`src/pages/${locale}/index.astro`);
    assert.deepEqual(
      Array.from(
        page.matchAll(/<(\w+) locale="(?:de|en)" \/>/g),
        ([, component]) => component
      ),
      ["Hero", "DomainFocus", "Approach", "OpenSource", "CTA", "Footer"]
    );
    assert.match(page, new RegExp(`canonicalPath="/${locale}/"`));
    assert.match(content.openSource.license, /AGPL v3\+/);
    assert.doesNotMatch(
      JSON.stringify(content),
      /pre-1\.0|Version 1\.0|\broadmap\b|SecPal (?:Assure|Visit)/i
    );
  }
});

test("contact and source links have distinct destinations", () => {
  const contact = source("src/components/CTA.astro");
  assert.deepEqual(
    Array.from(contact.matchAll(/<a\s+href="([^"]+)"/g), ([, href]) => href),
    ["mailto:hello@secpal.app"]
  );
  const footer = source("src/components/Footer.astro");
  assert.match(footer, /Powered by SecPal – A guard's best friend/);
  assert.match(
    footer,
    /href="https:\/\/www\.gnu\.org\/licenses\/agpl-3\.0\.html"[^>]*>\s*AGPL v3\+\s*<\/a>/
  );
  assert.match(
    footer,
    /href="https:\/\/github\.com\/SecPal\/secpal\.app"\s+referrerpolicy="no-referrer"/
  );
});
