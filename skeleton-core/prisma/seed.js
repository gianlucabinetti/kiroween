/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create demo organization
  const org = await prisma.organization.upsert({
    where: { slug: 'demo-org' },
    update: {},
    create: {
      id: 'org_1',
      name: 'Demo Organization',
      slug: 'demo-org',
    },
  })

  console.log('✅ Created organization:', org.name)

  // Create demo users
  const user1 = await prisma.user.upsert({
    where: { email: 'demo@grimoire.dev' },
    update: {},
    create: {
      id: 'user_1',
      email: 'demo@grimoire.dev',
      name: 'Demo User',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'witch@coven.dev' },
    update: {},
    create: {
      id: 'user_2',
      email: 'witch@coven.dev',
      name: 'Wicked Witch',
    },
  })

  console.log('✅ Created users:', user1.email, user2.email)

  // Create memberships
  await prisma.membership.upsert({
    where: {
      userId_organizationId: {
        userId: user1.id,
        organizationId: org.id,
      },
    },
    update: {},
    create: {
      userId: user1.id,
      organizationId: org.id,
      role: 'OWNER',
    },
  })

  await prisma.membership.upsert({
    where: {
      userId_organizationId: {
        userId: user2.id,
        organizationId: org.id,
      },
    },
    update: {},
    create: {
      userId: user2.id,
      organizationId: org.id,
      role: 'MEMBER',
    },
  })

  console.log('✅ Created memberships')

  console.log('🎃 Seed complete!')
}

main()
  .catch(e => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
