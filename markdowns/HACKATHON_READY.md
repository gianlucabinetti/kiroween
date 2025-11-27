# 🎃 Grimoire Stack - Hackathon Demo Ready!

## 🚀 Quick Start (2 Steps)

### Step 1: Install Dependencies

From the project root:
```bash
npm install
```

This will install dependencies for the root, skeleton-core, and both apps automatically (npm workspaces).

### Step 2: Start Both Apps
```bash
npm run dev
```

### Step 3: Login
- **Haunted Tasks**: http://localhost:3000
- **Coven CRM**: http://localhost:3001
- **Login**: `demo@grimoire.dev` (no password)

## 🎯 Demo Script

### Haunted Tasks (2 minutes)
1. Open http://localhost:3000
2. Login with `demo@grimoire.dev`
3. Show dashboard with task stats
4. Click "Task Board" - show 3-column kanban
5. Create a new task - click "✨ Summon Task"
6. Edit a task - click any card, change status
7. Watch it move between columns

### Coven CRM (2 minutes)
1. Open http://localhost:3001
2. Login with `demo@grimoire.dev`
3. Show contacts list with 6 contacts
4. Click a contact - show details page
5. Add an interaction - use the form
6. Click "Pipeline" - show kanban view
7. Explain the 4 stages: Familiar → Enchanting → Bewitched → Vanished

## ✅ What's Working

### Core Features
- ✅ Mock authentication (no database needed)
- ✅ In-memory data stores (no Prisma errors)
- ✅ Full CRUD operations for tasks
- ✅ Full CRUD operations for contacts
- ✅ Interaction logging
- ✅ Kanban boards for both apps
- ✅ Responsive UI with dark theme
- ✅ Shared component library (skeleton-core)

### Technical Highlights
- ✅ Next.js 14 App Router
- ✅ TypeScript throughout
- ✅ Tailwind CSS styling
- ✅ Monorepo structure
- ✅ Shared authentication
- ✅ API routes for all operations
- ✅ No external dependencies for demo

## 📁 Files Changed (Summary)

### Critical Files (Show These)

**1. skeleton-core/types/index.ts**
- Removed Prisma dependencies
- Added manual type definitions
- No more module-not-found errors

**2. apps/haunted-tasks/lib/mock-data.ts** (NEW)
- In-memory task store
- 6 demo tasks across 3 statuses
- Full CRUD operations

**3. apps/coven-crm/lib/mock-data.ts** (NEW)
- In-memory contact store
- 6 demo contacts across 4 stages
- Interaction tracking

**4. Both Login Pages**
- Simple email-only login
- Mock authentication
- Redirects to main page

### Supporting Files

**API Routes:**
- `apps/haunted-tasks/app/api/tasks/route.ts` - List/create tasks
- `apps/haunted-tasks/app/api/tasks/[id]/route.ts` - Get/update/delete task
- `apps/coven-crm/app/api/contacts/route.ts` - List/create contacts
- `apps/coven-crm/app/api/contacts/[id]/route.ts` - Get/update/delete contact
- `apps/coven-crm/app/api/interactions/route.ts` - Create interactions

**Database Replacements:**
- `apps/haunted-tasks/lib/db.ts` - Points to mock data
- `apps/coven-crm/lib/db.ts` - Points to mock data
- `skeleton-core/lib/db.ts` - Placeholder only

**Package Files:**
- `package.json` - Updated scripts for npm (no workspace flags)
- `apps/haunted-tasks/package.json` - Removed Prisma, fixed skeleton-core ref
- `apps/coven-crm/package.json` - Removed Prisma, fixed skeleton-core ref
- `skeleton-core/package.json` - Removed Prisma

## 🎨 Key Selling Points

### 1. Reusable Skeleton
- Shared UI components (Button, Card, Input, Modal)
- Shared hooks (useLocalStorage, useDebounce)
- Shared auth system
- Shared utilities

### 2. Rapid Development
- Two full apps built on same foundation
- Consistent UI/UX across apps
- Type-safe throughout
- Easy to add new apps

### 3. Kiro Integration
- Specs for feature planning
- Steering docs for architecture
- Agent hooks for automation
- MCP server for blueprints

### 4. Production-Ready Structure
- Clean separation of concerns
- API routes for all operations
- Type-safe data flow
- Easy to swap mock data for real database

## 🐛 Known Limitations (For Demo)

### Expected Behavior:
- Data resets on server restart (in-memory)
- No persistence between sessions
- No real authentication
- No data validation
- Single organization only

### These are FEATURES for the demo:
- No database setup required
- No environment variables needed
- Works offline
- Fast and reliable
- No external dependencies

## 🔧 Troubleshooting

### "Cannot find module '@grimoire/skeleton-core'"
```bash
# Reinstall dependencies
cd apps/haunted-tasks
npm install
cd ../coven-crm
npm install
```

### "Port 3000 already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### "Module not found: Can't resolve '.prisma/client'"
This shouldn't happen anymore, but if it does:
- Make sure you pulled latest changes
- Delete node_modules in all three locations
- Run setup script again

### Login not working
- Use exact email: `demo@grimoire.dev`
- Check browser console for errors
- Clear localStorage and try again

## 📊 Demo Data

### Tasks (6 total)
- **Summoned** (2): "Summon the ancient spirits", "Repair the broken broomstick"
- **In Ritual** (2): "Brew the midnight potion", "Clean the haunted attic"
- **Banished** (2): "Read the forbidden tome", "Organize the spell book collection"

### Contacts (6 total)
- **Familiar** (1): Morgana Le Fay
- **Enchanting** (2): Merlin Ambrosius, Circe of Aeaea
- **Bewitched** (2): Gandalf the Grey, Hermione Granger
- **Vanished** (1): Voldemort

### Companies (3 total)
- Mystic Enterprises
- Enchanted Solutions
- Spellbound Inc

## 🎤 Talking Points

### Problem
"Building internal tools and CRMs from scratch is time-consuming. Every project starts with the same boilerplate: auth, UI components, layouts, database setup."

### Solution
"Grimoire Stack is a reusable SaaS skeleton that provides all the foundation you need. Build new apps in hours, not days."

### Demo
"I'll show you two complete apps - a task manager and a CRM - both built on the same shared foundation. Notice how they share components, auth, and styling, but each has its own unique features."

### Kiro Integration
"This project was built using Kiro's spec-driven development. We have requirements, design docs, and implementation plans for each feature. The steering docs guide all architectural decisions."

### Future
"In production, you'd swap the mock data for real Prisma, add proper auth with NextAuth, and deploy to Vercel. But the structure is already production-ready."

## 🎯 Success Metrics

- ✅ Both apps start without errors
- ✅ Login works in both apps
- ✅ All CRUD operations work
- ✅ UI is responsive and polished
- ✅ No console errors during demo
- ✅ Fast and snappy performance
- ✅ Professional dark theme
- ✅ Shared components work across apps

---

## 🚀 You're Ready!

Just run `npm run dev` and you're good to go. The apps are stable, the flows work, and everything is demo-ready.

**Break a leg! 🎃👻**
