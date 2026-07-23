// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Translations } from "./en.ts";

export const de: Translations = {
  nav: {
    progress: "Fortschritt",
    roadmap: "Roadmap",
    android: "Android",
    updates: "Folgen",
    github: "GitHub",
    contact: "Kontakt",
    followProgress: "Fortschritt verfolgen",
    toggleDarkMode: "Dunkelmodus umschalten",
    openMenu: "Hauptmenü öffnen",
    mobileMenu: "Mobile Navigation",
    closeMenu: "Menü schließen",
  },
  hero: {
    badge: "Aus langjähriger Praxis im Sicherheitsdienst",
    tagline: "SecPal – A guard’s best friend",
    headline: "Mehr Übersicht im Sicherheits\u00addienst.",
    subline:
      "SecPal entsteht für Sicherheitsdienste in Deutschland. Dienstplanung, Informationen zum Einsatz und Dokumentation sollen übersichtlich zusammenkommen – statt auf Papier, in Tabellen und einzelnen Programmen verteilt zu sein.",
    explanation:
      "SecPal ist für Sicherheitsdienste gebaut, die operative Arbeit in einem klaren Ablauf organisieren statt sie über Papier, Chats und Insellösungen zu verteilen.",
    highlights: [
      "Operative Abläufe gehören in ein durchgängiges System statt in einzelne Teillösungen.",
      "Informationen bleiben nachvollziehbar — nicht verstreut in Notizen, Kurznachrichten und verteilten Dateien.",
      "SecPal entsteht öffentlich, mit klarem Fokus und nachvollziehbaren Release-Schritten.",
    ],
    cta: "Mehr über SecPal erfahren",
    ctaSecondary: "Entwicklung auf GitHub verfolgen",
    note: "SecPal befindet sich derzeit im Aufbau.",
  },
  features: {
    headline: "Viele Informationen. Zu viele Wege.",
    subline:
      "SecPal konzentriert sich auf das, was im Sicherheitsdienst täglich funktionieren muss: klare Abläufe, verlässliche Dokumentation und Übersicht für Teams und Führung.",
    items: [
      {
        name: "Dienstplanung",
        description:
          "Ausfälle, Vertretungen und kurzfristige Änderungen müssen schnell alle erreichen – ohne unterschiedliche Planstände und unnötige Rückfragen.",
      },
      {
        name: "Informationen zum Einsatz",
        description:
          "Dienstanweisungen, Ansprechpartner, Besonderheiten und aktuelle Hinweise müssen dort verfügbar sein, wo sie gebraucht werden.",
      },
      {
        name: "Wachbuch und Auswertung",
        description:
          "Wachbucheinträge, Kontrollgänge, besondere Vorkommnisse und Übergaben sollen nachvollziehbar erfasst und für den eigenen Betrieb sowie für den Auftraggeber verständlich ausgewertet werden können.",
      },
    ],
    closing:
      "SecPal soll diese Bereiche in einem gemeinsamen, verständlichen Ablauf zusammenführen.",
  },
  workflow: {
    overline: "Ein durchgängiger Ablauf",
    headline: "Vom Dienstplan bis zur Auswertung.",
    introduction:
      "SecPal soll Informationen entlang der tatsächlichen Arbeit im Sicherheitsdienst miteinander verbinden – statt sie in voneinander getrennten Anwendungen festzuhalten.",
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
          "Erbrachte Leistungen, Auffälligkeiten und Entwicklungen für den eigenen Betrieb und den Auftraggeber nachvollziehbar darstellen.",
      },
    ],
    closing:
      "Informationen sollen einmal erfasst werden und anschließend dort verfügbar sein, wo sie benötigt werden.",
  },
  outcomes: {
    overline: "Nachvollziehbare Sicherheitsleistung",
    headline: "Was im Einsatz geleistet wird, sollte nachvollziehbar sein.",
    introduction:
      "Sicherheitsarbeit bleibt oft gerade dann unsichtbar, wenn sie zuverlässig funktioniert. Strukturierte Dokumentation soll zeigen, welche Leistungen erbracht wurden, welche Ereignisse aufgetreten sind und wo sich wiederkehrende Entwicklungen erkennen lassen.",
    items: [
      {
        name: "Leistung nachvollziehen",
        description:
          "Besetzungen, Kontrollgänge, Ereignisse und Übergaben in einem verständlichen Gesamtbild zusammenführen.",
      },
      {
        name: "Entwicklungen erkennen",
        description:
          "Wiederkehrende Auffälligkeiten, Schwerpunkte und Veränderungen über Zeiträume erkennen und einordnen.",
      },
      {
        name: "Auftraggeber informieren",
        description:
          "Relevante Informationen verständlich aufbereiten, ohne Berichte nachträglich aus Papier, Tabellen und einzelnen Dateien zusammenzustellen.",
      },
    ],
    closing:
      "SecPal soll aus operativer Dokumentation einen klaren Überblick für den eigenen Betrieb und den Auftraggeber schaffen.",
  },
  cta: {
    headline: "Fortschritt statt Marketing-Lärm.",
    subline:
      "Auf GitHub ist der aktuelle Stand sichtbar. Für Fragen, Hinweise oder frühen Austausch erreichen Sie SecPal direkt.",
    button: "GitHub ansehen",
    buttonSecondary: "Kontakt aufnehmen",
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
            "Checkpoint-basierte Kontrollgangerfassung per NFC oder QR — nachvollziehbare Kontrollgänge als natürlicher Teil des Betriebsprotokolls.",
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
            "Kunden- und Arbeitsverträge an einem Ort — mit rechtskonformem Unterschriftenworkflow direkt im System.",
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
