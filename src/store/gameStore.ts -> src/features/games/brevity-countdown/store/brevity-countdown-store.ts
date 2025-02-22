import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BrevityCountdownState {
  score: number
  highScore: number
  setScore: (score: number) => void
  // ... other existing state
}

export const useBrevityCountdownStore = create<BrevityCountdownState>()(
  persist(
    (set) => ({
      score: 0,
      highScore: 0,
      setScore: (score) => set({ score }),
      // ... other existing implementation
    }),
    {
      name: 'brevity-countdown-store'
    }
  )
) 