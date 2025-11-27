# Grimoire Stack - Testing Guide

## 🧪 Test Suite Overview

Grimoire Stack includes a minimal but meaningful test suite using **Vitest** to demonstrate code quality and testing practices.

## 📦 Test Coverage

### Skeleton Core Tests

**Location**: `skeleton-core/`

| File                         | Tests    | Purpose                                  |
| ---------------------------- | -------- | ---------------------------------------- |
| `lib/utils.test.ts`          | 15 tests | Utility functions (cn, formatDate, etc.) |
| `hooks/use-debounce.test.ts` | 4 tests  | Debounce hook behavior                   |

**What's tested**:

- Class name merging with Tailwind precedence
- Date formatting (absolute and relative)
- Error message extraction
- ID generation
- Debounce timing and cancellation

### Haunted Tasks Tests

**Location**: `apps/haunted-tasks/lib/`

| File                 | Tests    | Purpose                           |
| -------------------- | -------- | --------------------------------- |
| `task-utils.test.ts` | 12 tests | Task filtering, sorting, counting |

**What's tested**:

- Filter tasks by status (SUMMONED, IN_RITUAL, BANISHED)
- Filter tasks by priority (LOW, MEDIUM, HIGH, CRITICAL)
- Sort tasks by priority
- Count tasks by status
- Check if tasks are overdue

### Coven CRM Tests

**Location**: `apps/coven-crm/lib/`

| File                    | Tests    | Purpose                               |
| ----------------------- | -------- | ------------------------------------- |
| `contact-utils.test.ts` | 13 tests | Contact filtering, searching, sorting |

**What's tested**:

- Filter contacts by stage (FAMILIAR, ENCHANTING, BEWITCHED, VANISHED)
- Search contacts by name or email
- Count contacts by stage
- Sort contacts by recent activity
- Filter contacts by company

## 🚀 Running Tests

### Run All Tests

```bash
npm test
```

### Watch Mode (Re-run on changes)

```bash
npm run test:watch
```

### Coverage Report

```bash
npm run test:coverage
```

### Run Specific Test File

```bash
npx vitest run skeleton-core/lib/utils.test.ts
```

### Run Tests for Specific App

```bash
# Haunted Tasks
npx vitest run apps/haunted-tasks

# Coven CRM
npx vitest run apps/coven-crm
```

## 📊 Test Structure

### Example: Utility Function Test

```typescript
// skeleton-core/lib/utils.test.ts
describe('cn', () => {
  it('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
  })

  it('merges Tailwind classes with proper precedence', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })
})
```

### Example: Hook Test

```typescript
// skeleton-core/hooks/use-debounce.test.ts
describe('useDebounce', () => {
  it('debounces value changes', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'initial' },
    })

    rerender({ value: 'updated' })
    expect(result.current).toBe('initial') // Still old value

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(result.current).toBe('updated') // Now updated
  })
})
```

### Example: Business Logic Test

```typescript
// apps/haunted-tasks/lib/task-utils.test.ts
describe('sortTasksByPriority', () => {
  it('sorts tasks by priority (Critical first)', () => {
    const result = sortTasksByPriority(mockTasks)
    expect(result[0].priority).toBe('CRITICAL')
    expect(result[1].priority).toBe('HIGH')
    expect(result[2].priority).toBe('MEDIUM')
    expect(result[3].priority).toBe('LOW')
  })
})
```

## 🎯 Testing Philosophy

### What We Test

✅ **Utility functions** - Pure functions with clear inputs/outputs
✅ **Business logic** - Filtering, sorting, counting
✅ **React hooks** - Custom hooks with timing/state
✅ **Data transformations** - Mapping, filtering, aggregating

### What We Don't Test (For Hackathon Scope)

❌ **UI Components** - Would require more setup
❌ **API Routes** - Would need mocking infrastructure
❌ **Database operations** - Would need test database
❌ **Integration tests** - Out of scope for MVP

### Why This Approach?

