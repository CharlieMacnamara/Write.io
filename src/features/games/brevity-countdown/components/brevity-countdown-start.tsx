'use client'

import { Button } from '@/components/ui/button'

interface BrevityCountdownStartProps {
  onStart: () => void
}

export function BrevityCountdownStart({ onStart }: BrevityCountdownStartProps) {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Brevity Countdown</h1>
      <p className="mb-8">Edit sentences to be more concise while maintaining their meaning.</p>
      <Button onClick={onStart}>Start Game</Button>
    </div>
  )
} 