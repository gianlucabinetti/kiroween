# Skeleton Core

The foundational library for Grimoire Stack applications. Contains reusable UI components, React hooks, utilities, database models, and layout structures.

## Purpose

Skeleton Core eliminates boilerplate by providing:

- **Authentication** - Magic link auth with NextAuth.js
- **Organizations** - Multi-tenant support with role-based access
- **UI Components** - Pre-styled buttons, cards, modals, tables, etc.
- **Layout Components** - Navbar, sidebar, and responsive shells
- **React Hooks** - useLocalStorage, useDebounce, useMediaQuery, etc.
- **Utilities** - Date formatting, class merging, validation schemas
- **Database Models** - User, Organization, Membership base models

## Installation

From an app directory:

```bash
npm install @grimoire/skeleton-core
```

Or use workspace references in the monorepo (already configured).

## Usage

```typescript
// Import components
import { Button, Card, Modal } from '@grimoire/skeleton-core/components'

// Import hooks
import { useLocalStorage } from '@grimoire/skeleton-core/hooks'

// Import utilities
import { cn, formatDate } from '@grimoire/skeleton-core/lib'

// Import types
import type { User, Organization } from '@grimoire/skeleton-core/types'
```

## Structure

```
skeleton-core/
├── components/
│   ├── ui/           # Base components (Button, Card, Input, etc.)
│   ├── layout/       # Layout components (Navbar, Sidebar, Footer)
│   └── index.ts      # Barrel exports
├── hooks/
│   └── index.ts      # React hooks
├── lib/
│   ├── utils.ts      # General utilities
│   ├── db.ts         # Prisma client
│   └── validations.ts # Zod schemas
├── prisma/
│   └── schema.prisma # Core database models
└── types/
    └── index.ts      # Shared TypeScript types
```

## Development

When making changes to skeleton-core:

1. Update the relevant files
2. Rebuild if necessary: `npm run build`
3. Test in an app to verify changes work
4. Update version in `package.json` if publishing

## Extending

Apps can extend skeleton-core by:

- Importing and composing components
- Overriding styles with className props
- Extending Prisma schema with app-specific models
- Creating app-specific hooks that use core hooks

## Design Philosophy

- **Minimal but complete** - Provide essentials, not everything
- **Composable** - Components work together but aren't tightly coupled
- **Overridable** - Apps can customize without forking
- **Type-safe** - Full TypeScript support with strict mode
- **Accessible** - WCAG 2.1 AA compliant components

---

For more details, see `.kiro/specs/skeleton-core/requirements.md`
