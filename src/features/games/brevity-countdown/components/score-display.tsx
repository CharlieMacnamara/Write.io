'use client'

import { useBrevityCountdownStore } from '../store/brevity-countdown-store'

export function ScoreDisplay() {
  const score = useBrevityCountdownStore(state => state.score)

  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-title">Current Score</div>
        <div className="stat-value text-primary">{score}</div>
      </div>
    </div>
  )
} 