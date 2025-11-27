/**
 * Mock Data for Coven CRM Demo
 * Replace with real database in production
 */

export type Stage = 'FAMILIAR' | 'ENCHANTING' | 'BEWITCHED' | 'VANISHED'
export type InteractionType = 'EMAIL' | 'CALL' | 'MEETING' | 'NOTE'

export interface Contact {
  id: string
  name: string
  email: string
  phone: string | null
  stage: Stage
  notes: string | null
  companyId: string | null
  organizationId: string
  convertedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface Company {
  id: string
  name: string
  organizationId: string
  createdAt: Date
  updatedAt: Date
}

export interface Interaction {
  id: string
  type: InteractionType
  description: string
  contactId: string
  userId: string
  createdAt: Date
}

export interface ContactWithRelations extends Contact {
  company: Company | null
  interactions: Interaction[]
}

// In-memory data stores
let companies: Company[] = [
  {
    id: 'company_1',
    name: 'Mystic Enterprises',
    organizationId: 'org_1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'company_2',
    name: 'Enchanted Solutions',
    organizationId: 'org_1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'company_3',
    name: 'Spellbound Inc',
    organizationId: 'org_1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

let contacts: Contact[] = [
  {
    id: 'contact_1',
    name: 'Morgana Le Fay',
    email: 'morgana@mystic-ent.com',
    phone: '+1 (555) 123-4567',
    stage: 'FAMILIAR',
    notes: 'Interested in our enchantment services. Follow up next week.',
    companyId: 'company_1',
    organizationId: 'org_1',
    convertedAt: null,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'contact_2',
    name: 'Merlin Ambrosius',
    email: 'merlin@enchanted-sol.com',
    phone: '+1 (555) 234-5678',
    stage: 'ENCHANTING',
    notes: 'Currently evaluating our spell-casting platform. Very interested.',
    companyId: 'company_2',
    organizationId: 'org_1',
    convertedAt: null,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'contact_3',
    name: 'Circe of Aeaea',
    email: 'circe@spellbound.io',
    phone: '+1 (555) 345-6789',
    stage: 'ENCHANTING',
    notes: 'Needs custom potion formulas. Scheduled demo for next Tuesday.',
    companyId: 'company_3',
    organizationId: 'org_1',
    convertedAt: null,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'contact_4',
    name: 'Gandalf the Grey',
    email: 'gandalf@mystic-ent.com',
    phone: null,
    stage: 'BEWITCHED',
    notes: 'Signed contract! Onboarding starts next month.',
    companyId: 'company_1',
    organizationId: 'org_1',
    convertedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'contact_5',
    name: 'Hermione Granger',
    email: 'hermione@enchanted-sol.com',
    phone: '+1 (555) 456-7890',
    stage: 'BEWITCHED',
    notes: 'Converted last week. Very happy with the service.',
    companyId: 'company_2',
    organizationId: 'org_1',
    convertedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'contact_6',
    name: 'Voldemort',
    email: 'tom@dark-arts.com',
    phone: null,
    stage: 'VANISHED',
    notes: 'Went with a competitor. Not interested in further contact.',
    companyId: null,
    organizationId: 'org_1',
    convertedAt: null,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
]

let interactions: Interaction[] = [
  {
    id: 'int_1',
    type: 'EMAIL',
    description: 'Sent initial introduction email with product overview',
    contactId: 'contact_1',
    userId: 'user_1',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'int_2',
    type: 'CALL',
    description: 'Discovery call - discussed their needs and pain points',
    contactId: 'contact_2',
    userId: 'user_1',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'int_3',
    type: 'MEETING',
    description: 'Product demo - showed key features, very positive response',
    contactId: 'contact_2',
    userId: 'user_1',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'int_4',
    type: 'EMAIL',
    description: 'Sent proposal and pricing information',
    contactId: 'contact_3',
    userId: 'user_1',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'int_5',
    type: 'NOTE',
    description: 'Contract signed! Celebrating with the team 🎉',
    contactId: 'contact_4',
    userId: 'user_1',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
]

// Mock database operations
export const mockDb = {
  contact: {
    findMany: async (options?: {
      where?: {
        organizationId?: string
        stage?: Stage
        OR?: Array<{
          name?: { contains: string; mode: 'insensitive' }
          email?: { contains: string; mode: 'insensitive' }
        }>
      }
      include?: { company?: boolean; interactions?: { orderBy?: any; take?: number } }
      orderBy?: { updatedAt?: 'asc' | 'desc' }
    }): Promise<ContactWithRelations[]> => {
      let filtered = [...contacts]

      if (options?.where?.organizationId) {
        filtered = filtered.filter(c => c.organizationId === options.where!.organizationId)
      }

      if (options?.where?.stage) {
        filtered = filtered.filter(c => c.stage === options.where!.stage)
      }

      if (options?.where?.OR) {
        const searchTerm = options.where.OR[0]?.name?.contains || options.where.OR[0]?.email?.contains
        if (searchTerm) {
          filtered = filtered.filter(
            c =>
              c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              c.email.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }
      }

      if (options?.orderBy?.updatedAt === 'desc') {
        filtered.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      }

      return filtered.map(contact => ({
        ...contact,
        company: contact.companyId ? companies.find(c => c.id === contact.companyId) || null : null,
        interactions: interactions
          .filter(i => i.contactId === contact.id)
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          .slice(0, options?.include?.interactions?.take || 5),
      }))
    },

    findUnique: async (options: {
      where: { id: string }
      include?: { company?: boolean; interactions?: { orderBy?: any } }
    }): Promise<ContactWithRelations | null> => {
      const contact = contacts.find(c => c.id === options.where.id)
      if (!contact) return null

      return {
        ...contact,
        company: contact.companyId ? companies.find(c => c.id === contact.companyId) || null : null,
        interactions: interactions
          .filter(i => i.contactId === contact.id)
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
      }
    },

    create: async (options: {
      data: {
        name: string
        email: string
        phone?: string
        stage?: Stage
        notes?: string
        companyId?: string
        organizationId: string
      }
      include?: { company?: boolean; interactions?: boolean }
    }): Promise<ContactWithRelations> => {
      const newContact: Contact = {
        id: `contact_${Date.now()}`,
        name: options.data.name,
        email: options.data.email,
        phone: options.data.phone || null,
        stage: options.data.stage || 'FAMILIAR',
        notes: options.data.notes || null,
        companyId: options.data.companyId || null,
        organizationId: options.data.organizationId,
        convertedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      contacts.push(newContact)

      return {
        ...newContact,
        company: newContact.companyId
          ? companies.find(c => c.id === newContact.companyId) || null
          : null,
        interactions: [],
      }
    },

    update: async (options: {
      where: { id: string }
      data: {
        name?: string
        email?: string
        phone?: string
        stage?: Stage
        notes?: string
        companyId?: string
        convertedAt?: Date | null
      }
      include?: { company?: boolean; interactions?: boolean }
    }): Promise<ContactWithRelations> => {
      const index = contacts.findIndex(c => c.id === options.where.id)
      if (index === -1) throw new Error('Contact not found')

      contacts[index] = {
        ...contacts[index],
        ...options.data,
        updatedAt: new Date(),
      }

      return {
        ...contacts[index],
        company: contacts[index].companyId
          ? companies.find(c => c.id === contacts[index].companyId) || null
          : null,
        interactions: interactions
          .filter(i => i.contactId === contacts[index].id)
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
      }
    },

    delete: async (options: { where: { id: string } }): Promise<Contact> => {
      const index = contacts.findIndex(c => c.id === options.where.id)
      if (index === -1) throw new Error('Contact not found')

      const deleted = contacts[index]
      contacts.splice(index, 1)
      return deleted
    },
  },

  interaction: {
    create: async (options: {
      data: {
        type: InteractionType
        description: string
        contactId: string
        userId: string
      }
    }): Promise<Interaction> => {
      const newInteraction: Interaction = {
        id: `int_${Date.now()}`,
        type: options.data.type,
        description: options.data.description,
        contactId: options.data.contactId,
        userId: options.data.userId,
        createdAt: new Date(),
      }
      interactions.push(newInteraction)
      return newInteraction
    },
  },

  company: {
    findMany: async (): Promise<Company[]> => {
      return [...companies]
    },
  },
}
