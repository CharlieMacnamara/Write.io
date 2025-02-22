import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface HighScore {
  score: number
  date: string
  difficulty: GameDifficulty
}

export type GamePhase = 'idle' | 'playing' | 'completed'
export type GameDifficulty = 'easy' | 'medium' | 'hard'

interface GameState {
  phase: GamePhase
  score: number
  timeRemaining: number
  difficulty: GameDifficulty
  currentSentence: string
  highScores: HighScore[]
  isLoading: boolean
  error: string | null
  
  // Actions
  startGame: (difficulty: GameDifficulty) => void
  endGame: () => void
  updateScore: (points: number) => void
  setCurrentSentence: (sentence: string) => void
  updateTimeRemaining: (time: number) => void
  setError: (error: string | null) => void
  setLoading: (loading: boolean) => void
}

export const useBrevityCountdownStore = create<GameState>()(
  persist(
    (set) => ({
      phase: 'idle',
      score: 0,
      timeRemaining: 60,
      difficulty: 'medium',
      currentSentence: '',
      highScores: [],
      isLoading: false,
      error: null,

      startGame: (difficulty) => set({
        phase: 'playing',
        score: 0,
        timeRemaining: 60,
        difficulty,
        error: null
      }),

      endGame: () => set((state) => {
        const newHighScore: HighScore = {
          score: state.score,
          date: new Date().toISOString(),
          difficulty: state.difficulty
        }
        
        return {
          phase: 'completed',
          highScores: [...state.highScores, newHighScore]
            .sort((a, b) => b.score - a.score)
            .slice(0, 10)
        }
      }),

      updateScore: (points) => set((state) => ({
        score: state.score + points
      })),

      setCurrentSentence: (sentence) => set({
        currentSentence: sentence
      }),

      updateTimeRemaining: (time) => set({
        timeRemaining: time
      }),

      setError: (error) => set({ error }),
      setLoading: (loading) => set({ isLoading: loading })
    }),
    {
      name: 'brevity-countdown-storage'
    }
  )
) 