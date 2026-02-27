import { describe, it, expect } from 'vitest'
import { formatDate, formatCurrency, capitalize } from './format'

describe('formatDate', () => {
  it('formats a Date object', () => {
    const date = new Date(2026, 0, 15)
    const result = formatDate(date)
    expect(result).toContain('2026')
    expect(result).toContain('15')
  })

  it('formats a date string', () => {
    const result = formatDate('2026-02-20')
    expect(result).toContain('2026')
  })

  it('accepts custom Intl options', () => {
    const date = new Date(2026, 0, 15)
    const result = formatDate(date, { month: 'long' })
    expect(result).toContain('January')
  })
})

describe('formatCurrency', () => {
  it('formats USD by default', () => {
    const result = formatCurrency(1234.56)
    expect(result).toContain('1,234.56')
    expect(result).toContain('$')
  })

  it('formats a given currency code', () => {
    const result = formatCurrency(100, 'EUR')
    expect(result).toContain('100')
  })

  it('formats zero', () => {
    expect(formatCurrency(0)).toContain('0')
  })
})

describe('capitalize', () => {
  it('uppercases the first character', () => {
    expect(capitalize('hello')).toBe('Hello')
  })

  it('lowercases the remaining characters', () => {
    expect(capitalize('hELLO')).toBe('Hello')
  })

  it('handles a single character', () => {
    expect(capitalize('a')).toBe('A')
  })

  it('handles an empty string', () => {
    expect(capitalize('')).toBe('')
  })
})
