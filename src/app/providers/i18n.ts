import { createI18n } from 'vue-i18n'
import type { App } from 'vue'

import common from '@/shared/i18n/model/messages/en/common'
import nav from '@/shared/i18n/model/messages/en/nav'
import {
  DEFAULT_LOCALE,
  FALLBACK_LOCALE,
  isLocale,
  type Locale,
} from '@/shared/i18n/config/locales'
import { resolveInitialLocale } from '@/shared/i18n/lib/detectLocale'
import { setStoredLocale } from '@/shared/i18n/lib/persistLocale'
import theme from '@/features/theme/i18n/en'
import notifications from '@/features/notifications/i18n/en'
import home from '@/pages/home/i18n/en'
import guide from '@/pages/guide/i18n/en'
import notFound from '@/pages/not-found/i18n/en'

const en = {
  common,
  nav,
  home,
  guide,
  notFound,
  theme,
  notifications,
} as const

const messages = {
  en,
} as const

export type MessageSchema = typeof en

export const i18n = createI18n<[MessageSchema], Locale>({
  legacy: false,
  locale: resolveInitialLocale(),
  fallbackLocale: FALLBACK_LOCALE,
  messages,
})

export function setLocale(locale: string): void {
  if (!isLocale(locale)) {
    return
  }

  i18n.global.locale.value = locale
  setStoredLocale(locale)
  document.documentElement.lang = locale
}

export function setupI18n(app: App): void {
  app.use(i18n)
  const activeLocale = isLocale(i18n.global.locale.value)
    ? i18n.global.locale.value
    : DEFAULT_LOCALE
  document.documentElement.lang = activeLocale
}
