import { THEME_OPTIONS } from '@/shared/constants/app'
import type { Theme } from '@/shared/types/common'

export function isTheme(value: unknown): value is Theme {
  return Object.values(THEME_OPTIONS).includes(value as Theme)
}
