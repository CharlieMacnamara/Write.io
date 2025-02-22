'use client'

import { useBrevityCountdownStore } from '../store/brevity-countdown-store'
import type { GameDifficulty } from '../store/brevity-countdown-store'

export function DifficultySelector() {
  const startGame = useBrevityCountdownStore(state => state.startGame)

  const difficulties: { value: GameDifficulty; label: string; description: string }[] = [
    {
      value: 'easy',
      label: 'Easy',
      description: 'Simple sentences with obvious redundancies'
    },
    {
      value: 'medium',
      label: 'Medium',
      description: 'More complex sentences with moderate redundancy'
    },
    {
      value: 'hard',
      label: 'Hard',
      description: 'Complex sentences requiring careful editing'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {difficulties.map(({ value, label, description }) => (
        <button
          key={value}
          onClick={() => startGame(value)}
          className="btn btn-primary"
        >
          <div className="text-left">
            <div className="font-bold">{label}</div>
            <div className="text-sm opacity-80">{description}</div>
          </div>
        </button>
      ))}
    </div>
  )
} 