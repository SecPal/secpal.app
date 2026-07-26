// SPDX-FileCopyrightText: 2026 SecPal Contributors
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
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
    'description="Datenschutzhinweise für secpal.app, die Downloadressourcen auf apk.secpal.app und die Kontaktaufnahme mit SecPal."',
    'canonicalPath="/de/privacy/"',
    'currentPath="/privacy"',
    'eyebrow="Rechtliches"',
    'headline="Datenschutzerklärung"',
    'intro="Diese Datenschutzhinweise erklären, wie personenbezogene Daten beim Besuch von secpal.app, beim Abruf von Downloadressourcen auf apk.secpal.app und bei der Kontaktaufnahme per E-Mail verarbeitet werden."',
    'updatedLabel="Stand"',
    'updatedAt="26. Juli 2026"',
  ],
  en: [
    'title="Privacy Notice | SecPal"',
    'description="Privacy notice for secpal.app, download resources on apk.secpal.app, and direct contact with SecPal."',
    'canonicalPath="/en/privacy/"',
    'currentPath="/privacy"',
    'eyebrow="Legal"',
    'headline="Privacy Notice"',
    'intro="This privacy notice explains how personal data is processed when secpal.app is visited, download resources on apk.secpal.app are requested, or SecPal is contacted by email."',
    'updatedLabel="Last updated"',
    'updatedAt="July 26, 2026"',
  ],
};

const expectedSections = {
  de: [
    "Geltungsbereich",
    "Verantwortlicher",
    "Bereitstellung von Website und Downloads",
    "Lokale Darstellungspräferenz",
    "Kontaktaufnahme per E-Mail",
    "Rechte betroffener Personen",
  ],
  en: [
    "Scope",
    "Controller",
    "Website and download delivery",
    "Local display preference",
    "Contact by email",
    "Data subject rights",
  ],
};

const extractHeadings = (source) =>
  [...source.matchAll(/<h2\b[^>]*>\s*(\d+)\.\s*([^<]+?)\s*<\/h2>/g)].map(
    ([, number, name]) => ({
      number: Number(number),
      name: name.replace(/\s+/g, " ").trim(),
    })
  );

test("localized privacy pages use the exact shell metadata", () => {
  for (const [locale, source] of Object.entries(pages)) {
    assert.match(source, /import LegalPageShell from/);
    for (const property of expectedShellProps[locale]) {
      assert.ok(
        source.includes(property),
        `${locale} privacy page must contain ${property}`
      );
    }
  }
});

test("localized privacy pages have exactly six aligned numbered sections", () => {
  for (const [locale, source] of Object.entries(pages)) {
    const headings = extractHeadings(source);

    assert.equal(headings.length, 6);
    assert.deepEqual(
      headings.map(({ number }) => number),
      [1, 2, 3, 4, 5, 6]
    );
    assert.deepEqual(
      headings.map(({ name }) => name),
      expectedSections[locale]
    );
  }

  assert.equal(
    extractHeadings(pages.de).length,
    extractHeadings(pages.en).length
  );
});

test("the controller and contact details remain complete and ordered", () => {
  assert.match(
    compactPages.de,
    /Verantwortlicher im Sinne der DSGVO ist:<\/p> <div[^>]*> <p[^>]*>SecPal<\/p> <p[^>]*>Holger Schmermbeck<\/p>/
  );
  assert.match(
    compactPages.en,
    /The controller within the meaning of the GDPR is:<\/p> <div[^>]*> <p[^>]*>SecPal<\/p> <p[^>]*>Holger Schmermbeck<\/p>/
  );

  for (const source of Object.values(pages)) {
    assert.match(source, /Enno-Arends-Str\. 4/);
    assert.match(source, /26571 Juist/);
    assert.match(source, /href="mailto:hello@secpal\.app"/);
    assert.doesNotMatch(
      source,
      /Datenschutzbeauftragter|Data Protection Officer/i
    );
  }
  assert.match(pages.de, /Deutschland/);
  assert.match(pages.en, /Germany/);
});

test("scope distinguishes public services from processing inside SecPal instances", () => {
  assert.match(compactPages.de, /öffentliche Website secpal\.app/);
  assert.match(compactPages.de, /Downloadressourcen auf apk\.secpal\.app/);
  assert.match(compactPages.de, /direkte Kontaktaufnahme mit SecPal/);
  assert.match(
    compactPages.de,
    /nicht für die Verarbeitung personenbezogener Daten innerhalb einer installierten oder betriebenen SecPal-Instanz/
  );
  assert.match(
    compactPages.de,
    /über die Zwecke und Mittel der Verarbeitung innerhalb der jeweiligen Instanz entscheidet/
  );

  assert.match(compactPages.en, /public secpal\.app website/);
  assert.match(compactPages.en, /download resources on apk\.secpal\.app/);
  assert.match(compactPages.en, /direct contact with SecPal/);
  assert.match(
    compactPages.en,
    /does not apply to the processing of personal data within an installed or operated SecPal instance/
  );
  assert.match(
    compactPages.en,
    /determines the purposes and means of processing within the respective instance/
  );

  for (const source of Object.values(pages)) {
    assert.doesNotMatch(
      source,
      /von einem Kunden installierten oder betriebenen/i
    );
    assert.doesNotMatch(source, /installed or operated by a customer/i);
    assert.doesNotMatch(
      source,
      /customer-operated|customer-hosted|SecPal-operated|self-hosted/i
    );
  }
});

