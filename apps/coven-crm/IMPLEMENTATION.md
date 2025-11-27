# Coven CRM - Implementation Guide

## 🔮 Overview

Coven CRM is a customer relationship management app built on Grimoire Stack's skeleton-core. It demonstrates how the same foundation can be used for a completely different use case than Haunted Tasks.

## 🆚 Coven CRM vs Haunted Tasks

### Similarities (Shared Infrastructure)

Both apps use **identical** skeleton-core components:

| Feature           | Haunted Tasks                   | Coven CRM                       |
| ----------------- | ------------------------------- | ------------------------------- |
| **Layout**        | AppLayout with sidebar + navbar | AppLayout with sidebar + navbar |
| **Auth**          | Mock login with session         | Mock login with session         |
| **UI Components** | Button, Card, Input, Modal      | Button, Card, Input, Modal      |
| **Utilities**     | cn(), formatDate(), etc.        | cn(), formatDate(), etc.        |
| **Database**      | Prisma + SQLite                 | Prisma + SQLite                 |
| **Theme**         | Dark purple spooky              | Dark purple spooky              |
| **API Pattern**   | REST with Next.js routes        | REST with Next.js routes        |

### Differences (Domain-Specific)

| Aspect               | Haunted Tasks                   | Coven CRM                                    |
| -------------------- | ------------------------------- | -------------------------------------------- |
| **Domain**           | Task Management                 | Customer Relationship Management             |
| **Main Entity**      | Task                            | Contact                                      |
| **Workflow**         | Summoned → In Ritual → Banished | Familiar → Enchanting → Bewitched → Vanished |
| **Key Feature**      | Task board with 3 columns       | Contact list + Pipeline view                 |
| **Secondary Entity** | Tag                             | Company + Interaction                        |
| **Main View**        | Kanban-style board              | Grid of contact cards                        |
| **Detail View**      | Task modal (edit in place)      | Full contact detail page                     |
| **Emojis**           | 👻 🔮 ✨                        | 🔮 ✨ 💫 👻                                  |
| **Actions**          | Create, Edit, Delete, Move      | Create, Edit, Delete, Add Interactions       |

## 🏗️ Architecture

### Data Model

```prisma
Contact (main entity)
  ├── Company (optional relationship)
  └── Interactions[] (activity log)

Company
  └── Contacts[] (one-to-many)

Interaction
  └── Contact (belongs to)
```

### File Structure

```
apps/coven-crm/
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx           # Auth wrapper
│   │   ├── contacts/
│   │   │   ├── page.tsx         # Contact list (main)
│   │   │   └── [id]/
│   │   │       └── page.tsx     # Contact detail
│   │   └── pipeline/
│   │       └── page.tsx         # Pipeline view
│   ├── api/
│   │   ├── contacts/
│   │   │   ├── route.ts         # List, Create
│   │   │   └── [id]/route.ts   # Get, Update, Delete
│   │   └── interactions/
│   │       └── route.ts         # Create interaction
│   ├── login/page.tsx
│   ├── page.tsx                 # Landing
│   └── globals.css
├── components/
│   ├── contact-card.tsx         # Contact display
│   └── contact-modal.tsx        # Create/edit modal
├── lib/
│   ├── db.ts
│   └── types.ts
└── prisma/
    ├── schema.prisma
    └── seed.ts
```

## 🔌 How It Uses Skeleton Core

### 1. Same Layout Pattern

```typescript
// apps/coven-crm/app/(auth)/layout.tsx
import { AppLayout } from '@grimoire/skeleton-core/components'

const links = [
  { href: '/contacts', label: 'Contacts' },
  { href: '/companies', label: 'Companies' },
  { href: '/pipeline', label: 'Pipeline' },
]

export default function AuthLayout({ children }) {
  return (
    <AppLayout
      appName="🔮 Coven CRM"  // Different name
      links={links}            // Different routes
      user={session?.user}
      onLogout={handleLogout}
    >
      {children}
    </AppLayout>
  )
}
```

### 2. Same UI Components

```typescript
// Identical imports as Haunted Tasks
import {
  Button,
  Card,
  Input,
  Modal
} from '@grimoire/skeleton-core/components'

// Used the same way
<Card>
  <CardHeader>
    <CardTitle>Contact Information</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### 3. Same Utilities

```typescript
import { cn, formatRelativeTime } from '@grimoire/skeleton-core/lib'

// Format dates
<p>{formatRelativeTime(contact.updatedAt)}</p>

// Merge classes
<div className={cn('base', isActive && 'active')} />
```

## 📊 Database Schema

### Contact Model

```prisma
model Contact {
  id             String    @id @default(cuid())
  name           String
  email          String
  phone          String?
  stage          Stage      @default(FAMILIAR)
  notes          String?
  companyId      String?
  organizationId String
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
  convertedAt    DateTime?

  company      Company?      @relation(...)
  interactions Interaction[]
}

