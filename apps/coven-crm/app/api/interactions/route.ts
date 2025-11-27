import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, description, contactId, userId } = body

    if (!type || !description || !contactId || !userId) {
      return NextResponse.json(
        { error: 'Type, description, contact ID, and user ID required' },
        { status: 400 }
      )
    }

    const interaction = await db.interaction.create({
      data: {
        type,
        description,
        contactId,
        userId,
      },
    })

    // Update contact's updatedAt timestamp
    await db.contact.update({
      where: { id: contactId },
      data: { updatedAt: new Date() },
    })

    return NextResponse.json(interaction, { status: 201 })
  } catch (error) {
    console.error('Error creating interaction:', error)
    return NextResponse.json({ error: 'Failed to create interaction' }, { status: 500 })
  }
}
