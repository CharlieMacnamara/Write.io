import { Metadata } from 'next'
import { GamesHub } from '@/features/games/games-hub'

export const metadata: Metadata = {
  title: 'Write.io Games Hub',
  description: 'Practice your writing skills with our collection of games'
}

export default function GamesPage() {
  return <GamesHub />
} 