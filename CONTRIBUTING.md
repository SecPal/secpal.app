<!--
SPDX-FileCopyrightText: 2026 SecPal
SPDX-License-Identifier: AGPL-3.0-or-later
-->

# Contributing to secpal.app

We welcome contributions to the SecPal landing page. Please read the [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## Repository Scope

This repository contains the public static site for [secpal.app](https://secpal.app). It is built with Astro, Tailwind CSS, and TypeScript.

Use only the approved SecPal domains in content, configuration, and examples:

- `secpal.app` for the public website and real email addresses
- `api.secpal.dev` for the API and `app.secpal.dev` for the PWA/frontend
- `secpal.dev` for development, staging, testing, and examples
- `app.secpal` only as the Android application identifier

## Prerequisites

Make sure the following tools are installed:

- Git
- Node.js 22
- npm

## Local Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/SecPal/secpal.app.git
cd secpal.app
npm ci
```

Optional local hooks:

```bash
./scripts/setup-pre-commit.sh
./scripts/setup-pre-push.sh
```

## Development Commands

Use the smallest relevant command while working:

```bash
npm run dev
npm run format:check
npm run lint
npm run check
npm run build
```

When git metadata is available, run the repository preflight before pushing:

```bash
./scripts/preflight.sh
```

The preflight script validates formatting, markdown, domain policy, linting, typechecking, the production build, and PR size.

## Contribution Workflow

1. Create a focused branch from `main`.
2. Keep the change to one topic only.
3. Update `CHANGELOG.md` for real fixes, features, or breaking changes.
4. Run the smallest relevant validation for the affected area.
5. Open a pull request with a clear description and linked issue.

## Branch Naming

Use one of the standard prefixes:

- `feat/`
- `fix/`
- `docs/`
- `chore/`
- `refactor/`
- `test/`

## Pull Request Expectations

- Keep pull requests focused and preferably below 600 changed lines.
- Do not mix unrelated fixes, refactors, or content updates.
- Describe any user-visible content changes and deployment implications.
- Include the validations you ran.

## Content And Accessibility

- Preserve semantic HTML and keyboard accessibility.
- Keep copy concise, accurate, and consistent between locales.
- Avoid unnecessary client-side JavaScript when static markup is sufficient.

## Security Reporting

Do not open public issues for security vulnerabilities. Follow the process in [SECURITY.md](SECURITY.md).

```bash
# Run tests with coverage
npm run test:coverage

# View HTML report (auto-opens in browser)
open coverage/index.html
```

### Coverage Configuration

- **Organization Config:** `.codecov.yml` in `.github` repository
- **Backend Config:** PHPUnit coverage in `phpunit.xml` (`<source>` element)
- **Frontend Config:** Vitest coverage in `vite.config.ts` (`test.coverage`)

### Exclusions

The following are excluded from coverage:

- Test files (`**/*Test.php`, `**/*.test.ts`, etc.)
- Configuration files (`**/*.config.ts`, `**/*.config.js`)
- Type definitions (`**/*.d.ts`)
- Database migrations and seeders
- Build artifacts and dependencies

---

## Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/) for clear and structured commit messages:

```text
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat:` - New feature
- `fix:` - Bug fix
- `chore:` - Maintenance/tooling
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, no logic change)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `perf:` - Performance improvements
- `ci:` - CI/CD changes

**Example:**

```bash
git commit -S -m "feat(auth): add two-factor authentication

Implements 2FA using TOTP tokens. Users can enable 2FA in their
profile settings.

Closes #123"
```

## Signing Commits

All commits must be signed with GPG. To set up commit signing:

```bash
# Generate a GPG key (if you don't have one)
gpg --gen-key

# List your GPG keys
gpg --list-secret-keys --keyid-format LONG

# Configure Git to use your key
git config --global user.signingkey <YOUR_KEY_ID>
git config --global commit.gpgSign true

# Add your GPG key to GitHub
gpg --armor --export <YOUR_KEY_ID>
# Copy the entire output (including the BEGIN and END PGP PUBLIC KEY BLOCK lines)
# and paste it into GitHub under Settings → SSH and GPG keys → New GPG key.
```

## Pull Request Guidelines

- **Keep PRs small:** Aim for < 600 lines of changes. Large PRs are harder to review.
- **Write clear descriptions:** Use the PR template and fill out all relevant sections.
- **Link related issues:** Reference issues with `Closes #123` or `Fixes #456`.
- **Ensure CI passes:** All checks must pass before merging.
- **Request reviews:** Tag relevant maintainers or wait for automatic review.
- **Address feedback:** Respond to review comments promptly.

## Code Style

- **Formatting:** We use Prettier for all code formatting. Run `npx prettier --write .` before committing.
- **Linting:** ESLint (JavaScript/TypeScript) and PHPStan (PHP) are enforced.
- **Testing:** All new features should include tests.

## REUSE Compliance

All files must include SPDX license headers. **SecPal uses different licenses depending on file type:**

### License Selection Guide

| File Type            | License             | Use For                                         |
| -------------------- | ------------------- | ----------------------------------------------- |
| **Application Code** | `AGPL-3.0-or-later` | PHP, TypeScript, JavaScript, React components   |
| **Configuration**    | `CC0-1.0`           | YAML, JSON, TOML, `.gitignore`, `.editorconfig` |
| **Helper Scripts**   | `MIT`               | Standalone bash/shell scripts, build utilities  |
| **Documentation**    | `CC0-1.0`           | Markdown files (except LICENSE itself)          |

### SPDX Header Examples

**For application code (AGPL-3.0-or-later):**

```php
<?php
// SPDX-FileCopyrightText: 2025 SecPal Contributors
// SPDX-License-Identifier: AGPL-3.0-or-later
```

```javascript
// SPDX-FileCopyrightText: 2025 SecPal Contributors
// SPDX-License-Identifier: AGPL-3.0-or-later
```

```typescript
// SPDX-FileCopyrightText: 2025 SecPal Contributors
// SPDX-License-Identifier: AGPL-3.0-or-later
```

**For configuration files (CC0-1.0):**

```yaml
# SPDX-FileCopyrightText: 2025 SecPal Contributors
# SPDX-License-Identifier: CC0-1.0
```

<!-- REUSE-IgnoreStart -->

```json
{
  "_comment": "SPDX-FileCopyrightText: 2025 SecPal Contributors",
  "_license": "SPDX-License-Identifier: CC0-1.0"
}
```

<!-- REUSE-IgnoreEnd -->

**For helper scripts (MIT):**

```bash
#!/bin/bash
# SPDX-FileCopyrightText: 2025 SecPal Contributors
# SPDX-License-Identifier: MIT
```

**For documentation (CC0-1.0):**

```markdown
<!--
SPDX-FileCopyrightText: 2025 SecPal Contributors
SPDX-License-Identifier: CC0-1.0
-->
```

### Verification

Run `reuse lint` before committing to verify compliance:

```bash
# Check all files for REUSE compliance
reuse lint

# Add headers to new files automatically
reuse annotate --license AGPL-3.0-or-later --copyright "SecPal Contributors" path/to/file.php
```

### Bulk Licensing with REUSE.toml

For files that cannot contain comments (images, binaries, etc.) or to license entire directories, use `REUSE.toml` instead of the deprecated `.reuse/dep5`:

**Create `REUSE.toml` in root or subdirectories:**

<!-- REUSE-IgnoreStart -->

```toml
version = 1

# Example: License all images in assets directory
[[annotations]]
path = "assets/images/**"
precedence = "aggregate"
SPDX-FileCopyrightText = "2025 SecPal Contributors"
SPDX-License-Identifier = "CC0-1.0"

# Example: Override licensing for vendor/third-party code
[[annotations]]
path = ["vendor/**", "node_modules/**"]
precedence = "override"
SPDX-FileCopyrightText = "Various third-party contributors"
SPDX-License-Identifier = "SEE-LICENSE-IN-PACKAGE"
```

<!-- REUSE-IgnoreEnd -->

**Precedence options:**

- `closest` (default): Use file's own headers if present, fallback to REUSE.toml
- `aggregate`: Combine both file headers AND REUSE.toml information
- `override`: REUSE.toml takes precedence, ignore file headers

**Alternative for individual files:** Create adjacent `.license` files (e.g., `logo.png.license`) containing SPDX headers.

**How to choose the correct copyright attribution:**

- Use **"SecPal Contributors"** for all code files, including source code, test files, scripts, and any file where individual contributors make changes (e.g., `.js`, `.ts`, `.php`, `.py`, `.sh`, test files in any language).
- Use **"SecPal"** for organizational documentation (e.g., `README.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`), workflow files (e.g., `.github/workflows/*.yml`), and configuration files in the root directory (e.g., `.eslintrc.yml`, `.prettierrc`, `package.json`, `composer.json`, etc.).
- If a configuration file is specific to a code module or contains logic contributed by individuals, use **"SecPal Contributors"**.
- For ambiguous cases, prefer **"SecPal Contributors"** if the file is likely to be edited by multiple people over time.
- Use the **current year** in the copyright date (e.g., 2025 for files created in 2025).

Run `reuse lint` to check compliance.

## Troubleshooting

### Pre-Push Hook Issues

If you experience issues with the pre-push hook (e.g., it runs on commands other than `git push`, or causes delays):

1. **Run the diagnostic tool:**

   ```bash
   ./scripts/diagnose-hooks.sh
   ```

   This will check your hook installation, git configuration, and shell environment.

2. **Common causes:**
   - **Shell prompts** (starship, oh-my-zsh) may execute git commands on every prompt render
   - **Directory hooks** (direnv, `.envrc` files) may trigger on `cd` commands
   - **Git aliases** or wrapper functions may intercept git commands
   - **Broken symlinks** in `.git/hooks/` directory

3. **Quick fixes:**

   ```bash
   # Reinstall hooks cleanly
   rm .git/hooks/pre-push && ./scripts/setup-pre-push.sh

   # Test in a clean shell
   env -i HOME=$HOME TERM=$TERM bash --norc --noprofile

   # Check for git aliases
   type git

   # Enable git tracing to see what's happening
   GIT_TRACE=1 git status 2>&1 | grep -i hook
   ```

4. **If hooks are genuinely misbehaving:**

   Pre-push hooks should **only** execute during `git push` commands. If they run on other git commands (`status`, `log`, `add`), this indicates a local environment issue, not a repository bug.

   Share the output of `./scripts/diagnose-hooks.sh` when reporting the issue.

### Performance Tips

- **Skip tests locally:** Tests are skipped by default in pre-push hooks (run in CI instead)
- **Force enable tests:** `PREFLIGHT_RUN_TESTS=1 git push` (useful before major PRs)
- **Force dependency reinstall:** `PREFLIGHT_FORCE_INSTALL=1 git push`
- **Skip hook temporarily:** `git push --no-verify` (use sparingly)

## Getting Help

If you have questions or need help:

- Open a [Discussion](https://github.com/orgs/SecPal/discussions)
- Join our community channels (if available)
- Check existing issues and documentation

## License

By contributing to SecPal, you agree that your contributions will be licensed under the [AGPL-3.0-or-later](https://spdx.org/licenses/AGPL-3.0-or-later.html) license.

Thank you for contributing to SecPal! 🎉
