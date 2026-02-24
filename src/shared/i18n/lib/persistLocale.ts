import { LOCALE_STORAGE_KEY, isLocale } from '@/shared/i18n/config/locales'
import type { Locale } from '@/shared/i18n/config/locales'

export function getStoredLocale(): Locale | null {
  try {
    const locale = localStorage.getItem(LOCALE_STORAGE_KEY)

    if (locale && isLocale(locale)) {
      return locale
    }
  } catch {
    return null
  }

  return null
}

export function setStoredLocale(locale: Locale): void {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  } catch {
    // Ignore storage failures (private mode, blocked storage, etc.)
  }
}
