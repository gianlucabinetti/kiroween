'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthRootPage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/contacts')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-text-secondary">Redirecting...</p>
    </div>
  )
}
