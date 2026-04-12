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
    badge: "Aus der Praxis · Open Source · Öffentlich entwickelt",
    tagline: "SecPal – A guard’s best friend",
    headline: "Weniger Reibung im Sicherheitsdienst.",
    subline: "Weniger Zettelwirtschaft, weniger Medienbrüche, klarere Abläufe.",
    explanation:
      "SecPal ist für Sicherheitsdienste gebaut, die operative Arbeit in einem klaren Ablauf organisieren statt sie über Papier, Chats und Insellösungen zu verteilen.",
    highlights: [
      "Operative Abläufe gehören in ein durchgängiges System statt in einzelne Teillösungen.",
      "Informationen bleiben nachvollziehbar — nicht verstreut in Notizen, Kurznachrichten und verteilten Dateien.",
      "SecPal entsteht öffentlich, mit klarem Fokus und nachvollziehbaren Release-Schritten.",
    ],
    cta: "Entwicklung auf GitHub verfolgen",
    ctaSecondary: "Zu den Features",
    note: "Die öffentliche Website zeigt die Produktrichtung, Rechtsinformationen und Kontaktwege. Ein öffentlicher Zugang zur App ist derzeit noch nicht geöffnet.",
  },
  features: {
    headline: "Für die operative Realität gebaut.",
    subline:
      "SecPal konzentriert sich auf das, was im Sicherheitsdienst täglich funktionieren muss: klare Abläufe, verlässliche Dokumentation und Übersicht für Teams und Führung.",
    items: [
      {
        name: "Operative Abläufe in einem System",
        description:
          "Formulare, Kontrollgänge und Schichtübergaben greifen ineinander — als ein durchgängiger Ablauf.",
      },
      {
        name: "Dokumentiert im Ablauf, nicht im Nachhinein",
        description:
          "Dokumentation entsteht dort, wo die Arbeit passiert — direkt im Ablauf.",
      },
      {
        name: "Klarer Status für Einsatzleitung und Disposition",
        description:
          "Aktuelle Statusbilder und Überblick für Teams, Führung und Disposition.",
      },
    ],
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
      "Wohin SecPal führt: Was aktuell gebaut wird, was als Nächstes kommt und die längerfristige Richtung.",
    headline: "Wohin wir uns entwickeln.",
    subline:
      "SecPal entsteht öffentlich. Diese Seite zeigt den aktuellen Entwicklungsfokus, die nächsten geplanten Schritte und die längerfristige Richtung — ohne feste Daten, ohne Marketingversprechen.",
    now: {
      label: "Aktuell",
      description: "In aktiver Entwicklung.",
      items: [
        {
          name: "Passkeys & WebAuthn",
          description:
            "Passwortloser Login per Gerätebiometrie oder Security-Key (FIDO2/WebAuthn) — einfacher und sicherer als Passwörter.",
        },
        {
          name: "Mitarbeiter-Onboarding (BewachV §16)",
          description:
            "Geführter Onboarding-Ablauf, der alle für die Bewacherregister-Anmeldung erforderlichen Felder erfasst — mit eigenem Token-basierten Einladungslink statt einem Passwort-Reset-Link.",
        },
      ],
    },
    next: {
      label: "Als Nächstes",
      description: "Für die nahe Zukunft geplant.",
      items: [
        {
          name: "Android-App",
          description:
            "Native Android-App auf Basis von Capacitor — gleicher Funktionsumfang wie die Web-App, nutzbar auf gemeinsam genutzten Geräten und im Außendienst.",
        },
      ],
    },
    later: {
      label: "Später",
      description: "Längerfristige Richtung — ohne feste Termine.",
      items: [
        {
          name: "Dienstplanung",
          description:
            "Dienstpläne, Schichtzuweisungen und Besetzungsplanung als Teil des operativen Ablaufs.",
        },
        {
          name: "Wächter-Kontroll-System (WKS)",
          description:
            "Checkpoint-basierte Kontrollgangerfassung per NFC oder QR — nachvollziehbare Kontrollgänge direkt im Betriebsprotokoll.",
        },
        {
          name: "Vertragsverwaltung & digitale Unterschrift",
          description:
            "Kunden- und Arbeitsverträge an einem Ort verwalten, mit rechtskonformem digitalem Unterschriftenworkflow.",
        },
        {
          name: "Dienstanweisungskonfigurator",
          description:
            "Objektbezogene Dienstanweisungen strukturiert erstellen und verwalten — versioniert und direkt mit Objekten und Schichten verknüpft.",
        },
      ],
    },
    changelog: {
      label: "Zuletzt ausgeliefert",
      description:
        "Die vollständige Release-Historie mit jedem ausgelieferten Feature und Fix ist auf changelog.secpal.app veröffentlicht.",
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
