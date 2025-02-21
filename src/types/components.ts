import type { ReactNode, ButtonHTMLAttributes } from 'react'

export interface BaseProps {
  className?: string
  children?: ReactNode
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export interface NavLinkProps extends BaseProps {
  href: string
  isActive?: boolean
}

export interface ModalProps extends BaseProps {
  isOpen: boolean
  onClose: () => void
  title: string
} 