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
    subline: "Less paperwork, fewer fragmented tools, clearer workflows.",
    explanation:
      "SecPal is built for security operations that need one clear operational flow instead of spreading day-to-day work across paper notes, chats, and disconnected tools.",
    highlights: [
      "Operational work belongs in one connected system instead of isolated tools.",
      "Information stays traceable instead of disappearing into notes, messages, and scattered files.",
      "SecPal is taking shape in public, with a focused scope and clear release steps.",
    ],
    cta: "Follow development on GitHub",
    ctaSecondary: "See the features",
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
      "Where SecPal is headed: what we are building now, what comes next, and the longer-term direction.",
    headline: "Where we are headed.",
    subline:
      "SecPal is built in the open. This page shows the current development focus, the next planned steps, and the longer-term direction — no hard deadlines, no marketing promises.",
    now: {
      label: "Now",
      description: "Actively in development.",
      items: [
        {
          name: "Passkeys & WebAuthn",
          description:
            "Password-free login via device biometrics or security keys (FIDO2/WebAuthn) — simpler and more secure than passwords.",
        },
        {
          name: "Employee onboarding (BewachV §16)",
          description:
            "Guided onboarding flow that captures all fields required for Bewacherregister registration, with a dedicated token-based invite instead of a password-reset link.",
        },
      ],
    },
    next: {
      label: "Next",
      description: "Planned for the near term.",
      items: [
        {
          name: "Android app",
          description:
            "Native Android app built with Capacitor — same feature set as the web app, usable on shared devices and in the field.",
        },
      ],
    },
    later: {
      label: "Later",
      description: "Longer-term direction — no dates attached.",
      items: [
        {
          name: "Shift planning",
          description:
            "Duty rosters, shift assignments, and coverage planning as part of the operational workflow.",
        },
        {
          name: "Guard tour system (WKS)",
          description:
            "Checkpoint-based patrol recording with NFC or QR — traceable guard tours directly in the operational log.",
        },
        {
          name: "Contract management & digital signatures",
          description:
            "Manage customer and employment contracts in one place, with a legally binding digital signature workflow.",
        },
        {
          name: "Service instruction configurator",
          description:
            "Build and manage site-specific service instructions — structured, versioned, and linked directly to the relevant objects and shifts.",
        },
      ],
    },
    changelog: {
      label: "Recently shipped",
      description:
        "The full release history with every shipped feature and fix is published at changelog.secpal.app.",
      link: "View the changelog",
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
