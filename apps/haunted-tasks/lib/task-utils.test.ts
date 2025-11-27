import { describe, it, expect } from 'vitest'
import {
  filterTasksByStatus,
  filterTasksByPriority,
  sortTasksByPriority,
  getTaskCountsByStatus,
  isTaskOverdue,
} from './task-utils'
import type { TaskWithTags } from './types'

const mockTasks: TaskWithTags[] = [
  {
    id: '1',
    title: 'Task 1',
    description: 'Description 1',
    status: 'SUMMONED',
    priority: 'HIGH',
    assigneeId: null,
    organizationId: 'org_1',
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: null,
    tags: [],
  },
  {
    id: '2',
    title: 'Task 2',
    description: 'Description 2',
    status: 'IN_RITUAL',
    priority: 'CRITICAL',
    assigneeId: null,
    organizationId: 'org_1',
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: null,
    tags: [],
  },
  {
    id: '3',
    title: 'Task 3',
    description: 'Description 3',
    status: 'BANISHED',
    priority: 'LOW',
    assigneeId: null,
    organizationId: 'org_1',
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: new Date(),
    tags: [],
  },
  {
    id: '4',
    title: 'Task 4',
    description: 'Description 4',
    status: 'SUMMONED',
    priority: 'MEDIUM',
    assigneeId: null,
    organizationId: 'org_1',
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: null,
    tags: [],
  },
]

describe('task-utils', () => {
  describe('filterTasksByStatus', () => {
    it('filters tasks by SUMMONED status', () => {
      const result = filterTasksByStatus(mockTasks, 'SUMMONED')
      expect(result).toHaveLength(2)
      expect(result.every(t => t.status === 'SUMMONED')).toBe(true)
    })

    it('filters tasks by IN_RITUAL status', () => {
      const result = filterTasksByStatus(mockTasks, 'IN_RITUAL')
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe('2')
    })

    it('filters tasks by BANISHED status', () => {
      const result = filterTasksByStatus(mockTasks, 'BANISHED')
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe('3')
    })

    it('returns empty array when no tasks match', () => {
      const result = filterTasksByStatus([], 'SUMMONED')
      expect(result).toHaveLength(0)
    })
  })

  describe('filterTasksByPriority', () => {
    it('filters tasks by CRITICAL priority', () => {
      const result = filterTasksByPriority(mockTasks, 'CRITICAL')
      expect(result).toHaveLength(1)
      expect(result[0].priority).toBe('CRITICAL')
    })

    it('filters tasks by HIGH priority', () => {
      const result = filterTasksByPriority(mockTasks, 'HIGH')
      expect(result).toHaveLength(1)
      expect(result[0].priority).toBe('HIGH')
    })
  })

  describe('sortTasksByPriority', () => {
    it('sorts tasks by priority (Critical first)', () => {
      const result = sortTasksByPriority(mockTasks)
      expect(result[0].priority).toBe('CRITICAL')
      expect(result[1].priority).toBe('HIGH')
      expect(result[2].priority).toBe('MEDIUM')
      expect(result[3].priority).toBe('LOW')
    })

    it('does not mutate original array', () => {
      const original = [...mockTasks]
      sortTasksByPriority(mockTasks)
      expect(mockTasks).toEqual(original)
    })
  })

  describe('getTaskCountsByStatus', () => {
    it('returns correct counts for each status', () => {
      const counts = getTaskCountsByStatus(mockTasks)
      expect(counts.SUMMONED).toBe(2)
      expect(counts.IN_RITUAL).toBe(1)
      expect(counts.BANISHED).toBe(1)
    })

    it('returns zero counts for empty array', () => {
      const counts = getTaskCountsByStatus([])
      expect(counts.SUMMONED).toBe(0)
      expect(counts.IN_RITUAL).toBe(0)
      expect(counts.BANISHED).toBe(0)
    })
  })

  describe('isTaskOverdue', () => {
    it('returns false when no due date provided', () => {
      expect(isTaskOverdue(mockTasks[0])).toBe(false)
    })

    it('returns false for completed tasks', () => {
      const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000)
      expect(isTaskOverdue(mockTasks[2], pastDate)).toBe(false)
    })

    it('returns true for overdue incomplete tasks', () => {
      const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000)
      expect(isTaskOverdue(mockTasks[0], pastDate)).toBe(true)
    })

    it('returns false for future due dates', () => {
      const futureDate = new Date(Date.now() + 24 * 60 * 60 * 1000)
      expect(isTaskOverdue(mockTasks[0], futureDate)).toBe(false)
    })
  })
})
