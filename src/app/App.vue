<script setup lang="ts">
  import HomePage from '@/pages/HomePage.vue'
  import { LoginForm } from '@/features/auth'
</script>

<template>
  <div id="app">
    <header>
      <h1>Vue 3 + TypeScript Template</h1>
      <p>Feature Sliced Design Architecture</p>
    </header>

    <main>
      <HomePage />

      <section style="margin-top: 2rem">
        <h2>Example Feature Component</h2>
        <LoginForm />
      </section>
    </main>
  </div>
</template>

<style scoped>
  header {
    text-align: center;
    margin-bottom: 2rem;
    padding: 2rem 0;
    border-bottom: 1px solid var(--color-border);
  }

  header h1 {
    color: var(--color-primary);
    margin-bottom: 0.5rem;
  }

  header p {
    color: var(--color-text-secondary);
  }

  main {
    padding: 0 1rem;
  }

  section {
    max-width: 600px;
    margin: 0 auto;
  }

  section h2 {
    margin-bottom: 1rem;
    text-align: center;
  }
</style>
