// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { de } from "../src/i18n/de.ts";
import { en } from "../src/i18n/en.ts";

const expectedGermanPhases = [
  {
    status: "Aktuell",
    name: "Dienstplanung",
    description:
      "Im Mittelpunkt stehen Dienstpläne, Schichtzuweisungen und eine nachvollziehbare Besetzungsplanung.",
  },
  {
    status: "Als Nächstes",
    name: "Online-Wächterkontrollsystem",
    description:
      "Kontrollgänge sollen strukturiert erfasst und mit Wachbuch und Einsatzdokumentation verbunden werden.",
  },
  {
    status: "Später",
    name: "Weitere betriebliche Bereiche",
    description:
      "Vertragsverwaltung und strukturierte Dienstanweisungen gehören zur längerfristigen Richtung von SecPal.",
  },
];

const expectedEnglishPhases = [
  {
    status: "Current focus",
    name: "Duty scheduling",
    description:
      "The focus is on duty rosters, shift assignments, and clear staffing planning.",
  },
  {
    status: "Next",
    name: "Online guard tour system",
    description:
      "Guard tours are intended to be recorded in a structured way and connected with the logbook and assignment documentation.",
  },
  {
    status: "Later",
    name: "Further operational areas",
    description:
      "Contract management and structured service instructions are part of SecPal's longer-term direction.",
  },
];

test("development status presents exactly three ordered phases in both locales", () => {
  assert.deepEqual(de.developmentStatus, {
    overline: "Aktueller Entwicklungsstand",
    headline: "SecPal entsteht Schritt für Schritt.",
    introduction:
      "Der aktuelle Schwerpunkt liegt auf der Dienstplanung. Weitere betriebliche Bereiche sind für spätere Entwicklungsschritte vorgesehen – ohne feste Termine.",
    phases: expectedGermanPhases,
    closing:
      "Diese Reihenfolge beschreibt den aktuellen Planungsstand. Sie kann sich mit den Erkenntnissen aus Entwicklung und Praxis verändern.",
    link: "Roadmap im Detail ansehen",
  });

  assert.deepEqual(en.developmentStatus, {
    overline: "Current development status",
    headline: "SecPal is being built step by step.",
    introduction:
      "The current focus is duty scheduling. Further operational areas are planned for later development stages, without fixed delivery dates.",
    phases: expectedEnglishPhases,
    closing:
      "This sequence reflects the current planning status and may change as development progresses and practical experience provides new insights.",
    link: "View the detailed roadmap",
  });

  assert.equal(de.developmentStatus.phases.length, 3);
  assert.equal(en.developmentStatus.phases.length, 3);
  assert.deepEqual(
    Object.keys(de.developmentStatus),
    Object.keys(en.developmentStatus)
  );
  assert.deepEqual(
    de.developmentStatus.phases.map(Object.keys),
    en.developmentStatus.phases.map(Object.keys)
  );
});

test("development status and corrected roadmap entries avoid unsupported promises", () => {
  const germanContract = de.roadmap.later.items.find(
    ({ name }) => name === "Vertragsverwaltung & digitale Unterschrift"
  );
  const englishContract = en.roadmap.later.items.find(
    ({ name }) => name === "Contract management & digital signatures"
  );

  assert.equal(
    de.roadmap.next.items[0].description,
    "Kontrollgänge strukturiert erfassen und nachvollziehbar mit Wachbuch und Einsatzdokumentation verbinden."
  );
  assert.equal(
    en.roadmap.next.items[0].description,
    "Record guard tours in a structured way and connect them clearly with the logbook and assignment documentation."
  );
  assert.equal(
    germanContract?.description,
    "Kunden- und Arbeitsverträge an einem Ort verwalten und digitale Unterschriften in die vorgesehenen betrieblichen Abläufe einbinden."
  );
  assert.equal(
    englishContract?.description,
    "Manage customer and employment contracts in one place and integrate digital signatures into the intended operational workflows."
  );

  const germanScope = JSON.stringify({
    developmentStatus: de.developmentStatus,
    next: de.roadmap.next,
    contract: germanContract,
  }).toLocaleLowerCase("de-DE");
  const englishScope = JSON.stringify({
    developmentStatus: en.developmentStatus,
    next: en.roadmap.next,
    contract: englishContract,
  }).toLocaleLowerCase("en");
  const forbiddenGermanTerms = [
    "NFC oder QR",
    "per NFC",
    "per QR",
    "rechtskonform",
    "fälschungssicher",
    "manipulationssicher",
  ];
  const forbiddenEnglishTerms = [
    "NFC or QR",
    "via NFC",
    "via QR",
    "legally compliant",
    "tamper-proof",
    "forgery-proof",
  ];

  for (const term of forbiddenGermanTerms) {
    assert.ok(
      !germanScope.includes(term.toLocaleLowerCase("de-DE")),
      `Scoped German planning copy still contains "${term}"`
    );
  }
  for (const term of forbiddenEnglishTerms) {
    assert.ok(
      !englishScope.includes(term.toLocaleLowerCase("en")),
      `Scoped English planning copy still contains "${term}"`
    );
  }
});

test("development status keeps semantic split-list markup without embedded copy", () => {
  const component = readFileSync(
    new URL("../src/components/DevelopmentStatus.astro", import.meta.url),
    "utf8"
  );
  const expectedLicenseLine = [
    "// SPDX-License",
    "Identifier: AGPL-3.0-or-later AND LicenseRef-TailwindPlus",
  ].join("-");

  assert.match(component, /SPDX-FileCopyrightText: 2026 SecPal/);
  assert.match(component, /SPDX-FileCopyrightText: Tailwind Labs Inc\./);
  assert.ok(component.includes(expectedLicenseLine));
  assert.match(component, /content-sections\/split-with-image\.html/);
  assert.match(
    component,
    /<section\s+aria-labelledby="development-status-heading"/
  );
  assert.equal(component.match(/<h2\b/g)?.length, 1);
  assert.match(component, /<h2\s+id="development-status-heading"/);
  assert.equal(component.match(/<ol\b/g)?.length, 1);
  assert.equal(component.match(/<li\b/g)?.length, 1);
  assert.match(component, /developmentStatus\.phases\.map/);
  assert.equal(component.match(/<a\b/g)?.length, 1);
  assert.doesNotMatch(component, /<button\b/);
  assert.match(component, /getLocalizedPath\("\/roadmap", locale\)/);
  assert.match(component, /\blg:grid-cols-2\b/);
  assert.match(component, /\bdivide-y\b/);
  assert.match(component, /\binline-flex\b[^"]*\bself-start\b/);
  assert.match(component, /\bdark:bg-gray-900\b/);
  assert.match(component, /\bdark:text-white\b/);
  assert.match(component, /aria-hidden="true"/);
  assert.doesNotMatch(
    component,
    /Aktueller Entwicklungsstand|Current development status|Dienstplanung|Duty scheduling|Roadmap im Detail ansehen|View the detailed roadmap/
  );
});

test("localized homepages place development status between outcomes and CTA", () => {
  for (const locale of ["de", "en"]) {
    const homepage = readFileSync(
      new URL(`../src/pages/${locale}/index.astro`, import.meta.url),
      "utf8"
    );

    assert.match(
      homepage,
      /import DevelopmentStatus from "\.\.\/\.\.\/components\/DevelopmentStatus\.astro"/
    );
    assert.match(
      homepage,
      /<Outcomes locale="(?:de|en)" \/>[\s\S]*<DevelopmentStatus locale="(?:de|en)" \/>[\s\S]*<CTA locale="(?:de|en)" \/>/
    );
  }
});
