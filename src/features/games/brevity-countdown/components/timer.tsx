'use client'

export function Timer({ timeLeft }: { timeLeft: number }) {
  return (
    <div className="text-center">
      <div className={`text-4xl font-bold ${timeLeft <= 10 ? 'text-error animate-pulse' : ''}`}>
        {timeLeft}
      </div>
      <div className="text-sm text-muted">seconds</div>
    </div>
  )
} 