// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

export function buildSecurityTxt(siteUrl: URL, headerComment: string): string {
  const expiresDate = new Date();
  expiresDate.setUTCHours(0, 0, 0, 0);
  expiresDate.setUTCDate(expiresDate.getUTCDate() + 180);
  const expiresAt = expiresDate.toISOString().replace(/\.000Z$/, "Z");
  const canonicalWellKnownUrl = new URL(
    "/.well-known/security.txt",
    siteUrl
  ).toString();
  const canonicalRootUrl = new URL("/security.txt", siteUrl).toString();
  const policyUrl = new URL("/security/", siteUrl).toString();

  return [
    headerComment,
    "Contact: mailto:security@secpal.app",
    `Contact: ${policyUrl}`,
    `Expires: ${expiresAt}`,
    "Preferred-Languages: en, de",
    `Canonical: ${canonicalWellKnownUrl}`,
    `Canonical: ${canonicalRootUrl}`,
    `Policy: ${policyUrl}`,
    "",
  ].join("\n");
}
