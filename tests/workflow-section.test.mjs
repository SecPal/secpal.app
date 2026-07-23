// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { de } from "../src/i18n/de.ts";
import { en } from "../src/i18n/en.ts";

const expectedGermanSteps = [
  {
    name: "Planen",
    description:
      "Dienste besetzen, Zuständigkeiten festlegen und kurzfristige Änderungen nachvollziehbar halten.",
  },
  {
    name: "Informieren",
    description:
      "Mitarbeitern die aktuellen Informationen, Dienstanweisungen und Besonderheiten zum jeweiligen Einsatz bereitstellen.",
  },
  {
    name: "Durchführen",
    description:
      "Aufgaben, Kontrollgänge und besondere Vorkommnisse dort erfassen, wo die Arbeit stattfindet.",
  },
  {
    name: "Übergeben",
    description:
      "Ereignisse, offene Punkte und wichtige Informationen verständlich an die nächste Schicht weitergeben.",
  },
  {
    name: "Auswerten",
    description:
      "Erbrachte Leistungen, Auffälligkeiten und Entwicklungen für den eigenen Betrieb und den Auftraggeber nachvollziehbar darstellen.",
  },
];

const expectedEnglishSteps = [
  {
    name: "Plan",
    description:
      "Assign duties, define responsibilities, and keep short-notice changes traceable.",
  },
  {
    name: "Inform",
    description:
      "Provide employees with current information, post instructions, and assignment-specific details.",
  },
  {
    name: "Carry out",
    description:
      "Record tasks, patrols, and incidents where the work takes place.",
  },
  {
    name: "Hand over",
    description:
      "Pass events, open matters, and important information clearly to the next shift.",
  },
  {
    name: "Review",
    description:
      "Present delivered services, notable events, and developments clearly for internal use and for the client.",
  },
];

test("workflow translations describe exactly five ordered steps in both locales", () => {
  assert.deepEqual(de.workflow, {
    overline: "Ein durchgängiger Ablauf",
    headline: "Vom Dienstplan bis zur Auswertung.",
    introduction:
      "SecPal soll Informationen entlang der tatsächlichen Arbeit im Sicherheitsdienst miteinander verbinden – statt sie in voneinander getrennten Anwendungen festzuhalten.",
    steps: expectedGermanSteps,
    closing:
      "Informationen sollen einmal erfasst werden und anschließend dort verfügbar sein, wo sie benötigt werden.",
  });

  assert.deepEqual(en.workflow, {
    overline: "One connected workflow",
    headline: "From duty scheduling to reporting.",
    introduction:
      "SecPal aims to connect information throughout the actual workflow of security service providers—instead of keeping it in separate applications.",
    steps: expectedEnglishSteps,
    closing:
      "Information should be recorded once and then be available wherever it is needed.",
  });
});

test("workflow component keeps the process semantic, responsive, and text-free", () => {
  const component = readFileSync(
    new URL("../src/components/Workflow.astro", import.meta.url),
    "utf8"
  );
  const expectedLicenseLine = [
    "// SPDX-License",
    "Identifier: AGPL-3.0-or-later AND LicenseRef-TailwindPlus",
  ].join("-");

  assert.match(component, /SPDX-FileCopyrightText: 2026 SecPal/);
  assert.match(component, /SPDX-FileCopyrightText: Tailwind Labs Inc\./);
  assert.ok(component.includes(expectedLicenseLine));
  assert.match(component, /<section\s+aria-labelledby="workflow-heading"/);
  assert.equal(component.match(/<h2\b/g)?.length, 1);
  assert.match(component, /<h2\s+id="workflow-heading"/);
  assert.equal(component.match(/<ol\b/g)?.length, 1);
  assert.equal(component.match(/<li\b/g)?.length, 1);
  assert.match(component, /t\.workflow\.steps\.map/);
  assert.match(component, /\bxl:grid-cols-5\b/);
  assert.match(component, /\bbreak-words\b/);
  assert.match(component, /\bdark:bg-gray-900\b/);
  assert.match(component, /\bdark:text-white\b/);
  assert.match(component, /aria-hidden="true"/);
  assert.doesNotMatch(component, /<a\b|<button\b/);
  assert.doesNotMatch(
    component,
    /Ein durchgängiger Ablauf|One connected workflow|Planen|Plan|Auswerten|Review/
  );
});

test("localized homepages place workflow between features and CTA", () => {
  for (const locale of ["de", "en"]) {
    const homepage = readFileSync(
      new URL(`../src/pages/${locale}/index.astro`, import.meta.url),
      "utf8"
    );

    assert.match(
      homepage,
      /import Workflow from "\.\.\/\.\.\/components\/Workflow\.astro"/
    );
    assert.match(
      homepage,
      /<Features locale="(?:de|en)" \/>[\s\S]*<Workflow locale="(?:de|en)" \/>[\s\S]*<CTA locale="(?:de|en)" \/>/
    );
  }
});
