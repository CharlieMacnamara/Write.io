import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { 
  GameStore, 
  GameState, 
  Difficulty, 
  WritingStyle,
  GameActions 
} from '@/types/game'

const initialState: GameState = {
  score: 0,
  timeLeft: 60,
  difficulty: 'medium',
  writingStyle: 'creative',
  hasPlayedBefore: false,
  showTutorial: true,
  highScore: 0,
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        setScore: (score) => set({ score }),
        setTimeLeft: (timeLeft) => set({ timeLeft }),
        setDifficulty: (difficulty) => set({ difficulty }),
        setWritingStyle: (writingStyle) => set({ writingStyle }),
        setHasPlayedBefore: (hasPlayedBefore) => set({ hasPlayedBefore }),
        setShowTutorial: (showTutorial) => set({ showTutorial }),
        setHighScore: (highScore) => set({ highScore }),
      },
    }),
    {
      name: 'game-storage',
    }
  )
)

// Export types for convenience
export type { GameStore, GameState, Difficulty, WritingStyle, GameActions } 