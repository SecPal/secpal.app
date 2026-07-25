// SPDX-FileCopyrightText: 2026 SecPal Contributors
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import test from "node:test";

const readSource = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const pages = {
  de: readSource("src/pages/de/privacy.astro"),
  en: readSource("src/pages/en/privacy.astro"),
};
const compactPages = Object.fromEntries(
  Object.entries(pages).map(([locale, source]) => [
    locale,
    source.replace(/\s+/g, " "),
  ])
);

const expectedShellProps = {
  de: [
    'title="Datenschutz | SecPal"',
    'description="Datenschutzhinweise für secpal.app, changelog.secpal.app, apk.secpal.app und die direkte Kontaktaufnahme mit SecPal."',
    'canonicalPath="/de/privacy/"',
    'currentPath="/privacy"',
    'eyebrow="Rechtliches"',
    'headline="Datenschutzerklärung"',
    'intro="Diese Datenschutzerklärung betrifft die öffentlichen Websites secpal.app und changelog.secpal.app, die über apk.secpal.app bereitgestellten Downloadressourcen, das Domain Name System (DNS) sowie die direkte Kontaktaufnahme per E-Mail."',
    'updatedLabel="Stand"',
    'updatedAt="25. Juli 2026"',
  ],
  en: [
    'title="Privacy Notice | SecPal"',
    'description="Privacy notice for secpal.app, changelog.secpal.app, apk.secpal.app, and direct contact with SecPal."',
    'canonicalPath="/en/privacy/"',
    'currentPath="/privacy"',
    'eyebrow="Legal"',
    'headline="Privacy Notice"',
    'intro="This privacy notice concerns the public secpal.app and changelog.secpal.app websites, download resources provided through apk.secpal.app, the Domain Name System (DNS), and direct contact by email."',
    'updatedLabel="Last updated"',
    'updatedAt="July 25, 2026"',
  ],
};

const expectedSections = {
  de: [
    "Geltungsbereich",
    "Verantwortlicher",
    "Technische Bereitstellung und Hosting",
    "Keine reguläre Zugriffsprotokollierung",
    "Domain Name System (DNS)",
    "Öffentliche Downloadressourcen",
    "Lokale Darstellungspräferenz",
    "Keine Webanalyse oder Besucherprofilbildung",
    "Kontaktaufnahme per E-Mail",
    "Externe Links",
    "Empfänger und Dienstleister",
    "Drittlandübermittlung bei Cloudflare",
    "Bereitstellung der Daten",
    "Speicherdauer",
    "Rechte betroffener Personen",
    "Änderungen der Datenschutzerklärung",
  ],
  en: [
    "Scope",
    "Controller",
    "Technical delivery and hosting",
    "No regular access logging",
    "Domain Name System (DNS)",
    "Public download resources",
    "Local display preference",
    "No web analytics or visitor profiling",
    "Contact by email",
    "External links",
    "Recipients and service providers",
    "International transfers involving Cloudflare",
    "Provision of data",
    "Storage periods",
    "Data subject rights",
    "Changes to this privacy notice",
  ],
};

const extractSectionNames = (source) =>
  [...source.matchAll(/<h2\b[^>]*>\s*(?:\d+\.\s*)?([^<]+?)\s*<\/h2>/g)].map(
    ([, heading]) => heading.replace(/\s+/g, " ").trim()
  );

test("localized privacy pages retain their shell metadata and aligned sections", () => {
  for (const [locale, source] of Object.entries(pages)) {
    assert.match(source, /import LegalPageShell from/);
    for (const property of expectedShellProps[locale]) {
      assert.ok(
        source.includes(property),
        `${locale} privacy page must retain ${property}`
      );
    }
  }
  assert.deepEqual(extractSectionNames(pages.de), expectedSections.de);
  assert.deepEqual(extractSectionNames(pages.en), expectedSections.en);
});

