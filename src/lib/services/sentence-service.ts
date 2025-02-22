import { Difficulty } from '@/types/game'
import { generateSentence } from '../gemini'

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
  private static calculateMetrics(sentence: string): SentenceMetrics {
    const words = sentence.split(/\s+/).filter(Boolean)
    const complexity = words.filter(word => word.length > 6).length / words.length
    const readability = sentence.length / words.length // Average word length

    return {
      wordCount: words.length,
      complexity,
      readability,
    }
  }

  static async generateGameSentence(difficulty: Difficulty): Promise<SentenceWithMetrics> {
    const config = difficultyConfig[difficulty]
    let sentence = await generateSentence(difficulty)
    let metrics = this.calculateMetrics(sentence)
    
    // Ensure sentence meets difficulty criteria
    let attempts = 0
    while (
      (metrics.wordCount < config.minWords || 
       metrics.wordCount > config.maxWords) && 
      attempts < 3
    ) {
      sentence = await generateSentence(difficulty)
      metrics = this.calculateMetrics(sentence)
      attempts++
    }

    const targetWordCount = Math.ceil(
      metrics.wordCount * (1 - config.targetReduction)
    )

    return {
      original: sentence,
      metrics,
      targetWordCount,
    }
  }

  static validateEdit(
    original: string,
    edited: string,
    targetWordCount: number
  ): {
    isValid: boolean
    score: number
    feedback: string[]
  } {
    const originalMetrics = this.calculateMetrics(original)
    const editedMetrics = this.calculateMetrics(edited)
    const feedback: string[] = []

    // Calculate meaning preservation (simplified version)
    const originalWords = original.toLowerCase().split(/\s+/)
    const editedWords = edited.toLowerCase().split(/\s+/)
    const commonWords = originalWords.filter(word => 
      editedWords.includes(word)
    )
    const meaningPreservation = commonWords.length / originalWords.length

    // Calculate base score
    let score = 0
    const wordsReduced = originalMetrics.wordCount - editedMetrics.wordCount
    
    if (wordsReduced > 0) {
      score += wordsReduced * 2 // 2 points per word reduced
      feedback.push(`+${wordsReduced * 2} points for reducing ${wordsReduced} words`)
    }

    // Meaning preservation bonus
    if (meaningPreservation >= 0.7) {
      score += 5
      feedback.push('+5 points for maintaining core meaning')
    }

    // Target word count bonus
    if (editedMetrics.wordCount <= targetWordCount) {
      score += 10
      feedback.push('+10 points for meeting target length')
    }

    // Readability improvement bonus
    if (editedMetrics.readability < originalMetrics.readability) {
      score += 5
      feedback.push('+5 points for improving readability')
    }

    return {
      isValid: meaningPreservation >= 0.6 && editedMetrics.wordCount < originalMetrics.wordCount,
      score,
      feedback,
    }
  }
} 