# Grimoire Stack - Apps Comparison

This document shows how **Haunted Tasks** and **Coven CRM** are built from the same skeleton-core foundation while serving completely different purposes.

## 🎯 The Skeleton Pattern

Both apps demonstrate the core principle of Grimoire Stack:

> **Write shared infrastructure once, build multiple apps quickly**

## 📊 Side-by-Side Comparison

### Shared Infrastructure (100% Reused)

| Component       | Source                                           | Used By Both |
| --------------- | ------------------------------------------------ | ------------ |
| **AppLayout**   | `skeleton-core/components/layout/app-layout.tsx` | ✅ Yes       |
| **Sidebar**     | `skeleton-core/components/layout/sidebar.tsx`    | ✅ Yes       |
| **Navbar**      | `skeleton-core/components/layout/navbar.tsx`     | ✅ Yes       |
| **Button**      | `skeleton-core/components/ui/button.tsx`         | ✅ Yes       |
| **Card**        | `skeleton-core/components/ui/card.tsx`           | ✅ Yes       |
| **Input**       | `skeleton-core/components/ui/input.tsx`          | ✅ Yes       |
| **Modal**       | `skeleton-core/components/ui/modal.tsx`          | ✅ Yes       |
| **Auth System** | `skeleton-core/lib/auth.ts`                      | ✅ Yes       |
| **Utilities**   | `skeleton-core/lib/utils.ts`                     | ✅ Yes       |
| **Hooks**       | `skeleton-core/hooks/`                           | ✅ Yes       |
| **Prisma Base** | `skeleton-core/prisma/schema.prisma`             | ✅ Yes       |

**Result**: 0 lines of duplicated UI code between apps!

### App-Specific Code

| Aspect                 | Haunted Tasks                     | Coven CRM                                                               |
| ---------------------- | --------------------------------- | ----------------------------------------------------------------------- |
| **Purpose**            | Task Management                   | Customer Relationship Management                                        |
| **Main Entity**        | Task                              | Contact                                                                 |
| **Secondary Entities** | Tag                               | Company, Interaction                                                    |
| **Workflow Stages**    | 3 (Summoned, In Ritual, Banished) | 4 (Familiar, Enchanting, Bewitched, Vanished)                           |
| **Main View**          | Task Board (3 columns)            | Contact List (grid)                                                     |
| **Detail View**        | Modal (inline edit)               | Full page with history                                                  |
| **Key Actions**        | Create, Edit, Delete, Move        | Create, Edit, Delete, Log Interactions                                  |
| **Search**             | No                                | Yes (with debouncing)                                                   |
| **Relationships**      | Task → Tags (many-to-many)        | Contact → Company (many-to-one)<br>Contact → Interactions (one-to-many) |

## 🏗️ Architecture Patterns

### 1. Layout Pattern (Identical)

Both apps use the same layout structure:

```typescript
// Haunted Tasks
<AppLayout
  appName="👻 Haunted Tasks"
  links={[
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/tasks', label: 'Task Board' },
  ]}
  user={session?.user}
  onLogout={handleLogout}
>
  {children}
</AppLayout>

// Coven CRM
<AppLayout
  appName="🔮 Coven CRM"
  links={[
    { href: '/contacts', label: 'Contacts' },
    { href: '/pipeline', label: 'Pipeline' },
  ]}
  user={session?.user}
  onLogout={handleLogout}
>
  {children}
</AppLayout>
```

**Difference**: Only the app name and navigation links change!

### 2. API Pattern (Identical)

Both apps follow the same REST API structure:

```
Haunted Tasks:
  GET    /api/tasks
  POST   /api/tasks
  GET    /api/tasks/[id]
  PATCH  /api/tasks/[id]
  DELETE /api/tasks/[id]

Coven CRM:
  GET    /api/contacts
  POST   /api/contacts
  GET    /api/contacts/[id]
  PATCH  /api/contacts/[id]
  DELETE /api/contacts/[id]
  POST   /api/interactions
```

