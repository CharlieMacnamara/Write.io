'use client'

import * as React from 'react'
import Link from 'next/link'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

function NavLink({ href, children, className }: NavLinkProps) {
  return (
    <Link 
      href={href}
      className={className}
    >
      {children}
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
          <NavLink href="/tutorial" className="text-muted hover:text-primary">
            Tutorial
          </NavLink>
          <NavLink href="/play" className="text-muted hover:text-primary">
            Play
          </NavLink>
        </nav>
      </div>
    </header>
  )
} 