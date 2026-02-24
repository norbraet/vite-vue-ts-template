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
    font-size: clamp(5rem, 20vw, 9rem);
    font-weight: 700;
    letter-spacing: -0.06em;
    line-height: 1;
    margin: 0 0 0.5rem;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-text-secondary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .error-content h2 {
    font-size: 1.375rem;
    margin-bottom: 0.75rem;
  }

  .error-content p {
    font-size: 1rem;
    margin-bottom: 2.5rem;
  }

  .actions {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
  }

  .actions button {
    min-width: 7.5rem;
  }
</style>