enum Stage {
  FAMILIAR      // 🔮 New contacts
  ENCHANTING    // ✨ Being engaged
  BEWITCHED     // 💫 Converted
  VANISHED      // 👻 Lost/inactive
}
```

### Company Model

```prisma
model Company {
  id             String   @id @default(cuid())
  name           String
  website        String?
  industry       String?
  notes          String?
  organizationId String

  contacts Contact[]
}
```

### Interaction Model

```prisma
model Interaction {
  id          String          @id @default(cuid())
  type        InteractionType
  description String
  contactId   String
  userId      String
  createdAt   DateTime        @default(now())

  contact Contact @relation(...)
}

enum InteractionType {
  EMAIL
  CALL
  MEETING
  NOTE
}
```

## 🔄 API Routes

### GET /api/contacts

List contacts with optional filtering.

```typescript
GET /api/contacts?organizationId=org_1&stage=FAMILIAR&search=john

Response: ContactWithRelations[]
```

### POST /api/contacts

Create a new contact.

```typescript
POST /api/contacts
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 555-1234",
  "stage": "FAMILIAR",
  "organizationId": "org_1"
}
```

### GET /api/contacts/[id]

Get contact with company and interactions.

```typescript
GET /api/contacts/contact_1

Response: {
  id, name, email, phone, stage, notes,
  company: { id, name, ... },
  interactions: [...]
}
```

### PATCH /api/contacts/[id]

Update contact.

```typescript
PATCH /api/contacts/contact_1
{
  "stage": "BEWITCHED",
  "notes": "Converted!"
}
```

### POST /api/interactions

Add interaction to contact.

```typescript
POST /api/interactions
{
  "type": "CALL",
  "description": "Discovery call",
  "contactId": "contact_1",
  "userId": "user_1"
}
```

## 🎨 UI Features

### Contact List Page

- **Search bar** - Filter by name or email
- **Stats cards** - Count by stage
- **Contact grid** - Cards showing name, email, company, stage
- **Click to view** - Navigate to detail page

### Contact Detail Page

- **Full information** - All contact fields
- **Company info** - If associated
- **Quick stats** - Interaction count, last updated
- **Add interaction** - Quick form at top
- **Interaction history** - Timeline of all interactions
- **Edit button** - Opens modal

### Pipeline Page

- **4-column layout** - One per stage
- **Stage stats** - Count in each stage
- **Contact cards** - Same as list view
- **Click to view** - Navigate to detail

## 🚀 Running the App

### Setup

```bash
cd apps/coven-crm

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

1. Visit http://localhost:3001
2. Login with `demo@grimoire.dev`
3. See 6 demo contacts across 4 stages
4. Click any contact to view details
5. Add interactions to contacts
6. View pipeline for stage overview

## 🎯 Key Patterns

### 1. Search with Debouncing

```typescript
const [searchQuery, setSearchQuery] = useState('')
const debouncedSearch = useDebounce(searchQuery, 300)

useEffect(() => {
  fetchContacts() // Only called after 300ms of no typing
}, [debouncedSearch])
```

### 2. Nested Routes

```typescript
// Contact list
/contacts → page.tsx

// Contact detail
/contacts/[id] → [id]/page.tsx
```

### 3. Related Data Loading

```typescript
// Load contact with relations
const contact = await db.contact.findUnique({
  where: { id },
  include: {
    company: true,
    interactions: {
      orderBy: { createdAt: 'desc' },
    },
  },
})
```

### 4. Activity Logging

```typescript
// Create interaction
await db.interaction.create({ data: {...} })

// Update parent timestamp
await db.contact.update({
  where: { id: contactId },
  data: { updatedAt: new Date() },
})
```

## 📝 Demo Data

### 6 Contacts

1. **Morgana Le Fay** (Familiar) - Mystic Enterprises
2. **Merlin Ambrosius** (Enchanting) - Enchanted Solutions
3. **Circe of Aeaea** (Enchanting) - Spellbound Inc
4. **Gandalf the Grey** (Bewitched) - Mystic Enterprises
5. **Hermione Granger** (Bewitched) - Enchanted Solutions
6. **Voldemort** (Vanished) - No company

### 3 Companies

- Mystic Enterprises
- Enchanted Solutions
- Spellbound Inc

### 6 Interactions

- Emails, calls, meetings, notes across contacts

## 🎨 Spooky Theme (Same as Haunted Tasks)

- **Colors**: Purple, Orange, Green, Red
- **Emojis**: 🔮 ✨ 💫 👻 📧 📞 🤝 📝
- **Effects**: Purple glow on hover, smooth transitions

## 🔮 What Makes It Different

### From Haunted Tasks:

1. **Different domain** - CRM vs task management
2. **Different workflow** - 4 stages vs 3
3. **Relationships** - Contacts → Company, Contacts → Interactions
4. **Detail pages** - Full page vs modal
5. **Activity logging** - Interaction history
6. **Search** - Text search with debouncing

### But Same Foundation:

- ✅ All skeleton-core components
- ✅ Same auth system
- ✅ Same layout pattern
- ✅ Same API patterns
- ✅ Same styling approach
- ✅ Same database strategy

## 🎯 Key Takeaway

**Coven CRM proves that skeleton-core is truly reusable.** Two completely different apps (task management vs CRM) share 100% of their UI components, auth, layout, and utilities. Only the domain logic and data models differ.

This is the power of the skeleton pattern! 🎃

---

Ready to build your own app on Grimoire Stack? 🔮✨
