'use client'

import { AppLayout } from '@grimoire/skeleton-core/components'
import { useRouter } from 'next/navigation'
import { clearSession, getSession } from '@grimoire/skeleton-core/lib'
import { useEffect, useState } from 'react'

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/tasks', label: 'Task Board' },
]

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string | null; email: string } | undefined>()

  useEffect(() => {
    const session = getSession()
    if (!session) {
      router.push('/login')
      return
    }
    setUser(session.user)
  }, [router])

  const handleLogout = () => {
    clearSession()
    router.push('/login')
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <AppLayout appName="👻 Haunted Tasks" links={links} user={user} onLogout={handleLogout}>
      {children}
    </AppLayout>
  )
}
