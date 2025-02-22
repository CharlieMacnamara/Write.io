import { Difficulty } from '@/types/game'
import { generateSentence as generateAISentence } from '../gemini'
import type { EditValidation } from '@/types/game'

interface SentenceMetrics {
  wordCount: number
  complexity: number
  readability: number
}

interface SentenceWithMetrics {
  original: string
  metrics: SentenceMetrics
  targetWordCount: number
}

const difficultyConfig = {
  easy: {
    minWords: 20,
    maxWords: 30,
    targetReduction: 0.3, // 30% reduction target
  },
  medium: {
    minWords: 30,
    maxWords: 40,
    targetReduction: 0.4, // 40% reduction target
  },
  hard: {
    minWords: 40,
    maxWords: 50,
    targetReduction: 0.5, // 50% reduction target
  },
}

export class SentenceService {
  static async generateSentence(difficulty: Difficulty | null): Promise<{ sentence: string; targetWordCount: number }> {
    // For now, return a test sentence while AI integration is pending
    const testSentences = {
      easy: "Despite the rain, he went for his morning jog in the park.",
      medium: "Despite the fact that it was raining heavily outside, he nevertheless decided to proceed with going for his daily morning jog around the neighborhood park.",
      hard: "Notwithstanding the clearly observable meteorological phenomenon of substantial precipitation occurring in the immediate vicinity, the individual in question made the determination to proceed with his regularly scheduled cardiovascular exercise routine in the local recreational area.",
    }

    const config = difficulty ? difficultyConfig[difficulty] : difficultyConfig.medium
    const sentence = difficulty ? testSentences[difficulty] : testSentences.medium
    const wordCount = sentence.split(/\s+/).length
    const targetWordCount = Math.ceil(wordCount * (1 - config.targetReduction))

    return {
      sentence,
      targetWordCount
    }
  }

  static validateEdit(original: string, edited: string, targetWordCount: number): EditValidation {
    const originalWords = original.trim().split(/\s+/).length
    const editedWords = edited.trim().split(/\s+/).length
    const wordsReduced = originalWords - editedWords

    // Basic validation rules
    if (editedWords > originalWords) {
      return {
        isValid: false,
        score: 0,
        feedback: "Edit should reduce word count"
      }
    }

    if (editedWords < targetWordCount) {
      return {
        isValid: false,
        score: 0,
        feedback: "Too many words removed - meaning may be lost"
      }
    }

    // Calculate score
    let score = wordsReduced * 2 // Base points
    score += 5 // Clarity bonus
    
    if (editedWords === targetWordCount) {
      score += 10 // Perfect length bonus
    }

    return {
      isValid: true,
      score,
      feedback: "Great job! Sentence is more concise."
    }
  }
} 