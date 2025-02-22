'use client'

import * as React from 'react'
import Link from 'next/link'
import type { NavLinkProps } from '@/types/components'

function NavLink({ href, children, className }: NavLinkProps) {
  return (
    <Link 
      href={href}
      className={className}
      legacyBehavior
    >
      <a>{children}</a>
    </Link>
  )
}

export function Header() {
  return (
    <header className="border-b border-muted/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <NavLink href="/" className="text-xl font-bold text-primary">
          Write.io
        </NavLink>
        <nav className="flex items-center gap-4">
          <NavLink href="/lessons" className="text-muted hover:text-primary">
            Lessons
          </NavLink>
          <NavLink href="/game" className="text-muted hover:text-primary">
            Games
          </NavLink>
        </nav>
      </div>
    </header>
  )
} 