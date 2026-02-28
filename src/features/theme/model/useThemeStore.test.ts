import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useThemeStore } from './useThemeStore'
import { THEME_OPTIONS } from '@/features/theme/config'

describe('useThemeStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    document.documentElement.className = ''
  })

  // --- Initial state ---

  it('initialises with the system theme', () => {
    const store = useThemeStore()
    expect(store.theme).toBe(THEME_OPTIONS.SYSTEM)
  })

  it('initialises with no notifications', () => {
    const store = useThemeStore()
    expect(store.notifications).toHaveLength(0)
    expect(store.unreadNotificationCount).toBe(0)
  })

  it('initialises with isLoading false', () => {
    const store = useThemeStore()
    expect(store.isLoading).toBe(false)
  })

  // --- setTheme ---

  it('setTheme updates the theme state', () => {
    const store = useThemeStore()
    store.setTheme(THEME_OPTIONS.DARK)
    expect(store.theme).toBe(THEME_OPTIONS.DARK)
  })

  it('setTheme persists the value to localStorage', () => {
    const store = useThemeStore()
    store.setTheme(THEME_OPTIONS.LIGHT)
    expect(localStorage.getItem(THEME_OPTIONS.LIGHT)).toBeNull() // key is 'theme'
    expect(localStorage.getItem('theme')).toBe(THEME_OPTIONS.LIGHT)
  })

  it('setTheme adds a theme class to the document root', () => {
    const store = useThemeStore()
    store.setTheme(THEME_OPTIONS.DARK)
    expect(document.documentElement.classList.contains('theme-dark')).toBe(true)
  })

  it('setTheme clears previous theme classes when switching', () => {
    const store = useThemeStore()
    store.setTheme(THEME_OPTIONS.DARK)
    store.setTheme(THEME_OPTIONS.LIGHT)
    expect(document.documentElement.classList.contains('theme-dark')).toBe(false)
    expect(document.documentElement.classList.contains('theme-light')).toBe(true)
  })

  it('setTheme with system theme does not add a class', () => {
    const store = useThemeStore()
    store.setTheme(THEME_OPTIONS.DARK) // set something first
    store.setTheme(THEME_OPTIONS.SYSTEM)
    expect(document.documentElement.className).toBe('')
  })

  // --- isDarkMode computed ---

  it('isDarkMode is false when theme is light', () => {
    const store = useThemeStore()
    store.setTheme(THEME_OPTIONS.LIGHT)
    expect(store.isDarkMode).toBe(false)
  })

  it('isDarkMode is true when theme is dark', () => {
    const store = useThemeStore()
    store.setTheme(THEME_OPTIONS.DARK)
    expect(store.isDarkMode).toBe(true)
  })

  it('isDarkMode follows matchMedia when theme is system', () => {
    // matchMedia mock in setup.ts returns matches: false by default
    const store = useThemeStore()
    expect(store.isDarkMode).toBe(false)

    // Override the mock to simulate a dark OS preference
    vi.mocked(window.matchMedia).mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    // Re-create store so computed picks up the new mock
    setActivePinia(createPinia())
    const freshStore = useThemeStore()
    expect(freshStore.isDarkMode).toBe(true)
  })

  // --- setLoading ---

  it('setLoading toggles isLoading', () => {
    const store = useThemeStore()
    store.setLoading(true)
    expect(store.isLoading).toBe(true)
    store.setLoading(false)
    expect(store.isLoading).toBe(false)
  })

  // --- Notifications ---

  it('addNotification appends a notification', () => {
    const store = useThemeStore()
    store.addNotification('Something happened')
    expect(store.notifications).toHaveLength(1)
    expect(store.notifications[0]!.message).toBe('Something happened')
    expect(store.notifications[0]!.type).toBe('info')
  })

  it('addNotification accepts a custom type', () => {
    const store = useThemeStore()
    store.addNotification('Error occurred', 'error')
    expect(store.notifications[0]!.type).toBe('error')
  })

  it('removeNotification removes the matching entry', () => {
    const store = useThemeStore()
    store.addNotification('First')
    store.addNotification('Second')
    const id = store.notifications[0]!.id
    store.removeNotification(id)
    expect(store.notifications).toHaveLength(1)
    expect(store.notifications[0]!.message).toBe('Second')
  })

  it('removeNotification is a no-op for an unknown id', () => {
    const store = useThemeStore()
    store.addNotification('Only one')
    store.removeNotification('non-existent-id')
    expect(store.notifications).toHaveLength(1)
  })

  it('clearNotifications empties the list', () => {
    const store = useThemeStore()
    store.addNotification('A')
    store.addNotification('B')
    store.clearNotifications()
    expect(store.notifications).toHaveLength(0)
  })

  it('unreadNotificationCount reflects the current list length', () => {
    const store = useThemeStore()
    expect(store.unreadNotificationCount).toBe(0)
    store.addNotification('One')
    store.addNotification('Two')
    expect(store.unreadNotificationCount).toBe(2)
  })

  // --- initializeTheme ---

  it('initializeTheme restores a valid saved theme', () => {
    localStorage.setItem('theme', THEME_OPTIONS.DARK)
    const store = useThemeStore()
    store.initializeTheme()
    expect(store.theme).toBe(THEME_OPTIONS.DARK)
  })

  it('initializeTheme ignores an invalid saved value', () => {
    localStorage.setItem('theme', 'banana')
    const store = useThemeStore()
    store.initializeTheme()
    expect(store.theme).toBe(THEME_OPTIONS.SYSTEM)
  })
})
