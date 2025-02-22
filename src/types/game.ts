export type GamePhase = 
  | 'SELECT_DIFFICULTY'
  | 'READY_TO_START'
  | 'GAME_ACTIVE'
  | 'GAME_END'

export type Difficulty = 'easy' | 'medium' | 'hard'
export type WritingStyle = 'creative' | 'non-fiction'

export interface GameSentence {
  original: string
  edited: string
  targetWordCount: number
  score: number
  feedback: string[]
}

export interface GameSubmission {
  original: string
  edited: string
  score: number
  feedback: string
  isValid: boolean
}

export interface EditValidation {
  isValid: boolean
  score: number
  feedback: string
}

export interface GameState {
  phase: GamePhase
  score: number
  timeLeft: number
  difficulty: Difficulty | null
  writingStyle: WritingStyle
  currentSentence: string | null
  targetWordCount: number
  comboMultiplier: number
  consecutiveSuccess: number
  hasPlayedBefore: boolean
  showTutorial: boolean
  highScore: number
  isLoading: boolean
  submissions: GameSubmission[]
  sentences: GameSentence[]
}

export interface GameActions {
  setPhase: (phase: GamePhase) => void
  setScore: (score: number) => void
  setTimeLeft: (time: number) => void
  setDifficulty: (difficulty: Difficulty) => void
  setWritingStyle: (style: WritingStyle) => void
  setCurrentSentence: (sentence: string) => void
  setHasPlayedBefore: (played: boolean) => void
  setShowTutorial: (show: boolean) => void
  setHighScore: (score: number) => void
  setIsLoading: (loading: boolean) => void
  startGame: () => Promise<void>
  endGame: () => void
  resetGame: () => void
  submitEdit: (editedSentence: string) => EditValidation
}

export interface GameStore extends GameState {
  actions: GameActions
} 