// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Translations } from "./en.ts";

export const de: Translations = {
  nav: {
    focus: "Schwerpunkte",
    approach: "Unser Ansatz",
    openSource: "Open Source",
    contact: "Kontakt",
    primary: "Hauptnavigation",
    toggleDarkMode: "Dunkelmodus umschalten",
    openMenu: "Hauptmenü öffnen",
    mobileMenu: "Mobile Navigation",
    closeMenu: "Menü schließen",
  },
  hero: {
    description:
      "SecPal entwickelt quelloffene Fachsoftware für physische, organisatorische und personelle Sicherheit.",
    headline: "Sicherheit organisieren",
    product:
      "Das gleichnamige Hauptprodukt SecPal entsteht als integriertes System für die administrative und operative Arbeit von Sicherheitsdienstleistern, betrieblichen Sicherheitsorganisationen und ihren Auftraggebern.",
    status: "Die Software befindet sich in aktiver Entwicklung.",
  },
  focus: {
    headline: "Schwerpunkte",
    introduction:
      "Diese vier Bereiche bestimmen die fachliche Ausrichtung der Entwicklung von SecPal.",
    items: [
      {
        name: "Personal",
        description:
          "Personalverwaltung, Beschäftigung, Qualifikationen und Arbeitszeit.",
      },
      {
        name: "Objekte",
        description:
          "Auftraggeber, Objekte, Anforderungen und Zuständigkeiten.",
      },
      {
        name: "Operative Sicherheit",
        description:
          "Wachbuch, Kontrollgänge, Vorkommnisse und Einsatzdokumentation.",
      },
      {
        name: "Organisation",
        description: "Dienstplanung, Geschäftsabläufe und Zusammenarbeit.",
      },
    ],
  },
  approach: {
    headline: "Unser Ansatz",
    purpose:
      "Software soll Arbeit abnehmen. Papierformulare zu digitalisieren ist ein Schritt dorthin.",
    workflows:
      "Wir wollen Informationen wiederverwenden, zusammengehörige Abläufe verbinden und geeignete Routineaufgaben zuverlässig automatisieren.",
    data: "Wir entwickeln SecPal so, dass nur erforderliche Daten erhoben, für den festgelegten Zweck verwendet und nur Berechtigten zugänglich werden.",
  },
  openSource: {
    headline: "Open Source und unabhängiger Betrieb",
    license: "Der Quellcode von SecPal steht unter der AGPL v3+.",
    hosting:
      "Wer SecPal nutzt, soll das Betriebsmodell frei wählen können. Für den Eigenbetrieb und einen künftigen Managed-Betrieb ist derselbe Funktionsumfang vorgesehen, ohne künstliche Einschränkungen oder proprietäre Premiumfunktionen.",
  },
  cta: {
    headline: "Kontakt",
    subline: "Haben Sie eine Frage zu SecPal? Schreiben Sie uns.",
  },
  footer: {
    links: {
      privacy: "Datenschutz",
      imprint: "Impressum",
      security: "Sicherheit",
      source: "Quellcode",
    },
  },
};
