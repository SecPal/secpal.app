// SPDX-FileCopyrightText: 2026 SecPal Contributors
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";

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
test("desktop and mobile navigation link to the four localized homepage sections", () => {
  assert.match(nav, /const homePath = getLocalizedPath\("\/", locale\);/);
  assert.deepEqual(
    Array.from(
      nav.matchAll(/\$\{homePath\}#([a-z-]+)/g),
      ([, anchor]) => anchor
    ),
    ["focus", "approach", "open-source", "contact"]
  );
  assert.equal(nav.match(/sectionLinks\.map/g)?.length, 2);
  assert.equal(nav.match(/href=\{contactPath\}/g)?.length, 2);
  assert.doesNotMatch(nav, /roadmap|androidPath|github\.com\/SecPal/);
  assert.deepEqual(
    [de.nav.focus, de.nav.approach, de.nav.openSource, de.nav.contact],
    ["Schwerpunkte", "Unser Ansatz", "Open Source", "Kontakt"]
  );
  assert.deepEqual(
    [en.nav.focus, en.nav.approach, en.nav.openSource, en.nav.contact],
    ["Focus areas", "Our approach", "Open Source", "Contact"]
  );
});

test("both language links proactively preserve only existing homepage hashes", () => {
  assert.equal(nav.match(/\bdata-language-switch\b/g)?.length, 2);

  const inlineScript = layout.match(
    /<script is:inline>\s*([\s\S]*?)\s*<\/script>/
  )?.[1];
  assert.ok(
    inlineScript,
    "Base layout must contain its inline behavior script"
  );

  const documentListeners = new Map();
  const windowListeners = new Map();
  const languageLinks = [
    {
      href: "https://secpal.app/de/",
      getAttribute: (name) => (name === "href" ? "/de/" : null),
      addEventListener() {},
    },
    {
      href: "https://secpal.app/de/",
      getAttribute: (name) => (name === "href" ? "/de/" : null),
      addEventListener() {},
    },
  ];
  const existingAnchors = new Set([
    "focus",
    "approach",
    "open-source",
    "contact",
  ]);
  const window = {
    location: new URL("https://secpal.app/en/#focus"),
    matchMedia: () => ({ matches: false }),
    addEventListener: (type, listener) => windowListeners.set(type, listener),
  };
  const document = {
    activeElement: null,
    body: { style: { overflow: "" } },
    documentElement: { classList: { add() {} } },
    addEventListener: (type, listener) => documentListeners.set(type, listener),
    getElementById: (id) => (existingAnchors.has(id) ? {} : null),
    querySelector: () => null,
    querySelectorAll: (selector) =>
      selector === "[data-language-switch]" ? languageLinks : [],
  };

  runInNewContext(inlineScript, {
    URL,
    document,
    localStorage: { getItem: () => null },
    window,
  });
  documentListeners.get("DOMContentLoaded")?.();

  assert.deepEqual(
    languageLinks.map((link) => link.href),
    ["https://secpal.app/de/#focus", "https://secpal.app/de/#focus"]
  );

  window.location = new URL("https://secpal.app/en/#contact");
  windowListeners.get("hashchange")?.();
  assert.deepEqual(
    languageLinks.map((link) => link.href),
    ["https://secpal.app/de/#contact", "https://secpal.app/de/#contact"]
  );

  window.location = new URL("https://secpal.app/en/#missing");
  windowListeners.get("hashchange")?.();
  assert.deepEqual(
    languageLinks.map((link) => link.href),
    ["https://secpal.app/de/", "https://secpal.app/de/"]
  );
});
