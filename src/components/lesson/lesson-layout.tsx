import { ReactNode } from 'react'

interface LessonLayoutProps {
  children: ReactNode
}

export function LessonLayout({ children }: LessonLayoutProps) {
  return (
    <main className="min-h-screen bg-base-100">
      {children}
    </main>
  )
} 