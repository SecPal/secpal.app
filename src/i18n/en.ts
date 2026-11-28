// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

export const en = {
  nav: {
    focus: "Focus areas",
    approach: "Our approach",
    openSource: "Open Source",
    contact: "Contact",
    primary: "Main navigation",
    toggleDarkMode: "Toggle dark mode",
    openMenu: "Open main menu",
    mobileMenu: "Mobile navigation",
    closeMenu: "Close menu",
  },
  hero: {
    description:
      "SecPal develops specialized open-source software for physical, organizational, and personnel security.",
    headline: "Organizing security",
    product:
      "Its main product, also called SecPal, is being developed as an integrated system for the administrative and operational work of security service providers, in-house security teams, and their customers.",
    status: "The software is under active development.",
  },
  focus: {
    headline: "Focus areas",
    introduction: "These four areas guide the development of SecPal.",
    items: [
      {
        name: "Personnel",
        description:
          "Personnel administration, employment, qualifications, and working time.",
      },
      {
        name: "Sites",
        description: "Customers, sites, requirements, and responsibilities.",
      },
      {
        name: "Operational security",
        description:
          "Guard book, guard tours, incidents, and operational records.",
      },
      {
        name: "Organization",
        description: "Scheduling, business workflows, and collaboration.",
      },
    ],
  },
  approach: {
    headline: "Our approach",
    purpose:
      "Software should reduce the amount of work people do. Digitizing paperwork is only the first step toward that goal.",
    workflows:
      "We aim to reuse information, connect related workflows, and reliably automate routine tasks that lend themselves to automation.",
    data: "We design SecPal to collect only necessary data, use it for its intended purpose, and limit access to authorized people.",
  },
  openSource: {
    headline: "Open Source and independent operation",
    license: "The SecPal source code is licensed under AGPL v3+.",
    hosting:
      "Users should be free to choose how to run SecPal. Self-hosting and a future managed service are intended to provide the same functionality, with no artificial restrictions or proprietary premium features.",
  },
  cta: {
    headline: "Contact",
    subline: "Have a question about SecPal? Email us.",
  },
  footer: {
    links: {
      privacy: "Privacy",
      imprint: "Legal Notice",
      security: "Security",
      source: "Source Code",
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
