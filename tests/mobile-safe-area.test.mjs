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

  assert.match(
    component,
    /<article class="min-w-0 rounded-2xl border border-gray-200 bg-white p-6 shadow-xs/
  );
  assert.match(
    component,
    /<p class="mt-4 break-all font-mono text-xs text-gray-500 dark:text-gray-400">/
  );
  assert.match(
    component,
    /<section class="min-w-0 overflow-hidden rounded-3xl border border-gray-200 bg-gray-950 shadow-xl/
  );
  assert.match(component, /<p class="break-all">\{line\}<\/p>/);
});
