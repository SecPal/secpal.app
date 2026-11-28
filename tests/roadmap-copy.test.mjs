// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import test from "node:test";

import { en } from "../src/i18n/en.ts";
import { de } from "../src/i18n/de.ts";

test("the curated roadmap separates present priorities from later direction", () => {
  for (const [roadmap, expected] of [
    [
      en.roadmap,
      [
        [
          "Personnel and site management",
          "Guard book and working-time capture",
        ],
        ["Guard tours and scheduling"],
        ["SecPal Assure and SecPal Visit"],
      ],
    ],
    [
      de.roadmap,
      [
        ["Personal- und Objektverwaltung", "Wachbuch und Arbeitszeiterfassung"],
        ["Kontrollgänge und Dienstplanung"],
        ["SecPal Assure und SecPal Visit"],
      ],
    ],
  ]) {
    assert.deepEqual(
      [roadmap.now, roadmap.next, roadmap.later].map(({ items }) =>
        items.map(({ name }) => name)
      ),
      expected
    );

    assert.doesNotMatch(
      JSON.stringify(roadmap),
      /legally compliant|tamper-proof|forgery-proof|rechtskonform|fälschungssicher|manipulationssicher|via (NFC|QR)|per (NFC|QR)/i
    );
  }

  assert.match(en.roadmap.now.items[1].description, /in its own domain/);
  assert.match(
    de.roadmap.now.items[1].description,
    /in einem eigenen Fachbereich/
  );
});
