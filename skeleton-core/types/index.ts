/**
 * Skeleton Core - TypeScript Types
 *
 * Shared type definitions for core entities.
 */

// Core types (no Prisma dependency for demo)
export type Role = 'OWNER' | 'ADMIN' | 'MEMBER'

export interface User {
  id: string
  email: string
  name: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Organization {
  id: string
  name: string
  slug: string
  createdAt: Date
  updatedAt: Date
}

export interface Membership {
  id: string
  userId: string
  organizationId: string
  role: Role
  createdAt: Date
  updatedAt: Date
}

export interface Activity {
  id: string
  type: string
  description: string
  userId: string
  organizationId: string
  createdAt: Date
}

export interface AuthUser {
  id: string
  email: string
  name: string | null
  currentOrganizationId: string
}

export interface SessionData {
  user: AuthUser
  expiresAt: Date
}
