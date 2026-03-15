// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: CC0-1.0

import astro from "eslint-plugin-astro";

export default [
  {
    ignores: ["dist/**", ".astro/**", "node_modules/**"],
  },
  ...astro.configs.recommended,
];
