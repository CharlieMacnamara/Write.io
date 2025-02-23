import { checkMeaningPreservation } from '../services/meaning-service'

interface ScoringResult {
  points: number
  breakdown: {
    brevityScore: number
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

// Target word reduction for each difficulty
const REDUCTION_TARGETS = {
  easy: 0.25, // 25% reduction target
  medium: 0.35, // 35% reduction target
  hard: 0.45 // 45% reduction target
} as const

export async function calculateGameScore(
  originalSentence: string,
  editedSentence: string,
  timeRemaining: number,
  difficulty: keyof typeof DIFFICULTY_MULTIPLIERS
): Promise<ScoringResult> {
  const feedback: string[] = []

  // First, check if meaning is preserved
  const meaningCheck = await checkMeaningPreservation(originalSentence, editedSentence)
  
  if (!meaningCheck.isPreserved) {
    return {
      points: 0,
      breakdown: {
        brevityScore: 0,
        meaningScore: 0,
        timeBonus: 0,
        difficultyMultiplier: DIFFICULTY_MULTIPLIERS[difficulty]
      },
      feedback: meaningCheck.feedback,
      isValid: false
    }
  }

  // Calculate brevity improvement
  const originalWords = originalSentence.split(' ').length
  const editedWords = editedSentence.split(' ').length
  const reductionPercentage = (originalWords - editedWords) / originalWords
  const targetReduction = REDUCTION_TARGETS[difficulty]

  // Calculate brevity score (0-100)
  let brevityScore: number

  if (reductionPercentage <= 0) {
    brevityScore = 0
    feedback.push('The sentence needs to be shorter.')
  } else if (reductionPercentage < targetReduction * 0.5) {
    brevityScore = Math.floor((reductionPercentage / targetReduction) * 50)
    feedback.push('More words can be removed while keeping the meaning.')
  } else if (reductionPercentage < targetReduction) {
    brevityScore = 50 + Math.floor((reductionPercentage / targetReduction) * 40)
    feedback.push('Good reduction, but you can make it even more concise.')
  } else {
    brevityScore = 90 + Math.floor(Math.min(1, (reductionPercentage - targetReduction) * 2) * 10)
    feedback.push('Excellent reduction!')
  }

  // Time bonus calculation
  const timeBonus = Math.floor((timeRemaining / 60) * 30) // Max 30 points for time

  // Calculate final score
  const points = Math.floor(
    (brevityScore + timeBonus) * DIFFICULTY_MULTIPLIERS[difficulty]
  )

  return {
    points,
    breakdown: {
      brevityScore,
      meaningScore: meaningCheck.score,
      timeBonus,
      difficultyMultiplier: DIFFICULTY_MULTIPLIERS[difficulty]
    },
    feedback,
    isValid: true
  }
} 