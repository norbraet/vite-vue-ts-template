<script setup lang="ts">
  import HelloWorld from '@/shared/components/HelloWorld.vue'
  import { APP_NAME } from '@/shared/constants/app'
</script>

<template>
  <div class="container">
    <h1>Welcome to {{ APP_NAME }}</h1>
    <p>This template demonstrates Feature Sliced Design architecture with Vue Router.</p>

    <HelloWorld msg="Hello from shared component!" />

    <nav class="main-nav">
      <h2>Explore the Template</h2>
      <div class="nav-links">
        <router-link to="/auth" class="nav-card">
          <h3>🔐 Authentication</h3>
          <p>Example feature with login form</p>
        </router-link>

        <router-link to="/about" class="nav-card">
          <h3>📖 About</h3>
          <p>Learn about the architecture</p>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<style scoped>
  h1 {
    margin-bottom: 1rem;
    text-align: center;
  }

  p {
    text-align: center;
    margin-bottom: 2rem;
  }

  .main-nav {
    margin-top: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .main-nav h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: var(--color-text-primary);
  }

  .nav-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }

  .nav-card {
    display: block;
    text-decoration: none;
    color: inherit;
    background: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    transition: all 0.2s ease;
  }

  .nav-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: var(--color-primary);
  }

  .nav-card h3 {
    color: var(--color-primary);
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

  .nav-card p {
    color: var(--color-text-secondary);
    margin: 0;
    text-align: left;
    font-size: 0.9rem;
  }
</style>
