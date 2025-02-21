import { act } from '@testing-library/react'
import { useGameStore } from '../gameStore'

describe('gameStore', () => {
  beforeEach(() => {
    act(() => {
      useGameStore.setState({
        highScore: 0,
        hasPlayedBefore: false,
        showTutorial: true,
        difficulty: 'medium',
        writingStyle: 'creative',
        actions: useGameStore.getState().actions,
      })
    })
  })

  it('updates high score', () => {
    act(() => {
      useGameStore.getState().actions.setHighScore(100)
    })
    expect(useGameStore.getState().highScore).toBe(100)
  })

  it('updates difficulty', () => {
    act(() => {
      useGameStore.getState().actions.setDifficulty('hard')
    })
    expect(useGameStore.getState().difficulty).toBe('hard')
  })

  it('updates writing style', () => {
    act(() => {
      useGameStore.getState().actions.setWritingStyle('non-fiction')
    })
    expect(useGameStore.getState().writingStyle).toBe('non-fiction')
  })
}) 