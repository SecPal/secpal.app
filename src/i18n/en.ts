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
    headline: "Important information. Too many separate places.",
    subline:
      "SecPal focuses on what needs to work every day in security operations: clear workflows, dependable documentation, and visibility for teams and leadership.",
    items: [
      {
        name: "Duty scheduling",
        description:
          "Absences, replacements, and short-notice changes need to reach everyone quickly—without conflicting schedules or unnecessary follow-up.",
      },
      {
        name: "Assignment information",
        description:
          "Post instructions, contacts, special requirements, and current notices need to be available where they are needed.",
      },
      {
        name: "Logbook and reporting",
        description:
          "Logbook entries, patrols, incidents, and shift handovers should be recorded traceably and made available for clear internal and client-facing reporting.",
      },
    ],
    closing:
      "SecPal aims to bring these areas together in one clear and understandable workflow.",
  },
  workflow: {
    overline: "One connected workflow",
    headline: "From duty scheduling to reporting.",
    introduction:
      "SecPal aims to connect information throughout the actual workflow of security service providers—instead of keeping it in separate applications.",
    steps: [
      {
        name: "Plan",
        description:
          "Assign duties, define responsibilities, and keep short-notice changes traceable.",
      },
      {
        name: "Inform",
        description:
          "Provide employees with current information, post instructions, and assignment-specific details.",
      },
      {
        name: "Carry out",
        description:
          "Record tasks, patrols, and incidents where the work takes place.",
      },
      {
        name: "Hand over",
        description:
          "Pass events, open matters, and important information clearly to the next shift.",
      },
      {
        name: "Review",
        description:
          "Present delivered services, notable events, and developments clearly for internal use and for the client.",
      },
    ],
    closing:
      "Information should be recorded once and then be available wherever it is needed.",
  },
  outcomes: {
    overline: "Traceable security services",
    headline: "What is delivered during an assignment should be traceable.",
    introduction:
      "Security services can be difficult for clients to see—especially when they are delivered reliably and without notable incidents. Structured documentation should clearly show which services were delivered and which events were recorded during an assignment.",
    items: [
      {
        name: "Understand delivered services",
        description:
          "Bring staffing, patrols, incidents, and shift handovers together in one clear overview.",
      },
      {
        name: "Review selected periods",
        description:
          "Summarize documented services and events clearly for selected sites and time periods.",
      },
      {
        name: "Keep clients informed",
        description:
          "Prepare relevant information clearly without reconstructing reports later from paper, spreadsheets, and separate files.",
      },
    ],
    closing:
      "SecPal aims to turn operational documentation into a clear overview for the security provider and the client.",
  },
  developmentStatus: {
    overline: "Current development status",
    headline: "SecPal is being built step by step.",
    introduction:
      "The current focus is duty scheduling. Further operational areas are planned for later development stages, without fixed delivery dates.",
    phases: [
      {
        status: "Current focus",
        name: "Duty scheduling",
        description:
          "The focus is on duty rosters, shift assignments, and clear staffing planning.",
      },
      {
        status: "Next",
        name: "Online guard tour system",
        description:
          "Guard tours are intended to be recorded in a structured way and connected with the logbook and assignment documentation.",
      },
      {
        status: "Later",
        name: "Further operational areas",
        description:
          "Contract management and structured service instructions are part of SecPal's longer-term direction.",
      },
    ],
    closing:
      "This sequence reflects the current planning status and may change as development progresses and practical experience provides new insights.",
    link: "View the detailed roadmap",
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
            "Record guard tours in a structured way and connect them clearly with the logbook and assignment documentation.",
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
            "Manage customer and employment contracts in one place and integrate digital signatures into the intended operational workflows.",
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
