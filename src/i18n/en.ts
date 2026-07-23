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
    badge: "Built on years of experience in the security industry",
    tagline: "SecPal – A guard’s best friend",
    headline: "More clarity in security operations.",
    subline:
      "SecPal is being built for security service providers in Germany. Duty scheduling, assignment information, and documentation should come together clearly—instead of being scattered across paper, spreadsheets, and separate applications.",
    explanation:
      "SecPal is built for security operations that need one clear operational flow instead of spreading day-to-day work across paper notes, chats, and disconnected tools.",
    highlights: [
      "Operational work belongs in one connected system instead of isolated tools.",
      "Information stays traceable instead of disappearing into notes, messages, and scattered files.",
      "SecPal is taking shape in public, with a focused scope and clear release steps.",
    ],
    cta: "Learn more about SecPal",
    ctaSecondary: "Follow development on GitHub",
    note: "SecPal is currently under development.",
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
          name: "Shift planning",
          description:
            "Duty rosters, shift assignments, and coverage planning — integrated into the operational workflow rather than managed separately.",
        },
      ],
    },
    next: {
      label: "Next",
      description: "Planned for the near term",
      items: [
        {
          name: "Online guard tour system",
          description:
            "Checkpoint-based patrol recording via NFC or QR — traceable guard tours as a natural part of the operational log.",
        },
      ],
    },
    later: {
      label: "Later",
      description: "Longer-term direction — no dates attached",
      items: [
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
