<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>

<template>
  <div class="container guide">
    <h1>{{ t('guide.title') }}</h1>

    <section class="card">
      <h2>Folder Structure</h2>
      <p>
        This template follows
        <a href="https://feature-sliced.design/" target="_blank" rel="noopener noreferrer"
          >Feature Sliced Design</a
        >
        with strict import boundaries enforced by ESLint.
      </p>
      <pre class="code-block">
src/
├── app/        # Bootstrap: router, i18n, global styles, store init
├── pages/      # Route-level components — compose features + shared
├── features/   # Isolated business slices — import from shared only
└── shared/     # Reusable across the whole app
    ├── components/
    ├── composables/
    ├── constants/
    ├── locales/
    ├── stores/
    ├── types/
    └── utils/</pre
      >
      <p class="hint">
        Import direction: <code>app</code> → <code>pages</code> → <code>features</code> →
        <code>shared</code>. Never import upward.
      </p>
    </section>

    <section class="card">
      <h2>Adding a Feature</h2>
      <p>Create a new directory under <code>src/features/</code> with this structure:</p>
      <pre class="code-block">
src/features/my-feature/
├── components/     # Vue components (internal to the feature)
├── composables/    # Composition functions
├── stores/         # Pinia store(s)
├── types/          # TypeScript interfaces & types
└── index.ts        # Public API — export only what pages need</pre
      >
      <p class="hint">
        Only export through <code>index.ts</code>. Pages import from
        <code>@/features/my-feature</code>, never from deep paths.
      </p>
    </section>

    <section class="card">
      <h2>Adding a Page</h2>
      <ol>
        <li>Create <code>src/pages/MyPage.vue</code></li>
        <li>
          Add a route in <code>src/app/router/index.ts</code>:
          <pre class="code-block">
{ path: '/my-page', name: 'my-page', component: () => import('@/pages/MyPage.vue') }</pre
          >
        </li>
        <li>Add the route constant to <code>src/shared/constants/app.ts</code></li>
      </ol>
    </section>

    <section class="card">
      <h2>Internationalization (vue-i18n)</h2>
      <p>Add messages to <code>src/shared/locales/en.ts</code>, then use in any component:</p>
      <pre class="code-block">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
// template: {{ t('nav.home') }}</pre
      >
      <p>
        To add a language, create <code>src/shared/locales/de.ts</code> and register it in
        <code>src/app/i18n/index.ts</code>.
      </p>
    </section>

    <section class="card">
      <h2>Validation (Zod)</h2>
      <p>
        Schemas live in <code>src/shared/service/validation.ts</code> (reusable primitives) or
        inside a feature:
      </p>
      <pre class="code-block">
import { z } from 'zod'

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

type LoginPayload = z.infer&lt;typeof loginSchema&gt;

const result = loginSchema.safeParse(formData)
if (!result.success) { /* result.error.issues */ }</pre
      >
    </section>

    <section class="card">
      <h2>Available Scripts</h2>
      <ul class="scripts">
        <li><code>pnpm dev</code> — start dev server</li>
        <li><code>pnpm build</code> — type-check + build for production</li>
        <li><code>pnpm preview</code> — preview the production build</li>
        <li><code>pnpm lint</code> — lint + auto-fix</li>
        <li><code>pnpm format</code> — format with Prettier</li>
        <li><code>pnpm typecheck</code> — run <code>vue-tsc</code> without emitting</li>
        <li><code>pnpm hooks:install</code> — install Lefthook Git hooks</li>
      </ul>
    </section>

    <section class="card">
      <h2>Git Hooks (Lefthook)</h2>
      <p>Hooks are configured in <code>lefthook.yml</code> and run automatically:</p>
      <ul>
        <li><strong>pre-commit</strong> — Prettier check on staged files</li>
        <li><strong>commit-msg</strong> — Conventional Commits format enforced</li>
        <li><strong>pre-push</strong> — ESLint + TypeScript check</li>
        <li><strong>post-checkout / post-merge</strong> — auto <code>pnpm install</code></li>
      </ul>
      <p class="hint">
        Use <code>.lefthook-local.yml</code> to override hooks locally (not committed).
      </p>
    </section>
  </div>
</template>

<style scoped>
  .guide {
    max-width: 760px;
  }

  h1 {
    font-size: clamp(1.5rem, 4vw, 2rem);
    margin-bottom: 0.5rem;
  }

  h1 + p {
    color: var(--color-text-secondary);
    margin-bottom: 2.5rem;
  }

  .card {
    margin-bottom: 1rem;
  }

  .card h2 {
    font-size: 0.9375rem;
    color: var(--color-text-primary);
    margin-bottom: 0.875rem;
    padding-left: 0.75rem;
    border-left: 2px solid var(--color-primary);
    letter-spacing: -0.01em;
  }

  .card p {
    margin-bottom: 0.75rem;
    font-size: 0.9375rem;
  }

  .card ol,
  .card ul:not(.scripts) {
    margin: 0.75rem 0;
    padding-left: 1.25rem;
    list-style: initial;
  }

  .card ol {
    list-style: decimal;
  }

  .card li {
    margin: 0.4rem 0;
    color: var(--color-text-secondary);
    font-size: 0.9375rem;
  }

  .card li strong {
    color: var(--color-text-primary);
    font-weight: 600;
  }

  code {
    font-family: var(--font-mono);
    font-size: 0.8125em;
    background-color: var(--color-bg-subtle);
    color: var(--color-primary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    padding: 0.15em 0.4em;
  }

  .code-block {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    /* Always dark — looks like a real code editor regardless of theme */
    background-color: #09090b;
    color: #d4d4d8;
    border: 1px solid #27272a;
    border-radius: var(--radius-lg);
    padding: 1.125rem 1.25rem;
    overflow-x: auto;
    white-space: pre;
    margin: 0.875rem 0;
    line-height: 1.7;
  }

  .hint {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    font-style: italic;
  }

  .scripts {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .scripts li {
    display: flex;
    align-items: baseline;
    gap: 0.625rem;
    padding: 0.375rem 0;
    border-bottom: 1px solid var(--color-border);
    font-size: 0.9375rem;
  }

  .scripts li:last-child {
    border-bottom: none;
  }
</style>
