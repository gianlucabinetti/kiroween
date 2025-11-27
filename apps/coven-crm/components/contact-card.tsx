'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@grimoire/skeleton-core/components'
import { cn } from '@grimoire/skeleton-core/lib'
import type { ContactWithRelations } from '@/lib/types'

interface ContactCardProps {
  contact: ContactWithRelations
  onClick?: () => void
}

const stageLabels = {
  FAMILIAR: '🔮 Familiar',
  ENCHANTING: '✨ Enchanting',
  BEWITCHED: '💫 Bewitched',
  VANISHED: '👻 Vanished',
}

const stageBadgeStyles = {
  FAMILIAR: 'bg-accent-purple/10 text-accent-purple border-accent-purple/30',
  ENCHANTING: 'bg-accent-orange/10 text-accent-orange border-accent-orange/30',
  BEWITCHED: 'bg-accent-green/10 text-accent-green border-accent-green/30',
  VANISHED: 'bg-text-tertiary/10 text-text-tertiary border-text-tertiary/20',
}

export function ContactCard({ contact, onClick }: ContactCardProps) {
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
          <div className="flex-1">
            <CardTitle className="text-lg group-hover:text-accent-purple transition-colors">
              {contact.name}
            </CardTitle>
            <p className="text-sm text-text-secondary mt-1">{contact.email}</p>
          </div>
          <span
            className={cn(
              'text-xs font-medium px-2 py-1 rounded-full border whitespace-nowrap',
              stageBadgeStyles[contact.stage]
            )}
          >
            {stageLabels[contact.stage]}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1">
          {contact.company && (
            <p className="text-sm text-text-tertiary flex items-center gap-1">
              <span className="opacity-70">🏢</span> {contact.company.name}
            </p>
          )}
          {contact.phone && (
            <p className="text-sm text-text-tertiary flex items-center gap-1">
              <span className="opacity-70">📞</span> {contact.phone}
            </p>
          )}
          {contact.interactions.length > 0 && (
            <p className="text-xs text-accent-purple mt-2 flex items-center gap-1">
              <span>💬</span> {contact.interactions.length} interaction
              {contact.interactions.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
