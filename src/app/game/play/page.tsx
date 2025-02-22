'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useGameStore } from '@/store/gameStore'

export default function GamePlayPage() {
  const router = useRouter()
  const { phase, currentSentence, isLoading } = useGameStore()

  React.useEffect(() => {
    if (phase === 'SELECT_DIFFICULTY') {
      router.replace('/')
    }
  }, [phase, router])

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Loading game...</p>
        </div>
      </main>
    )
  }

  if (!currentSentence) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-500">Failed to load game</p>
          <button 
            onClick={() => router.replace('/')}
            className="mt-4 text-blue-500 hover:underline"
          >
            Return to Home
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">Game in Progress</h1>
          <p className="text-muted">Make it brief!</p>
        </div>

        <div className="bg-surface p-6 rounded-xl shadow-lg space-y-4">
          <div>
            <h2 className="font-medium text-primary">Original Sentence:</h2>
            <p className="text-muted mt-2">{currentSentence}</p>
          </div>
          
          {/* Add game UI components here */}
        </div>
      </div>
    </main>
  )
} 