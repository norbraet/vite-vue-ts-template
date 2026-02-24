import type { THEME_OPTIONS } from '@/features/theme/config'

export type Theme = (typeof THEME_OPTIONS)[keyof typeof THEME_OPTIONS]
