import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/contexts/themeContext'
import './ThemeToggle.css'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      title={theme === 'light' ? 'Dark mode' : 'Light mode'}
    >
      {theme === 'light' ? (
        <Moon size={18} className="theme-toggle__icon" />
      ) : (
        <Sun size={18} className="theme-toggle__icon" />
      )}
    </button>
  )
}
