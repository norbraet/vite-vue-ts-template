<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>

<template>
  <div class="container guide">
    <h1>{{ t('guide.title') }}</h1>

    <section class="card">
      <h2>{{ t('guide.architecture.title') }}</h2>
      <i18n-t keypath="guide.architecture.descriptionRich" tag="p">
        <a href="https://feature-sliced.design/" target="_blank" rel="noopener noreferrer">
          Feature-Sliced Design
        </a>
        <strong>ESLint</strong>
      </i18n-t>

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
        {{ t('guide.architecture.importDirectionLabel') }}
        <code>{{ t('guide.architecture.importDirectionRule') }}</code>
      </p>
    </section>

    <section class="card">
      <h2>{{ t('guide.providers.title') }}</h2>
      <p>{{ t('guide.providers.description') }}</p>

      <pre class="code-block">
app/
└── providers/
    ├── router.ts   # Vue Router instance + guards
    ├── i18n.ts     # vue-i18n setup
    ├── pinia.ts    # Pinia instance
    └── index.ts    # setupProviders(app)
</pre
      >

      <p>{{ t('guide.providers.bootstrapNote') }}</p>
    </section>

    <section class="card">
      <h2>{{ t('guide.feature.title') }}</h2>
      <p>{{ t('guide.feature.intro') }}</p>

      <pre class="code-block">
src/features/my-feature/
├── model/      # Pinia stores
├── lib/        # Internal utilities
├── config/     # Feature-specific constants
├── types/      # Types & interfaces
└── ui/         # (optional) feature UI components
</pre
      >

      <p class="hint">{{ t('guide.feature.hint') }}</p>
    </section>

    <section class="card">
      <h2>{{ t('guide.page.title') }}</h2>
      <ol>
        <li>{{ t('guide.page.stepCreate') }}</li>
        <li>
          {{ t('guide.page.stepRegisterPrefix') }}
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

      <p class="hint">{{ t('guide.page.hint') }}</p>
    </section>

    <section class="card">
      <h2>{{ t('guide.i18n.title') }}</h2>
      <p>
        {{ t('guide.i18n.locationPrefix') }}
        <code>src/shared/i18n/</code>, <code>{{ t('guide.i18n.locationMiddle') }}</code>
        <code>{{ t('guide.i18n.locationSuffix') }}</code>
      </p>

      <pre class="code-block">
shared/i18n/
├── config/
├── lib/
├── model/messages/
└── types/
</pre
      >

      <p>{{ t('guide.i18n.creationPrefix') }}</p>
      <p>
        <strong>{{ t('guide.i18n.pluralLabel') }}</strong>
        {{ t('guide.i18n.pluralDemo', { count: 1 }, 1) }} /
        {{ t('guide.i18n.pluralDemo', { count: 5 }, 5) }}
      </p>
    </section>

    <section class="card">
      <h2>{{ t('guide.state.title') }}</h2>
      <p>{{ t('guide.state.registrationPrefix') }}</p>

      <p>{{ t('guide.state.storesLabel') }}</p>

      <ul>
        <li>
          <strong>{{ t('guide.state.featureStateLabel') }}</strong> ->
          <code>{{ t('guide.state.featureStateValue') }}</code>
        </li>
        <li>
          <strong>{{ t('guide.state.globalStateLabel') }}</strong> ->
          <code>{{ t('guide.state.globalStateValue') }}</code>
        </li>
      </ul>
    </section>

    <section class="card">
      <h2>{{ t('guide.shared.title') }}</h2>
      <p><code>shared/</code> {{ t('guide.shared.intro') }}</p>

      <ul>
        <li><strong>ui/</strong> - {{ t('guide.shared.ui') }}</li>
        <li><strong>lib/</strong> - {{ t('guide.shared.lib') }}</li>
        <li><strong>composables/</strong> - {{ t('guide.shared.composables') }}</li>
        <li><strong>i18n/</strong> - {{ t('guide.shared.i18n') }}</li>
        <li><strong>types/</strong> - {{ t('guide.shared.types') }}</li>
      </ul>

      <p class="hint">{{ t('guide.shared.hint') }}</p>
    </section>

    <section class="card">
      <h2>{{ t('guide.scripts.title') }}</h2>
      <ul class="scripts">
        <li><code>pnpm dev</code> - {{ t('guide.scripts.dev') }}</li>
        <li><code>pnpm build</code> - {{ t('guide.scripts.build') }}</li>
        <li><code>pnpm preview</code> - {{ t('guide.scripts.preview') }}</li>
        <li><code>pnpm lint</code> - {{ t('guide.scripts.lint') }}</li>
        <li><code>pnpm format</code> - {{ t('guide.scripts.format') }}</li>
        <li><code>pnpm typecheck</code> - {{ t('guide.scripts.typecheck') }}</li>
        <li><code>pnpm test</code> - {{ t('guide.scripts.test') }}</li>
        <li><code>pnpm test:run</code> - {{ t('guide.scripts.testRun') }}</li>
        <li><code>pnpm test:coverage</code> - {{ t('guide.scripts.testCoverage') }}</li>
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
