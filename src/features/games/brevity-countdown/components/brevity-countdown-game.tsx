'use client'

import { useEffect } from 'react'
import { useBrevityCountdownStore } from '../store/brevity-countdown-store'
import { DifficultySelector } from './difficulty-selector'
import { GameTimer } from './game-timer'
import { SentenceEditor } from './sentence-editor'
import { ScoreDisplay } from './score-display'
import { GameResults } from './game-results'
import { useGameLogic } from '../hooks/use-game-logic'

export function BrevityCountdownGame() {
  const { phase, error, isLoading } = useBrevityCountdownStore()
  const { initializeGame } = useGameLogic()

  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  if (error) {
    return (
      <div className="alert alert-error">
        <span>{error}</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      {phase === 'idle' && (
        <div className="card bg-base-200 p-6">
          <h2 className="card-title mb-4">Brevity Countdown</h2>
          <p className="mb-6">Make sentences shorter while keeping their meaning. The more words you remove, the higher your score!</p>
          <DifficultySelector />
        </div>
      )}

      {phase === 'playing' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <GameTimer />
            <ScoreDisplay />
          </div>
          <SentenceEditor />
        </div>
      )}

      {phase === 'completed' && <GameResults />}

      {isLoading && (
        <div className="fixed inset-0 bg-base-300 bg-opacity-50 flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </div>
  )
} 