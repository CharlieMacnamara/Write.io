import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BrevityCountdownState {
  score: number
  highScore: number
  setScore: (score: number) => void
}

export const useBrevityCountdownStore = create<BrevityCountdownState>()(
  persist(
    (set) => ({
      score: 0,
      highScore: 0,
      setScore: (score: number) => set({ score }),
    }),
    {
      name: 'brevity-countdown-store'
    }
  )
) 