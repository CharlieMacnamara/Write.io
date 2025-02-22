import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'
import { SentenceService } from '@/lib/services/sentence-service'
import type { 
  GameStore, 
  GameState, 
  GamePhase,
  Difficulty, 
  WritingStyle,
  GameSentence 
} from '@/types/game'

const initialState: GameState = {
  phase: 'SELECT_DIFFICULTY',
  score: 0,
  timeLeft: 60,
  difficulty: 'medium',
  writingStyle: 'creative',
  currentSentence: '',
  targetWordCount: 0,
  hasPlayedBefore: false,
  showTutorial: true,
  highScore: 0,
  isLoading: false,
  sentences: [],
}

// Debug middleware
const log = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log('  applying', args)
      set(...args)
      console.log('  new state', get())
    },
    get,
    api
  )

export const useGameStore = create<GameStore>()(
  devtools(
    persist(
      log((set, get) => ({
        ...initialState,
        actions: {
          resetGame: () => {
            console.log('Resetting game state')
            const state = get()
            set({
              ...initialState,
              highScore: state.highScore ?? 0,
              hasPlayedBefore: state.hasPlayedBefore ?? false,
            })
          },

          setPhase: (phase: GamePhase) => set((state) => ({ ...state, phase })),
          setScore: (score: number) => set((state) => ({ ...state, score })),
          setTimeLeft: (timeLeft: number) => set((state) => ({ ...state, timeLeft })),
          setDifficulty: (difficulty: Difficulty) => {
            console.log('Setting difficulty:', difficulty)
            set((state) => ({
              ...state,
              difficulty,
              phase: 'GAME_START'
            }))
          },
          setWritingStyle: (writingStyle: WritingStyle) => 
            set((state) => ({ ...state, writingStyle })),
          setCurrentSentence: (currentSentence: string) => 
            set((state) => ({ ...state, currentSentence })),
          setTargetWordCount: (targetWordCount: number) => 
            set((state) => ({ ...state, targetWordCount })),
          setHasPlayedBefore: (hasPlayedBefore: boolean) => 
            set((state) => ({ ...state, hasPlayedBefore })),
          setShowTutorial: (showTutorial: boolean) => 
            set((state) => ({ ...state, showTutorial })),
          setHighScore: (highScore: number) => 
            set((state) => ({ ...state, highScore })),
          setIsLoading: (isLoading: boolean) => 
            set((state) => ({ ...state, isLoading })),
          
          startGame: async () => {
            const state = get()
            console.log('Starting game with state:', state)
            
            if (state.phase === 'SELECT_DIFFICULTY') {
              console.error('Cannot start game: difficulty not selected')
              throw new Error('Please select difficulty first')
            }

            set((state) => ({ ...state, isLoading: true }))
            
            try {
              console.log('Generating sentence for difficulty:', state.difficulty)
              const { original, targetWordCount } = await SentenceService.generateGameSentence(
                state.difficulty
              )
              
              console.log('Generated sentence:', { original, targetWordCount })
              
              set((state) => ({
                ...state,
                phase: 'GAME_ACTIVE',
                currentSentence: original,
                targetWordCount,
                timeLeft: 60,
                score: 0,
                sentences: [],
                isLoading: false,
              }))
            } catch (error) {
              console.error('Failed to start game:', error)
              set((state) => ({ 
                ...state,
                isLoading: false,
                phase: 'SELECT_DIFFICULTY',
              }))
              throw error
            }
          },
          
          endGame: () => {
            const state = get()
            const newHighScore = state.score > state.highScore ? state.score : state.highScore
            
            set((state) => ({
              ...state,
              phase: 'GAME_END',
              highScore: newHighScore,
            }))
          },

          submitEdit: (editedSentence: string) => {
            const state = get()
            const { isValid, score, feedback } = SentenceService.validateEdit(
              state.currentSentence,
              editedSentence,
              state.targetWordCount
            )

            if (isValid) {
              set((state) => ({
                ...state,
                score: state.score + score,
                sentences: [
                  ...(state.sentences || []),
                  {
                    original: state.currentSentence,
                    edited: editedSentence,
                    targetWordCount: state.targetWordCount,
                    score,
                    feedback,
                  },
                ],
              }))

              // Generate next sentence
              SentenceService.generateGameSentence(state.difficulty)
                .then(({ original, targetWordCount }) => {
                  set((state) => ({
                    ...state,
                    currentSentence: original,
                    targetWordCount,
                  }))
                })
                .catch(console.error)
            }

            return { isValid, score, feedback }
          },
        },
      })),
      {
        name: 'game-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          highScore: state?.highScore ?? 0,
          hasPlayedBefore: state?.hasPlayedBefore ?? false,
        }),
        onRehydrateStorage: () => {
          console.log('Rehydrating storage')
          return (persistedState) => {
            console.log('Rehydrated state:', persistedState)
            useGameStore.setState({
              ...initialState,
              highScore: persistedState?.highScore ?? 0,
              hasPlayedBefore: persistedState?.hasPlayedBefore ?? false,
            })
          }
        },
      }
    ),
    { name: 'GameStore' }
  )
)

export type { GameStore, GameState, GamePhase, Difficulty, WritingStyle } 