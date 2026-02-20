<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { THEME_OPTIONS } from '@/shared/constants/app'
  import { useAppStore } from '@/shared/stores/useAppStore'

  const { t } = useI18n()
  const appStore = useAppStore()

  const toggleTheme = () => {
    const next = appStore.theme === THEME_OPTIONS.LIGHT ? THEME_OPTIONS.DARK : THEME_OPTIONS.LIGHT
    appStore.setTheme(next)
    appStore.addNotification(`Switched to ${next} theme`, 'info')
  }
</script>

<template>
  <div class="container">
    <section class="hero">
      <h1>{{ t('home.title') }}</h1>
      <p>{{ t('home.subtitle') }}</p>
      <div class="hero-actions">
        <router-link to="/guide" class="btn-primary">{{ t('home.viewGuide') }}</router-link>
        <button @click="toggleTheme">{{ t('home.themeToggle', { theme: appStore.theme }) }}</button>
      </div>
    </section>

    <section class="stack card">
      <h2>What's included</h2>
      <ul>
        <li>Vue 3 + Composition API</li>
        <li>TypeScript (strict mode)</li>
        <li>Vite</li>
        <li>Vue Router (SPA)</li>
        <li>Pinia</li>
        <li>Vue I18n</li>
        <li>Zod</li>
        <li>ESLint + Prettier</li>
        <li>Lefthook (Git hooks)</li>
        <li>Feature Sliced Design</li>
        <li>mise (toolchain manager)</li>
        <li>EditorConfig</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
  .hero {
    text-align: center;
    padding: 3rem 1rem;
  }

  .hero h1 {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }

  .hero p {
    font-size: 1.1rem;
    max-width: 520px;
    margin: 0 auto 2rem;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .stack {
    max-width: 480px;
    margin: 0 auto;
  }

  .stack h2 {
    color: var(--color-primary);
    margin-bottom: 1rem;
  }

  .stack ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.4rem 1rem;
    list-style: none;
    padding: 0;
  }

  .stack li {
    color: var(--color-text-secondary);
    font-size: 0.9rem;
    padding-left: 1rem;
    position: relative;
  }

  .stack li::before {
    content: '·';
    color: var(--color-primary);
    position: absolute;
    left: 0;
  }
</style>
