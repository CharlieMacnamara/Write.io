'use client'

import { useState } from 'react'
import { useBrevityCountdownStore } from '../store/brevity-countdown-store'
import { calculateGameScore } from '../utils/scoring'
import { toast } from 'react-hot-toast'

export function SentenceEditor() {
  const { 
    currentSentence, 
    updateScore, 
    timeRemaining, 
    difficulty 
  } = useBrevityCountdownStore()
  
  const [editedSentence, setEditedSentence] = useState('')
  const [lastFeedback, setLastFeedback] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      const result = await calculateGameScore(
        currentSentence,
        editedSentence,
        timeRemaining,
        difficulty
      )

      if (!result.isValid) {
        toast.error('Meaning not preserved. Try again!')
      } else {
        updateScore(result.points)
        toast.success(
          <div className="space-y-2">
            <div className="font-bold">Score: +{result.points}</div>
            <div className="text-sm opacity-80">
              Base: {result.breakdown.basePoints}
              {result.breakdown.lengthBonus > 0 && ` + Length: ${result.breakdown.lengthBonus}`}
              {result.breakdown.meaningScore > 0 && ` + Meaning: ${result.breakdown.meaningScore}`}
              {result.breakdown.timeBonus > 0 && ` + Time: ${result.breakdown.timeBonus}`}
              {` × ${result.breakdown.difficultyMultiplier}`}
            </div>
          </div>
        )
      }

      setLastFeedback(result.feedback)
      if (result.isValid) {
        setEditedSentence('')
      }
    } catch (error) {
      toast.error('Error checking sentence. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="card bg-base-200 p-4">
        <h3 className="font-bold mb-2">Original Sentence:</h3>
        <p>{currentSentence}</p>
      </div>

      <div className="form-control">
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="Enter your shorter version..."
          value={editedSentence}
          onChange={(e) => setEditedSentence(e.target.value)}
          disabled={isSubmitting}
        />
        {lastFeedback.length > 0 && (
          <div className="mt-2">
            {lastFeedback.map((feedback, index) => (
              <div 
                key={index} 
                className={`text-sm ${
                  feedback.includes('not preserve') ? 'text-error' : 'text-info'
                }`}
              >
                {feedback}
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={!editedSentence || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="loading loading-spinner"></span>
            Checking...
          </>
        ) : (
          'Submit'
        )}
      </button>
    </div>
  )
} 