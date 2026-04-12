// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Routing-only i18n constants and helpers — no translation payload.
 * Safe to import in client-side redirect code without bundling translation objects.
 */

export type Locale = "en" | "de";
export const locales: Locale[] = ["en", "de"];
export const defaultLocale: Locale = "en";

export function getLocalizedPath(path: string, locale: Locale): string {
  const normalized = path === "/" ? "/" : path.replace(/\/?$/, "/");
  return `/${locale}${normalized}`;
}
