<script setup lang="ts">
  import HelloWorld from '@/shared/components/HelloWorld.vue'

  const title = 'Welcome to Vue 3 + TypeScript Template'
</script>

<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <p>This is the home page using Feature Sliced Design architecture.</p>
    <HelloWorld msg="Hello from shared component!" />
  </div>
</template>

<style scoped>
  h1 {
    margin-bottom: 1rem;
  }
</style>
