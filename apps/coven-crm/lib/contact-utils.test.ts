import { describe, it, expect } from 'vitest'
import {
  filterContactsByStage,
  searchContacts,
  getContactCountsByStage,
  sortContactsByRecentActivity,
  filterContactsByCompany,
} from './contact-utils'
import type { ContactWithRelations } from './types'

const mockContacts: ContactWithRelations[] = [
  {
    id: '1',
    name: 'Morgana Le Fay',
    email: 'morgana@mystic.com',
    phone: '+1 555-1234',
    stage: 'FAMILIAR',
    notes: 'New contact',
    companyId: 'company_1',
    organizationId: 'org_1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    convertedAt: null,
    company: {
      id: 'company_1',
      name: 'Mystic Enterprises',
      website: null,
      industry: null,
      notes: null,
      organizationId: 'org_1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    interactions: [],
  },
  {
    id: '2',
    name: 'Merlin Ambrosius',
    email: 'merlin@enchanted.com',
    phone: null,
    stage: 'ENCHANTING',
    notes: 'In progress',
    companyId: 'company_2',
    organizationId: 'org_1',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-05'),
    convertedAt: null,
    company: {
      id: 'company_2',
      name: 'Enchanted Solutions',
      website: null,
      industry: null,
      notes: null,
      organizationId: 'org_1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    interactions: [
      {
        id: 'int_1',
        type: 'EMAIL',
        description: 'Sent intro',
        contactId: '2',
        userId: 'user_1',
        createdAt: new Date('2024-01-05'),
      },
    ],
  },
  {
    id: '3',
    name: 'Gandalf Grey',
    email: 'gandalf@mystic.com',
    phone: null,
    stage: 'BEWITCHED',
    notes: 'Converted!',
    companyId: 'company_1',
    organizationId: 'org_1',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-10'),
    convertedAt: new Date('2024-01-10'),
    company: {
      id: 'company_1',
      name: 'Mystic Enterprises',
      website: null,
      industry: null,
      notes: null,
      organizationId: 'org_1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    interactions: [],
  },
  {
    id: '4',
    name: 'Voldemort',
    email: 'tom@dark.com',
    phone: null,
    stage: 'VANISHED',
    notes: 'Lost',
    companyId: null,
    organizationId: 'org_1',
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-04'),
    convertedAt: null,
    company: null,
    interactions: [],
  },
]

describe('contact-utils', () => {
  describe('filterContactsByStage', () => {
    it('filters contacts by FAMILIAR stage', () => {
      const result = filterContactsByStage(mockContacts, 'FAMILIAR')
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Morgana Le Fay')
    })

    it('filters contacts by ENCHANTING stage', () => {
      const result = filterContactsByStage(mockContacts, 'ENCHANTING')
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Merlin Ambrosius')
    })

    it('filters contacts by BEWITCHED stage', () => {
      const result = filterContactsByStage(mockContacts, 'BEWITCHED')
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Gandalf Grey')
    })

    it('filters contacts by VANISHED stage', () => {
      const result = filterContactsByStage(mockContacts, 'VANISHED')
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Voldemort')
    })
  })

  describe('searchContacts', () => {
    it('searches by name (case insensitive)', () => {
      const result = searchContacts(mockContacts, 'morgana')
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Morgana Le Fay')
    })

    it('searches by email', () => {
      const result = searchContacts(mockContacts, 'mystic.com')
      expect(result).toHaveLength(2)
    })

    it('searches by partial match', () => {
      const result = searchContacts(mockContacts, 'mer')
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Merlin Ambrosius')
    })

    it('returns all contacts for empty query', () => {
      const result = searchContacts(mockContacts, '')
      expect(result).toHaveLength(4)
    })

    it('returns empty array when no matches', () => {
      const result = searchContacts(mockContacts, 'nonexistent')
      expect(result).toHaveLength(0)
    })

    it('trims whitespace from query', () => {
      const result = searchContacts(mockContacts, '  morgana  ')
      expect(result).toHaveLength(1)
    })
  })

  describe('getContactCountsByStage', () => {
    it('returns correct counts for each stage', () => {
      const counts = getContactCountsByStage(mockContacts)
      expect(counts.FAMILIAR).toBe(1)
      expect(counts.ENCHANTING).toBe(1)
      expect(counts.BEWITCHED).toBe(1)
      expect(counts.VANISHED).toBe(1)
    })

    it('returns zero counts for empty array', () => {
      const counts = getContactCountsByStage([])
      expect(counts.FAMILIAR).toBe(0)
      expect(counts.ENCHANTING).toBe(0)
      expect(counts.BEWITCHED).toBe(0)
      expect(counts.VANISHED).toBe(0)
    })
  })

  describe('sortContactsByRecentActivity', () => {
    it('sorts contacts by most recent activity', () => {
      const result = sortContactsByRecentActivity(mockContacts)
      expect(result[0].name).toBe('Gandalf Grey') // Most recent updatedAt
      expect(result[1].name).toBe('Merlin Ambrosius') // Has recent interaction
    })

    it('does not mutate original array', () => {
      const original = [...mockContacts]
      sortContactsByRecentActivity(mockContacts)
      expect(mockContacts).toEqual(original)
    })
  })

  describe('filterContactsByCompany', () => {
    it('filters contacts by company ID', () => {
      const result = filterContactsByCompany(mockContacts, 'company_1')
      expect(result).toHaveLength(2)
      expect(result.every(c => c.companyId === 'company_1')).toBe(true)
    })

    it('returns empty array when no matches', () => {
      const result = filterContactsByCompany(mockContacts, 'nonexistent')
      expect(result).toHaveLength(0)
    })
  })
})
