// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

export const en = {
  nav: {
    progress: "Progress",
    updates: "Release",
    github: "GitHub",
    contact: "Contact",
    followProgress: "Follow progress",
  },
  hero: {
    badge: "Public website · Open source · Built in public",
    tagline: "SecPal – A guard’s best friend",
    headline: "Less friction in security operations.",
    subline: "One clear operational flow from shift planning to handover.",
    explanation:
      "SecPal is being developed for security service operations that need dependable planning, patrol documentation, reporting, and clean handovers without paper-heavy workarounds.",
    highlights: [
      "Shift planning, patrol rounds, reports, and handovers belong in one operational flow.",
      "Information should stay traceable instead of being scattered across paper notes, chats, and disconnected tools.",
      "SecPal is taking shape in public, with a focused scope and clear release steps.",
    ],
    cta: "Follow development on GitHub",
    ctaSecondary: "See the current scope",
    note: "The public website shows the product direction, legal information, and contact paths. Public access to the app is not open yet.",
  },
  features: {
    headline: "Built around operational reality.",
    subline:
      "The first public release is being shaped around the routine work security teams actually do every day: plan, patrol, report, hand over, and keep oversight.",
    items: [
      {
        name: "Planning to handover, kept connected",
        description:
          "SecPal is being designed as one operational thread: from shift planning and patrol rounds to incident reporting and clean handovers.",
      },
      {
        name: "Less fragmentation in daily operations",
        description:
          "Instead of separate paper logs, chats, and ad hoc admin, SecPal brings the essentials into one structured system.",
      },
      {
        name: "Useful for teams and leadership",
        description:
          "The goal is clearer status, less duplicate work, and better oversight for guards, supervisors, operations leads, and dispatch.",
      },
    ],
  },
  cta: {
    headline: "Follow the release, not the noise.",
    subline:
      "GitHub shows the current build, contact stays direct, and the public site remains focused until the first release is ready.",
    button: "View GitHub",
    buttonSecondary: "Contact SecPal",
    note: "SecPal is being prepared for a first public release. This site stays intentionally lean until that milestone is ready.",
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
