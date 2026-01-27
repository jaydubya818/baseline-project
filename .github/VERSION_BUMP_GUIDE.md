# 🏷️ Quick Version Bump Guide

## Automatic (Recommended)

Just commit to `master` with the right prefix:

```bash
# Patch (1.0.0 → 1.0.1) - Bug fixes
git commit -m "fix: resolve listing filter issue"

# Minor (1.0.0 → 1.1.0) - New features
git commit -m "feat: add buyer profile reminders"

# Major (1.0.0 → 2.0.0) - Breaking changes
git commit -m "BREAKING CHANGE: new authentication system"
```

The GitHub Action will automatically:
- ✅ Bump version in package.json
- ✅ Update version in codebase
- ✅ Create git tag (v1.2.3)
- ✅ Create GitHub Release

## Manual

```bash
# Patch version
npm run version:bump:patch

# Minor version
npm run version:bump:minor

# Major version
npm run version:bump:major

# Then push
git push origin master && git push --tags
```

## Skip Version Bump

Add `[skip-version-bump]` to your commit message:

```bash
git commit -m "docs: update README [skip-version-bump]"
```

## Full Documentation

See [docs/VERSION_MANAGEMENT.md](../docs/VERSION_MANAGEMENT.md) for complete details.
