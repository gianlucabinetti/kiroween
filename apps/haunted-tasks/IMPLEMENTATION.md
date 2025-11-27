# Haunted Tasks - Implementation Guide

## 🎃 Overview

Haunted Tasks is a fully functional task management app built on Grimoire Stack's skeleton-core. It demonstrates how to build a complete CRUD application with authentication, database operations, and a polished UI.

## 🏗️ Architecture

### Data Flow

```
User Action → Component → API Route → Prisma → Database
                ↓
         Update UI State
```

### File Structure

```
apps/haunted-tasks/
├── app/
│   ├── (auth)/              # Protected routes
│   │   ├── layout.tsx       # Auth layout with AppLayout
│   │   ├── dashboard/       # Dashboard with stats
│   │   └── tasks/           # Task board (main feature)
│   ├── api/
│   │   └── tasks/           # REST API endpoints
│   │       ├── route.ts     # GET (list), POST (create)
│   │       └── [id]/
│   │           └── route.ts # GET, PATCH, DELETE (single task)
│   ├── login/
│   │   └── page.tsx         # Login page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── globals.css          # Tailwind + theme
├── components/
│   ├── task-card.tsx        # Task display card
│   └── task-modal.tsx       # Create/edit modal
├── lib/
│   ├── db.ts                # Prisma client
│   └── types.ts             # TypeScript types
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Demo data
└── package.json
```

## 🔌 How It Uses Skeleton Core

### 1. Layout System

```typescript
// apps/haunted-tasks/app/(auth)/layout.tsx
import { AppLayout } from '@grimoire/skeleton-core/components'
import { clearSession, getSession } from '@grimoire/skeleton-core/lib'

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/tasks', label: 'Task Board' },
]

export default function AuthLayout({ children }) {
  const session = getSession()

  return (
    <AppLayout
      appName="👻 Haunted Tasks"
      links={links}
      user={session?.user}
      onLogout={() => clearSession()}
    >
      {children}
    </AppLayout>
  )
}
```

**What this does:**

- Wraps all authenticated pages with sidebar + navbar
- Checks for valid session, redirects to login if missing
- Provides logout functionality
- Shows user info in navbar

### 2. UI Components

```typescript
// apps/haunted-tasks/app/(auth)/tasks/page.tsx
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@grimoire/skeleton-core/components'

// Use in JSX
<Card>
  <CardHeader>
    <CardTitle>Task Board</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

**Available components:**

- `Button` - Primary actions, variants (outline, destructive, ghost)
- `Card` - Content containers with header/footer
- `Input` - Form inputs with validation styling
- `Modal` - Dialogs for create/edit operations

### 3. Authentication

```typescript
// apps/haunted-tasks/app/login/page.tsx
import { login, saveSession } from '@grimoire/skeleton-core/lib'

const handleLogin = async (email: string) => {
  const user = await login(email)
  if (user) {
    saveSession(user)
    router.push('/dashboard')
  }
}
```

**Auth flow:**

1. User enters email on login page
2. `login()` validates against demo users
3. `saveSession()` stores user in localStorage
4. Protected routes check session with `getSession()`
5. `clearSession()` logs out

### 4. Utilities

```typescript
import { cn, formatRelativeTime } from '@grimoire/skeleton-core/lib'

// Merge Tailwind classes
<div className={cn('base-class', isActive && 'active-class')} />

// Format dates
<p>{formatRelativeTime(task.createdAt)}</p> // "2 hours ago"
```

## 📊 Database Schema

### Task Model

```prisma
model Task {
  id             String    @id @default(cuid())
  title          String
  description    String?
  status         TaskStatus @default(SUMMONED)
  priority       Priority   @default(MEDIUM)
  assigneeId     String?
  organizationId String
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
  completedAt    DateTime?

  tags TaskTag[]
}

enum TaskStatus {
  SUMMONED      // 👻 New tasks
  IN_RITUAL     // 🔮 In progress
  BANISHED      // ✨ Completed
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}
```

## 🔄 API Routes

### GET /api/tasks

List all tasks for an organization.

```typescript
// Request
GET /api/tasks?organizationId=org_1&status=SUMMONED

// Response
[
  {
    id: "task_1",
    title: "Summon the ancient spirits",
    status: "SUMMONED",
    priority: "HIGH",
    tags: []
  }
]
```

### POST /api/tasks

Create a new task.

```typescript
// Request
POST /api/tasks
{
  "title": "New task",
  "description": "Task details",
  "status": "SUMMONED",
  "priority": "MEDIUM",
  "organizationId": "org_1"
}

