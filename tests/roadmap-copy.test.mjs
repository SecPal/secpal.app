// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import test from "node:test";

import { en } from "../src/i18n/en.ts";
import { de } from "../src/i18n/de.ts";

test("roadmap reflects the current shift-planning and OWKS priorities", () => {
  const englishNowNames = en.roadmap.now.items.map((item) => item.name);
  const germanNowNames = de.roadmap.now.items.map((item) => item.name);
  const englishNextNames = en.roadmap.next.items.map((item) => item.name);
  const germanNextNames = de.roadmap.next.items.map((item) => item.name);
  const englishLaterNames = en.roadmap.later.items.map((item) => item.name);
  const germanLaterNames = de.roadmap.later.items.map((item) => item.name);
  const englishActiveNames = [
    ...englishNowNames,
    ...englishNextNames,
    ...englishLaterNames,
  ];
  const germanActiveNames = [
    ...germanNowNames,
    ...germanNextNames,
    ...germanLaterNames,
  ];

  assert.ok(
    englishNowNames.includes("Shift planning"),
    "expected English roadmap to treat shift planning as current work"
  );
  assert.ok(
    germanNowNames.includes("Dienstplanung"),
    "expected German roadmap to treat shift planning as current work"
  );
  assert.ok(
    englishNextNames.includes("Online guard tour system"),
    "expected English roadmap to reserve the next milestone for the online guard tour system"
  );
  assert.ok(
    germanNextNames.includes("Online-Wächterkontrollsystem (OWKS)"),
    "expected German roadmap to reserve the next milestone for the OWKS"
  );
  assert.ok(
    !englishActiveNames.includes("Passkeys & WebAuthn"),
    "expected shipped English passkeys work to be removed from the active roadmap phases"
  );
  assert.ok(
    !germanActiveNames.includes("Passkeys & WebAuthn"),
    "expected shipped German passkeys work to be removed from the active roadmap phases"
  );
  assert.ok(
    !englishActiveNames.includes("Employee onboarding (BewachV §16)"),
    "expected completed English onboarding work to be removed from the active roadmap phases"
  );
  assert.ok(
    !germanActiveNames.includes("Mitarbeiter-Onboarding (BewachV §16)"),
    "expected completed German onboarding work to be removed from the active roadmap phases"
  );
  assert.ok(
    !englishActiveNames.includes("Android distribution"),
    "expected English Android distribution work to be removed from the active roadmap phases"
  );
  assert.ok(
    !germanActiveNames.includes("Android-Verteilung"),
    "expected German Android distribution work to be removed from the active roadmap phases"
  );
  assert.ok(
    !englishActiveNames.includes("Android app"),
    "expected English Android app work to be removed from the active roadmap phases"
  );
  assert.ok(
    !germanActiveNames.includes("Android-App"),
    "expected German Android app work to be removed from the active roadmap phases"
  );
});
