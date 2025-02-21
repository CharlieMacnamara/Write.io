'use client'

import * as React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trophy, Info, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

export function GameStart() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleStartGame = async () => {
    try {
      setIsLoading(true)
      // Add game start logic here
      router.push('/game/play')
    } catch (error) {
      console.error('Failed to start game')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={cn(
        'w-full max-w-lg mx-auto p-6 rounded-xl shadow-lg',
        'bg-surface text-text transform transition-all duration-200'
      )}
    >
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">Write.io</h1>
          <p className="text-muted">Master the art of concise writing</p>
        </div>

        <div className="bg-background/50 rounded-lg p-4 space-y-2">
          <h2 className="font-semibold text-primary">How to Play</h2>
          <ul className="text-sm text-muted space-y-1">
            <li>• Edit AI-generated sentences for brevity</li>
            <li>• Apply Elements of Style principles</li>
            <li>• Race against a 60-second timer</li>
            <li>• Earn points for concise edits</li>
          </ul>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Difficulty</label>
          <div className="grid grid-cols-3 gap-2">
            {['Easy', 'Medium', 'Hard'].map((level) => (
              <button
                key={level}
                className={cn(
                  'py-2 px-4 rounded-lg text-sm font-medium transition-colors',
                  'bg-background hover:bg-secondary/10'
                )}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleStartGame}
            disabled={isLoading}
            className={cn(
              'w-full py-3 px-4 rounded-lg bg-secondary text-white',
              'flex items-center justify-center gap-2 font-medium',
              'hover:bg-secondary/90 transition-colors',
              isLoading && 'opacity-50 cursor-not-allowed'
            )}
          >
            {isLoading ? (
              'Loading...'
            ) : (
              <>
                <Play className="w-5 h-5" />
                Start Game
              </>
            )}
          </button>

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
    </div>
  )
} 