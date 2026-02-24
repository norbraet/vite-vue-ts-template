<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>

<template>
  <div class="container guide">
    <h1>{{ t('guide.title') }}</h1>

    <!-- Folder Structure -->
    <section class="card">
      <h2>Architecture (Feature-Sliced Design)</h2>
      <p>
        This template follows
        <a href="https://feature-sliced.design/" target="_blank" rel="noopener noreferrer">
          Feature-Sliced Design
        </a>
        with strict import boundaries enforced by ESLint.
      </p>

      <pre class="code-block">
src/
├── app/        # Bootstrap layer (providers, router, global styles)
│   ├── providers/
│   └── router/
├── pages/      # Route-level composition (no business logic)
├── features/   # Isolated business slices
└── shared/     # Reusable primitives & resources
    ├── ui/
    ├── composables/
    ├── lib/
    ├── i18n/
    └── types/
</pre
      >

      <p class="hint">
        Import direction:
        <code>app</code> → <code>pages</code> → <code>features</code> → <code>shared</code>. Never
        import upward.
      </p>
    </section>

    <!-- Providers -->
    <section class="card">
      <h2>Application Providers</h2>
      <p>
        Global integrations are initialized inside
        <code>src/app/providers/</code>.
      </p>

      <pre class="code-block">
app/
└── providers/
    ├── router.ts   # Vue Router instance + guards
    ├── i18n.ts     # vue-i18n setup
    ├── pinia.ts    # Pinia instance
    └── index.ts    # setupProviders(app)
</pre
      >

      <p><code>main.ts</code> bootstraps the app and calls <code>setupProviders(app)</code>.</p>
    </section>

    <!-- Features -->
    <section class="card">
      <h2>Adding a Feature</h2>
      <p>Create a new slice under <code>src/features/</code>:</p>

      <pre class="code-block">
src/features/my-feature/
├── model/      # Pinia stores
├── lib/        # Internal utilities
├── config/     # Feature-specific constants
├── types/      # Types & interfaces
└── ui/         # (optional) feature UI components
</pre
      >

      <p class="hint">
        Features may import from <code>shared</code> only. They must not import from other features.
      </p>
    </section>

    <!-- Pages -->
    <section class="card">
      <h2>Adding a Page</h2>
      <ol>
        <li>Create <code>src/pages/MyPage.vue</code></li>
        <li>
          Register the route in
          <code>src/app/router/routes.ts</code>:
          <pre class="code-block">
{
  path: '/my-page',
  name: 'my-page',
  component: () => import('@/pages/MyPage.vue')
}
</pre
          >
        </li>
      </ol>

      <p class="hint">
        Pages compose features and shared primitives. They should not contain business logic.
      </p>
    </section>

    <!-- i18n -->
    <section class="card">
      <h2>Internationalization (vue-i18n)</h2>
      <p>
        Locale messages live in
        <code>src/shared/i18n/</code>, <code>src/features/*/i18n/</code>, and
        <code>src/pages/*/i18n/</code>.
      </p>

      <pre class="code-block">
shared/i18n/
├── config/
├── lib/
├── model/messages/
└── types/
</pre
      >

      <p>
        The Vue i18n instance is created in
        <code>src/app/providers/i18n.ts</code>.
      </p>
    </section>

    <!-- State Management -->
    <section class="card">
      <h2>State Management (Pinia)</h2>
      <p>
        The Pinia instance is registered in
        <code>src/app/providers/pinia.ts</code>.
      </p>

      <p>Stores should live:</p>

      <ul>
        <li><strong>Feature state</strong> → inside the feature (<code>model/</code>)</li>
        <li><strong>Global app state</strong> → <code>shared/</code> (rare)</li>
      </ul>
    </section>

    <!-- Shared Layer -->
    <section class="card">
      <h2>Shared Layer</h2>
      <p><code>shared/</code> contains reusable primitives:</p>

      <ul>
        <li><strong>ui/</strong> — design system components</li>
        <li><strong>lib/</strong> — reusable utilities (format, validation, etc.)</li>
        <li><strong>composables/</strong> — generic composition functions</li>
        <li><strong>i18n/</strong> — translation resources</li>
        <li><strong>types/</strong> — cross-layer types</li>
      </ul>

      <p class="hint">Shared must never depend on features, pages, or app.</p>
    </section>

    <!-- Scripts -->
    <section class="card">
      <h2>Available Scripts</h2>
      <ul class="scripts">
        <li><code>pnpm dev</code> — start dev server</li>
        <li><code>pnpm build</code> — type-check + production build</li>
        <li><code>pnpm preview</code> — preview production build</li>
        <li><code>pnpm lint</code> — ESLint + auto-fix</li>
        <li><code>pnpm format</code> — Prettier</li>
        <li><code>pnpm typecheck</code> — vue-tsc</li>
      </ul>
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
