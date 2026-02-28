import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { mount, type MountingOptions } from '@vue/test-utils'
import type { Component } from 'vue'
import type { MessageSchema } from '@/shared/i18n/types'
import type { Locale } from '@/shared/i18n/config/locales'

/**
 * Creates a minimal i18n instance suitable for tests.
 * Uses the same type parameters as the app's i18n provider so the global
 * DefineLocaleMessage augmentation is satisfied.
 *
 * Pass `overrides` to provide translations for components that require them.
 */
export function createTestI18n(overrides: Partial<Record<Locale, Partial<MessageSchema>>> = {}) {
  return createI18n<[MessageSchema], Locale>({
    legacy: false,
    locale: 'en',
    messages: {
      en: { ...overrides.en } as MessageSchema,
      de: { ...overrides.de } as MessageSchema,
    },
  })
}

/**
 * Mounts a component with the standard app plugins (Pinia + i18n) pre-installed.
 * Use this for any component that depends on stores or translations.
 *
 * @example
 * const wrapper = mountWithProviders(MyComponent, { props: { title: 'Hello' } })
 */
export function mountWithProviders(
  component: Component,
  options: MountingOptions<Record<string, unknown>> = {}
) {
  return mount(component, {
    global: {
      plugins: [createPinia(), createTestI18n()],
      ...options.global,
    },
    ...options,
  })
}
