'use client'

export function ScoreDisplay({ score, combo }: { score: number, combo: number }) {
  return (
    <div>
      <div className="text-2xl font-bold">{score}</div>
      {combo > 1 && (
        <div className="text-sm text-success">
          {combo}x Combo!
        </div>
      )}
    </div>
  )
} 