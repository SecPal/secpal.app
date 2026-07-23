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
      "Ausfälle, Vertretungen und kurzfristige Änderungen müssen schnell alle erreichen – ohne unterschiedliche Planstände und unnötige Rückfragen.",
  },
  {
    name: "Informationen zum Einsatz",
    description:
      "Dienstanweisungen, Ansprechpartner, Besonderheiten und aktuelle Hinweise müssen dort verfügbar sein, wo sie gebraucht werden.",
  },
  {
    name: "Wachbuch und Auswertung",
    description:
      "Wachbucheinträge, Kontrollgänge, besondere Vorkommnisse und Übergaben sollen nachvollziehbar erfasst und für den eigenen Betrieb sowie für den Auftraggeber verständlich ausgewertet werden können.",
  },
];

const expectedEnglishItems = [
  {
    name: "Duty scheduling",
    description:
      "Absences, replacements, and short-notice changes need to reach everyone quickly—without conflicting schedules or unnecessary follow-up.",
  },
  {
    name: "Assignment information",
    description:
      "Post instructions, contacts, special requirements, and current notices need to be available where they are needed.",
  },
  {
    name: "Logbook and reporting",
    description:
      "Logbook entries, patrols, incidents, and shift handovers should be recorded traceably and made available for clear internal and client-facing reporting.",
  },
];

test("second homepage view presents exactly the three localized operational situations", () => {
  assert.equal(de.features.headline, "Viele Informationen. Zu viele Wege.");
  assert.deepEqual(de.features.items, expectedGermanItems);
  assert.equal(
    de.features.closing,
    "SecPal soll diese Bereiche in einem gemeinsamen, verständlichen Ablauf zusammenführen."
  );

  assert.equal(
    en.features.headline,
    "Important information. Too many separate places."
  );
  assert.deepEqual(en.features.items, expectedEnglishItems);
  assert.equal(
    en.features.closing,
    "SecPal aims to bring these areas together in one clear and understandable workflow."
  );
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
