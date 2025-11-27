# 🎃 Grimoire Stack - Demo Ready!

## Quick Start Commands

### 1. Install Dependencies

From the project root:
```bash
npm install
```

This single command installs everything (root + skeleton-core + both apps) thanks to npm workspaces.

### 2. Start Both Apps

```bash
npm run dev
```

This will start:
- **Haunted Tasks** on http://localhost:3000
- **Coven CRM** on http://localhost:3001

### 3. Login Credentials

Both apps use the same mock authentication:

**Demo Account:**
- Email: `demo@grimoire.dev`
- No password required - just enter the email

**Alternative Account:**
- Email: `witch@coven.dev`

## What's Been Fixed

### ✅ No More Prisma Errors
- Replaced Prisma with in-memory mock data
- No `.prisma/client/index-browser` errors
- No database setup required for demo

### ✅ Simple Mock Authentication
- Hardcoded demo users
- Session stored in localStorage
- Works across both apps
- No password required

### ✅ Working Dev Scripts
- `npm run dev` starts both apps with concurrently
- Haunted Tasks on port 3000
- Coven CRM on port 3001
- No workspace flags needed

### ✅ All Core Flows Working

**Haunted Tasks:**
- Login → Dashboard
- View task board (3 columns: Summoned, In Ritual, Banished)
- Create new tasks
- Edit existing tasks
- Delete tasks
- All with mock data

**Coven CRM:**
- Login → Contacts list
- View contacts by stage
- Click into contact details
- Add interactions
- Edit contact information
- Pipeline view
- All with mock data

## File Changes Summary

### Core Files Modified:
1. **skeleton-core/types/index.ts** - Removed Prisma dependencies, added manual types
2. **skeleton-core/lib/auth.ts** - Already had mock auth (no changes needed)

### Haunted Tasks:
3. **apps/haunted-tasks/lib/mock-data.ts** - NEW: In-memory task data store
4. **apps/haunted-tasks/lib/types.ts** - Updated to use mock data types
5. **apps/haunted-tasks/lib/db.ts** - Replaced Prisma with mock db
6. **apps/haunted-tasks/app/api/tasks/route.ts** - Fixed status types
7. **apps/haunted-tasks/app/api/tasks/[id]/route.ts** - NEW: Task detail API

### Coven CRM:
8. **apps/coven-crm/lib/mock-data.ts** - NEW: In-memory contact data store
9. **apps/coven-crm/lib/types.ts** - Updated to use mock data types
10. **apps/coven-crm/lib/db.ts** - Replaced Prisma with mock db
11. **apps/coven-crm/app/api/contacts/[id]/route.ts** - NEW: Contact detail API

### Root:
12. **package.json** - Updated scripts to work without workspace flags

## Demo Flow

### Haunted Tasks Demo:
1. Open http://localhost:3000
2. Enter `demo@grimoire.dev` and click "Enter the Crypt"
3. You'll see the dashboard with task stats
4. Click "👻 Task Board" in sidebar
5. See 6 demo tasks across 3 columns
6. Click "✨ Summon Task" to create a new task
7. Click any task card to edit it
8. Change status by selecting from dropdown
9. Tasks move between columns based on status

### Coven CRM Demo:
1. Open http://localhost:3001
2. Enter `demo@grimoire.dev` and click "Enter the Circle"
3. You'll see the contacts list with 6 demo contacts
4. Click any contact card to view details
5. See interaction history
6. Add a new interaction using the form
7. Click "Edit Contact" to modify details
8. Click "🔮 Pipeline" in sidebar to see kanban view
9. Contacts organized by stage: Familiar → Enchanting → Bewitched → Vanished

## Mock Data Details

### Tasks (6 total):
- 2 Summoned (new)
- 2 In Ritual (in progress)
- 2 Banished (completed)

### Contacts (6 total):
- 1 Familiar (new lead)
- 2 Enchanting (in progress)
- 2 Bewitched (converted)
- 1 Vanished (lost)

### Features:
- All CRUD operations work
- Data persists during session (in-memory)
- Resets on server restart
- No database required

## Troubleshooting

### Port Already in Use
If port 3000 or 3001 is taken:
```bash
# Kill the process on Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or start apps individually on different ports
cd apps/haunted-tasks
npm run dev -- -p 3002

cd apps/coven-crm
npm run dev -- -p 3003
```

### Module Not Found Errors
Make sure you installed dependencies in all three locations:
```bash
npm install
cd apps/haunted-tasks && npm install && cd ../..
cd apps/coven-crm && npm install && cd ../..
```

### Login Not Working
- Make sure you're using the exact email: `demo@grimoire.dev`
- Check browser console for errors
- Try clearing localStorage and refreshing

## Production Notes

For production deployment, you would:
1. Replace mock-data.ts files with real Prisma setup
2. Implement proper authentication (NextAuth.js)
3. Add environment variables for database
4. Set up proper session management
5. Add data validation and error handling

But for the hackathon demo, everything works perfectly as-is! 🎃👻

---

**Ready to demo!** Just run `npm run dev` and show off both apps.
