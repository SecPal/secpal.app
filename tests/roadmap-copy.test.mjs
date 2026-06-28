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
    !englishNowNames.includes("Passkeys & WebAuthn"),
    "expected shipped English passkeys work to be removed from Now"
  );
  assert.ok(
    !germanNowNames.includes("Passkeys & WebAuthn"),
    "expected shipped German passkeys work to be removed from Aktuell"
  );
  assert.ok(
    !englishNowNames.includes("Employee onboarding (BewachV §16)"),
    "expected completed English onboarding work to be removed from Now"
  );
  assert.ok(
    !germanNowNames.includes("Mitarbeiter-Onboarding (BewachV §16)"),
    "expected completed German onboarding work to be removed from Aktuell"
  );
  assert.ok(
    !englishNowNames.includes("Android distribution"),
    "expected English Android distribution work to be removed from Now"
  );
  assert.ok(
    !germanNowNames.includes("Android-Verteilung"),
    "expected German Android distribution work to be removed from Aktuell"
  );
  assert.ok(
    !englishNextNames.includes("Direct download & beta distribution"),
    "expected English Android rollout follow-up to be removed from Next"
  );
  assert.ok(
    !germanNextNames.includes("Direktdownload & Beta-Verteilung"),
    "expected German Android rollout follow-up to be removed from Next"
  );
});
