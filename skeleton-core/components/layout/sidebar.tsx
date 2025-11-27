'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '../../lib/utils'

export interface SidebarLink {
  href: string
  label: string
  icon?: React.ReactNode
}

interface SidebarProps {
  appName: string
  links: SidebarLink[]
  className?: string
}

export function Sidebar({ appName, links, className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-surface',
        className
      )}
    >
      <div className="flex h-full flex-col">
        {/* App Name / Logo */}
        <div className="flex h-16 items-center border-b border-border px-6">
          <h1 className="text-xl font-bold text-text-primary">{appName}</h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 p-4">
          {links.map(link => {
            const isActive = pathname === link.href || pathname?.startsWith(link.href + '/')

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-accent-purple/10 text-accent-purple'
                    : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'
                )}
              >
                {link.icon && <span className="h-5 w-5">{link.icon}</span>}
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <p className="text-xs text-text-tertiary">Grimoire Stack</p>
        </div>
      </div>
    </aside>
  )
}
