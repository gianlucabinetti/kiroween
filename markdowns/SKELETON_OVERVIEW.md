# Skeleton Core - Component Overview

> **Auto-generated** by Kiro agent hook - Last updated: Initial creation

## 📦 Available Components

### UI Components (`skeleton-core/components/ui/`)

| Component        | Purpose                              | Props                                     |
| ---------------- | ------------------------------------ | ----------------------------------------- |
| **Button**       | Primary action button with variants  | `variant`, `size`, `className`            |
| **Card**         | Content container with header/footer | `className`                               |
| **CardHeader**   | Card header section                  | `className`                               |
| **CardTitle**    | Card title text                      | `className`                               |
| **CardContent**  | Card main content                    | `className`                               |
| **CardFooter**   | Card footer section                  | `className`                               |
| **Input**        | Form input field                     | `type`, `className`, standard input props |
| **Modal**        | Dialog/modal overlay                 | `open`, `onClose`, `children`             |
| **ModalHeader**  | Modal header section                 | `children`, `className`                   |
| **ModalTitle**   | Modal title text                     | `children`, `className`                   |
| **ModalContent** | Modal main content                   | `children`, `className`                   |
| **ModalFooter**  | Modal footer with actions            | `children`, `className`                   |

### Layout Components (`skeleton-core/components/layout/`)

| Component     | Purpose                                  | Props                                              |
| ------------- | ---------------------------------------- | -------------------------------------------------- |
| **AppLayout** | Complete app shell with sidebar + navbar | `appName`, `links`, `user`, `onLogout`, `children` |
| **Sidebar**   | Fixed left navigation sidebar            | `appName`, `links`, `className`                    |
| **Navbar**    | Top navigation bar                       | `user`, `onLogout`, `className`                    |

## 🪝 Available Hooks (`skeleton-core/hooks/`)

| Hook                | Purpose                       | Returns             |
| ------------------- | ----------------------------- | ------------------- |
| **useLocalStorage** | Persist state to localStorage | `[value, setValue]` |
| **useDebounce**     | Debounce a value with delay   | `debouncedValue`    |
| **useMediaQuery**   | Check if media query matches  | `boolean`           |

## 🛠️ Available Utilities (`skeleton-core/lib/`)

### Core Utilities (`utils.ts`)

- `cn(...classes)` - Merge Tailwind classes with proper precedence
- `formatDate(date)` - Format date to readable string
- `formatRelativeTime(date)` - Format as relative time (e.g., "2 hours ago")
- `getSafeErrorMessage(error)` - Extract safe error message for display
- `generateId()` - Generate unique ID

### Authentication (`auth.ts`)

- `login(email)` - Mock login function
- `logout()` - Mock logout function
- `getSession()` - Get current session from storage
- `saveSession(user)` - Save session to storage
- `clearSession()` - Clear session from storage

### Database (`db.ts`)

- `db` - Prisma client singleton

### Validation (`validations.ts`)

- `emailSchema` - Zod schema for email validation
- `userSchema` - Zod schema for user validation
- `organizationSchema` - Zod schema for organization validation
- `membershipSchema` - Zod schema for membership validation

### Theme (`theme.ts`)

- `getCurrentTheme()` - Get current theme (dark mode)
- `applyTheme(theme)` - Apply theme to document
- `useTheme()` - Hook for theme management (future)
- `darkTheme` - Dark theme configuration
- `lightTheme` - Light theme configuration (future)

## 🗄️ Database Models (`skeleton-core/prisma/schema.prisma`)

### Core Models

- **User** - User accounts with email and name
- **Organization** - Organizations/teams
- **Membership** - User-Organization relationship with roles
- **Activity** - Activity log for tracking events

### Enums

- **Role** - OWNER, ADMIN, MEMBER

## 🎨 Theme System

### Current Theme: Dark Mode

```css
--background: #1a0f1f /* Deep purple-black */ --surface: #251628 /* Slightly lighter */
  --surface-elevated: #2f1d32 /* Cards and modals */ --text-primary: #f5f3f7 /* Off-white */
  --text-secondary: #b8b0bd /* Muted text */ --text-tertiary: #8a7f91 /* Disabled text */
  --accent-purple: #9d5bd2 /* Primary actions */ --accent-orange: #f97316 /* Warnings, highlights */
  --accent-green: #16a34a /* Success states */ --accent-red: #ef4444 /* Errors, danger */;
```

## 🏗️ Apps Built on Skeleton Core

### 1. Haunted Tasks (Port 3000)

**Purpose**: Task management with spooky workflow

**Features**:

- Task CRUD operations
- 3-stage workflow (Summoned → In Ritual → Banished)
- Priority levels (Low, Medium, High, Critical)
- Task board with columns
- Dashboard with stats

**Extends skeleton-core with**:

- Task, Tag, TaskTag models
- Task-specific API routes
- TaskCard, TaskModal components

### 2. Coven CRM (Port 3001)

**Purpose**: Customer relationship management

**Features**:

- Contact CRUD operations
- 4-stage pipeline (Familiar → Enchanting → Bewitched → Vanished)
- Company associations
- Interaction logging
- Contact list and detail pages
- Pipeline overview

**Extends skeleton-core with**:

- Contact, Company, Interaction models
- Contact-specific API routes
- ContactCard, ContactModal components

## 📊 Code Reuse Metrics

- **Shared Components**: 12 UI components + 3 layout components
- **Shared Hooks**: 3 React hooks
- **Shared Utilities**: 10+ utility functions
- **Shared Auth**: Complete authentication system
- **Shared Theme**: Full dark mode theme system

**Result**: ~38% of total codebase is shared infrastructure!

## 🚀 How to Use

### Import Components

```typescript
import { Button, Card, Input, Modal, AppLayout } from '@grimoire/skeleton-core/components'
```

### Import Hooks

```typescript
import { useLocalStorage, useDebounce, useMediaQuery } from '@grimoire/skeleton-core/hooks'
```

### Import Utilities

```typescript
import { cn, formatDate, login, saveSession } from '@grimoire/skeleton-core/lib'
```

### Import Types

```typescript
import type { User, Organization, AuthUser } from '@grimoire/skeleton-core/types'
```

## 🔄 Recent Changes

- ✅ Added theme system with dark/light mode support (structure only)
- ✅ Enhanced UI components with hover effects and animations
- ✅ Added purple glow effects to buttons and cards
- ✅ Improved accessibility with better focus states
- ✅ Added backdrop blur to cards for depth
- ✅ Created comprehensive type exports

## 📚 Documentation

- **Setup Guide**: `SETUP.md`
- **Implementation Summary**: `IMPLEMENTATION_SUMMARY.md`
- **UI Polish Guide**: `UI_POLISH.md`
- **Apps Comparison**: `APPS_COMPARISON.md`
- **Skeleton Core README**: `skeleton-core/README.md`

---

**Note**: This file is automatically updated by the `update-skeleton-docs` Kiro agent hook when files in `skeleton-core/` are modified.

🎃 Built for Kiroween Hackathon 👻
