# Vue 3 + TypeScript Template

A modern, opinionated template for Vue 3 applications with TypeScript, featuring Feature-Sliced Design architecture, comprehensive code quality tools, and Git hooks for consistent development workflow.

## Features

- **Vue 3** with Composition API and `<script setup>`
- **TypeScript** with strict configuration
- **Vite** for fast development and building
- **Feature-Sliced Design** architecture with ESLint boundaries enforcement
- **ESLint + Prettier** for code quality and formatting
- **Lefthook** for Git hooks with conventional commits
- **EditorConfig** for consistent coding style
- **Path aliases** for clean imports
- **pnpm** for efficient package management

## Quick Start

### Prerequisites

- Node.js (LTS version recommended)
- pnpm (`npm install -g pnpm`)

### Setup

1. **Clone or use this template**

   ```bash
   git clone <your-repo-url>
   cd your-project-name
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Install Git hooks**

   ```bash
   pnpm run hooks:install
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

## Folder Structure

```
src/
├── app/                    # App initialization, router, etc.
├── pages/                  # Vue Router page components
├── features/               # Business features (isolated)
│   ├── auth/
│   │   ├── components/     # Feature-specific components
│   │   ├── composables/    # Feature-specific composables
│   │   └── services/       # Feature-specific services
│   └── user-profile/
│       ├── components/
│       ├── composables/
│       └── services/
└── shared/                 # Global/reusable code
    ├── components/         # Reusable UI components
    ├── composables/        # Shared composables
    ├── services/           # Shared services
    ├── utils/              # Utility functions
    ├── types/              # TypeScript type definitions
    └── constants/          # Application constants
```

### Architecture Rules

This template enforces **Feature-Sliced Design** principles via ESLint boundaries:

- ✅ **shared** → can only import from **shared**
- ✅ **features** → can import from **shared** + same **feature** only
- ✅ **pages** → can import from **shared** + any **feature**
- ✅ **app** → can import from anywhere

**Example:**

```typescript
// Allowed: Feature using shared service
import { httpClient } from '@/shared/services/httpClient'

// Forbidden: Feature importing from another feature
import { useProfile } from '@/features/user-profile/composables/useProfile'
```

## Available Scripts

```bash
# Development
pnpm dev                    # Start development server
pnpm build                  # Build for production
pnpm preview                # Preview production build

# Code Quality
pnpm lint                   # Lint and fix code
pnpm lint:check             # Check linting without fixing
pnpm format                 # Format code with Prettier
pnpm format:check           # Check formatting without fixing
pnpm lint:format            # Run both linting and formatting

# Git Hooks
pnpm hooks:install          # Install lefthook Git hooks
pnpm hooks:uninstall        # Uninstall Git hooks

# TypeScript
pnpm typecheck              # Run TypeScript compiler check
```

## Configuration

### Path Aliases

The template includes pre-configured path aliases:

```typescript
import { Button } from '@/shared/components/Button.vue'
import { useAuth } from '@/features/auth/composables/useAuth'
import { HomePage } from '@/pages/HomePage.vue'
```

### Git Hooks

The template uses **Lefthook** to enforce:

- **Pre-commit:** Code formatting with Prettier
- **Pre-push:** ESLint checks + TypeScript validation
- **Commit messages:** Conventional Commits format

#### Conventional Commits Format

```
feat: add user authentication
fix(auth): resolve login validation issue
docs: update API documentation
style(ui): improve button spacing
```

### ESLint + Prettier Integration

- ESLint handles code quality and architectural rules
- Prettier handles code formatting
- Both tools are configured to work together without conflicts

## Project Structure Guidelines

### Adding a New Feature

1. Create feature folder: `src/features/my-feature/`
2. Add standard subfolders: `components/`, `composables/`, `services/`
3. Export main functionality from feature index

```typescript
// src/features/my-feature/index.ts
export { default as MyFeatureComponent } from './components/MyFeatureComponent.vue'
export { useMyFeature } from './composables/useMyFeature'
export { myFeatureService } from './services/myFeatureService'
```

### Adding Shared Code

Place reusable code in appropriate `src/shared/` subfolder:

- **Components:** Reusable UI components (Button, Input, Modal)
- **Composables:** Shared business logic hooks
- **Services:** API clients, external service integrations
- **Utils:** Pure utility functions
- **Types:** Global TypeScript interfaces/types
- **Constants:** Application-wide constants

## Development Tools

### Recommended VS Code Extensions

- **Vue - Official** - Vue 3 support
- **TypeScript Vue Plugin (Volar)** - TypeScript support for Vue
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **EditorConfig** - Consistent editor settings

### Environment Setup

If using **mise** (recommended):

```bash
mise install  # Installs correct Node.js and pnpm versions
```

## Learn More

- [Vue 3 Documentation](https://vuejs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Happy coding!**
