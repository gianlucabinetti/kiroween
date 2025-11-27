'use client'

import { useState } from 'react'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalContent,
  ModalFooter,
  Button,
  Input,
} from '@grimoire/skeleton-core/components'
import type { TaskWithTags, TaskStatus, Priority } from '@/lib/types'

interface TaskModalProps {
  task: TaskWithTags | null
  open: boolean
  onClose: () => void
  onSave: (task: Partial<TaskWithTags>) => void
  onDelete?: () => void
}

const statusOptions: { value: TaskStatus; label: string }[] = [
  { value: 'SUMMONED', label: '👻 Summoned' },
  { value: 'IN_RITUAL', label: '🔮 In Ritual' },
  { value: 'BANISHED', label: '✨ Banished' },
]

const priorityOptions: { value: Priority; label: string }[] = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'CRITICAL', label: 'Critical' },
]

export function TaskModal({ task, open, onClose, onSave, onDelete }: TaskModalProps) {
  const [title, setTitle] = useState(task?.title || '')
  const [description, setDescription] = useState(task?.description || '')
  const [status, setStatus] = useState<TaskStatus>(task?.status || 'SUMMONED')
  const [priority, setPriority] = useState<Priority>(task?.priority || 'MEDIUM')

  const handleSave = () => {
    onSave({
      ...(task && { id: task.id }),
      title,
      description,
      status,
      priority,
    })
    onClose()
  }

  const handleDelete = () => {
    if (onDelete && confirm('Are you sure you want to banish this task forever? 💀')) {
      onDelete()
      onClose()
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader>
        <ModalTitle>{task ? 'Edit Task' : 'Summon New Task'}</ModalTitle>
      </ModalHeader>

      <ModalContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Title</label>
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter task title..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe the task..."
              className="flex min-h-[100px] w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-2 focus:ring-offset-background"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as TaskStatus)}
                className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-2 focus:ring-offset-background"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Priority</label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as Priority)}
                className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-2 focus:ring-offset-background"
              >
                {priorityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </ModalContent>

      <ModalFooter>
        {task && onDelete && (
          <Button variant="destructive" onClick={handleDelete} className="mr-auto">
            💀 Delete
          </Button>
        )}
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!title.trim()}>
          {task ? 'Save' : 'Summon'}
        </Button>
      </ModalFooter>
    </Modal>
  )
}
