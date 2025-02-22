import { Metadata } from 'next'
import { BrevityCountdownGame } from '@/features/games/brevity-countdown/components/brevity-countdown-game'

export const metadata: Metadata = {
  title: 'Brevity Countdown - Write.io',
  description: 'Challenge yourself to write concise, meaningful sentences'
}

export default function BrevityCountdownPage() {
  return <BrevityCountdownGame />
} 