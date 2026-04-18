// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

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

  // article channel cards have min-w-0 to prevent flex overflow
  assert.match(component, /<article\b[^>]*class="[^"]*\bmin-w-0\b[^"]*"/);
  // metadata path paragraph keeps both break-all and font-mono on the same
  // element so long machine-readable paths wrap without losing mono styling.
  assert.match(
    component,
    /<p\b(?=[^>]*class="[^"]*\bbreak-all\b)(?=[^>]*class="[^"]*\bfont-mono\b)[^>]*>/
  );
  // section endpoint groups have min-w-0 to prevent flex overflow
  assert.match(component, /<section\b[^>]*class="[^"]*\bmin-w-0\b/);
  // individual endpoint lines have break-all
  assert.match(component, /<p\b[^>]*class="[^"]*\bbreak-all\b[^"]*">\s*\{\s*line\s*\}/);
});
