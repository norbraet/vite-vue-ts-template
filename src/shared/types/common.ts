import { THEME_OPTIONS } from '@/shared/constants/app'

export interface ApiResponse<T = unknown> {
  data: T
  success: boolean
  message?: string
  errors?: string[]
}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface FormValidationError {
  field: string
  message: string
}

export type Theme = (typeof THEME_OPTIONS)[keyof typeof THEME_OPTIONS]
