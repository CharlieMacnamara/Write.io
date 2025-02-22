'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useBrevityCountdownStore } from '../store/brevity-countdown-store'
import { Timer } from './timer'
import { WordCount } from './word-count'
import { ScoreDisplay } from './score-display'
import toast from 'react-hot-toast'

interface BrevityCountdownPlayProps {
  onExit: () => void
}

export function BrevityCountdownPlay({ onExit }: BrevityCountdownPlayProps) {
  const [input, setInput] = useState('')
  const { 
    score,
    setScore,
    timeLeft,
    setTimeLeft,
    currentSentence,
    combo,
    updateCombo
  } = useBrevityCountdownStore()

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1)
      } else {
        // Game over
        onExit()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, setTimeLeft, onExit])

  const handleSubmit = () => {
    const originalWords = currentSentence.trim().split(/\s+/).length
    const editedWords = input.trim().split(/\s+/).length
    const wordsReduced = originalWords - editedWords

    if (editedWords >= originalWords) {
      toast.error('Try to reduce the word count!')
      updateCombo(false)
      return
    }

    // Calculate score based on specs
    let points = wordsReduced * 2 // Base points
    points += 5 // Clarity bonus
    points = Math.round(points * (combo >= 3 ? 3 : 1 + (combo * 0.5))) // Combo multiplier

    setScore(score + points)
    updateCombo(true)
    toast.success(`+${points} points!`)
    setInput('')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <ScoreDisplay score={score} combo={combo} />
        <Timer timeLeft={timeLeft} />
        <Button variant="outline" onClick={onExit}>Exit</Button>
      </div>

      <div className="bg-base-200 p-4 rounded mb-4">
        <h3 className="font-semibold mb-2">Original Sentence:</h3>
        <p>{currentSentence}</p>
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <textarea
            className="w-full h-32 p-4 rounded bg-base-200"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Edit the sentence to be more concise..."
          />
          <WordCount original={currentSentence} edited={input} />
        </div>
        
        <Button 
          className="w-full"
          onClick={handleSubmit}
          disabled={!input.trim()}
        >
          Submit Edit
        </Button>
      </div>
    </div>
  )
} 