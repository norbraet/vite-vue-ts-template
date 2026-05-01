<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import NotificationToast from '@/features/notifications/NotificationToast.vue'
  import LanguageSelector from '@/features/language-selector/ui/LanguageSelector.vue'
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
        <router-link to="/" class="logo">{{ t('common.appName') }}</router-link>

        <div class="header-actions">
          <div class="nav-links">
            <router-link to="/" class="nav-link">{{ t('nav.home') }}</router-link>
            <router-link to="/guide" class="nav-link">{{ t('nav.guide') }}</router-link>
          </div>

          <LanguageSelector />
        </div>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <footer>
      <p>{{ t('common.footerStack') }}</p>
    </footer>
  </div>

  <NotificationToast />
</template>

<style lang="css" scoped>
  #app {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    min-height: 100dvh;
  }

  header {
    position: sticky;
    top: 0;
    z-index: var(--z-sticky);
    background: var(--color-surface);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: var(--border-width-thin) solid var(--color-border);
  }

  .main-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: var(--layout-max-width);
    margin: 0 auto;
    padding: 0 var(--space-page);
    height: 3.5rem;
    gap: var(--space-component-md);
  }

  .logo {
    font-size: var(--text-prose-size);
    font-weight: var(--text-display-weight);
    letter-spacing: var(--text-spacing-ui);
    text-decoration: none;
    color: var(--color-text);
    transition: opacity var(--motion-fast) var(--motion-ease-standard);
    flex-shrink: 0;
  }

  .logo:hover {
    opacity: 0.75;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: var(--space-component-sm);
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: var(--space-component-nano);
  }

  .nav-link {
    color: var(--color-text-muted);
    text-decoration: none;
    font-weight: var(--text-emphasis-weight);
    font-size: var(--text-small-size);
    padding: var(--space-component-xs) var(--space-component-sm);
    border-radius: var(--radius-button);
    transition:
      color var(--motion-fast) var(--motion-ease-standard),
      background-color var(--motion-fast) var(--motion-ease-standard);
  }

  .nav-link:hover {
    color: var(--color-text);
    background-color: var(--color-bg-subtle);
  }

  .nav-link.router-link-active {
    color: var(--color-primary);
    background-color: var(--color-primary-subtle);
    font-weight: var(--text-label-weight);
  }

  main {
    padding: var(--space-section) 0;
  }

  footer {
    border-top: var(--border-width-thin) solid var(--color-border);
    background-color: var(--color-surface-raised);
  }

  footer p {
    max-width: var(--layout-max-width);
    margin: 0 auto;
    padding: var(--space-component-md) var(--space-component-lg);
    color: var(--color-text-muted);
    font-size: var(--text-caption-size);
    text-align: center;
  }

  @media (max-width: 768px) {
    .main-header {
      padding: 0 var(--space-component-md);
      height: auto;
      min-height: 3.5rem;
      flex-wrap: wrap;
      padding-top: var(--space-component-xs);
      padding-bottom: var(--space-component-xs);
    }

    .header-actions {
      width: 100%;
      justify-content: space-between;
    }

    .nav-link {
      padding: var(--space-component-nano) var(--space-component-xs);
      font-size: var(--text-caption-size);
    }
  }
</style>
