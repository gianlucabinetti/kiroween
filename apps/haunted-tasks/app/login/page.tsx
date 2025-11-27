'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@grimoire/skeleton-core/components'
import { login, saveSession } from '@grimoire/skeleton-core/lib'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const user = await login(email)

      if (!user) {
        setError('Invalid email. Try: demo@grimoire.dev or witch@coven.dev')
        return
      }

      saveSession(user)
      router.push('/dashboard')
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            <span className="text-4xl mb-2 block">👻</span>
            Haunted Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="demo@grimoire.dev"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-sm text-accent-red">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Summoning...' : 'Enter the Crypt'}
            </Button>

            <div className="text-center text-sm text-text-tertiary">
              <p>Demo accounts:</p>
              <p className="mt-1">demo@grimoire.dev</p>
              <p>witch@coven.dev</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
