// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

export const en = {
  nav: {
    workflow: "Workflow",
    roadmap: "Roadmap",
    android: "Android",
    headerCta: "Get in touch",
    toggleDarkMode: "Toggle dark mode",
    openMenu: "Open main menu",
    mobileMenu: "Mobile navigation",
    closeMenu: "Close menu",
  },
  hero: {
    badge: "Built on years of experience in the security industry",
    headline: "More clarity in security operations.",
    subline:
      "SecPal is being built for security service providers in Germany: duty scheduling, assignment information, and documentation in one place—instead of being scattered across paper, spreadsheets, and separate applications.",
    cta: "Learn about SecPal",
    note: "SecPal is currently under development.",
  },
  features: {
    headline: "Important information. Too many separate places.",
    subline:
      "SecPal focuses on clear workflows, dependable documentation, and visibility in day-to-day operations.",
    items: [
      {
        name: "Duty scheduling",
        description:
          "Absences, replacements, and short-notice changes need to reach everyone—without conflicting schedules or unnecessary follow-up.",
      },
      {
        name: "Assignment information",
        description:
          "Post instructions, contacts, and current notices need to be available where they are needed.",
      },
      {
        name: "Logbook and reporting",
        description:
          "Logbook entries, patrols, and incidents need to be recorded traceably and presented clearly for internal use and for clients.",
      },
    ],
    closing:
      "SecPal connects these areas in one clear, understandable workflow.",
  },
  workflow: {
    overline: "One connected workflow",
    headline: "From duty scheduling to reporting.",
    introduction:
      "SecPal connects information throughout day-to-day security operations—instead of keeping it in separate applications.",
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
          "Summarize delivered services and documented events clearly for internal use and for the client.",
      },
    ],
    closing:
      "The principle: record information once and make it available wherever it is needed.",
  },
  outcomes: {
    overline: "Traceable security services",
    headline: "What is delivered during an assignment should be traceable.",
    introduction:
      "Security services can be difficult for clients to see—especially when they are delivered reliably and without notable incidents. Structured documentation shows which services were delivered and which events were recorded during an assignment.",
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
      "SecPal turns operational documentation into a clear overview for the security provider and the client.",
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
    headline: "What matters is day-to-day operations.",
    subline:
      "Experience, requirements, and feedback from day-to-day operations at security service providers are particularly valuable for SecPal's further development.",
    button: "Get in touch",
    buttonSecondary: "View development on GitHub",
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
