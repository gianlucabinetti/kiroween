# 🎃 Grimoire Stack - Final Installation Guide

## ✅ Package Configuration Summary

### All package.json Files Fixed

#### **Root** (`package.json`)
- **Version:** `0.1.0` ✅
- **Workspaces:** `["skeleton-core", "apps/*"]` ✅
- **Dev Scripts:**
  ```json
  {
    "dev": "concurrently \"npm run dev:tasks\" \"npm run dev:crm\"",
    "dev:tasks": "cd apps/haunted-tasks && npm run dev",
    "dev:crm": "cd apps/coven-crm && npm run dev"
  }
  ```

#### **Haunted Tasks** (`apps/haunted-tasks/package.json`)
- **Version:** `0.1.0` ✅
- **Dev Script:** `"dev": "next dev"` ✅
- **Dependencies:**
  - `next`: `^14.0.4` ✅
  - `react`: `^18.2.0` ✅
  - `react-dom`: `^18.2.0` ✅
  - `@grimoire/skeleton-core`: `workspace:*` ✅

#### **Coven CRM** (`apps/coven-crm/package.json`)
- **Version:** `0.1.0` ✅
- **Dev Script:** `"dev": "next dev -p 3001"` ✅
- **Dependencies:**
  - `next`: `^14.0.4` ✅
  - `react`: `^18.2.0` ✅
  - `react-dom`: `^18.2.0` ✅
  - `@grimoire/skeleton-core`: `workspace:*` ✅

#### **Skeleton Core** (`skeleton-core/package.json`)
- **Version:** `0.1.0` ✅
- **Dependencies:**
  - `next`: `14.0.4` ✅
  - `react`: `^18.2.0` ✅
  - `react-dom`: `^18.2.0` ✅
  - Plus utilities (clsx, tailwind-merge, zod)

---

## 🚀 Installation Commands

### **Option 1: Using npm (Recommended for Standard npm)**

```bash
# 1. Install root dependencies
npm install

# 2. Install each app's dependencies
cd apps/haunted-tasks
npm install
cd ../..

cd apps/coven-crm
npm install
cd ../..
```

### **Option 2: Using pnpm (If you have it installed)**

```bash
# Single command installs everything
pnpm install
```

---

## 🏃 Running the Apps

From the project root:

```bash
npm run dev
```

This will:
- Start **Haunted Tasks** on http://localhost:3000
- Start **Coven CRM** on http://localhost:3001

---

## 🔐 Login

- **Email:** `demo@grimoire.dev`
- **Password:** Not required - just enter the email

---

## 🔧 Troubleshooting

### "Cannot find module 'next/dist/bin/next'"

This means Next.js wasn't installed in the app directories. Fix:

```bash
# Clean everything
rm -rf node_modules
rm -rf apps/haunted-tasks/node_modules
rm -rf apps/coven-crm/node_modules
rm -rf skeleton-core/node_modules

# Reinstall
npm install
cd apps/haunted-tasks && npm install && cd ../..
cd apps/coven-crm && npm install && cd ../..
```

### "Invalid Version" in apps/ folder

There is NO `apps/package.json` file. If you see this error:
- Make sure you're not running `npm install` inside the `apps/` directory
- Only run `npm install` in:
  - Project root
  - `apps/haunted-tasks`
  - `apps/coven-crm`

### Workspace Protocol Issues

If you see errors about `workspace:*`:
- You need pnpm: `npm install -g pnpm`
- Then use `pnpm install` instead of `npm install`

**OR** manually install each directory:
```bash
npm install
cd skeleton-core && npm install && cd ..
cd apps/haunted-tasks && npm install && cd ../..
cd apps/coven-crm && npm install && cd ../..
```

---

## 📋 Complete Installation Checklist

```bash
# Step 1: Clean slate (if needed)
rm -rf node_modules apps/*/node_modules skeleton-core/node_modules

# Step 2: Install root
npm install

# Step 3: Install Haunted Tasks
cd apps/haunted-tasks
npm install
cd ../..

# Step 4: Install Coven CRM
cd apps/coven-crm
npm install
cd ../..

# Step 5: Verify installations
ls apps/haunted-tasks/node_modules/next
ls apps/coven-crm/node_modules/next

# Step 6: Start apps
npm run dev

# Step 7: Test
# Open http://localhost:3000 and http://localhost:3001
# Login with demo@grimoire.dev
```

---

## ✅ Verification

After installation, you should have:

```
grimoire-stack/
├── node_modules/              ✅ Root dependencies
├── skeleton-core/
│   └── node_modules/          ✅ Skeleton dependencies
├── apps/
│   ├── haunted-tasks/
│   │   └── node_modules/      ✅ Next.js, React, etc.
│   │       └── next/          ✅ MUST exist
│   └── coven-crm/
│       └── node_modules/      ✅ Next.js, React, etc.
│           └── next/          ✅ MUST exist
```

---

## 🎯 Quick Test

```bash
# 1. Install
npm install
cd apps/haunted-tasks && npm install && cd ../..
cd apps/coven-crm && npm install && cd ../..

# 2. Verify Next.js is installed
ls apps/haunted-tasks/node_modules/.bin/next
ls apps/coven-crm/node_modules/.bin/next

# 3. Start
npm run dev

# 4. Open browsers
# - http://localhost:3000 (Haunted Tasks)
# - http://localhost:3001 (Coven CRM)

# 5. Login
# - Email: demo@grimoire.dev
```

---

## 📦 Why This Setup?

- **npm workspaces** are configured but may not install app dependencies automatically
- **workspace:*** protocol requires pnpm
- **Manual installation** in each app directory ensures Next.js is present
- **This is normal** for monorepo setups - each app needs its own node_modules

---

## 🎃 Ready to Demo!

Once you see both apps running without errors, you're ready to demo:

1. ✅ Haunted Tasks on port 3000
2. ✅ Coven CRM on port 3001
3. ✅ Login works with `demo@grimoire.dev`
4. ✅ All CRUD operations work
5. ✅ Mock data is loaded

**Good luck with your hackathon! 👻**
