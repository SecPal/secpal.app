// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Translations } from "./en.ts";

export const de: Translations = {
  nav: {
    progress: "Fortschritt",
    roadmap: "Roadmap",
    android: "Android",
    github: "GitHub",
    contact: "Kontakt",
    headerCta: "Kontakt aufnehmen",
    toggleDarkMode: "Dunkelmodus umschalten",
    openMenu: "Hauptmenü öffnen",
    mobileMenu: "Mobile Navigation",
    closeMenu: "Menü schließen",
  },
  hero: {
    badge: "Aus langjähriger Praxis im Sicherheitsdienst",
    headline: "Mehr Übersicht im Sicherheits\u00addienst.",
    subline:
      "SecPal entsteht für Sicherheitsdienste in Deutschland: Dienstplanung, Einsatzinformationen und Dokumentation an einem Ort – statt verteilt auf Papier, Tabellen und einzelne Programme.",
    cta: "SecPal kennenlernen",
    note: "SecPal befindet sich derzeit im Aufbau.",
  },
  features: {
    headline: "Viele Informationen. Zu viele Wege.",
    subline:
      "SecPal konzentriert sich auf klare Abläufe, verlässliche Dokumentation und Übersicht im täglichen Betrieb.",
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
      "SecPal verbindet diese Bereiche in einem gemeinsamen, verständlichen Ablauf.",
  },
  workflow: {
    overline: "Ein durchgängiger Ablauf",
    headline: "Vom Dienstplan bis zur Auswertung.",
    introduction:
      "SecPal verbindet Informationen entlang der tatsächlichen Arbeit im Sicherheitsdienst – statt sie in getrennten Anwendungen festzuhalten.",
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
      "Das Prinzip: Informationen einmal erfassen und anschließend dort bereitstellen, wo sie benötigt werden.",
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
      "SecPal schafft aus operativer Dokumentation einen klaren Überblick für den eigenen Betrieb und den Auftraggeber.",
  },
  developmentStatus: {
    overline: "Aktueller Entwicklungsstand",
    headline: "SecPal entsteht Schritt für Schritt.",
    introduction:
      "Der aktuelle Schwerpunkt liegt auf der Dienstplanung. Weitere betriebliche Bereiche sind für spätere Entwicklungsschritte vorgesehen – ohne feste Termine.",
    phases: [
      {
        status: "Aktuell",
        name: "Dienstplanung",
        description:
          "Im Mittelpunkt stehen Dienstpläne, Schichtzuweisungen und eine nachvollziehbare Besetzungsplanung.",
      },
      {
        status: "Als Nächstes",
        name: "Online-Wächterkontrollsystem",
        description:
          "Kontrollgänge sollen strukturiert erfasst und mit Wachbuch und Einsatzdokumentation verbunden werden.",
      },
      {
        status: "Später",
        name: "Weitere betriebliche Bereiche",
        description:
          "Vertragsverwaltung und strukturierte Dienstanweisungen gehören zur längerfristigen Richtung von SecPal.",
      },
    ],
    closing:
      "Diese Reihenfolge beschreibt den aktuellen Planungsstand. Sie kann sich mit den Erkenntnissen aus Entwicklung und Praxis verändern.",
    link: "Roadmap im Detail ansehen",
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
      "Wohin SecPal sich entwickelt — aktueller Entwicklungsfokus, nächste geplante Schritte und längerfristige Richtung.",
    headline: "Wohin SecPal sich entwickelt.",
    subline:
      "SecPal entsteht öffentlich. Diese Seite zeigt den aktuellen Entwicklungsfokus, die nächsten geplanten Schritte und die längerfristige Richtung — ohne feste Termine und ohne Marketingversprechen.",
    now: {
      label: "Aktuell",
      description: "In aktiver Entwicklung",
      items: [
        {
          name: "Dienstplanung",
          description:
            "Dienstpläne, Schichtzuweisungen und Besetzungsplanung — eingebaut in den operativen Ablauf statt separat verwaltet.",
        },
      ],
    },
    next: {
      label: "Als Nächstes",
      description: "Für die nahe Zukunft geplant",
      items: [
        {
          name: "Online-Wächterkontrollsystem (OWKS)",
          description:
            "Kontrollgänge strukturiert erfassen und nachvollziehbar mit Wachbuch und Einsatzdokumentation verbinden.",
        },
      ],
    },
    later: {
      label: "Später",
      description: "Längerfristige Richtung — ohne feste Termine",
      items: [
        {
          name: "Vertragsverwaltung & digitale Unterschrift",
          description:
            "Kunden- und Arbeitsverträge an einem Ort verwalten und digitale Unterschriften in die vorgesehenen betrieblichen Abläufe einbinden.",
        },
        {
          name: "Dienstanweisungskonfigurator",
          description:
            "Objektbezogene Dienstanweisungen erstellen und pflegen — strukturiert, versioniert und direkt mit Objekten und Schichten verknüpft.",
        },
      ],
    },
    changelog: {
      label: "Was ausgeliefert wurde",
      description:
        "Jedes ausgelieferte Feature und jeden Fix dokumentiert changelog.secpal.app — die vollständige Versionshistorie über API, Web-App und Android.",
      link: "Zum Changelog",
      href: "https://changelog.secpal.app",
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
