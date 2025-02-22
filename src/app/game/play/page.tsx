'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useGameStore } from '@/store/gameStore'
import { GamePlay } from '@/components/game/game-play'

export default function GamePlayPage() {
  const router = useRouter()
  const { phase, isLoading } = useGameStore()

  React.useEffect(() => {
    if (phase === 'SELECT_DIFFICULTY') {
      router.replace('/game')
    }
  }, [phase, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <GamePlay />
    </main>
  )
} 