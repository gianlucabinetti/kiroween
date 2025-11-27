/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../skeleton-core/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        surface: 'hsl(var(--surface))',
        'surface-elevated': 'hsl(var(--surface-elevated))',
        'text-primary': 'hsl(var(--text-primary))',
        'text-secondary': 'hsl(var(--text-secondary))',
        'text-tertiary': 'hsl(var(--text-tertiary))',
        'accent-purple': 'hsl(var(--accent-purple))',
        'accent-orange': 'hsl(var(--accent-orange))',
        'accent-green': 'hsl(var(--accent-green))',
        'accent-red': 'hsl(var(--accent-red))',
        border: 'hsl(var(--border))',
        'border-hover': 'hsl(var(--border-hover))',
      },
    },
  },
  plugins: [],
}
