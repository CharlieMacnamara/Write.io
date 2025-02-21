import { render, screen, fireEvent } from '@testing-library/react'
import { SettingsPanel } from '../settings-panel'

jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
  }),
}))

describe('SettingsPanel', () => {
  const mockOnClose = jest.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  it('renders writing style options', () => {
    render(<SettingsPanel isOpen={true} onClose={mockOnClose} />)
    expect(screen.getByText('Creative Writing')).toBeInTheDocument()
    expect(screen.getByText('Non-Fiction')).toBeInTheDocument()
  })

  it('renders difficulty options', () => {
    render(<SettingsPanel isOpen={true} onClose={mockOnClose} />)
    expect(screen.getByText('Easy')).toBeInTheDocument()
    expect(screen.getByText('Medium')).toBeInTheDocument()
    expect(screen.getByText('Hard')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    render(<SettingsPanel isOpen={true} onClose={mockOnClose} />)
    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(mockOnClose).toHaveBeenCalled()
  })
}) 