test("website and download delivery contains the required processing information", () => {
  const expectedPatterns = {
    de: [
      /IP-Adresse/,
      /angeforderte Inhalt/,
      /vorübergehend verarbeitet/,
      /Hetzner Online GmbH/,
      /Art\. 6 Abs\. 1 lit\. f DSGVO/,
      /berechtigte Interesse/,
      /keine regulären Webserver-Zugriffs- oder Fehlerprotokolle/,
      /keine Analyse-, Marketing- oder Trackingdienste/,
      /nicht dauerhaft gespeichert/,
      /technisch erforderlichen Verbindungsdaten ist notwendig/,
    ],
    en: [
      /IP address/,
      /requested content/,
      /processed temporarily/,
      /Hetzner Online GmbH/,
      /Article 6\(1\)\(f\) GDPR/,
      /legitimate interest/,
      /no regular web server access or error logs/,
      /does not use analytics, marketing, or tracking services/,
      /not stored permanently/,
      /technically necessary connection data is required/,
    ],
  };

  for (const [locale, patterns] of Object.entries(expectedPatterns)) {
    for (const pattern of patterns) {
      assert.match(compactPages[locale], pattern);
    }
  }
  assert.doesNotMatch(compactPages.de, /keine Daten werden verarbeitet/i);
  assert.doesNotMatch(compactPages.en, /no data is processed/i);
});

test("local display preference is explained without implementation details", () => {
  const expectedPatterns = {
    de: [
      /Hell- oder Dunkelmodus manuell auswählt/,
      /lokalen Speicher des Browsers/,
      /nicht an SecPal oder einen externen Anbieter übermittelt/,
      /bis sie geändert oder der lokale Browserspeicher gelöscht wird/,
      /§ 25 Abs\. 2 Nr\. 2 TDDDG/,
      /erfordert keine Einwilligung/,
    ],
    en: [
      /manually selects light or dark mode/,
      /browser's local storage/,
      /not transmitted to SecPal or an external provider/,
      /until it is changed or the browser's local storage is cleared/,
      /Section 25\(2\)\(2\) TDDDG/,
      /does not require consent/,
    ],
  };

  for (const [locale, patterns] of Object.entries(expectedPatterns)) {
    for (const pattern of patterns) {
      assert.match(compactPages[locale], pattern);
    }
  }
  for (const source of Object.values(pages)) {
    assert.doesNotMatch(source, /<code\b/i);
    assert.doesNotMatch(source, /\btheme\b/i);
  }
});

test("email processing, legal bases, necessity, and deletion remain visible", () => {
  const expectedPatterns = {
    de: [
      /Uberspace/,
      /Jonas Pasche/,
      /Mainz/,
      /Kontaktdaten/,
      /Inhalt der Nachricht/,
      /Anhänge/,
      /Bearbeitung der Anfrage/,
      /Art\. 6 Abs\. 1 lit\. b DSGVO/,
      /Art\. 6 Abs\. 1 lit\. f DSGVO/,
      /Kontaktaufnahme ist freiwillig/,
      /erreichbare Absenderadresse/,
      /nach abschließender Bearbeitung/,
      /gesetzliche Aufbewahrungspflicht/,
    ],
    en: [
      /Uberspace/,
      /Jonas Pasche/,
      /Mainz, Germany/,
      /contact details/,
      /content of the message/,
      /attachments/,
      /handle the inquiry/,
      /Article 6\(1\)\(b\) GDPR/,
      /Article 6\(1\)\(f\) GDPR/,
      /Contact by email is voluntary/,
      /reachable sender address/,
      /after the inquiry has been finally processed/,
      /statutory retention obligation/,
    ],
  };

  for (const [locale, patterns] of Object.entries(expectedPatterns)) {
    for (const pattern of patterns) {
      assert.match(compactPages[locale], pattern);
    }
  }
});

test("data subject rights and supervisory authority remain complete", () => {
  const expectedPatterns = {
    de: [
      /Auskunft/,
      /Berichtigung/,
      /Löschung/,
      /Einschränkung/,
      /Datenübertragbarkeit/,
      /Widerspruchsrecht/,
      /beschweren/,
      /Landesbeauftragte für den Datenschutz Niedersachsen/,
      /hello@secpal\.app/,
    ],
    en: [
      /access/,
      /rectification/,
      /erasure/,
      /restriction/,
      /data portability/,
      /right to object/,
      /lodge a complaint/,
      /State Commissioner for Data Protection of Lower Saxony/,
      /hello@secpal\.app/,
    ],
  };

  for (const [locale, patterns] of Object.entries(expectedPatterns)) {
    for (const pattern of patterns) {
      assert.match(compactPages[locale], pattern);
    }
    assert.match(pages[locale], /href="mailto:hello@secpal\.app"/);
    assert.doesNotMatch(pages[locale], /Prinzenstraße 5|30159 Hannover/);
  }
});

test("public privacy pages exclude disproportionate infrastructure detail", () => {
  const forbiddenTerms = [
    /Cloudflare/i,
    /Domain Name System/i,
    /\bDNS\b/i,
    /DNS-only/i,
    /Reverse Proxy/i,
    /\bCDN\b/i,
    /\bWAF\b/i,
    /Data Privacy Framework/i,
    /Standardvertragsklauseln/i,
    /Standard Contractual Clauses/i,
    /Drittlandübermittlung/i,
    /international transfers/i,
    /GitHub/i,
    /HTTP-Referrer/i,
    /HTTP referrer/i,
    /CRM-Profile/i,
    /CRM profiles/i,
    /Warteschlangensystem/i,
    /queue systems/i,
    /User-Agent/i,
    /user agent/i,
    /Crawlerinformation/i,
    /crawler information/i,
    /Besucherprofil/i,
    /visitor profiling/i,
    /Einwilligungsbanner/i,
    /consent banner/i,
  ];

  for (const [locale, source] of Object.entries(pages)) {
    for (const term of forbiddenTerms) {
      assert.doesNotMatch(
        source,
        term,
        `${locale} privacy page contains forbidden term ${term}`
      );
    }
  }
});
