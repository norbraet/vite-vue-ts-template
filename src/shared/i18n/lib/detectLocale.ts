import { DEFAULT_LOCALE, isLocale } from '@/shared/i18n/config/locales'
import type { Locale } from '@/shared/i18n/config/locales'
import { getStoredLocale } from '@/shared/i18n/lib/persistLocale'

function getBrowserLocale(): Locale | null {
  if (typeof navigator === 'undefined' || !navigator.language) {
    return null
  }

  const normalized = navigator.language.toLowerCase()
  const primary = normalized.split('-')[0]

  if (isLocale(normalized)) {
    return normalized
  }

  if (isLocale(primary)) {
    return primary
  }

  return null
}

export function resolveInitialLocale(): Locale {
  const stored = getStoredLocale()

  if (stored) {
    return stored
  }

  const browser = getBrowserLocale()

  if (browser) {
    return browser
  }

  return DEFAULT_LOCALE
}
