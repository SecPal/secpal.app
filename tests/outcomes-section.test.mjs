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
    name: "Zeiträume überblicken",
    description:
      "Dokumentierte Leistungen und Ereignisse für ausgewählte Objekte und Zeiträume übersichtlich zusammenfassen.",
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
    name: "Review selected periods",
    description:
      "Summarize documented services and events clearly for selected sites and time periods.",
  },
  {
    name: "Keep clients informed",
    description:
      "Prepare relevant information clearly without reconstructing reports later from paper, spreadsheets, and separate files.",
  },
];

test("outcomes translations present exactly three ordered benefits in both locales", () => {
  assert.deepEqual(de.outcomes, {
    overline: "Nachvollziehbare Sicherheitsdienstleistung",
    headline: "Was im Einsatz geleistet wird, sollte nachvollziehbar sein.",
    introduction:
      "Sicherheitsdienstleistungen sind für Auftraggeber oft schwer sichtbar – gerade dann, wenn sie zuverlässig und ohne besondere Vorkommnisse erbracht werden. Strukturierte Dokumentation soll verständlich zeigen, welche Leistungen erbracht und welche Ereignisse während eines Einsatzes festgehalten wurden.",
    items: expectedGermanItems,
    closing:
      "SecPal soll aus operativer Dokumentation einen klaren Überblick für den eigenen Betrieb und den Auftraggeber schaffen.",
  });

  assert.deepEqual(en.outcomes, {
    overline: "Traceable security services",
    headline: "What is delivered during an assignment should be traceable.",
    introduction:
      "Security services can be difficult for clients to see—especially when they are delivered reliably and without notable incidents. Structured documentation should clearly show which services were delivered and which events were recorded during an assignment.",
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

test("outcomes copy avoids unsupported pattern-analysis language", () => {
  const forbiddenGermanTerms = [
    "Entwicklungen erkennen",
    "wiederkehrende Entwicklungen",
    "wiederkehrende Auffälligkeiten",
  ];
  const forbiddenEnglishTerms = [
    "Recognize developments",
    "recurring developments",
    "recurring issues",
  ];
  const germanOutcomes = JSON.stringify(de.outcomes).toLocaleLowerCase("de-DE");
  const englishOutcomes = JSON.stringify(en.outcomes).toLocaleLowerCase("en");

  for (const term of forbiddenGermanTerms) {
    assert.ok(
      !germanOutcomes.includes(term.toLocaleLowerCase("de-DE")),
      `German outcomes copy still contains "${term}"`
    );
  }
  for (const term of forbiddenEnglishTerms) {
    assert.ok(
      !englishOutcomes.includes(term.toLocaleLowerCase("en")),
      `English outcomes copy still contains "${term}"`
    );
  }
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
  assert.match(iconPaths, /M6\.75 3v2\.25M17\.25 3v2\.25/);
  assert.doesNotMatch(iconPaths, /m21 21-4\.35-4\.35/);
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
