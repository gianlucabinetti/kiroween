'use client'

import Link from 'next/link'
import { Button, Card, CardHeader, CardTitle, CardContent } from '@grimoire/skeleton-core/components'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[600px]">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            <span className="text-6xl mb-4 block">👻</span>
            Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-text-secondary">
            This page has vanished into the mystical void...
          </p>
          <Link href="/contacts">
            <Button className="w-full">Return to Contacts</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
