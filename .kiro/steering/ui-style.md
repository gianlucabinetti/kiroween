# Grimoire Stack - UI Style Guide

## Design Philosophy

**Spooky but Professional** - We want Halloween vibes without sacrificing usability. Think "elegant gothic" rather than "haunted house chaos."

## Color Palette

### Dark Mode Base (Required)

```css
/* Background layers */
--background: 222 47% 11% /* Deep purple-black #1a0f1f */ --surface: 222 47% 15%
  /* Slightly lighter #251628 */ --surface-elevated: 222 47% 19% /* Cards and modals #2f1d32 */
  /* Text */ --text-primary: 280 10% 95% /* Off-white #f5f3f7 */ --text-secondary: 280 10% 70%
  /* Muted text #b8b0bd */ --text-tertiary: 280 10% 50% /* Disabled text #8a7f91 */
  /* Accent colors (Halloween themed) */ --accent-purple: 270 70% 60% /* Primary actions #9d5bd2 */
  --accent-orange: 25 95% 53% /* Warnings, highlights #f97316 */ --accent-green: 142 76% 36%
  /* Success states #16a34a */ --accent-red: 0 84% 60% /* Errors, danger #ef4444 */
  /* Borders and dividers */ --border: 280 20% 25% /* Subtle borders #3d3142 */ --border-hover: 280
  30% 35% /* Interactive borders #5a4a5f */;
```

### Usage Guidelines

- **Purple** - Primary brand color, CTAs, links, active states
- **Orange** - Secondary accent, hover states, important badges
- **Green** - Success messages, completed tasks, positive actions
- **Red** - Errors, destructive actions, urgent items

## Typography

### Font Stack

```css
/* Primary font - Clean and modern */
font-family:
  'Inter',
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  sans-serif;

/* Monospace - Code and data */
font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;

/* Optional: Spooky headers (use sparingly) */
font-family: 'Creepster', 'Nosifer', cursive; /* Only for logos/special headers */
```

### Type Scale

```css
/* Headings */
--text-4xl: 2.25rem / 2.5rem /* 36px - Page titles */ --text-3xl: 1.875rem / 2.25rem
  /* 30px - Section headers */ --text-2xl: 1.5rem / 2rem /* 24px - Card titles */
  --text-xl: 1.25rem / 1.75rem /* 20px - Subsections */ --text-lg: 1.125rem / 1.75rem
  /* 18px - Large body */ /* Body */ --text-base: 1rem / 1.5rem /* 16px - Default */
  --text-sm: 0.875rem / 1.25rem /* 14px - Secondary text */ --text-xs: 0.75rem / 1rem
  /* 12px - Captions, labels */;
```

### Font Weights

- **400** - Regular body text
- **500** - Medium for emphasis
- **600** - Semibold for headings
- **700** - Bold for strong emphasis (use sparingly)

## Spacing System

Use Tailwind's spacing scale (4px base unit):

- **xs**: 0.5rem (8px) - Tight spacing
- **sm**: 0.75rem (12px) - Compact layouts
- **md**: 1rem (16px) - Default spacing
- **lg**: 1.5rem (24px) - Comfortable spacing
- **xl**: 2rem (32px) - Section spacing
- **2xl**: 3rem (48px) - Major sections

## Component Patterns

### Cards

```tsx
<Card className="bg-surface-elevated border-border hover:border-border-hover">
  <CardHeader>
    <CardTitle className="text-text-primary">Title</CardTitle>
  </CardHeader>
  <CardContent className="text-text-secondary">Content</CardContent>
</Card>
```

- Rounded corners: `rounded-lg` (8px)
- Subtle borders
- Hover states for interactive cards
- Shadow on elevation: `shadow-lg` with purple tint

### Buttons

```tsx
/* Primary - Purple accent */
<Button className="bg-accent-purple hover:bg-accent-purple/90">
  Primary Action
</Button>

/* Secondary - Outlined */
<Button variant="outline" className="border-border hover:border-accent-purple">
  Secondary Action
</Button>

/* Danger - Red accent */
<Button variant="destructive" className="bg-accent-red hover:bg-accent-red/90">
  Delete
</Button>
```

- Height: `h-10` (40px) for default, `h-8` (32px) for small
- Padding: `px-4` horizontal
- Rounded: `rounded-md` (6px)
- Transition: `transition-colors duration-200`

### Inputs

```tsx
<Input
  className="bg-surface border-border focus:border-accent-purple focus:ring-accent-purple/20"
  placeholder="Enter text..."
/>
```

- Background: Slightly lighter than surface
- Focus ring: Purple with 20% opacity
- Placeholder: `text-text-tertiary`

### Navigation

- Sidebar: Fixed left, `w-64` (256px)
- Active state: Purple accent with subtle background
- Icons: 20px size, consistent spacing
- Hover: Smooth color transition

## Spooky Touches (Subtle)

### Micro-interactions

- Subtle purple glow on hover: `hover:shadow-[0_0_15px_rgba(157,91,210,0.3)]`
- Smooth transitions: `transition-all duration-300 ease-in-out`
- Slight scale on button hover: `hover:scale-105`

### Decorative Elements

- Ghost emoji 👻 for empty states
- Skull emoji 💀 for deleted items (sparingly)
- Spider web patterns in backgrounds (very subtle, low opacity)
- Purple gradient overlays on hero sections

### Animations (Optional)

```css
/* Fade in */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Pulse glow (for notifications) */
@keyframes pulseGlow {
  0%,
  100% {
    box-shadow: 0 0 5px rgba(157, 91, 210, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(157, 91, 210, 0.8);
  }
}
```

## Accessibility Requirements

### Contrast Ratios

- Body text: Minimum 4.5:1 against background
- Large text (18px+): Minimum 3:1
- Interactive elements: Clear focus indicators

### Focus States

- Visible focus ring: `focus:ring-2 focus:ring-accent-purple focus:ring-offset-2 focus:ring-offset-background`
- Never remove focus styles without replacement
- Keyboard navigation must be obvious

### Interactive Elements

- Minimum touch target: 44x44px
- Clear hover states
- Disabled states: Reduced opacity + cursor-not-allowed

### Screen Readers

- Semantic HTML: Use proper heading hierarchy
- ARIA labels for icon-only buttons
- Alt text for all images
- Skip links for navigation

## Responsive Design

### Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

### Mobile Considerations

- Sidebar collapses to hamburger menu below `md`
- Cards stack vertically on mobile
- Touch-friendly spacing (minimum 44px targets)
- Simplified navigation on small screens

## Dark Mode Only

This project is dark mode only to maintain the spooky aesthetic. No light mode toggle needed.

## Icon System

Use **Lucide React** for consistent icons:

- Size: `w-5 h-5` (20px) for inline, `w-6 h-6` (24px) for standalone
- Color: Inherit from parent text color
- Stroke width: 2 (default)

Common icons:

- Ghost: For empty states
- Moon: For dark theme indicator
- Skull: For delete actions (optional)
- Sparkles: For new features
- Zap: For quick actions
