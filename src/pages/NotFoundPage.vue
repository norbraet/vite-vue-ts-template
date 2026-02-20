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
    min-height: 60vh;
  }

  .error-content {
    text-align: center;
    max-width: 500px;
  }

  .error-content h1 {
    font-size: 6rem;
    color: var(--color-primary);
    margin: 0;
    line-height: 1;
  }

  .error-content h2 {
    font-size: 2rem;
    margin: 1rem 0;
    color: var(--color-text-primary);
  }

  .error-content p {
    font-size: 1.1rem;
    margin: 1.5rem 0;
    color: var(--color-text-secondary);
  }

  .actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
  }

  .actions button {
    min-width: 120px;
  }
</style>
