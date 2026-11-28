// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { de } from "../src/i18n/de.ts";
import { en } from "../src/i18n/en.ts";

test("the homepage explains the common product scope for self-hosting and Managed", () => {
  assert.match(
    de.developmentStatus.hostingDescription,
    /derselbe Funktionsumfang/
  );
  assert.match(
    en.developmentStatus.hostingDescription,
    /same product functionality/
  );
  assert.deepEqual(
    Object.keys(de.developmentStatus),
    Object.keys(en.developmentStatus)
  );
});

test("development status links localized priorities and canonical technical documentation", () => {
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
  assert.equal(component.match(/<a\b/g)?.length, 3);
  assert.doesNotMatch(component, /<button\b/);
  assert.match(component, /getLocalizedPath\("\/roadmap", locale\)/);
  assert.ok(
    component.includes(
      "https://github.com/SecPal/.github/blob/main/docs/architecture.md"
    )
  );
  assert.ok(component.includes("https://github.com/SecPal/deployment#readme"));
  assert.match(component, /\blg:grid-cols-2\b/);
  assert.match(component, /\bdark:bg-gray-900\b/);
  assert.match(component, /\bdark:text-white\b/);
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
