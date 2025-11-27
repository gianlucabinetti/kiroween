/**
 * Simple Mock Authentication for Hackathon Demo
 *
 * In production, replace with NextAuth.js or similar
 */

import type { AuthUser, SessionData } from '../types'

const DEMO_USERS = [
  {
    id: 'user_1',
    email: 'demo@grimoire.dev',
    name: 'Demo User',
    currentOrganizationId: 'org_1',
  },
  {
    id: 'user_2',
    email: 'witch@coven.dev',
    name: 'Wicked Witch',
    currentOrganizationId: 'org_1',
  },
]

/**
 * Mock login - validates email and returns user
 */
export async function login(email: string): Promise<AuthUser | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  const user = DEMO_USERS.find(u => u.email === email)
  return user || null
}

/**
 * Mock logout
 */
export async function logout(): Promise<void> {
  // In real app, clear session cookie
  await new Promise(resolve => setTimeout(resolve, 100))
}

/**
 * Get current session from cookie/storage
 * For demo, we'll use localStorage
 */
export function getSession(): SessionData | null {
  if (typeof window === 'undefined') return null

  try {
    const session = localStorage.getItem('grimoire_session')
    if (!session) return null

    const data = JSON.parse(session) as SessionData

    // Check if expired
    if (new Date(data.expiresAt) < new Date()) {
      localStorage.removeItem('grimoire_session')
      return null
    }

    return data
  } catch {
    return null
  }
}

/**
 * Save session to storage
 */
export function saveSession(user: AuthUser): void {
  if (typeof window === 'undefined') return

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7) // 7 days

  const session: SessionData = {
    user,
    expiresAt,
  }

  localStorage.setItem('grimoire_session', JSON.stringify(session))
}

/**
 * Clear session from storage
 */
export function clearSession(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('grimoire_session')
}
