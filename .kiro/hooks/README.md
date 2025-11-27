# Agent Hooks

This directory contains Kiro agent hooks for automating workflows in Grimoire Stack.

## 🎃 What are Hooks?

Hooks allow agent executions to trigger automatically when events occur in the IDE:

- **onSave** - When a file is saved
- **onMessage** - When a message is sent to the agent
- **onComplete** - When an agent execution completes
- **onSession** - When a new session is created
- **manual** - When user clicks a button

## 🪝 Active Hooks in Grimoire Stack

### 1. Update Skeleton Documentation

**File**: `update-skeleton-docs.json`

**Trigger**: When files in `skeleton-core/` are saved

**Action**: Sends message to agent to update `SKELETON_OVERVIEW.md` with:

- List of all components, hooks, and utilities
- Apps built on the skeleton
- Recent changes summary

**Purpose**: Keeps documentation in sync with code automatically

---

### 2. Generate App Summary

**File**: `generate-app-summary.json`

**Trigger**: When files in `apps/haunted-tasks/` or `apps/coven-crm/` are saved

**Action**: Sends message to agent to update app-specific `APP_SUMMARY.md` with:

- Brief description
- Main features
- Key pages/routes
- Commands to run

**Purpose**: Maintains up-to-date app documentation

---

### 3. Lint and Format Check

**File**: `lint-and-format.json`

**Trigger**: When TypeScript files are saved

**Action**: Runs `npm run lint` command

**Purpose**: Catches linting errors immediately on save

---

### 4. Prisma Generate on Schema Change

**File**: `prisma-generate.json`

**Trigger**: When `schema.prisma` files are saved

**Action**: Runs `npx prisma generate` in the appropriate directory

**Purpose**: Automatically regenerates Prisma client when schema changes

---

### 5. Check Skeleton Core Imports

**File**: `check-imports.json`

**Trigger**: When app files are saved

**Action**: Sends message to agent to verify imports from `@grimoire/skeleton-core`

**Purpose**: Ensures apps are using the skeleton correctly

## 📋 Hook Configuration Format

Each hook is a JSON file with this structure:

```json
{
  "name": "Hook Name",
  "description": "What this hook does",
  "enabled": true,
  "trigger": {
    "type": "onSave",
    "filePattern": "**/*.ts",
    "excludePattern": "node_modules/**"
  },
  "action": {
    "type": "sendMessage" | "command",
    "message": "Message to send to agent",
    "command": "Command to run",
    "workingDirectory": "."
  },
  "metadata": {
    "category": "documentation" | "quality" | "database",
    "priority": "low" | "medium" | "high",
    "createdFor": "kiroween-hackathon"
  }
}
```

## 🎯 How to Use Hooks

### View Active Hooks

1. Open Kiro Explorer panel
2. Navigate to "Agent Hooks" section
3. See all configured hooks

### Enable/Disable Hooks

Edit the JSON file and set `"enabled": true` or `"enabled": false`

### Create New Hooks

1. Open command palette (Ctrl/Cmd + Shift + P)
2. Search for "Open Kiro Hook UI"
3. Configure trigger and action
4. Save to `.kiro/hooks/`

Or manually create a JSON file following the format above.

### Test Hooks

1. Make a change to a file that matches the hook's pattern
2. Save the file
3. Watch for the hook to trigger (check Kiro output panel)

## 🎬 Demo for Judges

### Demo 1: Documentation Auto-Update

1. Open `skeleton-core/components/ui/button.tsx`
2. Add a comment or small change
3. Save the file
4. Watch as the agent updates `SKELETON_OVERVIEW.md` automatically

### Demo 2: Prisma Client Regeneration

1. Open any `prisma/schema.prisma` file
2. Add a comment or modify a model
3. Save the file
4. Watch as `npx prisma generate` runs automatically

### Demo 3: Import Validation

1. Open any file in `apps/haunted-tasks/`
2. Save the file
3. Agent checks if imports from skeleton-core are correct

## 🔧 Customization

### Add Your Own Hook

Example: Run tests on save

```json
{
  "name": "Run Tests on Save",
  "description": "Runs tests when test files change",
  "enabled": true,
  "trigger": {
    "type": "onSave",
    "filePattern": "**/*.test.{ts,tsx}"
  },
  "action": {
    "type": "command",
    "command": "npm test",
    "workingDirectory": "."
  },
  "metadata": {
    "category": "quality",
    "priority": "high"
  }
}
```

### Hook Ideas

- **Format on save** - Run Prettier automatically
- **Type check** - Run TypeScript compiler
- **Update dependencies** - Check for outdated packages
- **Generate component** - Scaffold new components
- **Spell check** - Check markdown files for typos
- **Bundle size check** - Warn if bundle gets too large

## 📊 Hook Categories

| Category          | Purpose             | Examples                                   |
| ----------------- | ------------------- | ------------------------------------------ |
| **documentation** | Keep docs in sync   | update-skeleton-docs, generate-app-summary |
| **quality**       | Code quality checks | lint-and-format, check-imports             |
| **database**      | Database operations | prisma-generate                            |
| **testing**       | Run tests           | run-tests, update-snapshots                |
| **deployment**    | Build and deploy    | build-check, deploy-preview                |

## 🎃 Kiroween Special

These hooks showcase how Kiro can:

- **Automate repetitive tasks** - No manual doc updates
- **Catch errors early** - Lint on every save
- **Keep code consistent** - Verify import patterns
- **Save developer time** - Focus on features, not maintenance

## 📚 Resources

- **Kiro Documentation**: [Agent Hooks Guide](https://kiro.dev/docs/hooks)
- **Hook Examples**: See JSON files in this directory
- **Steering Docs**: `.kiro/steering/` for project conventions

---

**Note**: Hooks are part of Kiro's automation system. They run in the background to keep your codebase healthy and documented.

🎃 Built for Kiroween Hackathon 👻
