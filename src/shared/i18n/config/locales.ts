export const SUPPORTED_LOCALES = ['en'] as const

export type Locale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'
export const FALLBACK_LOCALE: Locale = 'en'
export const LOCALE_STORAGE_KEY = 'locale'

export function isLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value)
}
