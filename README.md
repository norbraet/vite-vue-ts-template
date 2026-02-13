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

## Architecture Guidelines

### Pages vs Features: Best Practices

**Core Principle: Pages = Route Controllers, Features = Business Logic**

#### **Pages Should:**

- Handle route parameters (`/users/:id`)
- Manage URL state and query parameters
- Orchestrate multiple features together
- Handle page-level layout and navigation
- Coordinate feature interactions
- Stay thin and focused on composition

#### **Features Should:**

- Contain business logic and domain knowledge
- Be reusable across different pages
- Stay route-agnostic (no direct router usage)
- Handle their own internal state
- Provide clear APIs via props/events

#### **Good Pattern: Page as Orchestrator**

```vue
<!-- src/pages/DashboardPage.vue -->
<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  // Import multiple features
  import { UserProfile } from '@/features/user-profile'
  import { NotificationList } from '@/features/notifications'
  import { TaskBoard } from '@/features/tasks'

  // Page-level orchestration
  const route = useRoute()
  const activeTab = ref(route.query.tab || 'overview')

  // Page coordinates features and handles routing
  const handleTabChange = (tab: string) => {
    activeTab.value = tab
    router.replace({ query: { tab } })
  }
</script>

<template>
  <div class="dashboard-page">
    <!-- Page defines layout -->
    <header class="page-header">
      <h1>Dashboard</h1>
      <UserProfile mode="compact" />
    </header>

    <!-- Page orchestrates multiple features -->
    <div class="dashboard-content">
      <aside>
        <NotificationList :limit="5" />
      </aside>

      <main>
        <!-- Page handles conditional rendering -->
        <TaskBoard v-if="activeTab === 'tasks'" />
      </main>
    </div>
  </div>
</template>
```

#### **Anti-Pattern: Feature Wrapper Pages**

```vue
<!-- DON'T DO THIS -->
<script setup lang="ts">
  import { UserProfileFeature } from '@/features/user-profile'
</script>

<template>
  <!-- This is just a wrapper, no orchestration value -->
  <UserProfileFeature />
</template>
```

### 📋 **Decision Framework: Where Should It Go?**

| Concern             | Pages               | Features               | Shared                |
| ------------------- | ------------------- | ---------------------- | --------------------- |
| Route params        | ✅ Extract and pass | ❌                     | ❌                    |
| URL state sync      | ✅ Handle           | ❌                     | ❌                    |
| Business logic      | ❌ Delegate         | ✅ Implement           | ❌                    |
| API calls           | ❌ Coordinate       | ✅ Execute             | ✅ If generic         |
| Feature composition | ✅ Orchestrate      | ❌                     | ❌                    |
| Page layout         | ✅ Define           | ❌                     | ❌                    |
| Reusable components | ❌                  | ✅ If feature-specific | ✅ If global          |
| Form validation     | ❌                  | ✅ Business rules      | ✅ Generic validators |

### **Feature Communication Patterns**

#### **Pattern 1: Props Down, Events Up**

```vue
<!-- Page coordinates feature interaction -->
<template>
  <ProductCatalog @product-selected="handleProductSelect" />
  <ShoppingCart :highlighted-product="selectedProduct" />
</template>
```

#### **Pattern 2: Shared Composables**

```vue
<!-- Multiple features share state via composables -->
<script setup lang="ts">
  const { user } = useCurrentUser() // Shared composable
</script>

<template>
  <UserProfile :user="user" />
  <UserNotifications :user-id="user.id" />
</template>
```

#### **Pattern 3: Page-Level State Management**

```vue
<!-- Page manages cross-feature state -->
<script setup lang="ts">
  const searchQuery = ref('')

  // Page coordinates search across features
  watch(searchQuery, (query) => {
    // Update multiple features
  })
</script>
```

## Project Structure Guidelines

### Adding a New Feature

1. **Create feature folder:** `src/features/my-feature/`
2. **Add standard subfolders:** `components/`, `composables/`, `services/`, `types/`
3. **Keep it self-contained:** Feature should work independently
4. **Export main functionality:** Create a clear public API

```typescript
// src/features/my-feature/index.ts
export { default as MyFeatureComponent } from './components/MyFeatureComponent.vue'
export { useMyFeature } from './composables/useMyFeature'
export { myFeatureService } from './services/myFeatureService'
export type { MyFeatureData } from './types/myFeature'
```

### Adding a New Page

1. **Create page component:** `src/pages/MyPage.vue`
2. **Add route:** Update `src/app/router/index.ts`
3. **Think composition:** What features does this page need?
4. **Handle route concerns:** Extract params, manage URL state

```vue
<!-- src/pages/UserDetailsPage.vue -->
<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { UserProfile } from '@/features/user-profile'
  import { UserPosts } from '@/features/user-posts'

  // Page extracts route data
  const route = useRoute()
  const userId = route.params.id as string

  // Page might fetch shared data
  const { user, loading } = useUser(userId)
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <!-- Page composes features with shared data -->
    <UserProfile :user="user" />
    <UserPosts :user-id="user.id" />
  </div>
</template>
```

### Adding Shared Code

Place reusable code in appropriate `src/shared/` subfolder:

- **Components:** Truly reusable UI components (Button, Input, Modal)
- **Composables:** Cross-feature business logic hooks
- **Services:** Generic API clients, external service integrations
- **Utils:** Pure utility functions without side effects
- **Types:** Global TypeScript interfaces/types
- **Constants:** Application-wide constants and configuration

### **Common Pitfalls to Avoid**

1. **Features importing other features**

   ```typescript
   // DON'T DO THIS in a feature
   import { useAuth } from '@/features/auth'

   // DO THIS instead - use shared composables
   import { useCurrentUser } from '@/shared/composables/useCurrentUser'
   ```

2. **Pages with too much business logic**

   ```vue
   <!-- DON'T DO THIS in pages -->
   <script setup>
     const validateUser = (user) => {
       /* complex validation */
     } // ❌
     const saveUser = async (user) => {
       /* API calls */
     } // ❌
   </script>
   ```

3. **Features depending on router**

   ```typescript
   // DON'T DO THIS in features
   import { useRouter } from 'vue-router'

   // DO THIS instead - emit events to parent page
   const emit = defineEmits(['navigate-to-profile'])
   ```

4. **Shared code importing from features**
   ```typescript
   // DON'T DO THIS in shared
   import { UserCard } from '@/features/user-profile'
   ```

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
