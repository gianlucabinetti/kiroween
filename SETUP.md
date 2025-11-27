# Grimoire Stack - Setup Guide

Complete setup instructions for getting Grimoire Stack running locally.

## Prerequisites

- Node.js 18+ and npm 9+
- Git

## Quick Start (5 minutes)

### 1. Install Dependencies

```bash
# From the root directory
npm install
```

This will install dependencies for all workspaces (skeleton-core, haunted-tasks, coven-crm).

### 2. Set Up Environment Variables

```bash
# Skeleton Core
cp skeleton-core/.env.example skeleton-core/.env

# Haunted Tasks
cp apps/haunted-tasks/.env.example apps/haunted-tasks/.env

# Coven CRM
cp apps/coven-crm/.env.example apps/coven-crm/.env
```

The default SQLite configuration will work out of the box.

### 3. Initialize Databases

```bash
# Generate Prisma clients
cd skeleton-core
npx prisma generate
cd ..

cd apps/haunted-tasks
npx prisma generate
cd ../..

cd apps/coven-crm
npx prisma generate
cd ../..

# Push schemas to create databases
cd skeleton-core
npx prisma db push
cd ..

cd apps/haunted-tasks
npx prisma db push
cd ../..

cd apps/coven-crm
npx prisma db push
cd ../..
```

### 4. Seed Demo Data

```bash
cd skeleton-core
npm run db:seed
cd ..
```

This creates:

- Demo organization: "Demo Organization"
- Demo users:
  - demo@grimoire.dev (Owner)
  - witch@coven.dev (Member)

### 5. Start Development Servers

```bash
# From root - starts both apps
npm run dev
```

Or run individually:

```bash
# Haunted Tasks only (port 3000)
npm run dev:tasks

# Coven CRM only (port 3001)
npm run dev:crm
```

### 6. Access the Apps

- **Haunted Tasks**: http://localhost:3000
- **Coven CRM**: http://localhost:3001

Login with either demo account:

- `demo@grimoire.dev`
- `witch@coven.dev`

## Project Structure

```
grimoire-stack/
├── skeleton-core/          # Shared library
│   ├── components/         # UI components
│   ├── hooks/              # React hooks
│   ├── lib/                # Utilities & auth
│   └── prisma/             # Core database schema
├── apps/
│   ├── haunted-tasks/      # Task management (port 3000)
│   └── coven-crm/          # CRM (port 3001)
└── .kiro/                  # Specs, steering, hooks
```

## How Apps Use Skeleton Core

Both apps import from `@grimoire/skeleton-core`:

```typescript
// Import UI components
import { Button, Card, Input, Modal } from '@grimoire/skeleton-core/components'

// Import layout
import { AppLayout } from '@grimoire/skeleton-core/components'

// Import utilities
import { cn, formatDate } from '@grimoire/skeleton-core/lib'

// Import auth
import { login, saveSession, getSession } from '@grimoire/skeleton-core/lib'

// Import hooks
import { useLocalStorage, useDebounce } from '@grimoire/skeleton-core/hooks'

// Import types
import type { User, Organization } from '@grimoire/skeleton-core/types'
```

## Development Workflow

### Making Changes to Skeleton Core

1. Edit files in `skeleton-core/`
2. Changes are immediately available to apps (no build step needed)
3. Restart dev servers if you add new files

### Adding a New Component

```bash
# Create component in skeleton-core
touch skeleton-core/components/ui/new-component.tsx

# Export it
# Add to skeleton-core/components/ui/index.ts
# Add to skeleton-core/components/index.ts

# Use in apps
import { NewComponent } from '@grimoire/skeleton-core/components'
```

### Database Changes

```bash
# Edit schema
vim skeleton-core/prisma/schema.prisma

# Push changes
cd skeleton-core
npx prisma db push
npx prisma generate

# Update seed if needed
vim prisma/seed.js
npm run db:seed
```

## Troubleshooting

### "Module not found" errors

```bash
# Reinstall dependencies
rm -rf node_modules apps/*/node_modules skeleton-core/node_modules
npm install
```

### Database issues

```bash
# Reset database
rm skeleton-core/prisma/dev.db
rm apps/haunted-tasks/prisma/dev.db
rm apps/coven-crm/prisma/dev.db

# Recreate
npx prisma db push --workspace=@grimoire/skeleton-core
npx prisma db push --workspace=haunted-tasks
npx prisma db push --workspace=coven-crm
```

### Port already in use

```bash
# Kill processes on ports 3000 and 3001
# On Unix/Mac:
lsof -ti:3000 | xargs kill
lsof -ti:3001 | xargs kill

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## Next Steps

- Read `.kiro/specs/` for feature requirements
- Check `.kiro/steering/` for architecture guidelines
- Implement features following the specs
- Use Kiro agent hooks for automation

## Production Deployment

For production:

1. Switch to PostgreSQL in `.env` files
2. Set up proper authentication (replace mock auth)
3. Add environment variables for secrets
4. Run `npm run build` to build all apps
5. Deploy to Vercel, Netlify, or your platform of choice

---

Happy haunting! 🎃👻
