# 🎃 Grimoire Stack - Installation & Running Guide

## ✅ Fixed Issues

### Package Configuration
- ✅ All `package.json` files have valid SemVer versions (`0.1.0`)
- ✅ Removed duplicate `-p 3001` flag from root dev:crm script
- ✅ Fixed skeleton-core references to use `file:../../skeleton-core`
- ✅ Removed Prisma dependencies (using mock data for demo)
- ✅ Configured npm workspaces properly

### Dev Scripts
- ✅ Root `dev` script uses concurrently to start both apps
- ✅ Haunted Tasks runs on port 3000 (default)
- ✅ Coven CRM runs on port 3001 (configured in its package.json)
- ✅ No workspace flags needed - simple `cd` commands

## 🚀 Installation

### Using npm (Standard)

```bash
# 1. Install root dependencies
npm install

# 2. Install Haunted Tasks dependencies
cd apps/haunted-tasks
npm install
cd ../..

# 3. Install Coven CRM dependencies
cd apps/coven-crm
npm install
cd ../..
```

### Using pnpm (Alternative)

```bash
# Single command installs everything
pnpm install
```

**Note:** npm workspaces are configured, but you may need to install each app's dependencies manually to ensure Next.js is properly installed.

## 🏃 Running the Apps

From the project root:

```bash
npm run dev
```

This will:
- Start **Haunted Tasks** on http://localhost:3000
- Start **Coven CRM** on http://localhost:3001

Both apps run concurrently in the same terminal.

## 🔐 Login

Open either app and login with:
- **Email:** `demo@grimoire.dev`
- **Password:** Not required - just enter the email

## 📦 Package.json Files

### Root (`package.json`)
```json
{
  "name": "grimoire-stack",
  "version": "0.1.0",
  "workspaces": ["skeleton-core", "apps/*"],
  "scripts": {
    "dev": "concurrently \"npm run dev:tasks\" \"npm run dev:crm\"",
    "dev:tasks": "cd apps/haunted-tasks && npm run dev",
    "dev:crm": "cd apps/coven-crm && npm run dev"
  }
}
```

### Haunted Tasks (`apps/haunted-tasks/package.json`)
```json
{
  "name": "haunted-tasks",
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev"
  },
  "dependencies": {
    "@grimoire/skeleton-core": "file:../../skeleton-core",
    "next": "14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

### Coven CRM (`apps/coven-crm/package.json`)
```json
{
  "name": "coven-crm",
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev -p 3001"
  },
  "dependencies": {
    "@grimoire/skeleton-core": "file:../../skeleton-core",
    "next": "14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

### Skeleton Core (`skeleton-core/package.json`)
```json
{
  "name": "@grimoire/skeleton-core",
  "version": "0.1.0",
  "dependencies": {
    "clsx": "^2.0.0",
    "next": "14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwind-merge": "^2.2.0",
    "zod": "^3.22.4"
  }
}
```

## 🔧 Troubleshooting

### "Cannot find module 'next/dist/bin/next'"

This means Next.js wasn't installed properly. Fix:

```bash
# Clean install
rm -rf node_modules apps/*/node_modules skeleton-core/node_modules
npm install
```

### "Invalid Version" Error

All package.json files now have valid versions (`0.1.0`). If you still see this:

```bash
# Check for hidden package.json files
find . -name "package.json" -not -path "*/node_modules/*"
```

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Apps Won't Start

Make sure you're in the project root:

```bash
# Should show grimoire-stack
pwd

# Then run
npm run dev
```

## 📁 Project Structure

```
grimoire-stack/
├── package.json                 # Root with workspaces
├── skeleton-core/
│   ├── package.json            # Shared library
│   ├── components/             # UI components
│   ├── hooks/                  # React hooks
│   ├── lib/                    # Utilities & auth
│   └── types/                  # TypeScript types
├── apps/
│   ├── haunted-tasks/
│   │   ├── package.json        # Task app (port 3000)
│   │   ├── app/                # Next.js app
│   │   └── lib/                # Mock data
│   └── coven-crm/
│       ├── package.json        # CRM app (port 3001)
│       ├── app/                # Next.js app
│       └── lib/                # Mock data
```

## ✅ Verification Checklist

After installation, verify:

- [ ] `npm install` completed without errors
- [ ] `node_modules` exists in root, skeleton-core, and both apps
- [ ] `npm run dev` starts both apps
- [ ] http://localhost:3000 shows Haunted Tasks login
- [ ] http://localhost:3001 shows Coven CRM login
- [ ] Login with `demo@grimoire.dev` works in both apps
- [ ] No console errors in browser dev tools

## 🎯 Quick Test

```bash
# 1. Install
npm install

# 2. Start
npm run dev

# 3. Open browser
# - http://localhost:3000
# - http://localhost:3001

# 4. Login
# - Email: demo@grimoire.dev
# - No password needed

# 5. Test features
# - Create a task in Haunted Tasks
# - Add a contact in Coven CRM
```

---

**Everything should work smoothly no