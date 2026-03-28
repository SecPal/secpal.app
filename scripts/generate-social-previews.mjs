#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: MIT

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const publicDir = path.join(projectRoot, "public");
const logoFile = "logo-dark-512.png";
const logoPath = path.join(publicDir, logoFile);

const logoStage = {
  left: 764,
  top: 76,
};

const logoFrame = {
  x: 62,
  y: 70,
  width: 236,
  height: 236,
};

const logoPlacement = {
  left: logoStage.left + logoFrame.x,
  top: logoStage.top + logoFrame.y,
  width: logoFrame.width,
  height: logoFrame.height,
};

const cards = [
  {
    svgFile: "og-default.svg",
    pngFile: "og-default.png",
    title: "SecPal social preview",
    description:
      "Social preview card for SecPal with product name, tagline, and the canonical shield mark.",
    badgeText: "BUILT IN PUBLIC · OPEN SOURCE",
    badgeHorizontalPadding: 96,
    headline: "SecPal",
    subheadline: "A guard’s best friend",
    bodyLines: [
      "Less paperwork. Fewer fragmented tools.",
      "Clearer workflows for security operations.",
    ],
  },
  {
    svgFile: "og-de.svg",
    pngFile: "og-de.png",
    title: "SecPal Social-Vorschau",
    description:
      "Social-Preview-Karte für SecPal mit Produktname, Claim und der kanonischen Schildmarke.",
    badgeText: "ÖFFENTLICH ENTWICKELT · OPEN SOURCE",
    badgeHorizontalPadding: 112,
    headline: "SecPal",
    subheadline: "A guard’s best friend",
    bodyLines: [
      "Weniger Zettelwirtschaft. Weniger Medienbrüche.",
      "Klarere Abläufe für den Sicherheitsdienst.",
    ],
  },
];

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function renderTextLines(lines) {
  return lines
    .map(
      (line, index) =>
        `<text x="112" y="${426 + index * 44}" fill="#e2edf6" font-size="32" font-family="Segoe UI, Noto Sans, Helvetica, Arial, sans-serif">${escapeXml(line)}</text>`
    )
    .join("\n  ");
}

function getBadgeWidth(text, horizontalPadding) {
  const averageGlyphWidth = 10.8;
  const letterSpacingWidth = 1.6;

  return Math.ceil(
    horizontalPadding +
      text.length * averageGlyphWidth +
      Math.max(text.length - 1, 0) * letterSpacingWidth
  );
}

function createCardSvg(card, includeLogo) {
  const logoImage = includeLogo
    ? `\n    <image x="${logoFrame.x}" y="${logoFrame.y}" width="${logoFrame.width}" height="${logoFrame.height}" href="${logoFile}" preserveAspectRatio="xMidYMid meet" />`
    : "";
  const badgeWidth = getBadgeWidth(card.badgeText, card.badgeHorizontalPadding);

  return `<?xml version="1.0" encoding="UTF-8"?>
<!--
SPDX-FileCopyrightText: 2026 SecPal
SPDX-License-Identifier: AGPL-3.0-or-later
-->
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(card.title)}</title>
  <desc id="desc">${escapeXml(card.description)}</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#081019" />
      <stop offset="55%" stop-color="#0f1f2f" />
      <stop offset="100%" stop-color="#18364a" />
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7dd3fc" />
      <stop offset="100%" stop-color="#38bdf8" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(125,211,252,0.10)" stroke-width="1" />
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)" />
  <rect width="1200" height="630" fill="url(#grid)" opacity="0.6" />
  <circle cx="1050" cy="110" r="220" fill="#38bdf8" opacity="0.10" />
  <circle cx="160" cy="560" r="210" fill="#7dd3fc" opacity="0.08" />
  <rect x="72" y="72" width="1056" height="486" rx="32" fill="rgba(8,16,25,0.36)" stroke="rgba(125,211,252,0.18)" stroke-width="2" />

  <rect x="112" y="118" width="${badgeWidth}" height="40" rx="20" fill="rgba(125,211,252,0.12)" stroke="rgba(125,211,252,0.28)" />
  <text x="144" y="144" fill="#d7f3ff" font-size="20" font-family="Segoe UI, Noto Sans, Helvetica, Arial, sans-serif" letter-spacing="0.08em">${escapeXml(card.badgeText)}</text>

  <text x="112" y="286" fill="#ffffff" font-size="104" font-weight="700" font-family="Segoe UI, Noto Sans, Helvetica, Arial, sans-serif">${escapeXml(card.headline)}</text>
  <text x="112" y="344" fill="#8bdcff" font-size="40" font-weight="600" font-family="Segoe UI, Noto Sans, Helvetica, Arial, sans-serif">${escapeXml(card.subheadline)}</text>

  ${renderTextLines(card.bodyLines)}

  <rect x="112" y="500" width="252" height="36" rx="18" fill="url(#accent)" opacity="0.96" />
  <text x="138" y="524" fill="#081019" font-size="24" font-weight="700" font-family="Segoe UI, Noto Sans, Helvetica, Arial, sans-serif" letter-spacing="0.02em">secpal.app</text>

  <g transform="translate(${logoStage.left} ${logoStage.top})">
    <circle cx="180" cy="180" r="170" fill="rgba(125,211,252,0.06)" />
    <circle cx="180" cy="180" r="144" fill="rgba(9,19,29,0.78)" stroke="rgba(125,211,252,0.18)" stroke-width="2" />
    <circle cx="180" cy="180" r="112" fill="url(#accent)" opacity="0.07" />${logoImage}
  </g>
</svg>
`;
}

async function generateSocialPreview(card, logoBuffer) {
  const svgPath = path.join(publicDir, card.svgFile);
  const pngPath = path.join(publicDir, card.pngFile);
  const svgMarkup = createCardSvg(card, true);

  await fs.writeFile(svgPath, svgMarkup, "utf8");

  const backgroundSvg = createCardSvg(card, false);
  const backgroundBuffer = await sharp(Buffer.from(backgroundSvg))
    .png()
    .toBuffer();

  await sharp(backgroundBuffer)
    .composite([
      {
        input: logoBuffer,
        left: logoPlacement.left,
        top: logoPlacement.top,
      },
    ])
    .png()
    .toFile(pngPath);
}

async function main() {
  const logoBuffer = await sharp(logoPath)
    .resize({
      width: logoPlacement.width,
      height: logoPlacement.height,
      fit: "contain",
      background: {
        r: 0,
        g: 0,
        b: 0,
        alpha: 0,
      },
    })
    .png()
    .toBuffer();

  for (const card of cards) {
    await generateSocialPreview(card, logoBuffer);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
