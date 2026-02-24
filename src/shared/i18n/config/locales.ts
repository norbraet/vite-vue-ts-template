export const SUPPORTED_LOCALES = ['en', 'de'] as const

export type Locale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'
export const FALLBACK_LOCALE: Locale = 'en'
export const LOCALE_STORAGE_KEY = 'locale'

export const LOCALE_META: Record<
  Locale,
  { shortLabel: string; nativeName: string; englishName: string }
> = {
  en: {
    shortLabel: 'EN',
    nativeName: 'English',
    englishName: 'English',
  },
  de: {
    shortLabel: 'DE',
    nativeName: 'Deutsch',
    englishName: 'German',
  },
}

export function isLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value)
}
