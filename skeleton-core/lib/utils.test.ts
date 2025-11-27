import { describe, it, expect } from 'vitest'
import { cn, formatDate, formatRelativeTime, getSafeErrorMessage, generateId } from './utils'

describe('utils', () => {
  describe('cn', () => {
    it('merges class names correctly', () => {
      expect(cn('foo', 'bar')).toBe('foo bar')
    })

    it('handles conditional classes', () => {
      expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
    })

    it('merges Tailwind classes with proper precedence', () => {
      expect(cn('px-2', 'px-4')).toBe('px-4')
    })

    it('handles empty input', () => {
      expect(cn()).toBe('')
    })
  })

  describe('formatDate', () => {
    it('formats Date object correctly', () => {
      const date = new Date('2024-10-31T12:00:00Z')
      const formatted = formatDate(date)
      expect(formatted).toContain('Oct')
      expect(formatted).toContain('2024')
    })

    it('formats date string correctly', () => {
      const formatted = formatDate('2024-10-31')
      expect(formatted).toContain('Oct')
    })
  })

  describe('formatRelativeTime', () => {
    it('returns "just now" for recent dates', () => {
      const now = new Date()
      expect(formatRelativeTime(now)).toBe('just now')
    })

    it('returns minutes ago for dates within an hour', () => {
      const date = new Date(Date.now() - 5 * 60 * 1000) // 5 minutes ago
      expect(formatRelativeTime(date)).toBe('5m ago')
    })

    it('returns hours ago for dates within a day', () => {
      const date = new Date(Date.now() - 3 * 60 * 60 * 1000) // 3 hours ago
      expect(formatRelativeTime(date)).toBe('3h ago')
    })

    it('returns days ago for dates within a week', () => {
      const date = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      expect(formatRelativeTime(date)).toBe('2d ago')
    })
  })

  describe('getSafeErrorMessage', () => {
    it('extracts message from Error object', () => {
      const error = new Error('Test error')
      expect(getSafeErrorMessage(error)).toBe('Test error')
    })

    it('returns string errors as-is', () => {
      expect(getSafeErrorMessage('String error')).toBe('String error')
    })

    it('returns default message for unknown errors', () => {
      expect(getSafeErrorMessage(null)).toBe('An unexpected error occurred')
      expect(getSafeErrorMessage(undefined)).toBe('An unexpected error occurred')
      expect(getSafeErrorMessage(123)).toBe('An unexpected error occurred')
    })
  })

  describe('generateId', () => {
    it('generates a string', () => {
      const id = generateId()
      expect(typeof id).toBe('string')
    })

    it('generates unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()
      expect(id1).not.toBe(id2)
    })

    it('generates non-empty IDs', () => {
      const id = generateId()
      expect(id.length).toBeGreaterThan(0)
    })
  })
})
