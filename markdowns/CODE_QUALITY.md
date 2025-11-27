# Code Quality Guide

## Installation

This project uses **pnpm** for workspace management. First, install dependencies:

```bash
pnpm install
```

If you don't have pnpm installed:

```bash
npm install -g pnpm
```

## Quick Commands

### Format Everything

```bash
pnpm run format
```

### Check Formatting (without fixing)

```bash
pnpm run format:check
```

### Lint and Auto-fix

```bash
pnpm run lint:fix
```

### Lint Check Only

```bash
pnpm run lint
```

### Type Check

```bash
pnpm run typecheck
```

### Run All Quality Checks

```bash
pnpm run format && pnpm run lint && pnpm run typecheck && pnpm test
```

## What Gets Checked

### Included Directories

- ✅ `/skeleton-core/` - All shared components, hooks, and utilities
- ✅ `/apps/haunted-tasks/` - Task management app
- ✅ `/apps/coven-crm/` - CRM app
- ✅ `/.kiro/` - Specs, steering docs, and hooks (JSON files)

### Excluded Files

- ❌ `node_modules/`
- ❌ `.next/`, `build/`, `dist/`, `out/`
- ❌ Generated TypeScript declaration files (`*.d.ts`)
- ❌ Config files (`*.config.js`, `*.config.ts`)
- ❌ Prisma migrations
- ❌ Lock files and logs

## Configuration Details

### Prettier Rules

- **No semicolons** - Cleaner look
- **Single quotes** - Consistent string style
- **2-space indentation** - Standard for React/TypeScript
- **100 character line width** - Readable without wrapping
- **Trailing commas (ES5)** - Better git diffs
- **Arrow function parens** - Avoid when possible (`x => x` not `(x) => x`)

### ESLint Rules

- **TypeScript recommended** - Best practices for TS
- **Next.js core web vitals** - Performance and accessibility
- **Prettier integration** - No conflicts between tools
- **Unused variables** - Warns (prefix with `_` to ignore)
- **Console statements** - Warns on `console.log` (allows `warn`/`error`)
- **No `any` type** - Warns to encourage proper typing
- **Prefer const** - Warns when `let` could be `const`

## IDE Setup

### VS Code (Recommended)

Install these extensions:

- **ESLint** (dbaeumer.vscode-eslint)
- **Prettier - Code formatter** (esbenp.prettier-vscode)

Add to your `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### Other IDEs

- Enable Prettier as default formatter
- Enable format on save
- Enable ESLint auto-fix on save

## Common Issues & Solutions

### Unused Variables

If you have an intentionally unused variable (like in callbacks), prefix with underscore:

```typescript
// ❌ Will warn
const handleClick = (event: MouseEvent) => {
  doSomething()
}

// ✅ No warning
const handleClick = (_event: MouseEvent) => {
  doSomething()
}
```

### Console Statements

Use `console.warn` or `console.error` instead of `console.log`:

```typescript
// ❌ Will warn
console.log('Debug info')

// ✅ Allowed
console.warn('Warning message')
console.error('Error occurred')
```

### Import Order

Organize imports in this order:

1. React/Next.js imports
2. Third-party libraries
3. Skeleton-core imports (`@grimoire/skeleton-core`)
4. App-specific absolute imports (`@/...`)
5. Relative imports (`./`, `../`)
6. Type imports (with `type` keyword)

```typescript
// Good import order
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

import { Button } from '@grimoire/skeleton-core/components'
import { useDebounce } from '@grimoire/skeleton-core/hooks'

import { TaskCard } from '@/components/task-card'
import { createTask } from '@/lib/actions'

import { formatDate } from './utils'

import type { Task } from '@/types'
```

## Pre-commit Checklist

Before committing code, run:

```bash
pnpm run format && pnpm run lint:fix && pnpm run typecheck && pnpm test
```

This ensures:

- ✅ Code is properly formatted
- ✅ No linting errors
- ✅ No TypeScript errors
- ✅ All tests pass

## Troubleshooting

### "Parsing error" in ESLint

Make sure you've installed dependencies:

```bash
pnpm install
```

### Prettier and ESLint conflict

We use `eslint-config-prettier` to disable conflicting rules. If you see conflicts, make sure it's listed last in `.eslintrc.json` extends array.

### Files not being formatted

Check if the file is in `.prettierignore` or `.eslintignore`. Config files and generated files are intentionally excluded.

---

🎃 Keep the code spooky but clean! 👻