// Response
{
  id: "task_new",
  title: "New task",
  // ... full task object
}
```

### PATCH /api/tasks/[id]

Update an existing task.

```typescript
// Request
PATCH /api/tasks/task_1
{
  "status": "IN_RITUAL",
  "priority": "HIGH"
}

// Response
{
  id: "task_1",
  status: "IN_RITUAL",
  // ... updated task
}
```

### DELETE /api/tasks/[id]

Delete a task.

```typescript
// Request
DELETE / api / tasks / task_1

// Response
{
  success: true
}
```

## 🎨 UI Features

### Task Board (3-Column Layout)

```
┌─────────────┬─────────────┬─────────────┐
│ 👻 Summoned │ 🔮 In Ritual│ ✨ Banished │
├─────────────┼─────────────┼─────────────┤
│ Task Card 1 │ Task Card 3 │ Task Card 5 │
│ Task Card 2 │ Task Card 4 │ Task Card 6 │
└─────────────┴─────────────┴─────────────┘
```

### Task Card

- Shows title and description (truncated)
- Priority indicator (color-coded)
- Hover effect with purple glow
- Click to open edit modal

### Task Modal

- Create new or edit existing tasks
- Fields: Title, Description, Status, Priority
- Delete button (with confirmation)
- Keyboard support (ESC to close)

### Dashboard

- Stats cards showing counts by status
- Recent activity list
- Quick link to task board

## 🚀 Running the App

### Setup

```bash
# From root directory
cd apps/haunted-tasks

# Generate Prisma client
npx prisma generate

# Create database
npx prisma db push

# Seed demo data
npm run db:seed

# Start dev server
npm run dev
```

### Access

1. Visit http://localhost:3000
2. Click "Enter the Crypt"
3. Login with `demo@grimoire.dev`
4. Navigate to "Task Board"
5. Click "✨ Summon Task" to create tasks
6. Click any task card to edit
7. Drag tasks between columns (future feature)

## 🎯 Key Implementation Patterns

### 1. Client-Side State Management

```typescript
const [tasks, setTasks] = useState<TaskWithTags[]>([])

// Fetch on mount
useEffect(() => {
  fetchTasks()
}, [])

// Refresh after mutations
const handleSaveTask = async taskData => {
  await fetch('/api/tasks', { method: 'POST', body: JSON.stringify(taskData) })
  await fetchTasks() // Refresh list
}
```

### 2. Modal Pattern

```typescript
const [selectedTask, setSelectedTask] = useState<Task | null>(null)
const [isModalOpen, setIsModalOpen] = useState(false)

// Open for edit
const handleEditTask = (task: Task) => {
  setSelectedTask(task)
  setIsModalOpen(true)
}

// Open for create
const handleCreateTask = () => {
  setSelectedTask(null)
  setIsModalOpen(true)
}
```

### 3. API Error Handling

```typescript
export async function GET(request: NextRequest) {
  try {
    const tasks = await db.task.findMany({
      /* ... */
    })
    return NextResponse.json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
  }
}
```

## 🎨 Spooky Theme Elements

### Colors

- **Purple** (#9d5bd2) - Primary actions, Summoned status
- **Orange** (#f97316) - In Ritual status, High priority
- **Green** (#16a34a) - Banished status, success
- **Red** (#ef4444) - Critical priority, delete actions

### Emojis

- 👻 - Summoned tasks, empty states
- 🔮 - In Ritual tasks
- ✨ - Banished (completed) tasks
- 💀 - Delete actions

### Effects

- Purple glow on hover: `hover:shadow-[0_0_15px_rgba(157,91,210,0.3)]`
- Smooth transitions: `transition-all duration-300`
- Subtle scale on hover: `hover:scale-[1.02]`

## 🔮 Future Enhancements

- [ ] Drag-and-drop between columns
- [ ] Task tags with filtering
- [ ] Task assignment to users
- [ ] Due dates with reminders
- [ ] Task search
- [ ] Bulk operations
- [ ] Activity timeline
- [ ] Task comments
- [ ] File attachments
- [ ] Keyboard shortcuts

## 📝 Notes

- All data is scoped to `organizationId` for multi-tenancy
- Session stored in localStorage (replace with cookies for production)
- SQLite for development (switch to Postgres for production)
- No real-time updates (add WebSockets if needed)
- Mock auth (replace with NextAuth.js for production)

---

The app is fully functional and ready for demo! 🎃👻
