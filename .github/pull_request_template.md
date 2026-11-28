# Description

Name the delivered change in the pull request title. In the description, link
the related issue and explain relevant landing-page or deployment impact,
including any breaking changes or required migration steps.

Fixes # (issue)

## Type of change

Please delete options that are not relevant.

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Content or documentation update
- [ ] CI, workflow, or governance change

## Validation

Please describe the checks that you ran to verify your changes.

- [ ] `npm run format:check`
- [ ] `npm run lint`
- [ ] `npm run check`
- [ ] `npm run build`
- [ ] `./scripts/preflight.sh` (when git metadata is available)

## Checklist

- [ ] My change follows the repository conventions and domain policy (`secpal.app` / `secpal.dev` only)
- [ ] I performed a self-review of the affected content, code, and workflows
- [ ] I updated the affected documentation when applicable
- [ ] My change introduces no new warnings in the validations above
