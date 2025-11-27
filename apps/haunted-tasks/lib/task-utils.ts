import type { TaskWithTags, TaskStatus, Priority } from './types'

/**
 * Filter tasks by status
 */
export function filterTasksByStatus(tasks: TaskWithTags[], status: TaskStatus): TaskWithTags[] {
  return tasks.filter(task => task.status === status)
}

/**
 * Filter tasks by priority
 */
export function filterTasksByPriority(tasks: TaskWithTags[], priority: Priority): TaskWithTags[] {
  return tasks.filter(task => task.priority === priority)
}

/**
 * Sort tasks by priority (Critical > High > Medium > Low)
 */
export function sortTasksByPriority(tasks: TaskWithTags[]): TaskWithTags[] {
  const priorityOrder: Record<Priority, number> = {
    CRITICAL: 0,
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3,
  }

  return [...tasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
}

/**
 * Get task counts by status
 */
export function getTaskCountsByStatus(tasks: TaskWithTags[]): Record<TaskStatus, number> {
  return {
    SUMMONED: filterTasksByStatus(tasks, 'SUMMONED').length,
    IN_RITUAL: filterTasksByStatus(tasks, 'IN_RITUAL').length,
    BANISHED: filterTasksByStatus(tasks, 'BANISHED').length,
  }
}

/**
 * Check if task is overdue (for future use with due dates)
 */
export function isTaskOverdue(task: TaskWithTags, dueDate?: Date): boolean {
  if (!dueDate) return false
  return new Date() > dueDate && task.status !== 'BANISHED'
}
