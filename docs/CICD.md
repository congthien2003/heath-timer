# CI/CD Setup Guide

## Overview

This project uses GitHub Actions for continuous integration and deployment. The workflows automatically build, test, and release the Health Timer application.

## Workflows

### 1. Build and Test (`build.yml`)

**Triggers:** Push or PR to `main` or `develop` branches

**Purpose:** Validates code quality and ensures the project builds successfully

**Jobs:**

- Runs on Windows (latest)
- Tests with Node.js 20.x and 22.x
- Installs dependencies
- Builds the application
- Uploads build artifacts

### 2. Release (`release.yml`)

**Triggers:** Push of version tags (e.g., `v1.0.0`)

**Purpose:** Automatically creates GitHub releases with installers

**Jobs:**

- Builds Windows installer
- Creates GitHub release
- Uploads installer to release assets
- Generates release notes

**How to use:**

```bash
# Create and push a version tag
git tag v1.0.0
git push origin v1.0.0

# The workflow will automatically:
# 1. Build the app
# 2. Create installer
# 3. Create GitHub release
# 4. Upload files
```

### 3. PR Quality Check (`pr-check.yml`)

**Triggers:** Pull requests to `main` branch

**Purpose:** Ensures code quality before merging

**Jobs:**

- TypeScript compilation check
- Build verification
- Package size reporting
- Automated PR comments

### 4. CodeQL Security Analysis (`codeql.yml`)

**Triggers:**

- Push to `main` or `develop`
- Pull requests to `main`
- Weekly schedule (Mondays at midnight)

**Purpose:** Security vulnerability scanning

**Jobs:**

- Scans JavaScript and TypeScript code
- Identifies security issues
- Reports findings in Security tab

## Dependabot Configuration

Located in `.github/dependabot.yml`

**Features:**

- Automatically checks for npm package updates (weekly)
- Checks for GitHub Actions updates (monthly)
- Groups minor/patch updates together
- Auto-labels dependency PRs

## Issue Templates

### Bug Report (`.github/ISSUE_TEMPLATE/bug_report.yml`)

Structured form for reporting bugs with:

- Description
- Steps to reproduce
- Expected vs actual behavior
- Environment information
- Screenshots

### Feature Request (`.github/ISSUE_TEMPLATE/feature_request.yml`)

Structured form for suggesting features with:

- Problem statement
- Proposed solution
- Alternatives
- Benefits
- Priority level

## Pull Request Template

Located in `.github/PULL_REQUEST_TEMPLATE.md`

**Sections:**

- Description
- Type of change
- Related issues
- Changes made
- Testing checklist
- Review checklist

## Required Secrets

No additional secrets required! The workflows use the built-in `GITHUB_TOKEN` which is automatically provided by GitHub Actions.

## Release Process

### Manual Release Steps:

1. **Update Version**

   ```bash
   # Update version in package.json
   npm version patch  # or minor, or major
   ```

2. **Update Changelog**

   - Edit `CHANGELOG.md`
   - Add release notes for new version

3. **Commit Changes**

   ```bash
   git add package.json package-lock.json CHANGELOG.md
   git commit -m "chore: bump version to X.X.X"
   git push
   ```

4. **Create and Push Tag**

   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

5. **Wait for Workflow**
   - GitHub Actions will automatically build and release
   - Check Actions tab for progress
   - Release appears in Releases section

### Automated Release (Alternative)

You can also use npm scripts:

```bash
npm version patch  # Bumps version and creates git tag
git push --follow-tags  # Pushes commit and tag
```

## Workflow Status Badges

Add these badges to your README.md:

```markdown
[![Build](https://github.com/YOUR_USERNAME/health-timer/actions/workflows/build.yml/badge.svg)](https://github.com/YOUR_USERNAME/health-timer/actions/workflows/build.yml)
[![Release](https://github.com/YOUR_USERNAME/health-timer/actions/workflows/release.yml/badge.svg)](https://github.com/YOUR_USERNAME/health-timer/actions/workflows/release.yml)
[![CodeQL](https://github.com/YOUR_USERNAME/health-timer/actions/workflows/codeql.yml/badge.svg)](https://github.com/YOUR_USERNAME/health-timer/actions/workflows/codeql.yml)
```

## Monitoring and Debugging

### View Workflow Runs

1. Go to your GitHub repository
2. Click "Actions" tab
3. Select workflow from sidebar
4. View run details, logs, and artifacts

### Common Issues

**Build fails with "electron.exe not found":**

- Check Windows Defender isn't blocking the build
- Verify electron-builder configuration in package.json

**Release not created:**

- Ensure tag follows `v*.*.*` pattern (e.g., `v1.0.0`)
- Check GitHub Actions logs for errors
- Verify `GITHUB_TOKEN` has write permissions

**Artifacts not uploaded:**

- Check `dist/` folder is generated
- Verify file patterns in workflow match actual output
- Review workflow logs for error messages

## Customization

### Change Build Platforms

Edit `.github/workflows/release.yml`:

```yaml
strategy:
  matrix:
    os: [windows-latest, macos-latest, ubuntu-latest]
```

### Modify Release Schedule

Edit `.github/workflows/build.yml`:

```yaml
on:
  schedule:
    - cron: "0 0 * * *" # Daily builds
```

### Add More Checks

Edit `.github/workflows/pr-check.yml` to add:

- Linting
- Unit tests
- E2E tests
- Code coverage

## Best Practices

1. **Always test locally before pushing:**

   ```bash
   npm run build
   npm run build:win
   ```

2. **Use semantic versioning:**

   - MAJOR: Breaking changes
   - MINOR: New features (backward compatible)
   - PATCH: Bug fixes

3. **Write clear commit messages:**

   - Follow conventional commits format
   - Examples: `feat:`, `fix:`, `chore:`, `docs:`

4. **Keep workflows fast:**

   - Use caching for dependencies
   - Run heavy jobs only on main branch
   - Parallelize independent jobs

5. **Review workflow runs:**
   - Check Actions tab regularly
   - Fix failures promptly
   - Monitor build times

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [electron-builder CI Configuration](https://www.electron.build/configuration/configuration#configuration)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Next Steps:**

1. Push the `.github` folder to your repository
2. Enable GitHub Actions in repository settings
3. Create your first release with `git tag v1.0.0`
4. Watch the magic happen! ✨
