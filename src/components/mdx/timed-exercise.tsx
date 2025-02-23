'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useExerciseStore } from '@/stores/exercise-store'
import { toast } from 'react-hot-toast'

interface TimedExerciseProps {
  duration: number // in seconds
  wordLimit: number
  prompt: string
  rules: string[]
}

export function TimedExercise({
  duration,
  wordLimit,
  prompt,
  rules
}: TimedExerciseProps) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [text, setText] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const { saveProgress } = useExerciseStore()

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(time => time - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else if (timeLeft === 0 && isActive) {
      handleComplete()
    }
  }, [isActive, timeLeft])

  const handleStart = () => {
    setIsActive(true)
    toast.success('Timer started! Good luck!')
  }

  const handleComplete = () => {
    setIsActive(false)
    setIsComplete(true)
    saveProgress({
      type: 'timed',
      id: prompt,
      completed: true
    })
    toast.success('Time\'s up! Exercise completed.')
  }

  return (
    <div className="my-6 rounded-lg border border-base-300 p-4">
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Timed Exercise</h3>
          <span className="text-primary font-mono">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>
        
        <progress 
          className="progress progress-primary w-full mt-2" 
          value={timeLeft} 
          max={duration}
        />
      </div>

      <p className="mb-4">{prompt}</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={!isActive || isComplete}
        className="textarea textarea-bordered w-full min-h-[150px]"
        placeholder={isActive ? "Start typing..." : "Click Start to begin"}
      />

      <div className="mt-4 flex justify-end">
        {!isActive && !isComplete && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="btn btn-primary"
          >
            Start
          </motion.button>
        )}
      </div>
    </div>
  )
} 