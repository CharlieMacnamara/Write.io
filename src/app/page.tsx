'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { BookOpen, GamepadIcon } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-lg mx-auto space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-primary">Write.io</h1>
          <p className="text-lg text-muted">Master the art of concise writing</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/lessons" className="w-full">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full h-32 flex flex-col gap-3"
            >
              <BookOpen className="w-8 h-8" />
              <span className="text-lg">Lessons</span>
            </Button>
          </Link>

          <Link href="/games" className="w-full">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full h-32 flex flex-col gap-3"
            >
              <GamepadIcon className="w-8 h-8" />
              <span className="text-lg">Games</span>
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
} 