'use client'

import { useState, useEffect } from 'react'
import { useExerciseStore } from '@/stores/exercise-store'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { cn } from '@/lib/utils'

interface TextPracticeProps {
  original: string
  rules: string[]
  wordLimit: number
  hint?: string
}

export function TextPractice({ original, rules, wordLimit, hint }: TextPracticeProps) {
  const [text, setText] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [isValid, setIsValid] = useState(false)
  const { saveProgress, getProgress } = useExerciseStore()

  useEffect(() => {
    const words = text.trim().split(/\s+/).length
    setWordCount(text ? words : 0)
    
    // Basic validation - can be expanded based on rules
    const hasRequiredPunctuation = rules.every(rule => {
      switch(rule) {
        case 'semicolon':
          return text.includes(';')
        case 'emDash':
          return text.includes('—')
        default:
          return true
      }
    })
    
    setIsValid(hasRequiredPunctuation && wordCount <= wordLimit)
  }, [text, rules, wordLimit])

  const handleSubmit = () => {
    if (isValid) {
      saveProgress({ type: 'text', id: original, completed: true })
      toast.success('Great work! Exercise completed.')
    } else {
      toast.error('Please check the requirements and try again.')
    }
  }

  return (
    <div className="my-6 rounded-lg border border-base-300 p-4">
      <div className="mb-4">
        <p className="text-sm text-base-content/70">Original text:</p>
        <p className="mt-1 font-medium">{original}</p>
      </div>
      
      {hint && (
        <div className="mb-4 text-sm text-info">
          <p>💡 {hint}</p>
        </div>
      )}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="textarea textarea-bordered w-full min-h-[100px]"
        placeholder="Type your answer here..."
      />

      <div className="mt-2 flex justify-between items-center">
        <span className={cn(
          "text-sm",
          wordCount > wordLimit ? "text-error" : "text-base-content/70"
        )}>
          {wordCount}/{wordLimit} words
        </span>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className={cn(
            "btn btn-primary",
            !isValid && "btn-disabled"
          )}
        >
          Submit
        </motion.button>
      </div>
    </div>
  )
} 