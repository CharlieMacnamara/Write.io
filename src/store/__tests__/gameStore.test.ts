import { act } from '@testing-library/react'
import { useGameStore } from '../gameStore'
import { renderHook } from '@testing-library/react'

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

describe('Game Store', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useGameStore())
    expect(result.current.phase).toBe('SELECT_DIFFICULTY')
    expect(result.current.score).toBe(0)
    expect(result.current.timeLeft).toBe(60)
  })

  it('should set difficulty and transition to READY_TO_START', () => {
    const { result } = renderHook(() => useGameStore())
    act(() => {
      result.current.actions.setDifficulty('medium')
    })
    expect(result.current.difficulty).toBe('medium')
    expect(result.current.phase).toBe('READY_TO_START')
  })

  it('should start the game and transition to GAME_ACTIVE', async () => {
    const { result } = renderHook(() => useGameStore())
    act(() => {
      result.current.actions.setDifficulty('easy')
    })
    await act(async () => {
      await result.current.actions.startGame()
    })
    expect(result.current.phase).toBe('GAME_ACTIVE')
    expect(result.current.currentSentence).toBeDefined()
  })

  it('should submit an edit and update score', async () => {
    const { result } = renderHook(() => useGameStore())
    act(() => {
      result.current.actions.setDifficulty('easy')
    })
    await act(async () => {
      await result.current.actions.startGame()
    })
    const originalSentence = result.current.currentSentence
    const editedSentence = originalSentence + " Edited."
    const resultValidation = result.current.actions.submitEdit(editedSentence)
    expect(resultValidation.isValid).toBe(true)
    expect(result.current.score).toBeGreaterThan(0)
  })
}) 