test("the formal scope covers all public hosts and authoritative DNS services", () => {
  for (const source of Object.values(pages)) {
    assert.match(source, /secpal\.app/);
    assert.match(source, /changelog\.secpal\.app/);
    assert.match(source, /apk\.secpal\.app/);
  }
  assert.match(
    compactPages.de,
    /<h2[^>]*> 1\. Geltungsbereich <\/h2> <p class="mt-6"> [^<]*autoritativen DNS-Dienste[^<]*<\/p>/
  );
  assert.match(
    compactPages.en,
    /<h2[^>]*> 1\. Scope <\/h2> <p class="mt-6"> [^<]*authoritative DNS services[^<]*<\/p>/
  );
});

test("section extraction rejects headings that contain markup", () => {
  const headingWithMarkup = "<h2>1. Scope <em>note</em></h2>";

  assert.deepEqual(extractSectionNames(headingWithMarkup), []);
});

test("the controller is identified with SecPal before Holger Schmermbeck", () => {
  assert.match(
    compactPages.de,
    /<p class="mt-6">Verantwortlicher im Sinne der DSGVO ist:<\/p> <div[^>]*> <p[^>]*>SecPal<\/p> <p[^>]*>Holger Schmermbeck<\/p>/
  );
  assert.match(
    compactPages.en,
    /<p class="mt-6">The controller within the meaning of the GDPR is:<\/p> <div[^>]*> <p[^>]*>SecPal<\/p> <p[^>]*>Holger Schmermbeck<\/p>/
  );

  for (const source of Object.values(pages)) {
    assert.match(source, /Enno-Arends-Str\. 4/);
    assert.match(source, /26571 Juist/);
    assert.match(source, /hello@secpal\.app/);
    assert.doesNotMatch(
      source,
      /Datenschutzbeauftragter|Data Protection Officer/i
    );
  }
});

test("hosting, transient delivery, and disabled regular logging are precise", () => {
  assert.match(
    compactPages.de,
    /Hosting von secpal\.app, changelog\.secpal\.app und apk\.secpal\.app erfolgt über die Hetzner Online GmbH/
  );
  assert.match(
    compactPages.en,
    /secpal\.app, changelog\.secpal\.app, and apk\.secpal\.app are hosted through Hetzner Online GmbH/
  );
  assert.match(compactPages.de, /flüchtig|Dauer der Verbindung/);
  assert.match(compactPages.en, /transient|duration of the connection/);
  assert.match(compactPages.de, /IP-Adresse/);
  assert.match(compactPages.en, /IP address/);
  assert.match(
    compactPages.de,
    /keine individuellen IP-Adressen, User-Agents oder Crawlerinformationen/
  );
  assert.match(
    compactPages.en,
    /does not store individual IP addresses, user agents, or crawler information/
  );
  assert.match(
    compactPages.de,
    /keine regulären Webserver-Zugriffs- oder Fehlerprotokolle/
  );
  assert.match(compactPages.en, /no regular web server access or error logs/);
  assert.match(
    compactPages.de,
    /für secpal\.app, changelog\.secpal\.app und apk\.secpal\.app keine regulären/
  );
  assert.match(
    compactPages.en,
    /for secpal\.app, changelog\.secpal\.app, and apk\.secpal\.app/
  );
  assert.match(compactPages.de, /Art\. 6 Abs\. 1 lit\. f DSGVO/);
  assert.match(compactPages.en, /Article 6\(1\)\(f\) GDPR/);
  assert.match(
    compactPages.de,
    /Unabhängig von der durch SecPal deaktivierten regulären Protokollierung/
  );
  assert.match(
    compactPages.en,
    /Independently of the regular logging disabled by SecPal/
  );
  assert.doesNotMatch(compactPages.de, /in eigener Verantwortung/);
  assert.doesNotMatch(compactPages.en, /under their own responsibility/);
  assert.doesNotMatch(compactPages.de, /keinerlei Daten verarbeitet/i);
  assert.doesNotMatch(compactPages.en, /no data (?:is|are) processed/i);
});

