'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@grimoire/skeleton-core/components'
import { cn } from '@grimoire/skeleton-core/lib'
import type { TaskWithTags } from '@/lib/types'

interface TaskCardProps {
  task: TaskWithTags
  onClick?: () => void
}

const priorityLabels = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: '🔥 High',
  CRITICAL: '💀 Critical',
}

const priorityBadgeStyles = {
  LOW: 'bg-text-tertiary/10 text-text-tertiary border-text-tertiary/20',
  MEDIUM: 'bg-text-secondary/10 text-text-secondary border-text-secondary/20',
  HIGH: 'bg-accent-orange/10 text-accent-orange border-accent-orange/30',
  CRITICAL: 'bg-accent-red/10 text-accent-red border-accent-red/30 animate-pulse',
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <Card
      className={cn(
        'group cursor-pointer transition-all duration-300',
        'hover:border-accent-purple hover:shadow-[0_0_20px_rgba(157,91,210,0.4)]',
        'hover:scale-[1.02] hover:-translate-y-1',
        'animate-fade-in',
        onClick && 'active:scale-[0.98]'
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg group-hover:text-accent-purple transition-colors">
            {task.title}
          </CardTitle>
          <span
            className={cn(
              'text-xs font-medium px-2 py-1 rounded-full border',
              priorityBadgeStyles[task.priority]
            )}
          >
            {priorityLabels[task.priority]}
          </span>
        </div>
      </CardHeader>
      {task.description && (
        <CardContent className="pt-0">
          <p className="text-sm text-text-secondary line-clamp-2">{task.description}</p>
        </CardContent>
      )}
    </Card>
  )
}
