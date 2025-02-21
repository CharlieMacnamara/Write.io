import * as React from 'react'
import { GameStart } from '@/components/game/game-start'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <GameStart />
    </main>
  )
} 