test("Cloudflare is limited to authoritative DNS and transfer safeguards", () => {
  for (const source of Object.values(compactPages)) {
    assert.match(source, /Cloudflare/);
    assert.match(source, /DNS-only/);
    assert.match(source, /Hetzner/);
    assert.match(source, /changelog\.secpal\.app/);
    assert.match(source, /Reverse Proxy/i);
    assert.match(source, /\bWAF\b/);
    assert.match(source, /Data Privacy Framework/);
    assert.match(
      source,
      /Standardvertragsklauseln|Standard Contractual Clauses/
    );
  }
  assert.match(compactPages.de, /autoritative DNS-Dienste/);
  assert.match(compactPages.en, /authoritative DNS services/);
  assert.doesNotMatch(compactPages.de, /Domainverwaltung/);
  assert.doesNotMatch(compactPages.en, /domain management/i);
  assert.match(
    compactPages.de,
    /HTTP- und HTTPS-Verkehr[^.]*direkt[^.]*Hetzner/
  );
  assert.match(
    compactPages.en,
    /HTTP and HTTPS traffic[^.]*directly[^.]*Hetzner/
  );
});

test("recipient labels preserve a visible space after the colon", () => {
  const recipientLabels = {
    de: [
      "Hetzner Online GmbH:",
      "Cloudflare, Inc.:",
      "Uberspace, betrieben von Jonas Pasche:",
    ],
    en: [
      "Hetzner Online GmbH:",
      "Cloudflare, Inc.:",
      "Uberspace, operated by Jonas Pasche:",
    ],
  };

  for (const [locale, labels] of Object.entries(recipientLabels)) {
    for (const label of labels) {
      assert.ok(
        compactPages[locale].includes(`${label}</strong > {" "}`),
        `${locale} recipient label "${label}" must retain explicit spacing`
      );
    }
  }
});

test("inline email links preserve surrounding spaces and punctuation", () => {
  assert.match(
    compactPages.de,
    /Anfragen zu Betroffenenrechten können an\{" "\} <a[^>]*href="mailto:hello@secpal\.app"[^>]*>hello@secpal\.app<\/a\s*> \{" "\} gerichtet werden\./
  );
  assert.match(
    compactPages.en,
    /Requests concerning data subject rights may be sent to\{" "\} <a[^>]*href="mailto:hello@secpal\.app"[^>]*>hello@secpal\.app<\/a\s*>\{"\."\}/
  );
});

test("email processing and deletion are documented for Uberspace", () => {
  for (const source of Object.values(pages)) {
    assert.match(source, /Uberspace/);
    assert.match(source, /Jonas Pasche/);
    assert.match(source, /hello@secpal\.app/);
  }
  assert.match(pages.de, /Nachrichteninhalt/);
  assert.match(pages.en, /message content/);
  assert.match(pages.de, /Anhänge/);
  assert.match(pages.en, /attachments/);
  assert.match(pages.de, /Art\. 6 Abs\. 1 lit\. b DSGVO/);
  assert.match(pages.de, /Art\. 6 Abs\. 1 lit\. f DSGVO/);
  assert.match(pages.en, /Article 6\(1\)\(b\) GDPR/);
  assert.match(pages.en, /Article 6\(1\)\(f\) GDPR/);
  assert.match(pages.de, /nach abschließender Bearbeitung/);
  assert.match(
    pages.en,
    /after (?:the request has been finally processed|final processing)/
  );
});

