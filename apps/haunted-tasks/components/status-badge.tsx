'use client'

import { cn } from '@grimoire/skeleton-core/lib'
import type { TaskStatus } from '@/lib/types'

interface StatusBadgeProps {
  status: TaskStatus
  className?: string
}

const statusConfig = {
  SUMMONED: {
    label: '👻 Summoned',
    color: 'bg-accent-purple/10 text-accent-purple border-accent-purple/30',
    glow: 'group-hover:shadow-[0_0_10px_rgba(157,91,210,0.5)]',
  },
  IN_RITUAL: {
    label: '🔮 In Ritual',
    color: 'bg-accent-orange/10 text-accent-orange border-accent-orange/30',
    glow: 'group-hover:shadow-[0_0_10px_rgba(249,115,22,0.5)]',
  },
  BANISHED: {
    label: '✨ Banished',
    color: 'bg-accent-green/10 text-accent-green border-accent-green/30',
    glow: 'group-hover:shadow-[0_0_10px_rgba(22,163,74,0.5)]',
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border',
        'transition-all duration-300',
        config.color,
        config.glow,
        className
      )}
    >
      {config.label}
    </span>
  )
}
