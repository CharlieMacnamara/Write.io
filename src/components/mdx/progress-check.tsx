'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useExerciseStore } from '@/stores/exercise-store'

interface ProgressCheckProps {
  requiredScore: number
  message: string
}

export function ProgressCheck({ requiredScore, message }: ProgressCheckProps) {
  const [isComplete, setIsComplete] = useState(false)
  const progress = useExerciseStore(state => state.progress)

  useEffect(() => {
    // Calculate completion percentage based on progress
    const score = calculateScore(progress)
    setIsComplete(score >= requiredScore)
  }, [progress, requiredScore])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="my-6 p-4 rounded-lg bg-base-200"
    >
      <div className="flex items-center gap-3">
        {isComplete ? (
          <div className="text-success text-xl">✓</div>
        ) : (
          <div className="text-warning text-xl">⚠</div>
        )}
        <p>{message}</p>
      </div>
    </motion.div>
  )
}

function calculateScore(progress: any) {
  // Implementation depends on your progress tracking structure
  return 0 // Placeholder
} 