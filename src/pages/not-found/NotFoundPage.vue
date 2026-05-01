<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const { t } = useI18n()

  const goHome = () => {
    router.push('/')
  }

  const goBack = () => {
    router.back()
  }
</script>

<template>
  <div class="container not-found">
    <div class="error-content">
      <h1>404</h1>
      <h2>{{ t('notFound.title') }}</h2>
      <p>{{ t('notFound.description') }}</p>

      <div class="actions">
        <button class="btn-primary" @click="goHome">{{ t('notFound.goHome') }}</button>
        <button @click="goBack">{{ t('notFound.goBack') }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .not-found {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .error-content {
    text-align: center;
    max-width: 480px;
  }

  .error-content h1 {
    /* stylelint-disable-next-line plugin/no-hardcoded-typography */
    font-size: clamp(5rem, 20vw, 9rem);
    font-weight: var(--text-display-weight);
    letter-spacing: var(--text-spacing-display);
    line-height: var(--text-line-none);
    margin: 0 0 var(--space-component-xs);
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-text-muted) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .error-content h2 {
    font-size: var(--text-title-size);
    margin-bottom: var(--space-component-sm);
  }

  .error-content p {
    font-size: var(--text-body-size);
    margin-bottom: var(--space-content);
  }

  .actions {
    display: flex;
    gap: var(--space-component-sm);
    justify-content: center;
  }

  .actions button {
    min-width: 7.5rem;
  }
</style>
