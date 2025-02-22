'use client'

import * as React from 'react'
import { toast } from 'react-hot-toast'
import { Trophy, Info, Play } from 'lucide-react'
import { useGameStore } from '@/store/gameStore'
import { cn } from '@/lib/utils'
import type { Difficulty } from '@/types/game'
import { Button } from '@/components/ui/button'
import { GamePlay } from './game-play/index'

export function GameStart() {
  const [isInitializing, setIsInitializing] = React.useState(false)
  const isMounted = React.useRef(false)
  
  const gameStore = useGameStore()
  const { phase, difficulty, isLoading } = gameStore
  const { setDifficulty, startGame, resetGame } = gameStore.actions

  // Debug logging
  React.useEffect(() => {
    console.log('GameStart mounted')
    return () => console.log('GameStart unmounted')
  }, [])

  React.useEffect(() => {
    console.log('Game state changed:', { phase, difficulty, isLoading })
  }, [phase, difficulty, isLoading])

  // Force reset to initial state on mount
  React.useEffect(() => {
    try {
      resetGame()
      isMounted.current = true
    } catch (error) {
      console.error('Failed to reset game:', error)
      toast.error('Failed to initialize game')
    }
    return () => { isMounted.current = false }
  }, [resetGame])

  // Disable game active state if we somehow got there
  React.useEffect(() => {
    if (phase === 'GAME_ACTIVE') {
      resetGame()
    }
  }, [phase, resetGame])

  const handleDifficultySelect = React.useCallback((e: React.MouseEvent, level: Difficulty) => {
    e.preventDefault()
    console.log('Difficulty selected:', level)
    
    try {
      setDifficulty(level)
      toast.success(`Difficulty set to ${level}`)
    } catch (error) {
      console.error('Failed to set difficulty:', error)
      toast.error('Failed to set difficulty')
    }
  }, [setDifficulty])

  const handleStartGame = React.useCallback(async (e: React.MouseEvent) => {
    e.preventDefault()
    console.log('Start game clicked, current phase:', phase)
    
    if (phase === 'SELECT_DIFFICULTY') {
      toast.error('Please select a difficulty level first')
      return
    }

    setIsInitializing(true)

    try {
      await startGame()
      console.log('Game started successfully')
    } catch (error) {
      console.error('Failed to start game:', error)
      toast.error('Failed to start game. Please try again.')
    } finally {
      if (isMounted.current) {
        setIsInitializing(false)
      }
    }
  }, [phase, startGame])

  // Show game interface when active
  if (phase === 'GAME_ACTIVE') {
    return <GamePlay />
  }

  // Show setup interface
  const difficultyLevels: Difficulty[] = ['easy', 'medium', 'hard']

  return (
    <div className="w-full max-w-lg mx-auto p-4 sm:p-6 rounded-xl shadow-lg bg-surface">
      <div className="space-y-6 sm:space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">Write.io</h1>
          <p className="text-sm sm:text-base text-muted">Master concise writing</p>
        </div>

        <div className="bg-background/50 rounded-lg p-3 sm:p-4 space-y-2">
          <h2 className="font-semibold text-primary">How to Play</h2>
          <ul className="text-xs sm:text-sm text-muted space-y-1">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              Edit AI-generated sentences for brevity
            </li>
            <li>• Apply Elements of Style principles</li>
            <li>• Race against a 60-second timer</li>
            <li>• Earn points for concise edits</li>
          </ul>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-primary">
            Select Difficulty
          </label>
          <div className="grid grid-cols-3 gap-2">
            {difficultyLevels.map((level) => (
              <button
                key={level}
                type="button"
                onClick={(e) => handleDifficultySelect(e, level)}
                disabled={isLoading || isInitializing}
                className={cn(
                  'py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors',
                  'bg-background hover:bg-secondary/10 active:bg-secondary/20',
                  'touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed',
                  difficulty === level && 'bg-secondary/20'
                )}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <Button
          size="lg"
          onClick={handleStartGame}
          disabled={phase === 'SELECT_DIFFICULTY' || isLoading || isInitializing}
          isLoading={isLoading || isInitializing}
          className="w-full touch-manipulation"
        >
          {isLoading || isInitializing ? 'Initializing Game...' : 'Start Game'}
        </Button>

        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-surface hover:bg-background/90 text-primary border border-muted/20">
            <Trophy className="w-4 h-4" />
            High Scores
          </button>
          <button className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-surface hover:bg-background/90 text-primary border border-muted/20">
            <Info className="w-4 h-4" />
            Tutorial
          </button>
        </div>
      </div>
    </div>
  )
} 