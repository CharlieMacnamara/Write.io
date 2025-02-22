'use client'

import * as React from 'react'
import { GameStart } from '@/components/game/game-start'
import { useGameStore } from '@/store/gameStore'

export default function GamePage() {
  const { phase } = useGameStore()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <GameStart />
    </main>
  )
} 