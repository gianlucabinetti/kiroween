import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const organizationId = searchParams.get('organizationId')
    const status = searchParams.get('status')

    if (!organizationId) {
      return NextResponse.json({ error: 'Organization ID required' }, { status: 400 })
    }

    const tasks = await db.task.findMany({
      where: {
        organizationId,
        ...(status && { status: status as 'SUMMONED' | 'IN_RITUAL' | 'BANISHED' }),
      },
      include: {
        tags: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, status, priority, assigneeId, organizationId } = body

    if (!title || !organizationId) {
      return NextResponse.json({ error: 'Title and organization ID required' }, { status: 400 })
    }

    const task = await db.task.create({
      data: {
        title,
        description,
        status: status || 'SUMMONED',
        priority: priority || 'MEDIUM',
        assigneeId,
        organizationId,
      },
      include: {
        tags: true,
      },
    })

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
  }
}
