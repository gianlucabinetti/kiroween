// Re-export from mock data
export type { Task, Tag, TaskStatus, Priority, TaskWithTags } from './mock-data'

export interface CreateTaskInput {
  title: string
  description?: string
  status?: 'SUMMONED' | 'IN_RITUAL' | 'BANISHED'
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  assigneeId?: string
  organizationId: string
}

export interface UpdateTaskInput {
  title?: string
  description?: string
  status?: 'SUMMONED' | 'IN_RITUAL' | 'BANISHED'
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  assigneeId?: string
}