test("the local theme preference is the only documented browser storage", () => {
  for (const source of Object.values(compactPages)) {
    assert.match(source, /<code[^>]*>theme<\/code\s*>/);
    assert.match(source, /<code[^>]*>light<\/code\s*>/);
    assert.match(source, /<code[^>]*>dark<\/code\s*>/);
  }
  assert.match(compactPages.de, /lokalen Speicher des Browsers/);
  assert.match(compactPages.en, /browser's local storage/);
  assert.match(compactPages.de, /secpal\.app und changelog\.secpal\.app/);
  assert.match(compactPages.en, /secpal\.app and changelog\.secpal\.app/);
  assert.match(compactPages.de, /§ 25 Abs\. 2 Nr\. 2 TDDDG/);
  assert.match(compactPages.en, /Section 25\(2\)\(2\) TDDDG/);
  assert.match(
    compactPages.de,
    /weder an SecPal noch an einen externen Anbieter übermittelt/
  );
  assert.match(
    compactPages.en,
    /not transmitted to SecPal or an external provider/
  );
});

test("the pages exclude web analytics, tracking, and visitor profiles", () => {
  assert.match(
    compactPages.de,
    /keine Webanalyse-, Marketing- oder Nutzertrackingdienste/
  );
  assert.match(
    compactPages.en,
    /does not use web analytics, marketing, or user-tracking services/
  );
  assert.match(compactPages.de, /keine Besucherprofile/);
  assert.match(compactPages.en, /No visitor profiles/);
  assert.match(
    compactPages.de,
    /keine optionalen Analyse- oder Marketing-Cookies/
  );
  assert.match(compactPages.en, /no optional analytics or marketing cookies/);
  for (const source of Object.values(compactPages)) {
    assert.match(
      source,
      /secpal\.app, changelog\.secpal\.app und apk\.secpal\.app|secpal\.app, changelog\.secpal\.app, and apk\.secpal\.app/
    );
  }
});

test("external GitHub navigation is click-only and suppresses the referrer", () => {
  assert.match(compactPages.de, /externen Angeboten/);
  assert.match(compactPages.en, /external services/);
  assert.match(
    compactPages.de,
    /Inhalte dieser Anbieter werden nicht eingebettet/
  );
  assert.match(compactPages.en, /Content from these providers is not embedded/);
  assert.match(compactPages.de, /Erst beim Auswählen eines externen Links/);
  assert.match(compactPages.en, /Only when a person selects an external link/);
  assert.match(compactPages.de, /jeweilige Anbieter verantwortlich/);
  assert.match(compactPages.en, /respective provider is responsible/);
  assert.match(compactPages.de, /HTTP-Referrer/);
  assert.match(compactPages.en, /HTTP referrer/);
});

test("every visible SecPal GitHub link suppresses the referrer", () => {
  const sourceFiles = readdirSync(new URL("../src", import.meta.url), {
    recursive: true,
    withFileTypes: true,
  })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".astro"))
    .map(
      (entry) => new URL(entry.name, new URL(`${entry.parentPath}/`, "file:"))
    );
  let linkCount = 0;

  for (const path of sourceFiles) {
    const source = readFileSync(path, "utf8");
    const githubAnchors =
      source.match(
        /<a\b(?=[^>]*href="https:\/\/github\.com\/SecPal")[^>]*>/g
      ) ?? [];

    linkCount += githubAnchors.length;
    for (const anchor of githubAnchors) {
      assert.match(
        anchor,
        /\breferrerpolicy="no-referrer"/,
        `${path.pathname} contains an unhardened GitHub link`
      );
      assert.doesNotMatch(anchor, /\btarget="_blank"/);
    }
  }

  assert.equal(linkCount, 2);
});

test("superseded app and beta topics are absent from both privacy pages", () => {
  const forbidden =
    /\b(?:Beta|beta distribution|Google Play|Play Store|Device Owner|Managed Device|Provisioning|Bootstrap|Push|Benutzerkonto|user account|Beschäftigtendaten|employee data|SaaS|GoAccess|App-Daten löschen|delete app data)\b/i;

  for (const [locale, source] of Object.entries(pages)) {
    assert.doesNotMatch(
      source,
      forbidden,
      `${locale} privacy page contains superseded product-internal content`
    );
  }
});
