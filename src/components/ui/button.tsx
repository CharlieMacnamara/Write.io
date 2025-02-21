'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { ButtonProps } from '@/types/components'

export function Button({
  className,
  variant = 'default',
  size = 'md',
  isLoading,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary',
        'disabled:opacity-50 disabled:pointer-events-none',
        {
          'bg-secondary text-white hover:bg-secondary/90': variant === 'default',
          'border border-muted hover:bg-background/90': variant === 'outline',
          'hover:bg-background/90': variant === 'ghost',
        },
        {
          'text-sm px-3 py-1.5': size === 'sm',
          'text-base px-4 py-2': size === 'md',
          'text-lg px-6 py-3': size === 'lg',
        },
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <span className="animate-pulse">Loading...</span>
      ) : (
        children
      )}
    </button>
  )
} 