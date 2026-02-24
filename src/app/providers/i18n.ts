import { createI18n } from 'vue-i18n'
import type { App } from 'vue'

import {
  DEFAULT_LOCALE,
  FALLBACK_LOCALE,
  isLocale,
  type Locale,
} from '@/shared/i18n/config/locales'
import { resolveInitialLocale } from '@/shared/i18n/lib/detectLocale'
import { setStoredLocale } from '@/shared/i18n/lib/persistLocale'
import type { MessageSchema } from '@/shared/i18n/types'
import commonEn from '@/shared/i18n/model/messages/en/common'
import navEn from '@/shared/i18n/model/messages/en/nav'
import commonDe from '@/shared/i18n/model/messages/de/common'
import navDe from '@/shared/i18n/model/messages/de/nav'
import themeEn from '@/features/theme/i18n/en'
import themeDe from '@/features/theme/i18n/de'
import notificationsEn from '@/features/notifications/i18n/en'
import notificationsDe from '@/features/notifications/i18n/de'
import languageSelectorEn from '@/features/language-selector/i18n/en'
import languageSelectorDe from '@/features/language-selector/i18n/de'
import homeEn from '@/pages/home/i18n/en'
import homeDe from '@/pages/home/i18n/de'
import guideEn from '@/pages/guide/i18n/en'
import guideDe from '@/pages/guide/i18n/de'
import notFoundEn from '@/pages/not-found/i18n/en'
import notFoundDe from '@/pages/not-found/i18n/de'

const en = {
  common: commonEn,
  nav: navEn,
  home: homeEn,
  guide: guideEn,
  notFound: notFoundEn,
  theme: themeEn,
  notifications: notificationsEn,
  languageSelector: languageSelectorEn,
} satisfies MessageSchema

const de = {
  common: commonDe,
  nav: navDe,
  home: homeDe,
  guide: guideDe,
  notFound: notFoundDe,
  theme: themeDe,
  notifications: notificationsDe,
  languageSelector: languageSelectorDe,
} satisfies MessageSchema

const messages = {
  en,
  de,
} satisfies Record<Locale, MessageSchema>

export const i18n = createI18n<[MessageSchema], Locale>({
  legacy: false,
  locale: resolveInitialLocale(),
  fallbackLocale: FALLBACK_LOCALE,
  messages,
})

function isLocaleRef(value: unknown): value is { value: Locale } {
  return typeof value === 'object' && value !== null && 'value' in value
}

function getCurrentLocale(): Locale {
  const globalLocale = i18n.global.locale as unknown

  if (isLocaleRef(globalLocale) && isLocale(globalLocale.value)) {
    return globalLocale.value
  }

  if (isLocale(globalLocale as string)) {
    return globalLocale as Locale
  }

  return DEFAULT_LOCALE
}

function setCurrentLocale(nextLocale: Locale): void {
  const globalLocale = i18n.global.locale as unknown

  if (isLocaleRef(globalLocale)) {
    globalLocale.value = nextLocale
    return
  }

  ;(i18n.global as { locale: Locale }).locale = nextLocale
}

export function setLocale(locale: string): void {
  if (!isLocale(locale)) {
    return
  }

  setCurrentLocale(locale)
  setStoredLocale(locale)
  document.documentElement.lang = locale
}

export function setupI18n(app: App): void {
  app.use(i18n)
  const activeLocale = getCurrentLocale()
  document.documentElement.lang = activeLocale
}
