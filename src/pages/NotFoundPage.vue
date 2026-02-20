<script setup lang="ts">
  import { useRouter } from 'vue-router'

  const router = useRouter()

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
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>

      <div class="actions">
        <button class="btn-primary" @click="goHome">Go Home</button>
        <button @click="goBack">Go Back</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .not-found {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 3.5rem - 3rem);
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
