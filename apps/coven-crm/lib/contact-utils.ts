import type { ContactWithRelations, Stage } from './types'

/**
 * Filter contacts by stage
 */
export function filterContactsByStage(
  contacts: ContactWithRelations[],
  stage: Stage
): ContactWithRelations[] {
  return contacts.filter(contact => contact.stage === stage)
}

/**
 * Search contacts by name or email
 */
export function searchContacts(
  contacts: ContactWithRelations[],
  query: string
): ContactWithRelations[] {
  const lowerQuery = query.toLowerCase().trim()

  if (!lowerQuery) return contacts

  return contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(lowerQuery) ||
      contact.email.toLowerCase().includes(lowerQuery)
  )
}

/**
 * Get contact counts by stage
 */
export function getContactCountsByStage(contacts: ContactWithRelations[]): Record<Stage, number> {
  return {
    FAMILIAR: filterContactsByStage(contacts, 'FAMILIAR').length,
    ENCHANTING: filterContactsByStage(contacts, 'ENCHANTING').length,
    BEWITCHED: filterContactsByStage(contacts, 'BEWITCHED').length,
    VANISHED: filterContactsByStage(contacts, 'VANISHED').length,
  }
}

/**
 * Sort contacts by most recent interaction
 */
export function sortContactsByRecentActivity(
  contacts: ContactWithRelations[]
): ContactWithRelations[] {
  return [...contacts].sort((a, b) => {
    const aLatest = a.interactions[0]?.createdAt || a.updatedAt
    const bLatest = b.interactions[0]?.createdAt || b.updatedAt
    return new Date(bLatest).getTime() - new Date(aLatest).getTime()
  })
}

/**
 * Filter contacts by company
 */
export function filterContactsByCompany(
  contacts: ContactWithRelations[],
  companyId: string
): ContactWithRelations[] {
  return contacts.filter(contact => contact.companyId === companyId)
}
