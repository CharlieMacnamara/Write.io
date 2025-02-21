export type WritingStyle = 'creative' | 'non-fiction'
export type Difficulty = 'easy' | 'medium' | 'hard'

export interface GameState {
  score: number
  timeLeft: number
  difficulty: Difficulty
  writingStyle: WritingStyle
  hasPlayedBefore: boolean
  showTutorial: boolean
  highScore: number
}

export interface GameActions {
  setScore: (score: number) => void
  setTimeLeft: (time: number) => void
  setDifficulty: (difficulty: Difficulty) => void
  setWritingStyle: (style: WritingStyle) => void
  setHasPlayedBefore: (played: boolean) => void
  setShowTutorial: (show: boolean) => void
  setHighScore: (score: number) => void
}

export interface GameStore extends GameState {
  actions: GameActions
} 