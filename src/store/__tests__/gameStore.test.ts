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

  it('should set difficulty and update phase', () => {
    act(() => {
      useGameStore.getState().actions.setDifficulty('hard')
    })
    
    const state = useGameStore.getState()
    expect(state.difficulty).toBe('hard')
    expect(state.phase).toBe('GAME_START')
  })

  it('should not start game without selecting difficulty', async () => {
    await expect(useGameStore.getState().actions.startGame()).rejects.toThrow('Please select difficulty first')
  })

  it('should start game after selecting difficulty', async () => {
    act(() => {
      useGameStore.getState().actions.setDifficulty('medium')
    })

    await act(async () => {
      await useGameStore.getState().actions.startGame()
    })

    const state = useGameStore.getState()
    expect(state.phase).toBe('GAME_ACTIVE')
    expect(state.isLoading).toBe(false)
  })
}) 