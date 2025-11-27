# Haunted Tasks - Quick Start

Get Haunted Tasks running in 5 minutes! 👻

## Prerequisites

- Node.js 18+
- npm

## Setup Steps

### 1. Install Dependencies

```bash
# From the root of grimoire-stack
npm install
```

### 2. Set Up Database

```bash
# Navigate to Haunted Tasks
cd apps/haunted-tasks

# Generate Prisma client
npx prisma generate

# Create database
npx prisma db push

# Seed with spooky demo data
npm run db:seed
```

You should see:

```
🎃 Seeding Haunted Tasks...
✅ Created 6 spooky tasks
✅ Created 4 tags
👻 Haunted Tasks seeded successfully!
```

### 3. Start Development Server

```bash
# From apps/haunted-tasks
npm run dev

# Or from root
npm run dev:tasks
```

### 4. Access the App

Open http://localhost:3000

## Demo Flow

### 1. Landing Page

You'll see the Haunted Tasks landing page with a spooky theme.

Click **"Enter the Crypt"**

### 2. Login

Enter one of the demo accounts:

- `demo@grimoire.dev`
- `witch@coven.dev`

Click **"Enter the Crypt"**

### 3. Dashboard

You'll see:

- Stats cards showing task counts by status
- Recent activity list
- Navigation sidebar on the left

### 4. Task Board

Click **"Task Board"** in the sidebar.

You'll see three columns:

- **👻 Summoned** - New tasks (2 tasks)
- **🔮 In Ritual** - In progress (2 tasks)
- **✨ Banished** - Completed (2 tasks)

### 5. Create a Task

Click **"✨ Summon Task"** button.

Fill in:

- **Title**: "Test the haunted app"
- **Description**: "Make sure everything works"
- **Status**: Summoned
- **Priority**: High

Click **"Summon"**

Your new task appears in the Summoned column!

### 6. Edit a Task

Click on any task card.

The modal opens with task details. Try:

- Changing the status to "In Ritual"
- Updating the priority to "Critical"
- Editing the description

Click **"Save"**

The task moves to the new column!

### 7. Delete a Task

Click on a task, then click **"💀 Delete"**

Confirm the deletion.

The task disappears from the board.

### 8. Logout

Click your name in the top-right navbar, then **"Logout"**

You're back at the login page.

## What's Included

### Demo Data (6 Tasks)

1. **Summon the ancient spirits** (Summoned, High)
2. **Brew the midnight potion** (In Ritual, Medium)
3. **Clean the haunted attic** (In Ritual, Low)
4. **Repair the broken broomstick** (Summoned, Critical)
5. **Read the forbidden tome** (Banished, Medium)
6. **Organize the spell book collection** (Banished, Low)

### Features Working

- ✅ Authentication (mock)
- ✅ Task CRUD operations
- ✅ Three-column board view
- ✅ Status transitions
- ✅ Priority levels
- ✅ Dashboard with stats
- ✅ Recent activity
- ✅ Responsive layout
- ✅ Dark spooky theme
- ✅ Empty states with ghost emoji

## Troubleshooting

### "Module not found" errors

```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Database errors

```bash
# Reset database
rm prisma/dev.db
npx prisma db push
npm run db:seed
```

### Port 3000 already in use

```bash
# Kill the process
# On Unix/Mac:
lsof -ti:3000 | xargs kill

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- -p 3001
```

### Prisma client not generated

```bash
npx prisma generate
```

## Next Steps

- Read [IMPLEMENTATION.md](./IMPLEMENTATION.md) for architecture details
- Check [requirements.md](../../.kiro/specs/haunted-tasks/requirements.md) for full feature specs
- Explore the code in `app/` and `components/`
- Try building new features!

## File Locations

- **Pages**: `app/(auth)/dashboard/` and `app/(auth)/tasks/`
- **API**: `app/api/tasks/`
- **Components**: `components/task-card.tsx` and `components/task-modal.tsx`
- **Database**: `prisma/schema.prisma`
- **Seed**: `prisma/seed.ts`

---

Happy haunting! 🎃👻✨