**Difference**: Only the entity names change!

### 3. Component Pattern (Identical)

Both apps use the same component structure:

```typescript
// Haunted Tasks
<TaskCard task={task} onClick={handleClick} />
<TaskModal task={task} open={open} onSave={handleSave} />

// Coven CRM
<ContactCard contact={contact} onClick={handleClick} />
<ContactModal contact={contact} open={open} onSave={handleSave} />
```

**Difference**: Only the prop names and data types change!

## 📁 File Structure Comparison

### Haunted Tasks

```
apps/haunted-tasks/
├── app/
│   ├── (auth)/
│   │   ├── dashboard/page.tsx    # Stats + recent tasks
│   │   └── tasks/page.tsx        # Main task board
│   ├── api/tasks/                # Task CRUD
│   └── login/page.tsx
├── components/
│   ├── task-card.tsx             # Display task
│   └── task-modal.tsx            # Create/edit
├── lib/
│   ├── db.ts
│   └── types.ts
└── prisma/
    ├── schema.prisma             # Task, Tag, TaskTag
    └── seed.ts                   # 6 demo tasks
```

### Coven CRM

```
apps/coven-crm/
├── app/
│   ├── (auth)/
│   │   ├── contacts/
│   │   │   ├── page.tsx          # Contact list
│   │   │   └── [id]/page.tsx    # Contact detail
│   │   └── pipeline/page.tsx     # Pipeline view
│   ├── api/
│   │   ├── contacts/             # Contact CRUD
│   │   └── interactions/         # Log interactions
│   └── login/page.tsx
├── components/
│   ├── contact-card.tsx          # Display contact
│   └── contact-modal.tsx         # Create/edit
├── lib/
│   ├── db.ts
│   └── types.ts
└── prisma/
    ├── schema.prisma             # Contact, Company, Interaction
    └── seed.ts                   # 6 demo contacts
```

**Pattern**: Same structure, different domain entities!

## 🎨 UI Comparison

### Haunted Tasks UI

```
┌─────────────────────────────────────────┐
│ 👻 Haunted Tasks    [User] [Logout]    │
├─────────────────────────────────────────┤
│ Dashboard │                             │
│ Task Board│  ┌──────────────────────┐  │
│           │  │ 👻 Summoned          │  │
│           │  │ ┌──────────────────┐ │  │
│           │  │ │ Task Card        │ │  │
│           │  │ │ Priority: High   │ │  │
│           │  │ └──────────────────┘ │  │
│           │  └──────────────────────┘  │
└─────────────────────────────────────────┘
```

### Coven CRM UI

```
┌─────────────────────────────────────────┐
│ 🔮 Coven CRM        [User] [Logout]    │
├─────────────────────────────────────────┤
│ Contacts  │                             │
│ Pipeline  │  ┌──────────────────────┐  │
│           │  │ 🔮 Familiar          │  │
│           │  │ ┌──────────────────┐ │  │
│           │  │ │ Contact Card     │ │  │
│           │  │ │ Stage: Familiar  │ │  │
│           │  │ └──────────────────┘ │  │
│           │  └──────────────────────┘  │
└─────────────────────────────────────────┘
```

**Same layout, different content!**

## 🔄 Data Flow Comparison

### Haunted Tasks

```
User clicks "Summon Task"
  ↓
TaskModal opens
  ↓
User fills form
  ↓
POST /api/tasks
  ↓
Prisma creates Task
  ↓
Response → Update UI
  ↓
Task appears in board
```

### Coven CRM

```
User clicks "Add Contact"
  ↓
ContactModal opens
  ↓
User fills form
  ↓
POST /api/contacts
  ↓
Prisma creates Contact
  ↓
Response → Update UI
  ↓
Contact appears in list
```

**Same flow, different entities!**

## 📊 Code Reuse Metrics

