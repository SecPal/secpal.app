// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

export const en = {
  nav: {
    progress: "Progress",
    roadmap: "Roadmap",
    android: "Android",
    updates: "Follow",
    github: "GitHub",
    contact: "Contact",
    followProgress: "Follow progress",
    toggleDarkMode: "Toggle dark mode",
    openMenu: "Open main menu",
    mobileMenu: "Mobile navigation",
    closeMenu: "Close menu",
  },
  hero: {
    badge: "From operational practice · Open source · Built in public",
    tagline: "SecPal – A guard’s best friend",
    headline: "Less friction in security operations.",
    subline: "Less paperwork, fewer disconnected tools, clearer workflows.",
    explanation:
      "SecPal is built for security operations that need one clear operational flow instead of spreading day-to-day work across paper notes, chats, and disconnected tools.",
    highlights: [
      "Operational work belongs in one connected system instead of isolated tools.",
      "Information stays traceable instead of disappearing into notes, messages, and scattered files.",
      "SecPal is taking shape in public, with a focused scope and clear release steps.",
    ],
    cta: "View roadmap",
    ctaSecondary: "Follow development on GitHub",
    note: "The public website shows the product direction, legal information, and contact paths. Public access to the app is not open yet.",
  },
  features: {
    headline: "Built around operational reality.",
    subline:
      "SecPal focuses on what needs to work every day in security operations: clear workflows, dependable documentation, and visibility for teams and leadership.",
    items: [
      {
        name: "One system, one operational flow",
        description:
          "Forms, patrol records, and shift handovers work together in one continuous workflow.",
      },
      {
        name: "Documented in the workflow, not after the fact",
        description:
          "Documented where the work happens — not added after the fact.",
      },
      {
        name: "Clear status for operations leads and dispatch",
        description:
          "Current status and visibility for teams, leadership, and dispatch.",
      },
    ],
  },
  cta: {
    headline: "Progress, not marketing noise.",
    subline:
      "GitHub shows the current state. For questions, feedback, or early contact, you can reach SecPal directly.",
    button: "View GitHub",
    buttonSecondary: "Get in touch",
    note: "",
  },
  roadmap: {
    title: "Roadmap – SecPal",
    description:
      "Where SecPal is headed — current development focus, next planned steps, and longer-term direction.",
    headline: "Where SecPal is headed.",
    subline:
      "SecPal is built in the open. This page shows the current development focus, the next planned steps, and the longer-term direction — with no fixed dates and no marketing promises.",
    now: {
      label: "Now",
      description: "Actively in development",
      items: [
        {
          name: "Passkeys & WebAuthn",
          description:
            "Password-free login via device biometrics or security keys (FIDO2/WebAuthn) — more secure and easier to use than passwords.",
        },
        {
          name: "Employee onboarding (BewachV §16)",
          description:
            "Structured onboarding that collects all fields required for Bewacherregister registration — with a dedicated invite link instead of a password-reset workaround.",
        },
      ],
    },
    next: {
      label: "Next",
      description: "Planned for the near term",
      items: [
        {
          name: "Android app",
          description:
            "Native Android app — same capabilities as the web app, suitable for shared devices and field use.",
        },
      ],
    },
    later: {
      label: "Later",
      description: "Longer-term direction — no dates attached",
      items: [
        {
          name: "Shift planning",
          description:
            "Duty rosters, shift assignments, and coverage planning — integrated into the operational workflow rather than managed separately.",
        },
        {
          name: "Online guard tour system",
          description:
            "Checkpoint-based patrol recording via NFC or QR — traceable guard tours as a natural part of the operational log.",
        },
        {
          name: "Contract management & digital signatures",
          description:
            "Customer and employment contracts in one place, with a legally compliant digital signature workflow.",
        },
        {
          name: "Service instruction configurator",
          description:
            "Create and maintain site-specific service instructions — structured, versioned, and linked to the relevant objects and shifts.",
        },
      ],
    },
    changelog: {
      label: "What has shipped",
      description:
        "Every released feature and fix is documented at changelog.secpal.app — the full history of what has shipped across API, web app, and Android.",
      link: "Read the changelog",
      href: "https://changelog.secpal.app",
    },
  },
  footer: {
    rights: "",
    links: {
      privacy: "Privacy",
      imprint: "Legal Notice",
      security: "Security",
      github: "GitHub",
    },
  },
} as const;

type DeepLoosen<T> =
  T extends ReadonlyArray<infer U>
  ? DeepLoosen<U>[]
  : T extends Record<string, unknown>
  ? { [K in keyof T]: DeepLoosen<T[K]> }
  : string;

export type Translations = DeepLoosen<typeof en>;
