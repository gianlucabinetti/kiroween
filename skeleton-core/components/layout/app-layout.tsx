'use client'

import * as React from 'react'
import { Sidebar, type SidebarLink } from './sidebar'
import { Navbar } from './navbar'

interface AppLayoutProps {
  appName: string
  links: SidebarLink[]
  user?: {
    name: string | null
    email: string
  }
  onLogout?: () => void
  children: React.ReactNode
}

export function AppLayout({ appName, links, user, onLogout, children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar appName={appName} links={links} />
      <Navbar user={user} onLogout={onLogout} />

      <main className="ml-64 pt-16">
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
