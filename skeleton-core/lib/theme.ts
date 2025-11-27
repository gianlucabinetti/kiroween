/**
 * Theme Configuration
 *
 * Grimoire Stack theme system - currently dark mode only,
 * but structured to support multiple themes in the future.
 */

export type ThemeMode = 'dark' | 'light'

export interface Theme {
  mode: ThemeMode
  colors: {
    background: string
    surface: string
    surfaceElevated: string
    textPrimary: string
    textSecondary: string
    textTertiary: string
    accentPurple: string
    accentOrange: string
    accentGreen: string
    accentRed: string
    border: string
    borderHover: string
  }
}

export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    background: '222 47% 11%',
    surface: '222 47% 15%',
    surfaceElevated: '222 47% 19%',
    textPrimary: '280 10% 95%',
    textSecondary: '280 10% 70%',
    textTertiary: '280 10% 50%',
    accentPurple: '270 70% 60%',
    accentOrange: '25 95% 53%',
    accentGreen: '142 76% 36%',
    accentRed: '0 84% 60%',
    border: '280 20% 25%',
    borderHover: '280 30% 35%',
  },
}

// Future: Light theme for daytime use
export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    background: '0 0% 100%',
    surface: '0 0% 98%',
    surfaceElevated: '0 0% 96%',
    textPrimary: '222 47% 11%',
    textSecondary: '222 20% 40%',
    textTertiary: '222 15% 60%',
    accentPurple: '270 70% 50%',
    accentOrange: '25 95% 53%',
    accentGreen: '142 76% 36%',
    accentRed: '0 84% 60%',
    border: '222 10% 85%',
    borderHover: '222 15% 75%',
  },
}

export const themes = {
  dark: darkTheme,
  light: lightTheme,
}

/**
 * Get current theme (always dark for now)
 */
export function getCurrentTheme(): Theme {
  return darkTheme
}

/**
 * Apply theme to document (for future theme switching)
 */
export function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return

  const root = document.documentElement

  Object.entries(theme.colors).forEach(([key, value]) => {
    const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase()
    root.style.setProperty(`--${cssVar}`, value)
  })
}

/**
 * Theme hook for future use
 */
export function useTheme() {
  const theme = getCurrentTheme()

  const setTheme = (_newTheme: ThemeMode) => {
    // Future: Implement theme switching
    // console.log('Theme switching coming soon!', newTheme)
  }

  return { theme, setTheme }
}
