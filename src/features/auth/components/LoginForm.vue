<script setup lang="ts">
  import { ref } from 'vue'
  import { useAuth } from '../composables/useAuth'

  const { login, isAuthenticated } = useAuth()

  const email = ref('')
  const password = ref('')

  const handleSubmit = () => {
    if (email.value && password.value) {
      login(email.value, password.value)
    }
  }
</script>

<template>
  <form @submit.prevent="handleSubmit" class="card">
    <h2>Login</h2>
    <p>Example feature component following FSD architecture</p>

    <div class="form-group">
      <label for="email">Email:</label>
      <input id="email" v-model="email" type="email" placeholder="Enter your email" required />
    </div>

    <div class="form-group">
      <label for="password">Password:</label>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Enter your password"
        required
      />
    </div>

    <button type="submit" class="btn-primary">
      {{ isAuthenticated ? 'Logged In' : 'Login' }}
    </button>
  </form>
</template>

<style scoped>
  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.25rem;
    font-weight: 500;
  }

  input {
    width: 100%;
  }
</style>
