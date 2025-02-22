import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LessonStore, LessonState } from '@/types/lesson'

const initialState: LessonState = {
  currentLesson: undefined,
  progress: {},
  isLoading: false,
}

export const useLessonStore = create<LessonStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      actions: {
        startLesson: async (lessonId: string) => {
          set({ isLoading: true })
          try {
            // TODO: Fetch lesson content
            set({ isLoading: false })
          } catch (error) {
            console.error('Failed to start lesson:', error)
            set({ isLoading: false })
          }
        },
        completeLesson: (lessonId: string, score?: number) => {
          set((state) => ({
            progress: {
              ...state.progress,
              [lessonId]: {
                lessonId,
                completed: true,
                lastAccessed: new Date(),
                score,
              },
            },
          }))
        },
        resetProgress: () => {
          set((state) => ({ ...state, progress: {} }))
        },
      },
    }),
    {
      name: 'lesson-storage',
      partialize: (state) => ({ progress: state.progress }),
    }
  )
) 