<script setup lang="ts">
  import { LoginForm } from '@/features/auth'
</script>

<template>
  <div class="container">
    <h1>Authentication</h1>
    <p>This page demonstrates feature integration with Vue Router.</p>

    <div class="auth-container">
      <LoginForm />
    </div>

    <nav class="page-nav">
      <router-link to="/">← Back to Home</router-link>
      <router-link to="/about">About →</router-link>
    </nav>
  </div>
</template>

<style scoped>
  .auth-container {
    max-width: 400px;
    margin: 2rem auto;
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
