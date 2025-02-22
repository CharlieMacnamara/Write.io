'use client'

import * as React from 'react'
import { useGameStore } from '@/store/gameStore'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export function GamePlay() {
  const { currentSentence, timeLeft, score, actions } = useGameStore()
  const [editedSentence, setEditedSentence] = React.useState('')

  const handleReset = () => {
    actions.resetGame()
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      {/* ... rest of the component ... */}
    </div>
  )
} 