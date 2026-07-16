import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { ThemeProvider, useTheme } from '@/contexts/themeContext'
import { ThemeToggle } from '@components/atoms/ThemeToggle'

const ThemeDisplay = () => {
  const { theme } = useTheme()
  return <span data-testid="current-theme">{theme}</span>
}

describe('ThemeProvider', () => {
  it('starts with light theme by default', () => {
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    )

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('toggles theme state and applies dark class to document', async () => {
    const user = userEvent.setup()

    render(
      <ThemeProvider>
        <ThemeToggle />
        <ThemeDisplay />
      </ThemeProvider>
    )

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light')

    await user.click(screen.getByRole('button', { name: 'Switch to dark mode' }))

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    await user.click(screen.getByRole('button', { name: 'Switch to light mode' }))

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})
