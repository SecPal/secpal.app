// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  defaultLocale,
  getLocalizedPath,
  locales,
  type Locale,
} from "../i18n/routing.ts";

export function detectPreferredLocale(
  preferredLanguages?: readonly string[]
): Locale {
  for (const preferredLanguage of preferredLanguages ?? []) {
    const normalized = preferredLanguage.trim().toLowerCase();

    for (const locale of locales) {
      if (normalized === locale || normalized.startsWith(`${locale}-`)) {
        return locale;
      }
    }
  }

  return defaultLocale;
}

export function buildPreferredLocalePath(
  path: string,
  preferredLanguages?: readonly string[]
): string {
  return getLocalizedPath(path, detectPreferredLocale(preferredLanguages));
}

function getNavigatorLanguages(): string[] {
  if (typeof navigator === "undefined") {
    return [];
  }

  const preferredLanguages = Array.isArray(navigator.languages)
    ? navigator.languages
    : [];

  if (preferredLanguages.length > 0) {
    return preferredLanguages;
  }

  return typeof navigator.language === "string" ? [navigator.language] : [];
}

export function redirectToPreferredLocale(path: string): void {
  if (typeof window === "undefined") {
    return;
  }

  const targetUrl = new URL(
    buildPreferredLocalePath(path, getNavigatorLanguages()),
    window.location.origin
  );

  targetUrl.search = window.location.search;
  targetUrl.hash = window.location.hash;

  const currentUrl = new URL(window.location.href);

  if (currentUrl.toString() === targetUrl.toString()) {
    return;
  }

  window.location.replace(targetUrl);
}
