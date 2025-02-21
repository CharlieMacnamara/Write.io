import { render, screen, fireEvent } from '@testing-library/react'
import { GameStart } from '../game-start'

// Mock the dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
  }),
}))

describe('GameStart', () => {
  it('renders the main title', () => {
    render(<GameStart />)
    expect(screen.getByText('Write.io')).toBeInTheDocument()
  })

  it('shows difficulty options', () => {
    render(<GameStart />)
    expect(screen.getByText('easy')).toBeInTheDocument()
    expect(screen.getByText('medium')).toBeInTheDocument()
    expect(screen.getByText('hard')).toBeInTheDocument()
  })

  it('opens settings panel when settings button is clicked', () => {
    render(<GameStart />)
    fireEvent.click(screen.getByText('Settings'))
    expect(screen.getByText('Game Settings')).toBeInTheDocument()
  })
}) 