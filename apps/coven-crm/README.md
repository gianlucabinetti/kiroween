# 🔮 Coven CRM

A mystical customer relationship management app built on Grimoire Stack.

## Features

- **Contact Management** - Track people with names, emails, companies, and notes
- **Company Tracking** - Organize contacts by their organizations
- **Pipeline Stages** - Move contacts through: Familiar, Enchanting, Bewitched, Vanished
- **Interaction History** - Log emails, calls, meetings, and notes
- **Search & Filter** - Find contacts by name, email, company, or stage
- **Pipeline Overview** - Visualize contact distribution across stages
- **Spooky Theme** - Dark purple aesthetic with mystical vibes

## Getting Started

From the root directory:

```bash
# Install dependencies
npm install

# Set up database
cd apps/coven-crm
npx prisma generate
npx prisma db push

# Run development server
npm run dev
```

Visit http://localhost:3001

## Tech Stack

- Next.js 14 (App Router)
- React 18 with TypeScript
- Tailwind CSS
- Prisma ORM with SQLite
- Grimoire Skeleton Core

## Project Structure

```
coven-crm/
├── app/
│   ├── (auth)/        # Protected routes
│   │   ├── contacts/
│   │   ├── companies/
│   │   └── pipeline/
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

- **Contact** - Name, email, phone, company, stage, notes
- **Company** - Name, website, industry, notes
- **Interaction** - Type, description, contact, timestamp

## Development

### Adding a New Feature

1. Check `.kiro/specs/coven-crm/requirements.md` for requirements
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

For more details, see `.kiro/specs/coven-crm/requirements.md`
