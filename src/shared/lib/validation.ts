import { z } from 'zod'

// Reusable primitive schemas
export const emailSchema = z.email('Invalid email address')

export const urlSchema = z.url('Invalid URL')

export const requiredString = (label: string) => z.string().min(1, `${label} is required`)

export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
})

export type PaginationParams = z.infer<typeof paginationSchema>
