'use client'

import { useEffect } from 'react'
import { useBrevityCountdownStore } from '../store/brevity-countdown-store'

export function GameTimer() {
  const { timeRemaining, phase, updateTimeRemaining, endGame } = useBrevityCountdownStore()

  useEffect(() => {
    if (phase !== 'playing') return

    const timer = setInterval(() => {
      if (timeRemaining <= 0) {
        endGame()
        return
      }
      updateTimeRemaining(timeRemaining - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeRemaining, phase, updateTimeRemaining, endGame])

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-2xl">{timeRemaining}</span>
      <div className="radial-progress" style={{ "--value": (timeRemaining / 60) * 100 } as any}>
        {timeRemaining}s
      </div>
    </div>
  )
} 