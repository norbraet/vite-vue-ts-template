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

<style lang="css" scoped>
  .guide {
    max-width: 760px;
  }

  h1 {
    /* stylelint-disable-next-line plugin/no-hardcoded-typography */
    font-size: clamp(1.5rem, 4vw, 2rem);
    margin-bottom: var(--space-component-xs);
  }

  h1 + p {
    color: var(--color-text-muted);
    margin-bottom: var(--space-content);
  }

  .card {
    margin-bottom: var(--space-component-md);
  }

  .card h2 {
    font-size: var(--text-prose-size);
    color: var(--color-text);
    margin-bottom: var(--space-component-sm);
    padding-left: var(--space-component-sm);
    border-left: var(--border-width-accent) solid var(--color-primary);
    letter-spacing: var(--text-spacing-tight);
  }

  .card p {
    margin-bottom: var(--space-component-sm);
    font-size: var(--text-prose-size);
  }

  .card ol,
  .card ul:not(.scripts) {
    margin: var(--space-component-sm) 0;
    padding-left: var(--space-component-xl);
  }

  .card li {
    margin: var(--space-component-xs) 0;
    color: var(--color-text-muted);
    font-size: var(--text-prose-size);
  }

  .card li strong {
    color: var(--color-text);
    font-weight: var(--text-label-weight);
  }

  code {
    font-family: var(--text-mono-font);
    font-size: var(--text-caption-size);
    background-color: var(--color-bg-subtle);
    color: var(--color-primary);
    border: var(--border-width-thin) solid var(--color-border);
    border-radius: var(--radius-sm);

    /* stylelint-disable-next-line plugin/no-hardcoded-spacing */
    padding: 0.15em 0.4em;
  }

  .code-block {
    font-family: var(--text-mono-font);
    font-size: var(--text-caption-size);

    /* Always dark — looks like a real code editor regardless of theme */
    /* stylelint-disable-next-line plugin/no-hardcoded-colors */
    background-color: #09090b;
    /* stylelint-disable-next-line plugin/no-hardcoded-colors */
    color: #d4d4d8;
    /* stylelint-disable-next-line plugin/no-hardcoded-colors, plugin/no-hardcoded-border */
    border: 1px solid #27272a;
    border-radius: var(--radius-lg);
    /* stylelint-disable-next-line plugin/no-hardcoded-spacing */
    padding: 1.125rem var(--space-component-xl);
    overflow-x: auto;
    white-space: pre;
    /* stylelint-disable-next-line plugin/no-hardcoded-spacing */
    margin: 0.875rem 0;
    line-height: var(--text-line-relaxed);
  }

  .hint {
    font-size: var(--text-small-size);
    color: var(--color-text-muted);
    font-style: italic;
  }

  .scripts {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-component-xs);
  }

  .scripts li {
    display: flex;
    align-items: baseline;
    gap: calc(var(--space-component-nano) + var(--space-component-xs));
    padding: var(--space-component-nano) 0;
    border-bottom: var(--border-width-thin) solid var(--color-border);
    font-size: var(--text-prose-size);
  }

  .scripts li:last-child {
    border-bottom: none;
  }
</style>
