export * from './game'

// Re-export specific types
export type {
  WritingStyle,
  Difficulty,
  GameState,
  GameStore,
  GameActions,
} from './game'

// Component types
export interface BaseProps {
  className?: string
  children?: React.ReactNode
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
} 