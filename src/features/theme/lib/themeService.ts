import { THEME_OPTIONS } from '@/features/theme/config'
import type { Theme } from '@/features/theme/types'

export function isTheme(value: unknown): value is Theme {
  return Object.values(THEME_OPTIONS).includes(value as Theme)
}
