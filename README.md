# Vue 3 + TypeScript Template

A modern, opinionated template for Vue 3 applications with TypeScript, featuring **Feature-Sliced Design (FSD)** architecture, Storybook-driven component documentation and testing, strict ESLint boundaries, automated Git hooks, and CI workflows for consistent, team-ready development.

---

## Features

- **Vue 3** with Composition API and `<script setup>`
- **TypeScript** with strict configuration
- **Vite** for fast development & building
- **Feature-Sliced Design (FSD)** with ESLint boundaries
- **Storybook** for component documentation and interactive component testing
- **ESLint + Prettier** for code quality & formatting
- **Lefthook** Git hooks with Conventional Commits enforcement
- **Vitest + Vue Test Utils** for unit and component testing
- **Path aliases** for clean imports
- **pnpm** for efficient dependency management
- Fully **automation-ready**: format/lint/typecheck/test/PR checks

---

## Quick Start

### Prerequisites

- Node.js (LTS version recommended)
- pnpm (`npm install -g pnpm`)

### Setup

```bash
git clone <your-repo-url>
cd <your-project-name>
pnpm install
pnpm run hooks:install
pnpm dev
```

## Folder Structure

```
src/
├── app/                    # App bootstrap: router, i18n, providers, global styles
│   ├── providers/          # Pinia, Router, i18n providers
│   ├── router/             # Route definitions
│   └── styles/             # Base/global CSS
├── pages/                  # Route-level components; orchestrate features
├── features/               # Isolated business features
│   └── <feature-name>/
│       ├── components/     # Feature-specific components
│       ├── composables/    # Feature-specific composables
│       ├── stores/         # Feature-specific Pinia stores
│       ├── constants/      # Feature constants
│       ├── lib/            # Feature services
│       └── types/          # Feature-specific types
└── shared/                 # Global reusable code
    ├── components/         # Truly reusable UI components
    ├── composables/        # Shared composables
    ├── lib/                # Generic shared services
    ├── i18n/               # Locales & types
    ├── types/              # Shared TypeScript types
    └── constants/          # App-wide constants
```

---

## Architecture Rules

FSD principles are strictly enforced with ESLint boundaries:

| Layer      | Can Import From                 |
| ---------- | ------------------------------- |
| `shared`   | shared only                     |
| `features` | shared + same feature           |
| `pages`    | shared + any feature            |
| `app`      | shared + features + pages + app |

### Example

```typescript
// ✅ Allowed
import { httpClient } from '@/shared/lib/httpClient'

// ❌ Forbidden

import { useAuth } from '@/features/auth/composables/useAuth' // different feature
```

## Available Script

| Script                 | Description                         |
| ---------------------- | ----------------------------------- |
| `pnpm dev`             | Start dev server                    |
| `pnpm build`           | Build production                    |
| `pnpm preview`         | Preview production build            |
| `pnpm storybook`       | Start Storybook locally             |
| `pnpm build-storybook` | Build static Storybook output       |
| `pnpm lint`            | ESLint with auto-fix                |
| `pnpm lint:check`      | ESLint without fixing               |
| `pnpm format`          | Prettier format                     |
| `pnpm format:check`    | Check formatting                    |
| `pnpm typecheck`       | vue-tsc type checking               |
| `pnpm test`            | Vitest in watch mode                |
| `pnpm test:run`        | Vitest single run (CI)              |
| `pnpm test:coverage`   | Vitest single run + coverage report |
| `pnpm test:storybook`  | Run Storybook interaction tests     |
| `pnpm hooks:install`   | Install Lefthook Git hooks          |
| `pnpm hooks:uninstall` | Uninstall Git hooks                 |

## Storybook

Storybook is part of the standard workflow in this template for both:

- **Component documentation** via colocated `*.stories.ts` files and autodocs
- **Component testing** via Storybook `play` functions and the Vitest addon

### Start Storybook

```bash
pnpm storybook
```

This starts the Storybook dev server on `http://localhost:6006`.

### Build Storybook

```bash
pnpm build-storybook
```

Use this to generate a static Storybook build for review environments or publishing.

### Run Storybook Tests

```bash
pnpm test:storybook
```

This runs Storybook interaction tests defined with `play` functions. Because these tests use Vitest browser mode with Playwright, they should be treated separately from the regular unit test and coverage workflow.

### Story Conventions

- Keep stories close to the component or page they document, for example `Component.stories.ts`
- Use `tags: ['autodocs']` to generate documentation pages automatically
- Use `play` functions for interaction-based component checks
- Add decorators when a story needs layout wrappers or specific store state

### Shared Storybook Setup

The Storybook preview is already wired with the same core providers used by the app:

- **Pinia** for store-backed components
- **Vue I18n** with English and German messages
- **Vue Router** using an in-memory router
- Global app styles from `src/app/styles/global.css`

This makes Storybook suitable for documenting and testing real feature and page components, not just isolated UI fragments.

## GitHub Automation & Workflow

### Pull Request Template

PRs should follow `.github/pull_request_template.md`:

- Checklist ensures **FSD boundaries**, i18n, state management, and testing rules
- Conventional commits: `feat(...)`, `fix(...)`, `refactor(...)`

### Issue Template

- `.github/ISSUE_TEMPLATE/bug_report.yml`
- `.github/ISSUE_TEMPLATE/feature_request.yml`

### Auto-labeling

- GitHub Action `.github/workflows/labeler.yml` assigns labels based on feature paths

### CI Workflow

`.github/workflows/ci.yml` runs the following jobs on every PR and push to `main`:

| Job               | Description                                         |
| ----------------- | --------------------------------------------------- |
| `format`          | Prettier format check                               |
| `lint`            | ESLint check                                        |
| `typecheck`       | vue-tsc type checking                               |
| `unit-tests`      | Vitest unit tests with coverage report artifact     |
| `e2e-tests`       | Playwright E2E tests with HTML report artifact      |
| `storybook-tests` | Storybook interaction tests via Vitest browser mode |
| `chromatic`       | Visual regression testing via Chromatic             |
| `build`           | Production build (runs only when all above pass)    |

#### Required Setup After Using This Template

Before the CI pipeline works correctly, you must configure the following:

**Chromatic (visual regression testing)**

1. Create a project at [chromatic.com](https://www.chromatic.com) and get your project token
2. In your GitHub repository go to **Settings → Secrets and variables → Actions → New repository secret**
3. Add a secret named `CHROMATIC_PROJECT_TOKEN` with your Chromatic project token

Without this secret the `chromatic` job will fail. If you don't intend to use Chromatic, remove the `chromatic` job from `.github/workflows/ci.yml` and the `chromatic` script from `package.json`.

---

## Page vs Feature Guidelines

### Pages (src/pages/)

- Orchestrate features
- Handle route params & query
- Manage layout & navigation
- Keep thin, no business logic

### Features (src/features/)

- Encapsulate business logic
- No routing dependencies
- Reusable & isolated
- Provide public API via index.ts

### Shared (src/shared/)

- Truly global components and composables
- Generic services/utilities
- No dependency on features or pages

## Best Practices

- Props down → events up for feature-page communication
- Shared composables for cross-feature state
- Page-level state only for coordinating multiple features
- Avoid features importing other features
- Avoid business logic inside pages
