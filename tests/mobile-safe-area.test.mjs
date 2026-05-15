// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

const PARAGRAPH_WITH_BREAK_ALL_AND_FONT_MONO =
  /<p\b(?=[^>]*class="[^"]*\bbreak-all\b)(?=[^>]*class="[^"]*\bfont-mono\b)[^>]*>/;

test("global layout accounts for mobile safe-area insets", () => {
  const css = readFileSync(
    new URL("../src/styles/global.css", import.meta.url),
    "utf8"
  );

  assert.match(css, /safe-area-inset-left/);
  assert.match(css, /safe-area-inset-right/);
  assert.match(
    css,
    /padding-inline:\s*var\(--secpal-safe-area-padding-inline-start\)/
  );
  assert.match(css, /var\(--secpal-safe-area-padding-inline-end\)/);
});

test("base layout opts into viewport-fit cover for mobile safe areas", () => {
  const layout = readFileSync(
    new URL("../src/layouts/Base.astro", import.meta.url),
    "utf8"
  );

  assert.match(layout, /viewport-fit=cover/);
});

test("android distribution cards wrap long visible machine paths on mobile", () => {
  const component = readFileSync(
    new URL(
      "../src/components/AndroidDistributionSurface.astro",
      import.meta.url
    ),
    "utf8"
  );

  // Matches an <article> element whose class attribute contains the min-w-0 utility.
  const articleWithMinW0Pattern =
    /<article\b[^>]*class="[^"]*\bmin-w-0\b[^"]*"[^>]*>/;

  // article channel cards have min-w-0 to prevent flex overflow
  assert.match(component, articleWithMinW0Pattern);
  // metadata path paragraph keeps both break-all and font-mono on the same
  // element so long machine-readable paths wrap without losing mono styling.
  assert.match(component, PARAGRAPH_WITH_BREAK_ALL_AND_FONT_MONO);
  // section endpoint groups have min-w-0 to prevent flex overflow
  assert.match(component, /<section\b[^>]*class="[^"]*\bmin-w-0\b[^"]*"[^>]*>/);
  // individual endpoint lines use break-all on the paragraph element
  assert.match(component, /<p\b[^>]*class="[^"]*\bbreak-all\b[^"]*"[^>]*>/);
  // and render the machine path line token as paragraph content
  assert.match(component, /<p\b[^>]*>\s*\{\s*line\s*\}\s*<\/p>/);
});
