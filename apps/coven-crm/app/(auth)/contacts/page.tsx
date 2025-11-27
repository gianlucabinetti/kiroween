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
import { getSession } from '@grimoire/skeleton-core/lib'
import { useDebounce } from '@grimoire/skeleton-core/hooks'
import { ContactCard } from '@/components/contact-card'
import { ContactModal } from '@/components/contact-modal'
import type { ContactWithRelations, Stage } from '@/lib/types'

export default function ContactsPage() {
  const router = useRouter()
  const [contacts, setContacts] = useState<ContactWithRelations[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState<ContactWithRelations | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearch = useDebounce(searchQuery, 300)

  const session = getSession()
  const organizationId = session?.user.currentOrganizationId || 'org_1'

  const fetchContacts = async () => {
    try {
      const params = new URLSearchParams({ organizationId })
      if (debouncedSearch) params.append('search', debouncedSearch)

      const response = await fetch(`/api/contacts?${params}`)
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
  }, [debouncedSearch])

  const handleCreateContact = () => {
    setSelectedContact(null)
    setIsCreating(true)
    setIsModalOpen(true)
  }

  const _handleEditContact = (contact: ContactWithRelations) => {
    setSelectedContact(contact)
    setIsCreating(false)
    setIsModalOpen(true)
  }

  const handleViewContact = (contact: ContactWithRelations) => {
    router.push(`/contacts/${contact.id}`)
  }

  const handleSaveContact = async (contactData: Partial<ContactWithRelations>) => {
    try {
      if (isCreating) {
        const response = await fetch('/api/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...contactData, organizationId }),
        })
        if (response.ok) {
          await fetchContacts()
        }
      } else if (selectedContact) {
        const response = await fetch(`/api/contacts/${selectedContact.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contactData),
        })
        if (response.ok) {
          await fetchContacts()
        }
      }
    } catch (error) {
      console.error('Failed to save contact:', error)
    }
  }

  const handleDeleteContact = async () => {
    if (!selectedContact) return

    try {
      const response = await fetch(`/api/contacts/${selectedContact.id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        await fetchContacts()
      }
    } catch (error) {
      console.error('Failed to delete contact:', error)
    }
  }

  const getContactsByStage = (stage: Stage) => {
    return contacts.filter(contact => contact.stage === stage)
  }

  const stageColumns = [
    { stage: 'FAMILIAR' as Stage, title: '🔮 Familiar', color: 'accent-purple' },
    { stage: 'ENCHANTING' as Stage, title: '✨ Enchanting', color: 'accent-orange' },
    { stage: 'BEWITCHED' as Stage, title: '💫 Bewitched', color: 'accent-green' },
    { stage: 'VANISHED' as Stage, title: '👻 Vanished', color: 'text-tertiary' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-text-secondary">Loading contacts...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-text-primary">🔮 Contacts</h1>
          <p className="text-text-secondary mt-2">Manage your mystical network of contacts</p>
        </div>
        <Button onClick={handleCreateContact}>✨ Add Contact</Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <Input
            placeholder="Search contacts by name or email..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Stats */}
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
                <p className="text-sm text-text-tertiary mt-1">
                  {count === 1 ? 'contact' : 'contacts'}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Contact List */}
      <Card>
        <CardHeader>
          <CardTitle>All Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          {contacts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-6xl mb-4">👻</p>
              <p className="text-text-secondary">
                {searchQuery ? 'No contacts found' : 'No contacts in your coven yet'}
              </p>
              <p className="text-sm text-text-tertiary mt-2">
                {searchQuery ? 'Try a different search' : 'Add your first contact to get started'}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {contacts.map(contact => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  onClick={() => handleViewContact(contact)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact Modal */}
      <ContactModal
        contact={selectedContact}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveContact}
        onDelete={selectedContact ? handleDeleteContact : undefined}
      />
    </div>
  )
}
