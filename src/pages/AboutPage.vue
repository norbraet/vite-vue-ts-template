<script setup lang="ts">
  import { APP_NAME } from '@/shared/constants/app'
  import { formatDate } from '@/shared/utils/format'

  const currentDate = new Date()
</script>

<template>
  <div class="container">
    <h1>About {{ APP_NAME }}</h1>

    <div class="about-content">
      <section class="card">
        <h2>🏗️ Architecture</h2>
        <p>
          This template follows <strong>Feature Sliced Design</strong> architecture with strict
          boundaries enforced by ESLint.
        </p>

        <ul>
          <li><strong>app/</strong> - Application setup and configuration</li>
          <li><strong>pages/</strong> - Route components for Vue Router</li>
          <li><strong>features/</strong> - Isolated business features</li>
          <li><strong>shared/</strong> - Reusable components and utilities</li>
        </ul>
      </section>

      <section class="card">
        <h2>🛠️ Tech Stack</h2>
        <ul>
          <li>Vue 3 with Composition API</li>
          <li>TypeScript with strict configuration</li>
          <li>Vue Router for navigation</li>
          <li>Vite for fast development</li>
          <li>ESLint + Prettier for code quality</li>
          <li>Lefthook for Git hooks</li>
        </ul>
      </section>

      <section class="card">
        <h2>📅 Template Info</h2>
        <p>
          Generated on: <strong>{{ formatDate(currentDate) }}</strong>
        </p>
        <p>This demonstrates shared utility usage across pages.</p>
      </section>
    </div>

    <nav class="page-nav">
      <router-link to="/auth">← Authentication</router-link>
      <router-link to="/">Home →</router-link>
    </nav>
  </div>
</template>

<style scoped>
  .about-content {
    max-width: 800px;
    margin: 2rem auto;
  }

  .card {
    margin-bottom: 1.5rem;
  }

  .card h2 {
    color: var(--color-primary);
    margin-bottom: 1rem;
  }

  .card ul {
    margin: 1rem 0;
  }

  .card li {
    margin: 0.5rem 0;
    padding-left: 1rem;
    position: relative;
  }

  .card li::before {
    content: '•';
    color: var(--color-primary);
    position: absolute;
    left: 0;
  }

  .page-nav {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--color-border);
  }

  .page-nav a {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
  }

  .page-nav a:hover {
    color: var(--color-primary-hover);
  }
</style>
