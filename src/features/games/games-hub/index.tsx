import Link from 'next/link'
import { LucideTimer } from 'lucide-react'

interface GameCard {
  title: string
  description: string
  icon: React.ReactNode
  href: string
}

const availableGames: GameCard[] = [
  {
    title: 'Brevity Countdown',
    description: 'Challenge yourself to write concise, meaningful sentences against the clock',
    icon: <LucideTimer className="w-8 h-8" />,
    href: '/games/brevity-countdown'
  }
]

export function GamesHub() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Writing Games</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableGames.map((game) => (
          <Link
            key={game.href}
            href={game.href}
            className="card bg-base-200 hover:bg-base-300 transition-colors"
          >
            <div className="card-body">
              <div className="flex items-center gap-3">
                {game.icon}
                <h2 className="card-title">{game.title}</h2>
              </div>
              <p>{game.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 