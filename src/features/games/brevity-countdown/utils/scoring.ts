import { checkMeaningPreservation } from '../services/meaning-service'

interface ScoringResult {
  points: number
  breakdown: {
    basePoints: number
    lengthBonus: number
    meaningScore: number
    timeBonus: number
    difficultyMultiplier: number
  }
  feedback: string[]
  isValid: boolean
}

const DIFFICULTY_MULTIPLIERS = {
  easy: 1,
  medium: 1.5,
  hard: 2
} as const

export async function calculateGameScore(
  originalSentence: string,
  editedSentence: string,
  timeRemaining: number,
  difficulty: keyof typeof DIFFICULTY_MULTIPLIERS
): Promise<ScoringResult> {
  const originalWords = originalSentence.split(' ').length
  const editedWords = editedSentence.split(' ').length
  const reduction = originalWords - editedWords
  const feedback: string[] = []

  // Check meaning preservation first
  const meaningCheck = await checkMeaningPreservation(originalSentence, editedSentence)
  
  // If meaning is not preserved, return early with minimal points
  if (!meaningCheck.isPreserved) {
    return {
      points: 0,
      breakdown: {
        basePoints: 0,
        lengthBonus: 0,
        meaningScore: meaningCheck.score,
        timeBonus: 0,
        difficultyMultiplier: DIFFICULTY_MULTIPLIERS[difficulty]
      },
      feedback: [
        'The edited sentence does not preserve the original meaning.',
        ...meaningCheck.feedback
      ],
      isValid: false
    }
  }

  // Base scoring: 10 points per word reduced
  const basePoints = Math.max(0, reduction * 10)
  if (basePoints === 0) {
    feedback.push('Try reducing more words while keeping the meaning.')
  }

  // Length efficiency bonus
  const targetLength = {
    easy: originalWords * 0.7,
    medium: originalWords * 0.6,
    hard: originalWords * 0.5
  }[difficulty]
  
  const lengthBonus = editedWords <= targetLength ? 25 : 0
  if (lengthBonus) {
    feedback.push('Great conciseness! You hit the target length.')
  }

  // Time bonus: up to 50 points based on remaining time
  const timeBonus = Math.floor((timeRemaining / 60) * 50)
  if (timeBonus > 30) {
    feedback.push('Quick work! Time bonus earned.')
  }

  // Apply difficulty multiplier
  const difficultyMultiplier = DIFFICULTY_MULTIPLIERS[difficulty]

  // Calculate total points
  const points = Math.floor(
    (basePoints + lengthBonus + meaningCheck.score + timeBonus) * difficultyMultiplier
  )

  return {
    points,
    breakdown: {
      basePoints,
      lengthBonus,
      meaningScore: meaningCheck.score,
      timeBonus,
      difficultyMultiplier
    },
    feedback: [...feedback, ...meaningCheck.feedback],
    isValid: true
  }
} 