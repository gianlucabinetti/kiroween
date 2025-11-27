/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🎃 Seeding Haunted Tasks...')

  const orgId = 'org_1'

  // Create some spooky tasks
  const tasks = [
    {
      title: 'Summon the ancient spirits',
      description:
        'Prepare the ritual circle and gather the necessary ingredients for the summoning ceremony.',
      status: 'SUMMONED',
      priority: 'HIGH',
      organizationId: orgId,
    },
    {
      title: 'Brew the midnight potion',
      description: 'Mix eye of newt, wing of bat, and a dash of moonlight. Stir counterclockwise.',
      status: 'IN_RITUAL',
      priority: 'MEDIUM',
      organizationId: orgId,
    },
    {
      title: 'Clean the haunted attic',
      description: 'Remove cobwebs and organize the cursed artifacts. Watch out for the ghost cat.',
      status: 'IN_RITUAL',
      priority: 'LOW',
      organizationId: orgId,
    },
    {
      title: 'Repair the broken broomstick',
      description: 'The bristles are falling off. Need to enchant new ones before the full moon.',
      status: 'SUMMONED',
      priority: 'CRITICAL',
      organizationId: orgId,
    },
    {
      title: 'Read the forbidden tome',
      description: 'Study chapter 13 about shadow manipulation. Completed last week.',
      status: 'BANISHED',
      priority: 'MEDIUM',
      organizationId: orgId,
      completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      title: 'Organize the spell book collection',
      description: 'Sort by dark magic level and publication date. Successfully completed.',
      status: 'BANISHED',
      priority: 'LOW',
      organizationId: orgId,
      completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
  ]

  for (const task of tasks) {
    await prisma.task.upsert({
      where: { id: `task_${tasks.indexOf(task)}` },
      update: {},
      create: {
        id: `task_${tasks.indexOf(task)}`,
        ...task,
      },
    })
  }

  console.log(`✅ Created ${tasks.length} spooky tasks`)

  // Create some tags
  const tags = [
    { name: 'urgent', color: '#ef4444', organizationId: orgId },
    { name: 'magic', color: '#9d5bd2', organizationId: orgId },
    { name: 'ritual', color: '#f97316', organizationId: orgId },
    { name: 'maintenance', color: '#16a34a', organizationId: orgId },
  ]

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: {
        organizationId_name: {
          organizationId: tag.organizationId,
          name: tag.name,
        },
      },
      update: {},
      create: tag,
    })
  }

  console.log(`✅ Created ${tags.length} tags`)
  console.log('👻 Haunted Tasks seeded successfully!')
}

main()
  .catch(e => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
