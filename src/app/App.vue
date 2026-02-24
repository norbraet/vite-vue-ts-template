<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import NotificationToast from '@/features/notifications/NotificationToast.vue'
  import { useThemeStore } from '@/features/theme/model/useThemeStore'

  const { t } = useI18n()
  const appStore = useThemeStore()

  onMounted(() => {
    appStore.initializeTheme()
  })
</script>

<template>
  <div id="app">
    <header>
      <nav class="main-header">
        <router-link to="/" class="logo">Vue 3 Template</router-link>

        <div class="nav-links">
          <router-link to="/" class="nav-link">{{ t('nav.home') }}</router-link>
          <router-link to="/guide" class="nav-link">{{ t('nav.guide') }}</router-link>
        </div>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <footer>
      <p>Feature Sliced Design · Vue 3 · TypeScript · Pinia · Vue Router · Vue I18n · Zod</p>
    </footer>
  </div>

  <NotificationToast />
</template>

<style scoped>
  #app {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    min-height: 100dvh;
  }

  header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--color-nav-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--color-border);
  }

  .main-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 72rem;
    margin: 0 auto;
    padding: 0 1.5rem;
    height: 3.5rem;
  }

  .logo {
    font-size: 0.9375rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    text-decoration: none;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-text-primary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transition: opacity 0.15s ease;
  }

  .logo:hover {
    opacity: 0.75;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .nav-link {
    color: var(--color-text-secondary);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.875rem;
    padding: 0.375rem 0.75rem;
    border-radius: var(--radius-md);
    transition:
      color 0.15s ease,
      background-color 0.15s ease;
  }

  .nav-link:hover {
    color: var(--color-text-primary);
    background-color: var(--color-bg-subtle);
  }

  .nav-link.router-link-active {
    color: var(--color-primary);
    background-color: var(--color-primary-subtle);
    font-weight: 600;
  }

  main {
    padding: 3rem 0;
  }

  footer {
    border-top: 1px solid var(--color-border);
    background-color: var(--color-bg-secondary);
  }

  footer p {
    max-width: 72rem;
    margin: 0 auto;
    padding: 1rem 1.5rem;
    color: var(--color-text-secondary);
    font-size: 0.8125rem;
    text-align: center;
  }

  @media (max-width: 640px) {
    .main-header {
      padding: 0 1rem;
    }

    .logo {
      font-size: 0.875rem;
    }

    .nav-link {
      padding: 0.25rem 0.5rem;
      font-size: 0.8125rem;
    }
  }
</style>
