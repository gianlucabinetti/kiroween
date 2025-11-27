/**
 * Mock Data for Haunted Tasks Demo
 * Replace with real database in production
 */

export type TaskStatus = 'SUMMONED' | 'IN_RITUAL' | 'BANISHED'
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

export interface Task {
  id: string
  title: string
  description: string | null
  status: TaskStatus
  priority: Priority
  assigneeId: string | null
  organizationId: string
  completedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface Tag {
  id: string
  name: string
  color: string
  organizationId: string
  createdAt: Date
  updatedAt: Date
}

export interface TaskWithTags extends Task {
  tags: Tag[]
}

// In-memory data store
let tasks: Task[] = [
  {
    id: 'task_0',
    title: 'Summon the ancient spirits',
    description:
      'Prepare the ritual circle and gather the necessary ingredients for the summoning ceremony.',
    status: 'SUMMONED',
    priority: 'HIGH',
    assigneeId: null,
    organizationId: 'org_1',
    completedAt: null,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'task_1',
    title: 'Brew the midnight potion',
    description: 'Mix eye of newt, wing of bat, and a dash of moonlight. Stir counterclockwise.',
    status: 'IN_RITUAL',
    priority: 'MEDIUM',
    assigneeId: null,
    organizationId: 'org_1',
    completedAt: null,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'task_2',
    title: 'Clean the haunted attic',
    description: 'Remove cobwebs and organize the cursed artifacts. Watch out for the ghost cat.',
    status: 'IN_RITUAL',
    priority: 'LOW',
    assigneeId: null,
    organizationId: 'org_1',
    completedAt: null,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'task_3',
    title: 'Repair the broken broomstick',
    description: 'The bristles are falling off. Need to enchant new ones before the full moon.',
    status: 'SUMMONED',
    priority: 'CRITICAL',
    assigneeId: null,
    organizationId: 'org_1',
    completedAt: null,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'task_4',
    title: 'Read the forbidden tome',
    description: 'Study chapter 13 about shadow manipulation. Completed last week.',
    status: 'BANISHED',
    priority: 'MEDIUM',
    assigneeId: null,
    organizationId: 'org_1',
    completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'task_5',
    title: 'Organize the spell book collection',
    description: 'Sort by dark magic level and publication date. Successfully completed.',
    status: 'BANISHED',
    priority: 'LOW',
    assigneeId: null,
    organizationId: 'org_1',
    completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
]

let tags: Tag[] = [
  {
    id: 'tag_1',
    name: 'urgent',
    color: '#ef4444',
    organizationId: 'org_1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'tag_2',
    name: 'magic',
    color: '#9d5bd2',
    organizationId: 'org_1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// Mock database operations
export const mockDb = {
  task: {
    findMany: async (options?: {
      where?: { organizationId?: string; status?: TaskStatus }
      include?: { tags?: boolean }
      orderBy?: { createdAt?: 'asc' | 'desc' }
    }): Promise<TaskWithTags[]> => {
      let filtered = [...tasks]

      if (options?.where?.organizationId) {
        filtered = filtered.filter(t => t.organizationId === options.where!.organizationId)
      }

      if (options?.where?.status) {
        filtered = filtered.filter(t => t.status === options.where!.status)
      }

      if (options?.orderBy?.createdAt === 'desc') {
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      }

      return filtered.map(task => ({ ...task, tags: [] }))
    },

    findUnique: async (options: {
      where: { id: string }
      include?: { tags?: boolean }
    }): Promise<TaskWithTags | null> => {
      const task = tasks.find(t => t.id === options.where.id)
      return task ? { ...task, tags: [] } : null
    },

    create: async (options: {
      data: {
        title: string
        description?: string
        status?: TaskStatus
        priority?: Priority
        assigneeId?: string
        organizationId: string
      }
      include?: { tags?: boolean }
    }): Promise<TaskWithTags> => {
      const newTask: Task = {
        id: `task_${Date.now()}`,
        title: options.data.title,
        description: options.data.description || null,
        status: options.data.status || 'SUMMONED',
        priority: options.data.priority || 'MEDIUM',
        assigneeId: options.data.assigneeId || null,
        organizationId: options.data.organizationId,
        completedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      tasks.push(newTask)
      return { ...newTask, tags: [] }
    },

    update: async (options: {
      where: { id: string }
      data: {
        title?: string
        description?: string
        status?: TaskStatus
        priority?: Priority
        assigneeId?: string
        completedAt?: Date | null
      }
      include?: { tags?: boolean }
    }): Promise<TaskWithTags> => {
      const index = tasks.findIndex(t => t.id === options.where.id)
      if (index === -1) throw new Error('Task not found')

      tasks[index] = {
        ...tasks[index],
        ...options.data,
        updatedAt: new Date(),
      }

      return { ...tasks[index], tags: [] }
    },

    delete: async (options: { where: { id: string } }): Promise<Task> => {
      const index = tasks.findIndex(t => t.id === options.where.id)
      if (index === -1) throw new Error('Task not found')

      const deleted = tasks[index]
      tasks.splice(index, 1)
      return deleted
    },
  },
}
