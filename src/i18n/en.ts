// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

export const en = {
  nav: {
    features: "Features",
    pricing: "Pricing",
    docs: "Documentation",
    signIn: "Sign in",
    getStarted: "Get started",
  },
  hero: {
    badge: "Open Source · AGPL-3.0 · On-Premise or SaaS",
    headline: "A guard's best friend.",
    subline:
      "SecPal digitalises the back office of your security service — guard log, patrol control, shift planning, and staff management in one platform. No more paper, no more chaos.",
    cta: "Get started for free",
    ctaSecondary: "View on GitHub",
  },
  features: {
    headline: "Everything a modern security service needs.",
    subline:
      "From the first patrol to payroll — SecPal replaces the clipboard, the spreadsheet, and the filing cabinet.",
    items: [
      {
        name: "Digital Guard Log",
        description:
          "Log incidents, events, and reports in a tamper-evident, paperless record — accessible from smartphone, tablet, or desktop.",
      },
      {
        name: "Patrol Control",
        description:
          "NFC- and GPS-based checkpoint tracking. Every tour documented in full, deviations flagged instantly.",
      },
      {
        name: "Shift Planning",
        description:
          "Build schedules, manage availability, assign shifts. Changes reach your team immediately — no more printed rosters.",
      },
      {
        name: "Staff Management",
        description:
          "Qualifications, certificates, and documents in one place. Expiring credentials flagged automatically.",
      },
      {
        name: "On-Premise or SaaS",
        description:
          "Full data sovereignty: run SecPal on your own server, or use our hosted service. Your choice — no blind trust required.",
      },
      {
        name: "GDPR-compliant",
        description:
          "All personal data encrypted at rest. Tamper-evident audit logs ready for regulatory inspections.",
      },
    ],
  },
  cta: {
    headline: "Ready to go paperless?",
    subline: "Start for free or self-host — no credit card required.",
    button: "Get started",
    buttonSecondary: "Get in touch",
  },
  footer: {
    rights: "All rights reserved.",
    links: {
      privacy: "Privacy",
      terms: "Terms",
      security: "Security",
      github: "GitHub",
    },
  },
} as const;

type DeepLoosen<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? DeepLoosen<T[K]>
    : T[K] extends ReadonlyArray<infer U>
      ? DeepLoosen<U>[]
      : string;
};

export type Translations = DeepLoosen<typeof en>;
