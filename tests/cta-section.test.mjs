// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { de } from "../src/i18n/de.ts";
import { en } from "../src/i18n/en.ts";

test("homepage CTA presents contact before technical insight in both locales", () => {
  assert.deepEqual(de.cta, {
    headline: "Was zählt, ist der Arbeits\u00adalltag.",
    subline:
      "Erfahrungen, Anforderungen und Hinweise aus dem Alltag von Sicherheitsdiensten sind für die weitere Entwicklung von SecPal besonders wertvoll.",
    button: "Kontakt aufnehmen",
    buttonSecondary: "Entwicklung auf GitHub ansehen",
    note: "",
  });
  assert.deepEqual(en.cta, {
    headline: "What matters is day-to-day operations.",
    subline:
      "Experience, requirements, and feedback from day-to-day operations at security service providers are particularly valuable for SecPal's further development.",
    button: "Get in touch",
    buttonSecondary: "View development on GitHub",
    note: "",
  });
  assert.deepEqual(Object.keys(de.cta), Object.keys(en.cta));
  assert.equal(de.cta.note, "");
  assert.equal(en.cta.note, "");
});

test("homepage CTA copy no longer uses the superseded progress wording", () => {
  const germanCta = JSON.stringify(de.cta).toLocaleLowerCase("de-DE");
  const englishCta = JSON.stringify(en.cta).toLocaleLowerCase("en");
  const forbiddenGermanTerms = [
    "Fortschritt statt Marketing-Lärm",
    "Marketing-Lärm",
    "Auf GitHub ist der aktuelle Stand sichtbar",
    "SecPal soll sich im Arbeitsalltag bewähren",
  ];
  const forbiddenEnglishTerms = [
    "Progress, not marketing noise",
    "marketing noise",
    "GitHub shows the current state",
    "SecPal should work in day-to-day operations",
  ];

  for (const term of forbiddenGermanTerms) {
    assert.ok(
      !germanCta.includes(term.toLocaleLowerCase("de-DE")),
      `German CTA still contains "${term}"`
    );
  }
  for (const term of forbiddenEnglishTerms) {
    assert.ok(
      !englishCta.includes(term.toLocaleLowerCase("en")),
      `English CTA still contains "${term}"`
    );
  }
});

test("CTA uses semantic contact markup and contact-first action hierarchy", () => {
  const component = readFileSync(
    new URL("../src/components/CTA.astro", import.meta.url),
    "utf8"
  );
  const contactIndex = component.indexOf('href="mailto:hello@secpal.app"');
  const githubIndex = component.indexOf('href="https://github.com/SecPal"');

  assert.match(component, /SPDX-FileCopyrightText: 2026 SecPal/);
  assert.match(component, /SPDX-FileCopyrightText: Tailwind Labs Inc\./);
  assert.ok(
    component.includes(
      [
        "SPDX-License-Identifier",
        "AGPL-3.0-or-later AND LicenseRef-TailwindPlus",
      ].join(": ")
    )
  );
  assert.match(
    component,
    /<section\s+id="contact"\s+aria-labelledby="home-contact-heading"/
  );
  assert.equal(component.match(/<h2\b/g)?.length, 1);
  assert.match(component, /<h2\s+id="home-contact-heading"/);
  assert.match(
    component,
    /<h2[^>]*class="[^"]*\btext-2xl\b[^"]*\bmin-\[360px\]:text-3xl\b[^"]*\bmin-\[430px\]:text-4xl\b[^"]*\bhyphens-manual\b[^"]*"/
  );
  assert.equal(component.match(/<a\b/g)?.length, 2);
  assert.doesNotMatch(component, /<button\b/);
  assert.equal(component.match(/mailto:hello@secpal\.app/g)?.length, 1);
  assert.equal(component.match(/https:\/\/github\.com\/SecPal/g)?.length, 1);
  assert.ok(contactIndex >= 0 && githubIndex > contactIndex);
  assert.match(
    component,
    /href="mailto:hello@secpal\.app"[\s\S]*?class="[^"]*\bbg-white\b[^"]*"[\s\S]*?\{t\.cta\.button\}/
  );
  assert.match(
    component,
    /href="https:\/\/github\.com\/SecPal"[\s\S]*?class="[^"]*\btext-white\b[^"]*\bfocus-visible:outline-2\b[^"]*"[\s\S]*?\{t\.cta\.buttonSecondary\}[\s\S]*?→/
  );
  assert.match(component, /\bdark:bg-gray-900\b/);
  assert.match(component, /\bfocus-visible:outline-2\b/);
  assert.doesNotMatch(
    component,
    /Was zählt, ist der Arbeitsalltag|What matters is day-to-day operations|Kontakt aufnehmen|Get in touch|Entwicklung auf GitHub ansehen|View development on GitHub/
  );
});

test("desktop and mobile navigation point to the localized contact section", () => {
  const nav = readFileSync(
    new URL("../src/components/Nav.astro", import.meta.url),
    "utf8"
  );
  const headerCtaAnchors =
    nav
      .match(/<a\s+href=\{contactPath\}[\s\S]*?<\/a>/g)
      ?.filter((anchor) => anchor.includes("{t.nav.headerCta}")) ?? [];

  assert.match(
    nav,
    /const contactPath = `\$\{getLocalizedPath\("\/", locale\)\}#contact`;/
  );
  assert.equal(nav.match(/href=\{contactPath\}/g)?.length, 2);
  assert.doesNotMatch(nav, /\{t\.nav\.contact\}/);
  assert.equal(headerCtaAnchors.length, 2);
  assert.match(
    headerCtaAnchors[0],
    /\bhidden\b[^"]*\bmin-\[360px\]:inline-flex\b[^"]*\bwhitespace-nowrap\b/
  );
  assert.match(headerCtaAnchors[0], /min-h-\[44px\]/);
  assert.match(headerCtaAnchors[1], /\bw-full\b[^"]*\bbreak-words\b/);
  assert.doesNotMatch(headerCtaAnchors[1], /\border-last\b/);
  assert.match(headerCtaAnchors[1], /min-h-\[44px\]/);
  assert.doesNotMatch(headerCtaAnchors[1], /\bwhitespace-nowrap\b/);
  assert.ok(
    nav.indexOf('id="mobile-menu-close"') < nav.indexOf(headerCtaAnchors[1]),
    "Mobile close control should precede the visually lower CTA in DOM order"
  );
  assert.match(
    nav,
    /<div class="flex flex-wrap items-center gap-x-6 gap-y-4">/
  );
  assert.match(
    nav,
    /id="mobile-menu-close"[\s\S]*class:list=\{\[mobileMenuCloseClass, "ml-auto"\]\}/
  );
  assert.match(
    nav,
    /id="dark-toggle"[\s\S]*?class:list=\{\[[\s\S]*?"[^"]*min-h-\[44px\][^"]*min-w-\[44px\][^"]*"[\s\S]*?utilityControlClass[\s\S]*?\]\}/
  );
  assert.doesNotMatch(nav, /href="https:\/\/github\.com\/SecPal"/);
  assert.doesNotMatch(nav, /\{t\.nav\.github\}/);
  assert.ok(!("contact" in de.nav));
  assert.ok(!("contact" in en.nav));
  assert.ok(!("github" in de.nav));
  assert.ok(!("github" in en.nav));
  assert.equal(de.nav.headerCta, "Kontakt aufnehmen");
  assert.equal(en.nav.headerCta, "Get in touch");
});
