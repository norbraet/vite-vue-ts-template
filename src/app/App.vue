<script setup lang="ts">
  // Main App component with Vue Router integration
</script>

<template>
  <div id="app">
    <header>
      <nav class="main-header">
        <router-link to="/" class="logo"> Vue 3 + TypeScript Template </router-link>

        <div class="nav-links">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/auth" class="nav-link">Auth</router-link>
          <router-link to="/about" class="nav-link">About</router-link>
        </div>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <footer>
      <p>Feature Sliced Design Architecture with Vue Router</p>
    </footer>
  </div>
</template>

<style scoped>
  header {
    border-bottom: 1px solid var(--color-border);
    background-color: var(--color-bg-secondary);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .main-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
  }

  .logo {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-primary);
    text-decoration: none;
  }

  .logo:hover {
    color: var(--color-primary-hover);
  }

  .nav-links {
    display: flex;
    gap: 1.5rem;
  }

  .nav-link {
    color: var(--color-text-secondary);
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-md);
    transition: all 0.2s ease;
  }

  .nav-link:hover {
    color: var(--color-primary);
    background-color: var(--color-bg-primary);
  }

  .nav-link.router-link-active {
    color: var(--color-primary);
    background-color: var(--color-bg-primary);
    font-weight: 600;
  }

  main {
    min-height: calc(100vh - 140px);
    padding: 2rem 1rem;
  }

  footer {
    text-align: center;
    padding: 1rem;
    border-top: 1px solid var(--color-border);
    background-color: var(--color-bg-secondary);
  }

  footer p {
    color: var(--color-text-secondary);
    font-size: 0.9rem;
    margin: 0;
  }

  @media (max-width: 768px) {
    .main-header {
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }

    .nav-links {
      gap: 1rem;
    }

    .nav-link {
      padding: 0.25rem 0.75rem;
      font-size: 0.9rem;
    }
  }
</style>
