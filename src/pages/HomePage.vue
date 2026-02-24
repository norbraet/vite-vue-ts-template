<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useThemeStore } from '@/features/theme/model/useThemeStore'
  import { THEME_OPTIONS } from '@/features/theme/config'

  const { t } = useI18n()
  const appStore = useThemeStore()

  const toggleTheme = () => {
    switch (appStore.theme) {
      case 'dark':
        appStore.setTheme(THEME_OPTIONS.LIGHT)
        appStore.addNotification(`Switched to ${THEME_OPTIONS.LIGHT} theme`, 'info')
        break
      case 'light':
        appStore.setTheme(THEME_OPTIONS.SYSTEM)
        appStore.addNotification(`Switched to ${THEME_OPTIONS.SYSTEM} theme`, 'info')
        break
      case 'system':
        appStore.setTheme(THEME_OPTIONS.DARK)
        appStore.addNotification(`Switched to ${THEME_OPTIONS.DARK} theme`, 'info')
        break
    }
  }

  const stack = [
    {
      label: 'Vue 3',
      link: 'https://vuejs.org/',
    },
    {
      label: 'TypeScript',
      link: 'https://www.typescriptlang.org/',
    },
    {
      label: 'Vite',
      link: 'https://vite.dev/',
    },
    {
      label: 'Vue Router',
      link: 'https://router.vuejs.org/',
    },
    {
      label: 'Pinia Store',
      link: 'https://pinia.vuejs.org/',
    },
    {
      label: 'Vue I18n',
      link: 'https://vue-i18n.intlify.dev/',
    },
    {
      label: 'Zod',
      link: 'https://zod.dev/',
    },
    {
      label: 'ESLint',
      link: 'https://eslint.org/',
    },
    {
      label: 'Prettier',
      link: 'https://prettier.io/',
    },
    {
      label: 'Lefthook',
      link: 'https://github.com/evilmartians/lefthook',
    },
    {
      label: 'Feature Sliced Design',
      link: 'https://feature-sliced.design/',
    },
    {
      label: 'mise',
      link: 'https://mise.jdx.dev/',
    },
    {
      label: 'Commitlint',
      link: 'https://commitlint.js.org/',
    },
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
        <a
          v-for="tool in stack"
          :key="tool.label"
          :href="tool.link"
          class="badge"
          target="_blank"
          rel="noopener noreferrer"
          >{{ tool.label }}</a
        >
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
    background: linear-gradient(145deg, var(--color-text-primary) 20%, var(--color-primary) 100%);
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

  .badge-grid a.badge {
    text-decoration: none;
    color: var(--color-text-secondary);
  }

  .badge-grid a.badge:hover {
    background-color: var(--color-primary-subtle);
    color: var(--color-primary);
    border-color: var(--color-primary-subtle);
  }
</style>
