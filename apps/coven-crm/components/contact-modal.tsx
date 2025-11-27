'use client'

import { useState } from 'react'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalContent,
  ModalFooter,
  Button,
  Input,
} from '@grimoire/skeleton-core/components'
import type { ContactWithRelations, Stage } from '@/lib/types'

interface ContactModalProps {
  contact: ContactWithRelations | null
  open: boolean
  onClose: () => void
  onSave: (contact: Partial<ContactWithRelations>) => void
  onDelete?: () => void
}

const stageOptions: { value: Stage; label: string }[] = [
  { value: 'FAMILIAR', label: '🔮 Familiar' },
  { value: 'ENCHANTING', label: '✨ Enchanting' },
  { value: 'BEWITCHED', label: '💫 Bewitched' },
  { value: 'VANISHED', label: '👻 Vanished' },
]

export function ContactModal({ contact, open, onClose, onSave, onDelete }: ContactModalProps) {
  const [name, setName] = useState(contact?.name || '')
  const [email, setEmail] = useState(contact?.email || '')
  const [phone, setPhone] = useState(contact?.phone || '')
  const [stage, setStage] = useState<Stage>(contact?.stage || 'FAMILIAR')
  const [notes, setNotes] = useState(contact?.notes || '')

  const handleSave = () => {
    onSave({
      ...(contact && { id: contact.id }),
      name,
      email,
      phone,
      stage,
      notes,
    })
    onClose()
  }

  const handleDelete = () => {
    if (onDelete && confirm('Are you sure you want to remove this contact from your coven? 💀')) {
      onDelete()
      onClose()
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader>
        <ModalTitle>{contact ? 'Edit Contact' : 'Add New Contact'}</ModalTitle>
      </ModalHeader>

      <ModalContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Name *</label>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter contact name..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Email *</label>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="contact@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Phone</label>
            <Input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Stage</label>
            <select
              value={stage}
              onChange={e => setStage(e.target.value as Stage)}
              className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-2 focus:ring-offset-background"
            >
              {stageOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Notes</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Add notes about this contact..."
              className="flex min-h-[100px] w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-2 focus:ring-offset-background"
            />
          </div>
        </div>
      </ModalContent>

      <ModalFooter>
        {contact && onDelete && (
          <Button variant="destructive" onClick={handleDelete} className="mr-auto">
            💀 Delete
          </Button>
        )}
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!name.trim() || !email.trim()}>
          {contact ? 'Save' : 'Add Contact'}
        </Button>
      </ModalFooter>
    </Modal>
  )
}
