import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { STORAGE_KEYS, THEME_OPTIONS } from '@/shared/constants/app'
import { isTheme } from '@/shared/services/themeService'
import type { Theme } from '@/shared/types/common'

/**
 * Global app store for app-wide state
 * This is shared across all features
 */
export const useAppStore = defineStore('app', () => {
  const theme = ref<Theme>(THEME_OPTIONS.SYSTEM)
  const isLoading = ref(false)
  const notifications = ref<Array<{ id: string; message: string; type: string }>>([])

  const isDarkMode = computed(() => {
    if (theme.value === THEME_OPTIONS.SYSTEM) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return theme.value === THEME_OPTIONS.DARK
  })

  const unreadNotificationCount = computed(() => {
    return notifications.value.length
  })

  function setTheme(newTheme: Theme) {
    theme.value = newTheme

    document.documentElement.className = ''
    if (newTheme !== THEME_OPTIONS.SYSTEM) {
      document.documentElement.classList.add(`theme-${newTheme}`)
    }

    localStorage.setItem('theme', newTheme)
  }

  function setLoading(loading: boolean) {
    isLoading.value = loading
  }

  function addNotification(
    message: string,
    type: 'info' | 'success' | 'warning' | 'error' = 'info'
  ) {
    const id = Date.now().toString()
    notifications.value.push({ id, message, type })

    setTimeout(() => {
      removeNotification(id)
    }, 5000)
  }

  function removeNotification(id: string) {
    const index = notifications.value.findIndex((n) => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  function clearNotifications() {
    notifications.value = []
  }

  function initializeTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME)

    if (isTheme(savedTheme)) {
      setTheme(savedTheme)
    }
  }

  return {
    // State
    theme,
    isLoading,
    notifications,

    // Getters
    isDarkMode,
    unreadNotificationCount,

    // Actions
    setTheme,
    setLoading,
    addNotification,
    removeNotification,
    clearNotifications,
    initializeTheme,
  }
})
