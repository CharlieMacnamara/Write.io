'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface RuleExampleProps {
  children: ReactNode
}

interface ExampleContentProps {
  children: ReactNode
  className?: string
}

export function RuleExample({ children }: RuleExampleProps) {
  return (
    <div className="my-6 p-4 border rounded-lg bg-muted/5">
      {children}
    </div>
  )
}

export function Wrong({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-red-500 mb-2">
      ❌ {children}
    </div>
  )
}

export function Right({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-green-500 mb-2">
      ✓ {children}
    </div>
  )
}

export function Explanation({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-sm text-muted italic">
      {children}
    </div>
  )
} 