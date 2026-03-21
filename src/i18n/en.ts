// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

export const en = {
  nav: {
    progress: "Progress",
    updates: "Follow",
    github: "GitHub",
    contact: "Contact",
    followProgress: "Follow progress",
  },
  hero: {
    badge: "From operational practice · Open source · Built in public",
    tagline: "SecPal – A guard’s best friend",
    headline: "Less friction in security operations.",
    subline: "Less paperwork, fewer fragmented tools, clearer workflows.",
    explanation:
      "SecPal is built for security operations that follow one clear operational flow instead of spreading day-to-day work across paper notes, chats, and disconnected tools.",
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
        name: "One system instead of scattered solutions",
        description:
          "SecPal brings operational work together as one connected whole instead of spreading it across separate tools and partial workflows.",
      },
      {
        name: "Documented in the workflow, not after the fact",
        description:
          "Forms, patrol records, and shift handovers are captured in the workflow directly instead of being written up separately on paper or in disconnected apps.",
      },
      {
        name: "No guesswork for supervisors and dispatch",
        description:
          "Clearer status, less duplicate work, and visibility for teams, leadership, and dispatch.",
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
