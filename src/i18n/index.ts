// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import { en } from "./en.ts";
import { de } from "./de.ts";

export const translations = { en, de } as const;
export type Locale = keyof typeof translations;
export const locales: Locale[] = ["en", "de"];
export const defaultLocale: Locale = "en";

export function useTranslations(locale: Locale) {
  return translations[locale];
}

export function getLocalizedPath(path: string, locale: Locale): string {
  return `/${locale}${path === "/" ? "/" : path}`;
}
