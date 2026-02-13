import { ref } from 'vue'

export function useAuth() {
  const isAuthenticated = ref(false)
  const user = ref<{ name: string; email: string } | null>(null)

  const login = (email: string, password: string) => {
    console.log('Logging in with:', email, password)

    isAuthenticated.value = true
    user.value = {
      name: 'John Doe',
      email,
    }
  }

  const logout = () => {
    isAuthenticated.value = false
    user.value = null
  }

  return {
    isAuthenticated: isAuthenticated,
    user: user,
    login,
    logout,
  }
}
