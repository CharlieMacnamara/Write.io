import { SentenceService } from '../sentence-service'
import { generateSentence } from '../../gemini'

// Mock the Gemini API
jest.mock('../../gemini', () => ({
  generateSentence: jest.fn()
}))

describe('SentenceService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('generateGameSentence', () => {
    it('generates sentences matching difficulty criteria', async () => {
      const mockSentence = {
        easy: 'In today\'s business world, companies need to adapt quickly to technological changes.',
        medium: 'Given the rapid advancement of artificial intelligence technologies, businesses are actively seeking to integrate these solutions into existing workflows.',
        hard: 'In light of recent developments in artificial intelligence and machine learning algorithms, companies are increasingly focusing on implementing these cutting-edge solutions into existing processes.',
      }

      // Test each difficulty level
      for (const difficulty of ['easy', 'medium', 'hard'] as const) {
        ;(generateSentence as jest.Mock).mockResolvedValueOnce(mockSentence[difficulty])
        
        const result = await SentenceService.generateGameSentence(difficulty)
        
        // Verify word count meets criteria
        const config = {
          easy: { min: 20, max: 30 },
          medium: { min: 30, max: 40 },
          hard: { min: 40, max: 50 },
        }[difficulty]
        
        const metrics = result.metrics
        expect(metrics.wordCount).toBeGreaterThanOrEqual(config.min)
        expect(metrics.wordCount).toBeLessThanOrEqual(config.max)
        
        // Verify target word count calculation
        const expectedReduction = {
          easy: 0.3,
          medium: 0.4,
          hard: 0.5,
        }[difficulty]
        
        const expectedTarget = Math.ceil(metrics.wordCount * (1 - expectedReduction))
        expect(result.targetWordCount).toBe(expectedTarget)
      }
    })

    it('retries generation if sentence length criteria not met', async () => {
      const shortSentence = 'This is too short.'
      const goodSentence = 'In today\'s business world, companies need to adapt quickly to technological changes.'
      
      ;(generateSentence as jest.Mock)
        .mockResolvedValueOnce(shortSentence)
        .mockResolvedValueOnce(goodSentence)
      
      const result = await SentenceService.generateGameSentence('easy')
      
      expect(generateSentence).toHaveBeenCalledTimes(2)
      expect(result.original).toBe(goodSentence)
    })
  })

  describe('validateEdit', () => {
    it('calculates correct score and feedback for valid edit', () => {
      const original = 'In today\'s rapidly evolving business environment, companies are increasingly looking to implement new technological solutions to improve their operational efficiency.'
      const edited = 'Companies are implementing new technology to improve efficiency.'
      const targetWordCount = 10

      const result = SentenceService.validateEdit(original, edited, targetWordCount)

      expect(result.isValid).toBe(true)
      expect(result.score).toBeGreaterThan(0)
      expect(result.feedback.length).toBeGreaterThan(0)
    })

    it('invalidates edits that change meaning too much', () => {
      const original = 'Companies need to adapt to technological changes.'
      const edited = 'Dogs like to play in the park.' // Completely different meaning
      const targetWordCount = 5

      const result = SentenceService.validateEdit(original, edited, targetWordCount)

      expect(result.isValid).toBe(false)
    })
  })
}) 