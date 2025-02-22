import { Metadata } from 'next'
import { BrevityCountdownGame } from '@/features/games/brevity-countdown/components/brevity-countdown-game'

export const metadata: Metadata = {
  title: 'Brevity Countdown - Writing Game',
  description: 'Challenge yourself to make sentences more concise while preserving their meaning.',
}

export default function BrevityCountdownPage() {
  return (
    <main className="min-h-screen py-8">
      <BrevityCountdownGame />
    </main>
  )
} 