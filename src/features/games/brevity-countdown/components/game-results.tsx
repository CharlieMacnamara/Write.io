'use client'

import { useBrevityCountdownStore } from '../store/brevity-countdown-store'

export function GameResults() {
  const { score, highScores, difficulty, startGame } = useBrevityCountdownStore()
  
  const isNewHighScore = highScores.some(hs => 
    hs.score === score && 
    hs.difficulty === difficulty && 
    hs.date === new Date().toISOString()
  )

  return (
    <div className="card bg-base-200 p-6">
      <h2 className="card-title mb-4">Game Over!</h2>
      
      <div className="stats shadow mb-6">
        <div className="stat">
          <div className="stat-title">Final Score</div>
          <div className="stat-value text-primary">{score}</div>
          {isNewHighScore && (
            <div className="stat-desc text-success">New High Score!</div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold">High Scores ({difficulty})</h3>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Score</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {highScores
                .filter(hs => hs.difficulty === difficulty)
                .map((hs, index) => (
                  <tr key={`${hs.score}-${hs.date}`}>
                    <td>{index + 1}</td>
                    <td>{hs.score}</td>
                    <td>{new Date(hs.date).toLocaleDateString()}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        <div className="card-actions justify-end">
          <button 
            className="btn btn-primary"
            onClick={() => startGame(difficulty)}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  )
} 