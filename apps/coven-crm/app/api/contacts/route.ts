import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const organizationId = searchParams.get('organizationId')
    const stage = searchParams.get('stage')
    const search = searchParams.get('search')

    if (!organizationId) {
      return NextResponse.json({ error: 'Organization ID required' }, { status: 400 })
    }

    const contacts = await db.contact.findMany({
      where: {
        organizationId,
        ...(stage && { stage: stage as 'FAMILIAR' | 'ENCHANTING' | 'BEWITCHED' | 'VANISHED' }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
          ],
        }),
      },
      include: {
        company: true,
        interactions: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })

    return NextResponse.json(contacts)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, stage, notes, companyId, organizationId } = body

    if (!name || !email || !organizationId) {
      return NextResponse.json(
        { error: 'Name, email, and organization ID required' },
        { status: 400 }
      )
    }

    const contact = await db.contact.create({
      data: {
        name,
        email,
        phone,
        stage: stage || 'FAMILIAR',
        notes,
        companyId,
        organizationId,
      },
      include: {
        company: true,
        interactions: true,
      },
    })

    return NextResponse.json(contact, { status: 201 })
  } catch (error) {
    console.error('Error creating contact:', error)
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 })
  }
}
