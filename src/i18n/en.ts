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
    description:
      "Open-source software for professional security operations. Explore SecPal’s development and product priorities.",
    badge: "Built on years of experience in the security industry",
    headline: "More clarity in security operations.",
    subline:
      "SecPal develops open-source software for physical, organizational, and personnel security. It is designed for security service providers, professional security operations, and their customers.",
    cta: "Learn about SecPal",
    note: "SecPal is under active development and remains pre-1.0.",
  },
  features: {
    headline: "Important information. Too many separate places.",
    subline:
      "These examples show where connected tools could help day-to-day security operations.",
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
      "SecPal’s goal is to make related information easier to find and reuse.",
  },
  workflow: {
    overline: "Example workflow",
    headline: "From preparing an assignment to reviewing it.",
    introduction:
      "This example shows how information could carry through a security assignment.",
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
      "Record information once so the people who need it can use it throughout the assignment.",
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
      "SecPal aims to make these records easier for security teams and their customers to review.",
  },
  developmentStatus: {
    headline: "Development and operation",
    introduction:
      "The roadmap describes product priorities. The architecture documentation links accepted decisions and the repositories responsible for implementation.",
    roadmapLink: "View the roadmap",
    architectureLink: "Explore the architecture",
    hostingTitle: "Self-hosting and SecPal Managed",
    hostingDescription:
      "The same product functionality is intended for both. Self-hosting is designed to be portable. SecPal Managed is intended to add hosting and operation services.",
    hostingLink: "Read the deployment documentation",
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
      "Current product priorities for SecPal, SecPal Assure, and SecPal Visit.",
    headline: "Where SecPal is headed.",
    subline:
      "These are product priorities. They can change as needs and evidence develop.",
    now: {
      label: "Current focus",
      description: "Personnel and sites first, followed by operational records",
      items: [
        {
          name: "Personnel and site management",
          description:
            "Bring together the people, responsibilities, and sites involved in security operations.",
        },
        {
          name: "Guard book and working-time capture",
          description:
            "Keep a traceable record of events and corrections in the guard book. Record working time in its own domain.",
        },
      ],
    },
    next: {
      label: "According to operational need",
      description: "Further priorities for the main product",
      items: [
        {
          name: "Guard tours and scheduling",
          description:
            "Support structured guard tours and planning for shifts and staffing.",
        },
      ],
    },
    later: {
      label: "Product family",
      description: "Intended to follow incrementally",
      items: [
        {
          name: "SecPal Assure and SecPal Visit",
          description:
            "The specialist products may operate independently or integrate with SecPal.",
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
