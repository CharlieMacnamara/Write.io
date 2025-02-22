'use client'

import { useState } from 'react'
import { useBrevityCountdownStore } from '../store/brevity-countdown-store'
import { calculateScore } from '../services/sentence-service'

export function SentenceEditor() {
  const { currentSentence, updateScore } = useBrevityCountdownStore()
  const [editedSentence, setEditedSentence] = useState('')

  const handleSubmit = () => {
    const points = calculateScore(currentSentence, editedSentence)
    updateScore(points)
    setEditedSentence('')
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
        />
      </div>

      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={!editedSentence}
      >
        Submit
      </button>
    </div>
  )
} 