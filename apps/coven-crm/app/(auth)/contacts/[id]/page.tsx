'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
} from '@grimoire/skeleton-core/components'
import { getSession, formatRelativeTime } from '@grimoire/skeleton-core/lib'
import { ContactModal } from '@/components/contact-modal'
import type { ContactWithRelations, InteractionType } from '@/lib/types'

const stageLabels = {
  FAMILIAR: '🔮 Familiar',
  ENCHANTING: '✨ Enchanting',
  BEWITCHED: '💫 Bewitched',
  VANISHED: '👻 Vanished',
}

const interactionTypeLabels = {
  EMAIL: '📧 Email',
  CALL: '📞 Call',
  MEETING: '🤝 Meeting',
  NOTE: '📝 Note',
}

export default function ContactDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [contact, setContact] = useState<ContactWithRelations | null>(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newInteraction, setNewInteraction] = useState({
    type: 'NOTE' as InteractionType,
    description: '',
  })

  const session = getSession()
  const userId = session?.user.id || 'user_1'

  const fetchContact = async () => {
    try {
      const response = await fetch(`/api/contacts/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setContact(data)
      } else {
        router.push('/contacts')
      }
    } catch (error) {
      console.error('Failed to fetch contact:', error)
      router.push('/contacts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContact()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  const handleSaveContact = async (contactData: Partial<ContactWithRelations>) => {
    try {
      const response = await fetch(`/api/contacts/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      })
      if (response.ok) {
        await fetchContact()
      }
    } catch (error) {
      console.error('Failed to update contact:', error)
    }
  }

  const handleDeleteContact = async () => {
    try {
      const response = await fetch(`/api/contacts/${params.id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        router.push('/contacts')
      }
    } catch (error) {
      console.error('Failed to delete contact:', error)
    }
  }

  const handleAddInteraction = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newInteraction.description.trim()) return

    try {
      const response = await fetch('/api/interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newInteraction,
          contactId: params.id,
          userId,
        }),
      })
      if (response.ok) {
        setNewInteraction({ type: 'NOTE', description: '' })
        await fetchContact()
      }
    } catch (error) {
      console.error('Failed to add interaction:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-text-secondary">Loading contact...</p>
      </div>
    )
  }

  if (!contact) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" onClick={() => router.push('/contacts')}>
            ← Back to Contacts
          </Button>
          <h1 className="text-4xl font-bold text-text-primary mt-2">{contact.name}</h1>
          <p className="text-text-secondary mt-1">{stageLabels[contact.stage]}</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Edit Contact</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-text-tertiary">Email</p>
              <p className="text-text-primary">{contact.email}</p>
            </div>
            {contact.phone && (
              <div>
                <p className="text-sm text-text-tertiary">Phone</p>
                <p className="text-text-primary">{contact.phone}</p>
              </div>
            )}
            {contact.company && (
              <div>
                <p className="text-sm text-text-tertiary">Company</p>
                <p className="text-text-primary">🏢 {contact.company.name}</p>
              </div>
            )}
            {contact.notes && (
              <div>
                <p className="text-sm text-text-tertiary">Notes</p>
                <p className="text-text-primary whitespace-pre-wrap">{contact.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-text-tertiary">Total Interactions</p>
              <p className="text-2xl font-bold text-accent-purple">{contact.interactions.length}</p>
            </div>
            <div>
              <p className="text-sm text-text-tertiary">Last Updated</p>
              <p className="text-text-primary">{formatRelativeTime(contact.updatedAt)}</p>
            </div>
            {contact.convertedAt && (
              <div>
                <p className="text-sm text-text-tertiary">Converted</p>
                <p className="text-text-primary">{formatRelativeTime(contact.convertedAt)}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Interaction</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddInteraction} className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <select
                value={newInteraction.type}
                onChange={e =>
                  setNewInteraction({ ...newInteraction, type: e.target.value as InteractionType })
                }
                className="flex h-10 rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-purple"
              >
                <option value="NOTE">📝 Note</option>
                <option value="EMAIL">📧 Email</option>
                <option value="CALL">📞 Call</option>
                <option value="MEETING">🤝 Meeting</option>
              </select>
              <div className="col-span-3 flex gap-2">
                <Input
                  value={newInteraction.description}
                  onChange={e =>
                    setNewInteraction({ ...newInteraction, description: e.target.value })
                  }
                  placeholder="Describe the interaction..."
                  className="flex-1"
                />
                <Button type="submit">Add</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {contact.interactions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-4xl mb-2">👻</p>
              <p className="text-text-secondary">No interactions yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {contact.interactions.map(interaction => (
                <div
                  key={interaction.id}
                  className="flex gap-4 p-4 rounded-md border border-border"
                >
                  <div className="text-2xl">
                    {interactionTypeLabels[interaction.type].split(' ')[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-text-primary">{interaction.description}</p>
                    <p className="text-sm text-text-tertiary mt-1">
                      {formatRelativeTime(interaction.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <ContactModal
        contact={contact}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveContact}
        onDelete={handleDeleteContact}
      />
    </div>
  )
}
