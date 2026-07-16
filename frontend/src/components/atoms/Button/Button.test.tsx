import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('shows animated spinner when loading', () => {
    render(<Button isLoading>Submit</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button.querySelector('.btn__spinner')).toBeInTheDocument()
    expect(button).toHaveClass('btn--loading')
  })

  it('applies hover transition styles via variant classes', () => {
    render(<Button variant="primary">Click me</Button>)

    expect(screen.getByRole('button')).toHaveClass('btn--primary')
  })
})
