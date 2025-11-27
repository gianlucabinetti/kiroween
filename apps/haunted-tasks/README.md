# 👻 Haunted Tasks

A spooky team task management dashboard built on Grimoire Stack.

## Features

- **Task Board** - Kanban-style board with three columns: Summoned, In Ritual, Banished
- **Task Management** - Create, update, and delete tasks with rich details
- **Assignment** - Assign tasks to team members
- **Priority Levels** - Mark tasks as Low, Medium, High, or Critical
- **Tags** - Categorize tasks with custom labels
- **Filtering** - Filter by status, assignee, priority, or tags
- **Spooky Theme** - Dark purple aesthetic with ghost emoji and subtle animations

## Getting Started

From the root directory:

```bash
# Install dependencies
npm install

# Set up database
cd apps/haunted-tasks
npx prisma generate
npx prisma db push

# Run development server
npm run dev
```

Visit http://localhost:3000

## Tech Stack

- Next.js 14 (App Router)
- React 18 with TypeScript
- Tailwind CSS
- Prisma ORM with SQLite
- Grimoire Skeleton Core

## Project Structure

```
haunted-tasks/
├── app/
│   ├── (auth)/        # Protected routes
│   │   ├── dashboard/
│   │   └── tasks/
│   ├── api/           # API routes
│   ├── layout.tsx     # Root layout
│   └── page.tsx       # Landing page
├── components/        # App-specific components
├── prisma/
│   └── schema.prisma  # Database schema
└── public/            # Static assets
```

## Database Schema

Extends skeleton-core with:

- **Task** - Title, description, status, priority, assignee
- **Tag** - Labels for categorizing tasks
- **TaskTag** - Many-to-many relationship

## Development

### Adding a New Feature

1. Check `.kiro/specs/haunted-tasks/requirements.md` for requirements
2. Implement the feature following the steering docs
3. Test locally
4. Update this README if needed

### Running Tests

```bash
npm run test
```

### Database Commands

```bash
# Generate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push

# Open Prisma Studio
npx prisma studio
```

## Deployment

This app can be deployed to Vercel, Netlify, or any platform supporting Next.js.

Remember to:

- Set environment variables
- Switch to PostgreSQL for production
- Run migrations

---

For more details, see `.kiro/specs/haunted-tasks/requirements.md`
