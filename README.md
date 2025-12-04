# 🎃 Grimoire Stack

> **A spooky SaaS skeleton for building internal tools, dashboards, and CRMs**

**Kiroween Hackathon 2025 - Skeleton Crew Category**

---

## 🧙 Kiroween Submission Notes

This repository is a **monorepo** that contains the **two separate applications** required for the Skeleton Crew category:

- **`apps/haunted-tasks`** – _Haunted Tasks_ application  
  - A spooky team task management dashboard (3-stage workflow: **Summoned → In Ritual → Banished**)

- **`apps/coven-crm`** – _Coven CRM_ application  
  - A mystical CRM for tracking contacts and interactions (4-stage pipeline: **Familiar → Enchanting → Bewitched → Vanished**)

Each app has:

- Its own folder under `apps/`
- Its own `package.json`, Next.js app, Prisma schema, and implementation docs:
  - `apps/haunted-tasks/IMPLEMENTATION.md`
  - `apps/coven-crm/IMPLEMENTATION.md`

### License

This project is **open source** under the **MIT License**.  
The license file is at the repo root: [`LICENSE`](./LICENSE), and is visible in the GitHub “About” section.

---

**Kiroween Hackathon 2025 - Skeleton Crew Category**

Grimoire Stack demonstrates the power of the **skeleton pattern**: write shared infrastructure once, build multiple apps quickly. It's a reusable foundation for rapidly building modern web applications with authentication, database integration, UI components, and layout structures—all with a tasteful Halloween aesthetic.

## 🏆 The Skeleton Crew Concept

**One Skeleton, Multiple Apps**

- **Skeleton Core** - Shared library with 15+ UI components, React hooks, utilities, auth system, and database models
- **Haunted Tasks** - Task management app with 3-stage workflow (Summoned → In Ritual → Banished)
- **Coven CRM** - Customer relationship management with 4-stage pipeline (Familiar → Enchanting → Bewitched → Vanished)

Both apps share **100% of their UI infrastructure** while serving completely different purposes. This proves the skeleton pattern works: ~38% of the codebase is reusable, saving 60% development time on the second app.

## 🦇 What's Inside

This monorepo contains:

- **Skeleton Core** - Shared library with reusable components, hooks, utilities, and base database models
- **Haunted Tasks** - A spooky team task management dashboard (port 3000)
- **Coven CRM** - A mystical CRM for tracking contacts and interactions (port 3001)

Both apps are **fully functional** with complete CRUD operations, authentication, and polished UIs—all built from the same skeleton!

## ✨ Features

- 🌙 **Dark mode only** with elegant purple/orange/green accents
- 🔐 **Magic link authentication** (passwordless)
- 🏢 **Multi-organization support** with role-based access
- 🎨 **Pre-built UI components** styled with Tailwind CSS
- 📊 **Database models** with Prisma ORM
- 🪝 **React hooks** for common patterns
- 📱 **Responsive layouts** that work on mobile and desktop

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+ (App Router), React 18+, TypeScript
- **Styling**: Tailwind CSS, Radix UI / shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: Prisma ORM with SQLite (Postgres-ready)
- **Auth**: NextAuth.js (magic links)
- **Dev Tools**: ESLint, Prettier, Vitest

## 🚀 Getting Started

### Quick Setup (Automated)

```bash
# Clone the repository
git clone https://github.com/yourusername/grimoire-stack.git
cd grimoire-stack

# Run setup script
# On Unix/Mac:
chmod +x scripts/setup.sh
./scripts/setup.sh

# On Windows (PowerShell):
.\scripts\setup.ps1

# Start development servers
npm run dev
```

Visit:

- **Haunted Tasks**: http://localhost:3000 - Task management with 3-stage workflow
- **Coven CRM**: http://localhost:3001 - Contact management with 4-stage pipeline

Login with: `demo@grimoire.dev` or `witch@coven.dev`

Both apps come with demo data pre-loaded!

### Manual Setup

See [SETUP.md](./SETUP.md) for detailed step-by-step instructions.

## 📁 Project Structure

```
grimoire-stack/
├── .kiro/              # Kiro specs, steering docs, and hooks
├── skeleton-core/      # Shared reusable code
│   ├── components/     # UI components (Button, Card, Modal, etc.)
│   ├── hooks/          # React hooks (useLocalStorage, useDebounce, etc.)
│   ├── lib/            # Utilities and helpers
│   ├── types/          # Shared TypeScript types
│   └── prisma/         # Core database schema
├── apps/
│   ├── haunted-tasks/  # Task management app
│   └── coven-crm/      # CRM app
└── package.json        # Root dependencies
```

