'use client'

import * as React from 'react'
import { useGameStore } from '@/store/gameStore'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export function GamePlay() {
  const { currentSentence, timeLeft, score, actions } = useGameStore()
  const [editedSentence, setEditedSentence] = React.useState('')

  const handleReset = () => {
    actions.resetGame()
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-muted hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Start
          </button>
          <div className="flex gap-4">
            <div className="text-lg font-semibold">Time: {timeLeft}s</div>
            <div className="text-lg font-semibold">Score: {score}</div>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-xl shadow-lg space-y-4">
          <div>
            <h2 className="font-medium text-primary">Original Sentence:</h2>
            <p className="text-muted mt-2">{currentSentence}</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="edit" className="font-medium text-primary">
              Your Edit:
            </label>
            <textarea
              id="edit"
              value={editedSentence}
              onChange={(e) => setEditedSentence(e.target.value)}
              className="w-full h-32 p-3 rounded-lg bg-background border border-muted/20 focus:outline-none focus:ring-2 focus:ring-secondary"
              placeholder="Type your concise version here..."
            />
          </div>

          <Button 
            size="lg"
            className="w-full"
            onClick={() => {/* Handle submission */}}
          >
            Submit Edit
          </Button>
        </div>
      </div>
    </div>
  )
} 