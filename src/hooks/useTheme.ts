import { useEffect } from 'react'
import type { Theme } from '../types'
import { useLocalStorage } from './useLocalStorage'

const THEME_KEY = 'focus-forge-theme'

function getPreferredTheme(): Theme {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  return 'light'
}

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>(THEME_KEY, getPreferredTheme())

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))

  return { theme, toggleTheme }
}