## 🎯 How to Use Skeleton Core

The skeleton core is designed to be imported into any app in the monorepo:

```typescript
// Import UI components
import { Button, Card, Modal } from '@grimoire/skeleton-core/components'

// Import hooks
import { useLocalStorage, useDebounce } from '@grimoire/skeleton-core/hooks'

// Import utilities
import { cn, formatDate } from '@grimoire/skeleton-core/lib'

// Import types
import type { User, Organization } from '@grimoire/skeleton-core/types'
```

### Creating a New App

1. Copy the structure from `apps/haunted-tasks` or `apps/coven-crm`
2. Update `package.json` with your app name
3. Extend the Prisma schema with your app-specific models
4. Import and use skeleton-core components
5. Add your app to the root `package.json` scripts

## 🎨 Design Philosophy

**Spooky but Professional** - We embrace Halloween vibes without sacrificing usability. Think "elegant gothic" rather than "haunted house chaos."

- Dark purple-black backgrounds (#1a0f1f)
- Purple primary accent (#9d5bd2)
- Orange highlights (#f97316)
- Ghost emoji 👻 for empty states
- Subtle animations and hover effects

See `.kiro/steering/ui-style.md` for the complete style guide.

## 📚 Documentation

### Steering Docs

- **Product Vision**: `.kiro/steering/product.md`
- **Technical Architecture**: `.kiro/steering/tech.md`
- **Code Structure**: `.kiro/steering/structure.md`
- **UI Style Guide**: `.kiro/steering/ui-style.md`

### Feature Specs

- **Skeleton Core**: `.kiro/specs/skeleton-core/requirements.md`
- **Haunted Tasks**: `.kiro/specs/haunted-tasks/requirements.md`
- **Coven CRM**: `.kiro/specs/coven-crm/requirements.md`

### Implementation Guides

- **Setup Guide**: `SETUP.md` - Detailed setup instructions
- **Testing Guide**: `TESTING.md` - Test suite and coverage
- **Apps Comparison**: `APPS_COMPARISON.md` - How the apps differ and share code
- **Hooks Demo**: `HOOKS_DEMO.md` - Agent automation showcase
- **MCP Demo**: `MCP_DEMO.md` - Model Context Protocol integration
- **UI Polish**: `UI_POLISH.md` - Theme and animation details
- **Skeleton Overview**: `SKELETON_OVERVIEW.md` - Auto-generated component docs
- **Haunted Tasks**: `apps/haunted-tasks/IMPLEMENTATION.md`
- **Coven CRM**: `apps/coven-crm/IMPLEMENTATION.md`

## 🤖 How Kiro Was Used

This project showcases Kiro's full development workflow:

### 📋 **Spec-Driven Development**

- **Requirements docs** (`.kiro/specs/*/requirements.md`) - User stories and acceptance criteria in EARS format
- **Design docs** - Architecture, data models, and correctness properties
- **Task lists** - Implementation checklists with granular steps

### 🎯 **Steering Docs** (`.kiro/steering/`)

- **Product vision** - Target users and value proposition
- **Technical architecture** - Stack decisions and patterns
- **Code structure** - File organization and naming conventions
- **UI style guide** - Design tokens and component patterns

### 🪝 **Agent Hooks** (5 automated workflows)

- **Update skeleton docs** - Auto-regenerate component documentation
- **Generate app summaries** - Keep app docs in sync
- **Lint on save** - Instant code quality feedback
- **Prisma generate** - Auto-regenerate client on schema changes
- **Validate imports** - Ensure skeleton-core usage is correct

### 🔌 **MCP Integration** (Custom server)

- **Get theme tokens** - Programmatic access to design system
- **Generate app blueprints** - Templates for new apps (Inventory, Events, Wiki)
- **Validate structure** - Check if apps follow patterns

### 🧪 **Testing** (44 tests)

- Vitest test suite for utilities, hooks, and business logic
- Fast execution (< 1 second)
- Coverage of core functionality

**Result**: A production-ready, well-documented, fully tested skeleton that can spawn new apps in hours instead of days.

## 🤝 Contributing

This is a hackathon project and learning resource. Feel free to:

- Fork it and build your own apps on the skeleton
- Submit issues or suggestions
- Share your own Grimoire Stack apps

## 📄 License

MIT License - feel free to use this for your own projects!

## 🌟 Acknowledgments

Built with Kiro AI pair programming and a love for spooky season 🎃👻

---

**Happy haunting!** 🦇
