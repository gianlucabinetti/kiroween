# Grimoire Stack - Repository Structure

## Directory Layout

```
grimoire-stack/
├── .kiro/
│   ├── steering/          # Architecture and style guides
│   ├── specs/             # Feature specs
│   └── hooks/             # Agent automation hooks
├── skeleton-core/         # Shared reusable code
│   ├── components/        # UI components
│   ├── hooks/             # React hooks
│   ├── lib/               # Utilities and helpers
│   ├── prisma/            # Core database schema
│   └── types/             # Shared TypeScript types
├── apps/
│   ├── haunted-tasks/     # Task management app
│   │   ├── app/           # Next.js app directory
│   │   ├── prisma/        # App-specific schema
│   │   ├── public/        # Static assets
│   │   └── package.json
│   └── coven-crm/         # CRM app
│       ├── app/           # Next.js app directory
│       ├── prisma/        # App-specific schema
│       ├── public/        # Static assets
│       └── package.json
├── package.json           # Root dependencies
├── tsconfig.json          # Root TypeScript config
└── README.md
```

## Skeleton Core Structure

```
skeleton-core/
├── components/
│   ├── ui/                # Base UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── modal.tsx
│   ├── layout/            # Layout components
│   │   ├── navbar.tsx
│   │   ├── sidebar.tsx
│   │   └── footer.tsx
│   └── index.ts           # Barrel exports
├── hooks/
│   ├── use-local-storage.ts
│   ├── use-debounce.ts
│   └── index.ts
├── lib/
│   ├── utils.ts           # General utilities
│   ├── db.ts              # Prisma client
│   └── validations.ts     # Zod schemas
├── prisma/
│   └── schema.prisma      # Core models
└── types/
    └── index.ts           # Shared types
```

## App Structure (Next.js App Router)

```
apps/haunted-tasks/
├── app/
│   ├── (auth)/            # Auth-protected routes
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   └── tasks/
│   │       ├── page.tsx
│   │       └── [id]/
│   │           └── page.tsx
│   ├── api/               # API routes
│   │   └── tasks/
│   │       └── route.ts
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # App-specific components
│   └── task-card.tsx
├── prisma/
│   ├── schema.prisma      # Extends core schema
│   └── seed.ts            # Seed data
├── public/
│   └── favicon.ico
└── package.json
```

## File Naming Conventions

### Components

- **Filename**: `kebab-case.tsx` (e.g., `task-card.tsx`)
- **Component name**: `PascalCase` (e.g., `TaskCard`)
- **Location**: Colocate with usage when app-specific, otherwise in skeleton-core

### Pages (Next.js App Router)

- **Filename**: `page.tsx` for routes
- **Folder name**: `kebab-case` for route segments
- **Dynamic routes**: `[id]/page.tsx`
- **Route groups**: `(auth)/` for organization without affecting URL

### API Routes

- **Filename**: `route.ts` for API endpoints
- **Folder structure**: Mirrors REST conventions
- **Example**: `app/api/tasks/[id]/route.ts`

### Utilities and Hooks

- **Filename**: `kebab-case.ts`
- **Function name**: `camelCase`
- **Hook name**: `use-` prefix (e.g., `use-tasks.ts`)

### Types

- **Filename**: Match the domain (e.g., `task.ts`)
- **Interface name**: `PascalCase` (e.g., `Task`, `TaskWithUser`)
- **Type name**: `PascalCase` (e.g., `TaskStatus`)

## Import Conventions

### Path Aliases

```typescript
// Use @ for app root
import { Button } from '@/components/ui/button'

// Use @grimoire/skeleton-core for shared code
import { Card } from '@grimoire/skeleton-core/components'
```

### Import Order

1. React and Next.js imports
2. Third-party libraries
3. Skeleton core imports
4. App-specific imports
5. Relative imports
6. Type imports (with `type` keyword)

```typescript
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

import { Button } from '@grimoire/skeleton-core/components'
import { useDebounce } from '@grimoire/skeleton-core/hooks'

import { TaskCard } from '@/components/task-card'
import { createTask } from '@/lib/actions'

import type { Task } from '@/types'
```

## Database Conventions

### Schema Organization

- Core models in `skeleton-core/prisma/schema.prisma`
- App models extend core via separate schema files
- Use consistent naming: `PascalCase` for models, `camelCase` for fields
- Always include `id`, `createdAt`, `updatedAt` on models

### Migration Strategy

- Descriptive migration names: `add_task_priority_field`
- Test migrations locally before committing
- Include seed data for development

## Component Conventions

### Props Interface

```typescript
interface TaskCardProps {
  task: Task
  onComplete?: (id: string) => void
  className?: string
}

export function TaskCard({ task, onComplete, className }: TaskCardProps) {
  // Component implementation
}
```

### Exports

- Named exports for components
- Default exports only for pages
- Barrel exports (`index.ts`) for cleaner imports
