# Grimoire Stack - Technical Architecture

## Tech Stack

### Frontend

- **Next.js 14+** with App Router
- **React 18+** with TypeScript
- **Tailwind CSS** for styling
- **Radix UI** or **shadcn/ui** for accessible components
- **React Hook Form** + **Zod** for form validation

### Backend

- **Next.js API Routes** for serverless functions
- **Prisma ORM** for database access
- **SQLite** for local development (easily swappable to Postgres)
- **NextAuth.js** for authentication (optional, can be added per app)

### Development Tools

- **TypeScript** strict mode
- **ESLint** + **Prettier** for code quality
- **Vitest** for unit tests (when needed)
- **Kiro specs** for feature planning
- **Kiro hooks** for automated workflows

## Architectural Principles

### 1. Shared Skeleton Core

The `/skeleton-core` directory contains reusable code:

- UI components (Button, Card, Modal, etc.)
- React hooks (useLocalStorage, useDebounce, etc.)
- Utility functions (date formatting, validation, etc.)
- Layout components (Navbar, Sidebar, Footer)
- Database schema primitives (User, timestamps, etc.)

Apps import from `@grimoire/skeleton-core` (via TypeScript path mapping).

### 2. App-Specific Folders

Each app lives in `/apps/{app-name}`:

- Has its own Next.js setup
- Imports from skeleton-core
- Can override or extend core components
- Has its own Prisma schema (extending core models)
- Independent deployment

### 3. Monorepo Structure

We use a simple monorepo without complex tooling:

- Shared `package.json` at root for common dependencies
- App-specific `package.json` files for app dependencies
- TypeScript path aliases for clean imports
- No Turborepo/Nx needed for this scale

### 4. Database Strategy

- Core models defined in `/skeleton-core/prisma/schema.prisma`
- Apps extend with their own models
- Migrations run per-app
- SQLite for simplicity, Postgres-ready

## Kiroween Hackathon Constraints

### Easy Local Setup

- Single `npm install` at root
- `npm run dev` starts all apps (or individually)
- No Docker required (though supported)
- Seed data included for demos

### Showcase Kiro Features

**Specs**: Each major feature has:

- `requirements.md` - What we're building
- `design.md` - How we're building it
- `tasks.md` - Implementation checklist

**Steering Docs**: Guide all decisions:

- Product vision
- Technical architecture
- Code structure
- UI/UX guidelines

**Hooks**: Automate workflows:

- Run tests on save
- Format code on commit
- Update related files when schema changes

**MCP (Optional)**: Could integrate:

- Database inspection tools
- API testing tools
- Documentation generators

## Code Quality Standards

- **TypeScript**: No `any` types without justification
- **Components**: Functional components with TypeScript interfaces
- **Naming**: PascalCase for components, camelCase for functions/variables
- **File structure**: One component per file, colocate tests
- **Imports**: Absolute imports using `@/` prefix
- **Error handling**: Always handle errors, never silent failures
- **Accessibility**: All interactive elements keyboard accessible
