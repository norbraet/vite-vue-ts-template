import { createI18n } from 'vue-i18n'
import en from '@/shared/locales/en'

export type MessageSchema = typeof en

const i18n = createI18n<[MessageSchema], 'en'>({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en },
})

export default i18n
