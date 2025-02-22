import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

export interface Lesson {
  id: string
  slug: string
  title: string
  description: string
  content: MDXRemoteSerializeResult
  category: LessonCategory
  difficulty: LessonDifficulty
  duration: number // in minutes
  prerequisites?: string[]
}

export type LessonCategory = 
  | 'punctuation'
  | 'grammar'
  | 'style'
  | 'structure'

export type LessonDifficulty = 
  | 'beginner'
  | 'intermediate'
  | 'advanced'

export interface LessonProgress {
  lessonId: string
  completed: boolean
  lastAccessed: Date
  score?: number
}

export interface LessonState {
  currentLesson?: Lesson
  progress: Record<string, LessonProgress>
  isLoading: boolean
}

export interface LessonActions {
  startLesson: (lessonId: string) => Promise<void>
  completeLesson: (lessonId: string, score?: number) => void
  resetProgress: () => void
}

export interface LessonStore extends LessonState {
  actions: LessonActions
} 