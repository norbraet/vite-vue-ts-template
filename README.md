# Vue 3 + TypeScript Template

A modern, opinionated template for Vue 3 applications with TypeScript, featuring **Feature-Sliced Design (FSD)** architecture, strict ESLint boundaries, automated Git hooks, and CI workflows for consistent, team-ready development.

---

## Features

- **Vue 3** with Composition API and `<script setup>`
- **TypeScript** with strict configuration
- **Vite** for fast development & building
- **Feature-Sliced Design (FSD)** with ESLint boundaries
- **ESLint + Prettier** for code quality & formatting
- **Lefthook** Git hooks with Conventional Commits enforcement
- **Path aliases** for clean imports
- **pnpm** for efficient dependency management
- Fully **automation-ready**: lint/typecheck/PR checks

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

| Script                  | Description                |
| ----------------------- | -------------------------- |
| `pnpm dev`              | Start dev server           |
| `pnpm build`            | Build production           |
| `pnpm preview`          | Preview production build   |
| `pnpm lint`             | Lint & fix                 |
| `pnpm lint:check`       | Lint without fixing        |
| `pnpm format`           | Prettier formatting        |
| `pnpm format:check`     | Check formatting           |
| `pnpm lint:format`      | Lint + Prettier            |
| `pnpm hooks:installnpm` | Install Lefthook Git hooks |
| `pnpm hooks:uninstall`  | Uninstall Git hooks        |
| `pnpm typecheck`        | Type checking              |

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

- `.github/workflows/ci.yml` runs lint + typecheck on PRs automatically

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
