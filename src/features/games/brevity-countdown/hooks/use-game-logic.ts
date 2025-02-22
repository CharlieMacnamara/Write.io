import { useCallback } from 'react'
import { useBrevityCountdownStore } from '../store/brevity-countdown-store'
import { generateSentence } from '../services/sentence-service'

export function useGameLogic() {
  const {
    setCurrentSentence,
    setError,
    setLoading,
    difficulty
  } = useBrevityCountdownStore()

  const initializeGame = useCallback(async () => {
    try {
      setLoading(true)
      const sentence = await generateSentence({ difficulty })
      setCurrentSentence(sentence)
    } catch (error) {
      setError('Failed to start game. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [difficulty, setCurrentSentence, setError, setLoading])

  return { initializeGame }
} 