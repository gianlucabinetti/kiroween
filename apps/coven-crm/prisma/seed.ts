/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🔮 Seeding Coven CRM...')

  const orgId = 'org_1'

  // Create companies
  const companies = [
    { id: 'company_1', name: 'Mystic Enterprises', organizationId: orgId },
    { id: 'company_2', name: 'Enchanted Solutions', organizationId: orgId },
    { id: 'company_3', name: 'Spellbound Inc', organizationId: orgId },
  ]

  for (const company of companies) {
    await prisma.company.upsert({
      where: { id: company.id },
      update: {},
      create: company,
    })
  }

  console.log(`✅ Created ${companies.length} companies`)

  // Create contacts
  const contacts = [
    {
      id: 'contact_1',
      name: 'Morgana Le Fay',
      email: 'morgana@mystic-ent.com',
      phone: '+1 (555) 123-4567',
      stage: 'FAMILIAR',
      notes: 'Interested in our enchantment services. Follow up next week.',
      companyId: 'company_1',
      organizationId: orgId,
    },
    {
      id: 'contact_2',
      name: 'Merlin Ambrosius',
      email: 'merlin@enchanted-sol.com',
      phone: '+1 (555) 234-5678',
      stage: 'ENCHANTING',
      notes: 'Currently evaluating our spell-casting platform. Very interested.',
      companyId: 'company_2',
      organizationId: orgId,
    },
    {
      id: 'contact_3',
      name: 'Circe of Aeaea',
      email: 'circe@spellbound.io',
      phone: '+1 (555) 345-6789',
      stage: 'ENCHANTING',
      notes: 'Needs custom potion formulas. Scheduled demo for next Tuesday.',
      companyId: 'company_3',
      organizationId: orgId,
    },
    {
      id: 'contact_4',
      name: 'Gandalf the Grey',
      email: 'gandalf@mystic-ent.com',
      stage: 'BEWITCHED',
      notes: 'Signed contract! Onboarding starts next month.',
      companyId: 'company_1',
      organizationId: orgId,
      convertedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'contact_5',
      name: 'Hermione Granger',
      email: 'hermione@enchanted-sol.com',
      phone: '+1 (555) 456-7890',
      stage: 'BEWITCHED',
      notes: 'Converted last week. Very happy with the service.',
      companyId: 'company_2',
      organizationId: orgId,
      convertedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'contact_6',
      name: 'Voldemort',
      email: 'tom@dark-arts.com',
      stage: 'VANISHED',
      notes: 'Went with a competitor. Not interested in further contact.',
      organizationId: orgId,
    },
  ]

  for (const contact of contacts) {
    await prisma.contact.upsert({
      where: { id: contact.id },
      update: {},
      create: contact,
    })
  }

  console.log(`✅ Created ${contacts.length} contacts`)

  // Create interactions
  const interactions = [
    {
      type: 'EMAIL',
      description: 'Sent initial introduction email with product overview',
      contactId: 'contact_1',
      userId: 'user_1',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      type: 'CALL',
      description: 'Discovery call - discussed their needs and pain points',
      contactId: 'contact_2',
      userId: 'user_1',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      type: 'MEETING',
      description: 'Product demo - showed key features, very positive response',
      contactId: 'contact_2',
      userId: 'user_1',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      type: 'EMAIL',
      description: 'Sent proposal and pricing information',
      contactId: 'contact_3',
      userId: 'user_1',
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    },
    {
      type: 'NOTE',
      description: 'Contract signed! Celebrating with the team 🎉',
      contactId: 'contact_4',
      userId: 'user_1',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      type: 'MEETING',
      description: 'Onboarding kickoff meeting - went smoothly',
      contactId: 'contact_5',
      userId: 'user_1',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
  ]

  for (const interaction of interactions) {
    await prisma.interaction.create({
      data: interaction,
    })
  }

  console.log(`✅ Created ${interactions.length} interactions`)
  console.log('🔮 Coven CRM seeded successfully!')
}

main()
  .catch(e => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
