// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

export const en = {
  nav: {
    progress: "Progress",
    updates: "Launch",
    github: "GitHub",
    contact: "Contact",
    followProgress: "Follow progress",
  },
  hero: {
    badge: "Work in progress · Open source · Built in public",
    tagline: "SecPal – A guard’s best friend",
    headline: "Less paperwork for security operations.",
    subline: "Digital from shift planning to handover.",
    explanation:
      "SecPal is being developed for operational security service work and is intended to reduce day-to-day load for both staff and managers.",
    highlights: [
      "Shift planning, patrol rounds, and documentation belong in one coherent workflow.",
      "Reports and handovers stay traceable instead of getting lost across paper notes and chats.",
      "SecPal is still work in progress and is being built in public step by step.",
    ],
    cta: "Follow the build on GitHub",
    ctaSecondary: "See what is taking shape",
    note: "No public signup yet. SecPal is still under active construction and is currently presented as a focused coming-soon page.",
  },
  features: {
    headline: "Built for day-to-day security service work.",
    subline:
      "SecPal is being built around operational work first, with a focus on clearer workflows, better oversight, and meaningful day-to-day relief.",
    items: [
      {
        name: "From planning to handover",
        description:
          "SecPal is meant to cover the full operational arc: from shift planning through patrol rounds and reporting to a clean handover between teams.",
      },
      {
        name: "One operational system instead of scattered admin",
        description:
          "Beyond documentation and patrol workflows, SecPal is intended to bring additional operational admin tasks together in one coherent system over time.",
      },
      {
        name: "Relief for staff and leadership",
        description:
          "The focus is on clearer workflows, less operational friction, and meaningful relief for guards, supervisors, operations leads, and dispatch.",
      },
    ],
  },
  cta: {
    headline: "Want launch updates instead of marketing noise?",
    subline:
      "Follow development on GitHub, reach out directly, and check back as the first release milestone gets closer.",
    button: "Follow on GitHub",
    buttonSecondary: "Write to us",
    note: "SecPal is still under heavy construction. Public onboarding will open once the first launch milestone is ready.",
  },
  footer: {
    rights: "",
    links: {
      privacy: "Privacy",
      terms: "Terms",
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
