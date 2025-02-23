'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useExerciseStore } from '@/stores/exercise-store'
import { cn } from '@/lib/utils'

interface MultipleChoiceProps {
  question: string
  options: string[]
  correct: number
  explanation: string
}

export function MultipleChoice({ 
  question, 
  options, 
  correct, 
  explanation 
}: MultipleChoiceProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const { saveProgress } = useExerciseStore()

  const handleSelect = (index: number) => {
    setSelected(index)
    setShowExplanation(true)
    
    if (index === correct) {
      saveProgress({ 
        type: 'choice', 
        id: question, 
        completed: true 
      })
    }
  }

  return (
    <div className="my-6 rounded-lg border border-base-300 p-4">
      <h3 className="text-lg font-medium mb-4">{question}</h3>
      
      <div className="space-y-2">
        {options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleSelect(index)}
            className={cn(
              "w-full p-3 rounded text-left transition",
              selected === null ? "hover:bg-base-200" :
              index === correct ? "bg-success/10 border-success" :
              selected === index ? "bg-error/10 border-error" :
              "opacity-50"
            )}
          >
            {option}
          </motion.button>
        ))}
      </div>

      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-base-200 rounded"
        >
          <p className="text-sm">{explanation}</p>
        </motion.div>
      )}
    </div>
  )
} 