// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Translations } from "./en.ts";

export const de: Translations = {
  nav: {
    workflow: "Ablauf",
    roadmap: "Roadmap",
    android: "Android",
    headerCta: "Kontakt aufnehmen",
    toggleDarkMode: "Dunkelmodus umschalten",
    openMenu: "Hauptmenü öffnen",
    mobileMenu: "Mobile Navigation",
    closeMenu: "Menü schließen",
  },
  hero: {
    description:
      "Open-Source-Software für professionelle Sicherheitsorganisationen. Mehr über die Entwicklung und Produktprioritäten von SecPal.",
    badge: "Aus langjähriger Praxis im Sicherheitsdienst",
    headline: "Mehr Übersicht im Sicherheits\u00addienst.",
    subline:
      "SecPal entwickelt Open-Source-Software für physische, organisatorische und personelle Sicherheit. Sie richtet sich an Sicherheitsdienstleister, professionelle Sicherheitsorganisationen und ihre Auftraggeber.",
    cta: "SecPal kennenlernen",
    note: "SecPal ist in aktiver Entwicklung und hat die Version 1.0 noch nicht erreicht.",
  },
  features: {
    headline: "Viele Informationen. Zu viele Wege.",
    subline:
      "Diese Beispiele zeigen, wo verknüpfte Werkzeuge den Sicherheitsalltag erleichtern können.",
    items: [
      {
        name: "Dienstplanung",
        description:
          "Ausfälle, Vertretungen und kurzfristige Änderungen müssen alle erreichen – ohne unterschiedliche Planstände und unnötige Rückfragen.",
      },
      {
        name: "Informationen zum Einsatz",
        description:
          "Dienstanweisungen, Ansprechpartner und aktuelle Hinweise müssen dort verfügbar sein, wo sie gebraucht werden.",
      },
      {
        name: "Wachbuch und Auswertung",
        description:
          "Wachbucheinträge, Kontrollgänge und Vorkommnisse müssen nachvollziehbar erfasst und für Betrieb und Auftraggeber verständlich aufbereitet werden.",
      },
    ],
    closing:
      "SecPal soll helfen, zusammengehörige Informationen leichter zu finden und weiterzuverwenden.",
  },
  workflow: {
    overline: "Beispielablauf",
    headline: "Von der Vorbereitung bis zur Auswertung eines Einsatzes.",
    introduction:
      "Dieses Beispiel zeigt, wie Informationen über den gesamten Einsatz hinweg genutzt werden könnten.",
    steps: [
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
          "Erbrachte Leistungen und dokumentierte Ereignisse für den eigenen Betrieb und den Auftraggeber nachvollziehbar zusammenfassen.",
      },
    ],
    closing:
      "Informationen einmal erfassen, damit die Beteiligten sie während des gesamten Einsatzes nutzen können.",
  },
  outcomes: {
    overline: "Nachvollziehbare Sicherheitsdienstleistung",
    headline: "Was im Einsatz geleistet wird, sollte nachvollziehbar sein.",
    introduction:
      "Sicherheitsdienstleistungen sind für Auftraggeber oft schwer sichtbar – gerade dann, wenn sie zuverlässig und ohne besondere Vorkommnisse erbracht werden. Strukturierte Dokumentation macht sichtbar, welche Leistungen erbracht und welche Ereignisse während eines Einsatzes festgehalten wurden.",
    items: [
      {
        name: "Leistung nachvollziehen",
        description:
          "Besetzungen, Kontrollgänge, Ereignisse und Übergaben in einem verständlichen Gesamtbild zusammenführen.",
      },
      {
        name: "Zeiträume überblicken",
        description:
          "Dokumentierte Leistungen und Ereignisse für ausgewählte Objekte und Zeiträume übersichtlich zusammenfassen.",
      },
      {
        name: "Auftraggeber informieren",
        description:
          "Relevante Informationen verständlich aufbereiten, ohne Berichte nachträglich aus Papier, Tabellen und einzelnen Dateien zusammenzustellen.",
      },
    ],
    closing:
      "SecPal soll es Sicherheitsorganisationen und ihren Auftraggebern erleichtern, diese Dokumentation auszuwerten.",
  },
  developmentStatus: {
    headline: "Entwicklung und Betrieb",
    introduction:
      "Die Roadmap beschreibt die Produktprioritäten. Die Architekturdokumentation verweist auf akzeptierte Entscheidungen und die für die Umsetzung zuständigen Repositories.",
    roadmapLink: "Zur Roadmap",
    architectureLink: "Zur Architektur",
    hostingTitle: "Selbstbetrieb und SecPal Managed",
    hostingDescription:
      "Für beide Betriebsmodelle ist derselbe Funktionsumfang vorgesehen. Der Selbstbetrieb ist portabel ausgelegt. SecPal Managed soll Hosting und Betrieb als Dienstleistung ergänzen.",
    hostingLink: "Zur Dokumentation für die Bereitstellung",
  },
  cta: {
    headline: "Was zählt, ist der Arbeits\u00adalltag.",
    subline:
      "Erfahrungen, Anforderungen und Hinweise aus dem Alltag von Sicherheitsdiensten sind für die weitere Entwicklung von SecPal besonders wertvoll.",
    button: "Kontakt aufnehmen",
    buttonSecondary: "Entwicklung auf GitHub ansehen",
    note: "",
  },
  roadmap: {
    title: "Roadmap – SecPal",
    description:
      "Aktuelle Produktprioritäten für SecPal, SecPal Assure und SecPal Visit.",
    headline: "Wohin SecPal sich entwickelt.",
    subline:
      "Die Produktprioritäten können sich mit dem Bedarf und neuen Erkenntnissen ändern.",
    now: {
      label: "Aktueller Schwerpunkt",
      description:
        "Zuerst Personal und Objekte, danach die Einsatzdokumentation",
      items: [
        {
          name: "Personal- und Objektverwaltung",
          description:
            "Personal, Zuständigkeiten und Schutzobjekte im Sicherheitsbetrieb zusammenführen.",
        },
        {
          name: "Wachbuch und Arbeitszeiterfassung",
          description:
            "Ereignisse und Korrekturen im Wachbuch nachvollziehbar dokumentieren. Arbeitszeit in einem eigenen Fachbereich erfassen.",
        },
      ],
    },
    next: {
      label: "Nach betrieblichem Bedarf",
      description: "Weitere Prioritäten für das Hauptprodukt",
      items: [
        {
          name: "Kontrollgänge und Dienstplanung",
          description:
            "Strukturierte Kontrollgänge sowie die Schicht- und Besetzungsplanung unterstützen.",
        },
      ],
    },
    later: {
      label: "Produktfamilie",
      description: "Sollen schrittweise folgen",
      items: [
        {
          name: "SecPal Assure und SecPal Visit",
          description:
            "Die Spezialprodukte können eigenständig oder mit SecPal verbunden konzipiert werden.",
        },
      ],
    },
  },
  footer: {
    rights: "",
    links: {
      privacy: "Datenschutz",
      imprint: "Impressum",
      security: "Sicherheit",
      github: "GitHub",
    },
  },
};