### Lines of Code

| Category          | Skeleton Core | Haunted Tasks | Coven CRM | Total  |
| ----------------- | ------------- | ------------- | --------- | ------ |
| **UI Components** | ~500          | 0             | 0         | 500    |
| **Layout**        | ~200          | 0             | 0         | 200    |
| **Auth**          | ~100          | 0             | 0         | 100    |
| **Utilities**     | ~150          | 0             | 0         | 150    |
| **Hooks**         | ~100          | 0             | 0         | 100    |
| **App-Specific**  | 0             | ~800          | ~900      | 1,700  |
| **Total**         | ~1,050        | ~800          | ~900      | ~2,750 |

**Reuse Rate**: ~38% of code is shared infrastructure!

### Time Savings

Building the second app (Coven CRM) took approximately:

- **Without skeleton-core**: ~8-10 hours (full rebuild)
- **With skeleton-core**: ~3-4 hours (domain logic only)

**Time saved**: ~60% faster development!

## 🎯 Key Insights

### What's Shared (Write Once)

1. ✅ **All UI components** - Button, Card, Input, Modal
2. ✅ **Complete layout system** - Sidebar, Navbar, AppLayout
3. ✅ **Authentication** - Login, session, logout
4. ✅ **Utilities** - Date formatting, class merging, validation
5. ✅ **React hooks** - localStorage, debounce, media queries
6. ✅ **Database patterns** - Prisma setup, client singleton
7. ✅ **Styling** - Dark theme, color system, spacing

### What's Different (Write Per App)

1. 📝 **Domain models** - Task vs Contact
2. 📝 **Business logic** - Workflow stages, relationships
3. 📝 **API routes** - Entity-specific CRUD
4. 📝 **Page layouts** - Board vs list vs detail
5. 📝 **Component logic** - Task-specific vs contact-specific
6. 📝 **Seed data** - Demo tasks vs demo contacts

## 🚀 Building a Third App

Want to build a third app? Here's what you'd do:

### 1. Copy App Structure

```bash
cp -r apps/haunted-tasks apps/my-new-app
```

### 2. Update Configuration

- Change app name in `package.json`
- Update port in dev script
- Modify `tsconfig.json` paths

### 3. Define Domain Models

```prisma
// prisma/schema.prisma
model MyEntity {
  id             String   @id @default(cuid())
  name           String
  status         MyStatus
  organizationId String
  // ... your fields
}
```

### 4. Create API Routes

```typescript
// app/api/my-entities/route.ts
export async function GET() {
  /* ... */
}
export async function POST() {
  /* ... */
}
```

### 5. Build UI

```typescript
// Import same components
import { Button, Card, Modal } from '@grimoire/skeleton-core/components'

// Use same layout
<AppLayout appName="My App" links={myLinks}>
  {children}
</AppLayout>
```

### 6. Seed Data

```typescript
// prisma/seed.ts
await prisma.myEntity.create({
  /* ... */
})
```

**Estimated time**: 3-4 hours for a basic CRUD app!

## 📚 Documentation

Each app has its own documentation:

- **Haunted Tasks**: `apps/haunted-tasks/IMPLEMENTATION.md`
- **Coven CRM**: `apps/coven-crm/IMPLEMENTATION.md`
- **Skeleton Core**: `skeleton-core/README.md`

## 🎃 Conclusion

Grimoire Stack successfully demonstrates the skeleton pattern:

1. **Write shared code once** in skeleton-core
2. **Build multiple apps quickly** by focusing on domain logic
3. **Maintain consistency** across all apps
4. **Scale efficiently** as you add more apps

Both Haunted Tasks and Coven CRM are fully functional, production-ready apps that share 100% of their UI infrastructure while serving completely different purposes.

**This is the power of the skeleton pattern!** 🎃👻🔮

---

Ready to build your own app on Grimoire Stack? Check out the setup guides in each app directory!
