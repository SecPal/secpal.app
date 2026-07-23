// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { de } from "../src/i18n/de.ts";
import { en } from "../src/i18n/en.ts";

const expectedGermanItems = [
  {
    name: "Leistung nachvollziehen",
    description:
      "Besetzungen, Kontrollgänge, Ereignisse und Übergaben in einem verständlichen Gesamtbild zusammenführen.",
  },
  {
    name: "Entwicklungen erkennen",
    description:
      "Wiederkehrende Auffälligkeiten, Schwerpunkte und Veränderungen über Zeiträume erkennen und einordnen.",
  },
  {
    name: "Auftraggeber informieren",
    description:
      "Relevante Informationen verständlich aufbereiten, ohne Berichte nachträglich aus Papier, Tabellen und einzelnen Dateien zusammenzustellen.",
  },
];

const expectedEnglishItems = [
  {
    name: "Understand delivered services",
    description:
      "Bring staffing, patrols, incidents, and shift handovers together in one clear overview.",
  },
  {
    name: "Recognize developments",
    description:
      "Identify and assess recurring issues, areas of focus, and changes over time.",
  },
  {
    name: "Keep clients informed",
    description:
      "Prepare relevant information clearly without reconstructing reports later from paper, spreadsheets, and separate files.",
  },
];

test("outcomes translations present exactly three ordered benefits in both locales", () => {
  assert.deepEqual(de.outcomes, {
    overline: "Nachvollziehbare Sicherheitsleistung",
    headline: "Was im Einsatz geleistet wird, sollte nachvollziehbar sein.",
    introduction:
      "Sicherheitsarbeit bleibt oft gerade dann unsichtbar, wenn sie zuverlässig funktioniert. Strukturierte Dokumentation soll zeigen, welche Leistungen erbracht wurden, welche Ereignisse aufgetreten sind und wo sich wiederkehrende Entwicklungen erkennen lassen.",
    items: expectedGermanItems,
    closing:
      "SecPal soll aus operativer Dokumentation einen klaren Überblick für den eigenen Betrieb und den Auftraggeber schaffen.",
  });

  assert.deepEqual(en.outcomes, {
    overline: "Traceable security services",
    headline: "What is delivered during an assignment should be traceable.",
    introduction:
      "Security work often remains unnoticed precisely when it is performed reliably. Structured documentation should show which services were delivered, which incidents occurred, and where recurring developments can be identified.",
    items: expectedEnglishItems,
    closing:
      "SecPal aims to turn operational documentation into a clear overview for the security provider and the client.",
  });

  assert.deepEqual(Object.keys(de.outcomes), Object.keys(en.outcomes));
  assert.deepEqual(
    de.outcomes.items.map(Object.keys),
    en.outcomes.items.map(Object.keys)
  );
});

test("outcomes component keeps a semantic split feature list without embedded copy", () => {
  const component = readFileSync(
    new URL("../src/components/Outcomes.astro", import.meta.url),
    "utf8"
  );
  const expectedLicenseLine = [
    "// SPDX-License",
    "Identifier: AGPL-3.0-or-later AND LicenseRef-TailwindPlus",
  ].join("-");
  const iconPaths = component.match(/const iconPaths = \[([\s\S]*?)\];/)?.[1];

  assert.match(component, /SPDX-FileCopyrightText: 2026 SecPal/);
  assert.match(component, /SPDX-FileCopyrightText: Tailwind Labs Inc\./);
  assert.ok(component.includes(expectedLicenseLine));
  assert.match(component, /<section\s+aria-labelledby="outcomes-heading"/);
  assert.equal(component.match(/<h2\b/g)?.length, 1);
  assert.match(component, /<h2\s+id="outcomes-heading"/);
  assert.match(component, /<h2[^>]*class="[^"]*\bbreak-words\b[^"]*"/);
  assert.equal(component.match(/<ul\b/g)?.length, 1);
  assert.equal(component.match(/<li\b/g)?.length, 1);
  assert.match(component, /t\.outcomes\.items\.map/);
  assert.equal(iconPaths?.match(/^\s*"/gm)?.length, 3);
  assert.match(component, /\blg:grid-cols-5\b/);
  assert.match(component, /\blg:col-span-2\b/);
  assert.match(component, /\blg:col-span-3\b/);
  assert.match(component, /\bdivide-y\b/);
  assert.match(component, /\bdark:bg-gray-800\/50\b/);
  assert.match(component, /\bdark:text-white\b/);
  assert.match(component, /aria-hidden="true"/);
  assert.doesNotMatch(component, /<a\b|<button\b/);
  assert.doesNotMatch(
    component,
    /Nachvollziehbare Sicherheitsleistung|Traceable security services|Leistung nachvollziehen|Understand delivered services/
  );
});

test("localized homepages place outcomes between workflow and CTA", () => {
  for (const locale of ["de", "en"]) {
    const homepage = readFileSync(
      new URL(`../src/pages/${locale}/index.astro`, import.meta.url),
      "utf8"
    );

    assert.match(
      homepage,
      /import Outcomes from "\.\.\/\.\.\/components\/Outcomes\.astro"/
    );
    assert.match(
      homepage,
      /<Workflow locale="(?:de|en)" \/>[\s\S]*<Outcomes locale="(?:de|en)" \/>[\s\S]*<CTA locale="(?:de|en)" \/>/
    );
  }
});
