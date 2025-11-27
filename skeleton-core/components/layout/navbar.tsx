'use client'

import * as React from 'react'
import { cn } from '../../lib/utils'

interface NavbarProps {
  user?: {
    name: string | null
    email: string
  }
  onLogout?: () => void
  className?: string
}

export function Navbar({ user, onLogout, className }: NavbarProps) {
  return (
    <header
      className={cn(
        'fixed left-64 right-0 top-0 z-30 h-16 border-b border-border bg-surface',
        className
      )}
    >
      <div className="flex h-full items-center justify-between px-6">
        {/* Left side - could add breadcrumbs or search */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-text-tertiary">Welcome back!</span>
        </div>

        {/* Right side - user menu */}
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-text-primary">{user.name || 'User'}</p>
                <p className="text-xs text-text-tertiary">{user.email}</p>
              </div>

              {onLogout && (
                <button
                  onClick={onLogout}
                  className="rounded-md px-3 py-1.5 text-sm text-text-secondary hover:bg-surface-elevated hover:text-text-primary transition-colors"
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
