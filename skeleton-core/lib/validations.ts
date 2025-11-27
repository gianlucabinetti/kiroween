import { z } from 'zod'

/**
 * Common validation schemas using Zod
 */

export const emailSchema = z.string().email('Invalid email address')

export const userSchema = z.object({
  id: z.string().cuid(),
  email: emailSchema,
  name: z.string().min(1, 'Name is required').optional(),
})

export const organizationSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, 'Organization name is required'),
  slug: z.string().min(1, 'Slug is required'),
})

export const membershipSchema = z.object({
  id: z.string().cuid(),
  role: z.enum(['OWNER', 'ADMIN', 'MEMBER']),
  userId: z.string().cuid(),
  organizationId: z.string().cuid(),
})
