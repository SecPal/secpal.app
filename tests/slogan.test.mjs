// SPDX-FileCopyrightText: 2026 SecPal
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import {
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  symlink,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const source = (name) => readFileSync(path.join(root, name), "utf8");
// Consume the exact central lockup, not a separate website branding policy:
// SecPal/.github#989 and docs/brand/slogans.md (BRAND-0007).
const slogan = "A guard's best friend";
const lockup = `SecPal – ${slogan}`;

test("all homepage metadata uses the exact untranslated central lockup", () => {
  for (const name of [
    "src/pages/index.astro",
    "src/pages/en/index.astro",
    "src/pages/de/index.astro",
  ]) {
    assert.ok(source(name).includes(`title="${lockup}"`), name);
    assert.ok(!source(name).includes("guard’s"), name);
  }
  assert.equal(
    JSON.parse(source("package.json")).description,
    `Public website for ${lockup}`
  );
});

test("preview generator and checked-in SVGs preserve the exact slogan", () => {
  const subheadlines = [
    ...source("scripts/generate-social-previews.mjs").matchAll(
      /subheadline: "([^"]+)"/g
    ),
  ].map((match) => match[1]);
  assert.deepEqual(subheadlines, [slogan, slogan]);
  for (const name of ["og-default", "og-de"]) {
    const svg = source(`public/${name}.svg`);
    assert.ok(svg.includes("A guard&apos;s best friend"));
    assert.ok(!svg.includes("guard’s"));
  }
});

test("real preview generation renders the approved apostrophe in both locales", async (t) => {
  const temporary = await mkdtemp(path.join(tmpdir(), "secpal-slogan-"));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  await mkdir(path.join(temporary, "scripts"));
  await mkdir(path.join(temporary, "public"));
  await copyFile(
    path.join(root, "scripts/generate-social-previews.mjs"),
    path.join(temporary, "scripts/generate-social-previews.mjs")
  );
  await copyFile(
    path.join(root, "public/logo-dark-512.png"),
    path.join(temporary, "public/logo-dark-512.png")
  );
  // Reuse the existing locked renderer; install nothing and leave tracked assets alone.
  await symlink(
    path.join(root, "node_modules"),
    path.join(temporary, "node_modules")
  );
  execFileSync(process.execPath, ["scripts/generate-social-previews.mjs"], {
    cwd: temporary,
    timeout: 30000,
    env: { PATH: process.env.PATH, HOME: temporary },
    stdio: "pipe",
  });
  // This band excludes the separately composited shield. Compare actual pixels
  // against an independent rendering of the generated SVG, not just a text claim.
  const band = { left: 100, top: 300, width: 650, height: 65 };
  for (const name of ["og-default", "og-de"]) {
    await t.test(name, async () => {
      const svg = await readFile(
        path.join(temporary, `public/${name}.svg`),
        "utf8"
      );
      assert.equal(svg, source(`public/${name}.svg`));
      assert.ok(svg.includes("A guard&apos;s best friend"));
      const png = path.join(temporary, `public/${name}.png`);
      const actual = await sharp(png)
        .extract(band)
        .ensureAlpha()
        .raw()
        .toBuffer();
      const expected = await sharp(Buffer.from(svg))
        .extract(band)
        .ensureAlpha()
        .raw()
        .toBuffer();
      assert.deepEqual(actual, expected);
      const wrong = await sharp(
        Buffer.from(
          svg.replace("A guard&apos;s best friend", "A guard’s best friend")
        )
      )
        .extract(band)
        .ensureAlpha()
        .raw()
        .toBuffer();
      assert.notDeepEqual(
        actual,
        wrong,
        "curly-apostrophe rendering must differ"
      );
      const checkedIn = await sharp(
        path.join(root, `public/${name}.png`)
      ).metadata();
      assert.equal(checkedIn.format, "png");
      assert.equal(checkedIn.width, 1200);
      assert.equal(checkedIn.height, 630);
    });
  }
});
