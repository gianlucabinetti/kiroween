'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
} from '@grimoire/skeleton-core/components'
import { getSession, formatRelativeTime } from '@grimoire/skeleton-core/lib'
import type { TaskWithTags } from '@/lib/types'

export default function DashboardPage() {
  const [tasks, setTasks] = useState<TaskWithTags[]>([])
  const [loading, setLoading] = useState(true)

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

  const summonedCount = tasks.filter(t => t.status === 'SUMMONED').length
  const inRitualCount = tasks.filter(t => t.status === 'IN_RITUAL').length
  const banishedCount = tasks.filter(t => t.status === 'BANISHED').length
  const recentTasks = tasks.slice(0, 5)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-text-secondary">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-text-primary">👻 Dashboard</h1>
        <p className="text-text-secondary mt-2">
          Welcome to Haunted Tasks - your spooky task management system
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">👻 Summoned</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-accent-purple">{summonedCount}</p>
            <p className="text-sm text-text-tertiary mt-1">New tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🔮 In Ritual</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-accent-orange">{inRitualCount}</p>
            <p className="text-sm text-text-tertiary mt-1">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">✨ Banished</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-accent-green">{banishedCount}</p>
            <p className="text-sm text-text-tertiary mt-1">Completed</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Link href="/tasks">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentTasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-6xl mb-4">👻</p>
              <p className="text-text-secondary">No tasks summoned yet</p>
              <p className="text-sm text-text-tertiary mt-2">
                Create your first task to get started
              </p>
              <Link href="/tasks">
                <Button className="mt-4">✨ Summon Task</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentTasks.map(task => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 rounded-md border border-border hover:border-accent-purple transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-text-primary">{task.title}</p>
                    <p className="text-sm text-text-tertiary">
                      {formatRelativeTime(task.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        task.status === 'SUMMONED'
                          ? 'bg-accent-purple/10 text-accent-purple'
                          : task.status === 'IN_RITUAL'
                            ? 'bg-accent-orange/10 text-accent-orange'
                            : 'bg-accent-green/10 text-accent-green'
                      }`}
                    >
                      {task.status === 'SUMMONED'
                        ? '👻 Summoned'
                        : task.status === 'IN_RITUAL'
                          ? '🔮 In Ritual'
                          : '✨ Banished'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
