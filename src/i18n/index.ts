// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import { en } from "./en.ts";
import { de } from "./de.ts";
import type { Locale } from "./routing.ts";

export type { Locale } from "./routing.ts";
export { locales, defaultLocale, getLocalizedPath } from "./routing.ts";

export const translations = { en, de } as const;

export function useTranslations(locale: Locale) {
  return translations[locale];
}
