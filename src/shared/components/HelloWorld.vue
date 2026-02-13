<script setup lang="ts">
  interface Props {
    msg: string
  }

  defineProps<Props>()

  const click = () => console.log('Clicked')
</script>

<template>
  <div class="card">
    <h2>{{ msg }}</h2>
    <p>This is a shared component that can be used across features.</p>
    <button @click="click" class="btn-primary">Click me!</button>
  </div>
</template>

<style scoped>
  h2 {
    margin-bottom: 0.5rem;
    color: var(--color-primary);
  }

  p {
    margin-bottom: 1rem;
  }
</style>
