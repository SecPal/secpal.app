// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Translations } from "./en.ts";

export const de: Translations = {
  nav: {
    features: "Funktionen",
    pricing: "Preise",
    docs: "Dokumentation",
    signIn: "Anmelden",
    getStarted: "Loslegen",
  },
  hero: {
    badge: "Open Source · AGPL-3.0 · On-Premise oder SaaS",
    headline: "Der beste Freund\ndes Wachmanns.",
    subline:
      "SecPal digitalisiert das Büro Ihres Sicherheitsdienstes — Wachbuch, Wächterkontrolle, Dienstplanung und Mitarbeiterverwaltung in einer Plattform. Kein Papier mehr, kein Aktenchaos.",
    cta: "Kostenlos starten",
    ctaSecondary: "Auf GitHub ansehen",
  },
  features: {
    headline: "Alles, was ein moderner Sicherheitsdienst braucht.",
    subline:
      "Von der ersten Streife bis zur Schichtabrechnung — SecPal ersetzt Klemmbrett, Excel und Aktenschrank.",
    items: [
      {
        name: "Digitales Wachbuch",
        description:
          "Ereignisse, Vorkommnisse und Meldungen revisionssicher protokollieren. Papierlos, jederzeit nachvollziehbar — auf Smartphone, Tablet oder Desktop.",
      },
      {
        name: "Wächterkontrolle",
        description:
          "NFC- und GPS-gestützte Kontrollpunkterfassung. Touren werden lückenlos dokumentiert, Abweichungen sofort sichtbar.",
      },
      {
        name: "Dienstplanung",
        description:
          "Schichtpläne erstellen, Verfügbarkeiten verwalten, Dienste zuweisen. Änderungen erreichen Ihr Team sofort — kein Zettelchaos mehr.",
      },
      {
        name: "Mitarbeiterverwaltung",
        description:
          "Qualifikationen, Zertifikate und Unterlagen an einem Ort. Ablaufende Nachweise werden automatisch erkannt.",
      },
      {
        name: "On-Premise oder SaaS",
        description:
          "Volle Datensouveränität: Betreiben Sie SecPal auf Ihrem eigenen Server — oder nutzen Sie unser Hosting. Ihre Wahl, kein blindes Vertrauen nötig.",
      },
      {
        name: "DSGVO-konform",
        description:
          "Alle personenbezogenen Daten verschlüsselt gespeichert. Revisionssichere Protokolle für Behördenprüfungen und Aufsichtsbehörden.",
      },
    ],
  },
  cta: {
    headline: "Bereit für das papierlose Büro?",
    subline: "Kostenlos starten oder selbst hosten — ganz ohne Kreditkarte.",
    button: "Jetzt starten",
    buttonSecondary: "Kontakt aufnehmen",
  },
  footer: {
    rights: "Alle Rechte vorbehalten.",
    links: {
      privacy: "Datenschutz",
      terms: "AGB",
      security: "Sicherheit",
      github: "GitHub",
    },
  },
};
