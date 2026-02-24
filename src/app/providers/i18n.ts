import { createI18n } from 'vue-i18n'
import type { App } from 'vue'

import en from '@/shared/i18n/locales/en'
import type { MessageSchema } from '@/shared/i18n/types'

export const i18n = createI18n<[MessageSchema], 'en'>({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
  },
})

export function setupI18n(app: App) {
  app.use(i18n)
}
