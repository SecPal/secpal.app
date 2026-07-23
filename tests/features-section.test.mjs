// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { de } from "../src/i18n/de.ts";
import { en } from "../src/i18n/en.ts";

const expectedGermanItems = [
  {
    name: "Dienstplanung",
    description:
      "Ausfälle, Vertretungen und kurzfristige Änderungen müssen alle erreichen – ohne unterschiedliche Planstände und unnötige Rückfragen.",
  },
  {
    name: "Informationen zum Einsatz",
    description:
      "Dienstanweisungen, Ansprechpartner und aktuelle Hinweise müssen dort verfügbar sein, wo sie gebraucht werden.",
  },
  {
    name: "Wachbuch und Auswertung",
    description:
      "Wachbucheinträge, Kontrollgänge und Vorkommnisse müssen nachvollziehbar erfasst und für Betrieb und Auftraggeber verständlich aufbereitet werden.",
  },
];

const expectedEnglishItems = [
  {
    name: "Duty scheduling",
    description:
      "Absences, replacements, and short-notice changes need to reach everyone—without conflicting schedules or unnecessary follow-up.",
  },
  {
    name: "Assignment information",
    description:
      "Post instructions, contacts, and current notices need to be available where they are needed.",
  },
  {
    name: "Logbook and reporting",
    description:
      "Logbook entries, patrols, and incidents need to be recorded traceably and presented clearly for internal use and for clients.",
  },
];

test("second homepage view presents exactly the three localized operational situations", () => {
  assert.equal(de.features.headline, "Viele Informationen. Zu viele Wege.");
  assert.deepEqual(de.features.items, expectedGermanItems);
  assert.equal(
    de.features.closing,
    "SecPal verbindet diese Bereiche in einem gemeinsamen, verständlichen Ablauf."
  );

  assert.equal(
    en.features.headline,
    "Important information. Too many separate places."
  );
  assert.deepEqual(en.features.items, expectedEnglishItems);
  assert.equal(
    en.features.closing,
    "SecPal connects these areas in one clear, understandable workflow."
  );
  assert.doesNotMatch(
    JSON.stringify({ de: de.features, en: en.features }),
    /SecPal soll diese Bereiche|SecPal aims to bring these areas/
  );
  assert.ok(!("subline" in de.features));
  assert.ok(!("subline" in en.features));
});

test("second homepage view keeps one semantic heading, three cards, and a quiet closing statement", () => {
  const component = readFileSync(
    new URL("../src/components/Features.astro", import.meta.url),
    "utf8"
  );
  const iconPaths = component.match(/const iconPaths = \[([\s\S]*?)\];/)?.[1];

  assert.match(component, /SPDX-FileCopyrightText: 2026 SecPal/);
  assert.match(component, /SPDX-FileCopyrightText: Tailwind Labs Inc\./);
  assert.ok(
    component.includes(
      [
        "// SPDX-License",
        "Identifier: AGPL-3.0-or-later AND LicenseRef-TailwindPlus",
      ].join("-")
    )
  );
  assert.match(
    component,
    /<section\s+id="progress"\s+aria-labelledby="features-heading"/
  );
  assert.match(component, /<h2\s+id="features-heading"/);
  assert.match(component, /t\.features\.items\.map/);
  assert.match(component, /\blg:grid-cols-3\b/);
  assert.match(component, /<\/dl>[\s\S]*\{t\.features\.closing\}/);
  assert.equal(iconPaths?.match(/^\s*"/gm)?.length, 3);
  assert.doesNotMatch(component, /<a\b|<button\b/);
  assert.doesNotMatch(
    component,
    /Viele Informationen|Important information|Dienstplanung|Duty scheduling/
  );
});