1. **Fast** - Tests run in milliseconds
2. **Reliable** - No external dependencies
3. **Meaningful** - Tests core business logic
4. **Maintainable** - Simple, focused tests

## 🔧 Test Configuration

### Vitest Config (`vitest.config.ts`)

```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
  },
})
```

### Setup File (`vitest.setup.ts`)

```typescript
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})
```

## 📈 Coverage Goals

For this hackathon project:

- **Utilities**: 80%+ coverage
- **Business Logic**: 70%+ coverage
- **Hooks**: 60%+ coverage

Run `npm run test:coverage` to see current coverage.

## 🎓 Test Examples by Category

### 1. Pure Function Tests

```typescript
it('filters contacts by stage', () => {
  const result = filterContactsByStage(mockContacts, 'FAMILIAR')
  expect(result).toHaveLength(1)
  expect(result[0].stage).toBe('FAMILIAR')
})
```

### 2. Array Manipulation Tests

```typescript
it('does not mutate original array', () => {
  const original = [...mockTasks]
  sortTasksByPriority(mockTasks)
  expect(mockTasks).toEqual(original)
})
```

### 3. Search/Filter Tests

```typescript
it('searches by name (case insensitive)', () => {
  const result = searchContacts(mockContacts, 'morgana')
  expect(result).toHaveLength(1)
  expect(result[0].name).toBe('Morgana Le Fay')
})
```

### 4. Edge Case Tests

```typescript
it('returns empty array when no matches', () => {
  const result = searchContacts(mockContacts, 'nonexistent')
  expect(result).toHaveLength(0)
})
```

### 5. Hook Timing Tests

```typescript
it('cancels previous timeout on rapid changes', () => {
  const { result, rerender } = renderHook(
    ({ value }) => useDebounce(value, 500),
    { initialProps: { value: 'initial' } }
  )

  rerender({ value: 'change1' })
  act(() => vi.advanceTimersByTime(250) })

  rerender({ value: 'change2' })
  act(() => vi.advanceTimersByTime(500) })

  expect(result.current).toBe('change2')
})
```

## 🎬 Demo for Judges

### Quick Demo (30 seconds)

```bash
# Run all tests
npm test

# Show coverage
npm run test:coverage
```

**What to highlight**:

- Tests run fast (< 1 second)
- All tests pass
- Coverage of core functionality
- Clean, readable test code

### Detailed Demo (2 minutes)

```bash
# Run tests in watch mode
npm run test:watch

# Make a change to a utility function
# Watch tests re-run automatically

# Show specific test file
npx vitest run skeleton-core/lib/utils.test.ts --reporter=verbose
```

## 🏆 Why Testing Matters

### For Hackathon Judges

- **Quality Signal** - Shows attention to code quality
- **Maintainability** - Tests document expected behavior
- **Confidence** - Proves core logic works
- **Professional** - Production-ready practices

### For Developers

- **Refactoring Safety** - Change code with confidence
- **Documentation** - Tests show how to use functions
- **Bug Prevention** - Catch issues before production
- **Fast Feedback** - Know immediately if something breaks

## 📝 Adding New Tests

### 1. Create Test File

```bash
# Name it same as source file with .test.ts suffix
touch apps/my-app/lib/my-utils.test.ts
```

### 2. Write Tests

```typescript
import { describe, it, expect } from 'vitest'
import { myFunction } from './my-utils'

describe('myFunction', () => {
  it('does what it should', () => {
    expect(myFunction('input')).toBe('expected output')
  })
})
```

### 3. Run Tests

```bash
npm test
```

## 🎃 Summary

The test suite demonstrates:

- ✅ **40+ tests** across skeleton-core and both apps
- ✅ **Fast execution** (< 1 second)
- ✅ **Core logic coverage** (utilities, hooks, business logic)
- ✅ **Professional practices** (Vitest, Testing Library, coverage)
- ✅ **Maintainable** (Clear, focused tests)

---

🎃 Built for Kiroween Hackathon 👻
