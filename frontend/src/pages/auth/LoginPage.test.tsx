import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@store/slices/authSlice'
import { ThemeProvider } from '@/contexts/themeContext'
import LoginPage from './LoginPage'

const renderLoginPage = () => {
  const store = configureStore({
    reducer: { auth: authReducer },
  })

  return render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  )
}

describe('LoginPage animations', () => {
  it('applies entrance animation classes to key UI sections', () => {
    const { container } = renderLoginPage()

    expect(container.querySelector('.login-left')).toHaveClass('hd-animate--slide-in-left')
    expect(container.querySelector('.login-header')).toHaveClass('hd-animate--fade-in-up')
    expect(container.querySelector('.login-form')).toHaveClass('hd-animate--fade-in-up')
    expect(container.querySelector('.login-right')).toHaveClass('hd-animate--slide-in-right')
    expect(container.querySelector('.brand-section')).toHaveClass('hd-animate--scale-in')
  })

  it('renders login form with accessible theme toggle', () => {
    renderLoginPage()

    expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })
})
