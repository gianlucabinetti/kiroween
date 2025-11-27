'use client'

import { useState, useEffect } from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@grimoire/skeleton-core/components'
import { getSession } from '@grimoire/skeleton-core/lib'
import { TaskCard } from '@/components/task-card'
import { TaskModal } from '@/components/task-modal'
import type { TaskWithTags, TaskStatus } from '@/lib/types'

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskWithTags[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTask, setSelectedTask] = useState<TaskWithTags | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const session = getSession()
  const organizationId = session?.user.currentOrganizationId || 'org_1'

  const fetchTasks = async () => {
    try {
      const response = await fetch(`/api/tasks?organizationId=${organizationId}`)
      if (response.ok) {
        const data = await response.json()
        setTasks(data)
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCreateTask = () => {
    setSelectedTask(null)
    setIsCreating(true)
    setIsModalOpen(true)
  }

  const handleEditTask = (task: TaskWithTags) => {
    setSelectedTask(task)
    setIsCreating(false)
    setIsModalOpen(true)
  }

  const handleSaveTask = async (taskData: Partial<TaskWithTags>) => {
    try {
      if (isCreating) {
        // Create new task
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...taskData, organizationId }),
        })
        if (response.ok) {
          await fetchTasks()
        }
      } else if (selectedTask) {
        // Update existing task
        const response = await fetch(`/api/tasks/${selectedTask.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData),
        })
        if (response.ok) {
          await fetchTasks()
        }
      }
    } catch (error) {
      console.error('Failed to save task:', error)
    }
  }

  const handleDeleteTask = async () => {
    if (!selectedTask) return

    try {
      const response = await fetch(`/api/tasks/${selectedTask.id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        await fetchTasks()
      }
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status)
  }

  const statusColumns = [
    { status: 'SUMMONED' as TaskStatus, title: '👻 Summoned', color: 'accent-purple' },
    { status: 'IN_RITUAL' as TaskStatus, title: '🔮 In Ritual', color: 'accent-orange' },
    { status: 'BANISHED' as TaskStatus, title: '✨ Banished', color: 'accent-green' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-text-secondary">Loading tasks...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-text-primary">👻 Task Board</h1>
          <p className="text-text-secondary mt-2">
            Manage your mystical tasks through the ritual workflow
          </p>
        </div>
        <Button onClick={handleCreateTask}>✨ Summon Task</Button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        {statusColumns.map(column => {
          const count = getTasksByStatus(column.status).length
          return (
            <Card key={column.status}>
              <CardHeader>
                <CardTitle className="text-lg">{column.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-3xl font-bold text-${column.color}`}>{count}</p>
                <p className="text-sm text-text-tertiary mt-1">{count === 1 ? 'task' : 'tasks'}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Task Board */}
      <div className="grid gap-6 md:grid-cols-3">
        {statusColumns.map(column => {
          const columnTasks = getTasksByStatus(column.status)

          return (
            <div key={column.status} className="space-y-4">
              <h2 className="text-xl font-semibold text-text-primary">{column.title}</h2>

              <div className="space-y-3">
                {columnTasks.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-4xl mb-2">👻</p>
                      <p className="text-sm text-text-tertiary">No tasks here</p>
                    </CardContent>
                  </Card>
                ) : (
                  columnTasks.map(task => (
                    <TaskCard key={task.id} task={task} onClick={() => handleEditTask(task)} />
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Task Modal */}
      <TaskModal
        task={selectedTask}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        onDelete={selectedTask ? handleDeleteTask : undefined}
      />
    </div>
  )
}
