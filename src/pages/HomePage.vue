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

  const stack = [
    'Vue 3',
    'TypeScript',
    'Vite',
    'Vue Router',
    'Pinia',
    'Vue I18n',
    'Zod',
    'ESLint',
    'Prettier',
    'Lefthook',
    'Feature Sliced Design',
    'mise',
  ]
</script>

<template>
  <div class="container">
    <section class="hero">
      <h1>{{ t('home.title') }}</h1>
      <p>{{ t('home.subtitle') }}</p>
      <div class="hero-actions">
        <router-link to="/guide" class="btn-primary">{{ t('home.viewGuide') }}</router-link>
        <button @click="toggleTheme">
          {{ t('home.themeToggle', { theme: appStore.theme }) }}
        </button>
      </div>
    </section>

    <section class="stack card">
      <h2>What's included</h2>
      <div class="badge-grid">
        <span v-for="item in stack" :key="item" class="badge">{{ item }}</span>
      </div>
    </section>
  </div>
</template>

<style scoped>
  .hero {
    text-align: center;
    padding: 5rem 1rem 4rem;
  }

  .hero h1 {
    font-size: clamp(2rem, 6vw, 3.5rem);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1.1;
    margin-bottom: 1.25rem;
    background: linear-gradient(140deg, var(--color-text-primary) 40%, var(--color-primary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero p {
    font-size: 1.125rem;
    max-width: 500px;
    margin: 0 auto 2.5rem;
  }

  .hero-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .stack {
    max-width: 560px;
    margin: 0 auto;
  }

  .stack h2 {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-text-secondary);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  .badge-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
</style>
