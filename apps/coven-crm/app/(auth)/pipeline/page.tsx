'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@grimoire/skeleton-core/components'
import { getSession } from '@grimoire/skeleton-core/lib'
import { ContactCard } from '@/components/contact-card'
import type { ContactWithRelations, Stage } from '@/lib/types'

export default function PipelinePage() {
  const router = useRouter()
  const [contacts, setContacts] = useState<ContactWithRelations[]>([])
  const [loading, setLoading] = useState(true)

  const session = getSession()
  const organizationId = session?.user.currentOrganizationId || 'org_1'

  const fetchContacts = async () => {
    try {
      const response = await fetch(`/api/contacts?organizationId=${organizationId}`)
      if (response.ok) {
        const data = await response.json()
        setContacts(data)
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleViewContact = (contact: ContactWithRelations) => {
    router.push(`/contacts/${contact.id}`)
  }

  const getContactsByStage = (stage: Stage) => {
    return contacts.filter(contact => contact.stage === stage)
  }

  const stageColumns = [
    {
      stage: 'FAMILIAR' as Stage,
      title: '🔮 Familiar',
      color: 'accent-purple',
      description: 'New contacts',
    },
    {
      stage: 'ENCHANTING' as Stage,
      title: '✨ Enchanting',
      color: 'accent-orange',
      description: 'Being engaged',
    },
    {
      stage: 'BEWITCHED' as Stage,
      title: '💫 Bewitched',
      color: 'accent-green',
      description: 'Converted',
    },
    {
      stage: 'VANISHED' as Stage,
      title: '👻 Vanished',
      color: 'text-tertiary',
      description: 'Lost or inactive',
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-text-secondary">Loading pipeline...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-text-primary">🔮 Pipeline</h1>
        <p className="text-text-secondary mt-2">
          Track contacts through your mystical sales journey
        </p>
      </div>

      {/* Pipeline Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        {stageColumns.map(column => {
          const count = getContactsByStage(column.stage).length
          return (
            <Card key={column.stage}>
              <CardHeader>
                <CardTitle className="text-lg">{column.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-3xl font-bold text-${column.color}`}>{count}</p>
                <p className="text-sm text-text-tertiary mt-1">{column.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Pipeline Columns */}
      <div className="grid gap-6 md:grid-cols-4">
        {stageColumns.map(column => {
          const columnContacts = getContactsByStage(column.stage)

          return (
            <div key={column.stage} className="space-y-4">
              <h2 className="text-xl font-semibold text-text-primary">{column.title}</h2>

              <div className="space-y-3">
                {columnContacts.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-4xl mb-2">👻</p>
                      <p className="text-sm text-text-tertiary">No contacts</p>
                    </CardContent>
                  </Card>
                ) : (
                  columnContacts.map(contact => (
                    <ContactCard
                      key={contact.id}
                      contact={contact}
                      onClick={() => handleViewContact(contact)}
                    />
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
