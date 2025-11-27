// Re-export from mock data
export type {
  Contact,
  Company,
  Interaction,
  Stage,
  InteractionType,
  ContactWithRelations,
} from './mock-data'

export interface CompanyWithContacts extends Company {
  contacts: Contact[]
}

export interface CreateContactInput {
  name: string
  email: string
  phone?: string
  stage?: 'FAMILIAR' | 'ENCHANTING' | 'BEWITCHED' | 'VANISHED'
  notes?: string
  companyId?: string
  organizationId: string
}

export interface UpdateContactInput {
  name?: string
  email?: string
  phone?: string
  stage?: 'FAMILIAR' | 'ENCHANTING' | 'BEWITCHED' | 'VANISHED'
  notes?: string
  companyId?: string
}

export interface CreateInteractionInput {
  type: 'EMAIL' | 'CALL' | 'MEETING' | 'NOTE'
  description: string
  contactId: string
  userId: string
}
