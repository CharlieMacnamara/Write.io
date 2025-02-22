import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)

interface GenerateSentenceOptions {
  difficulty: 'easy' | 'medium' | 'hard'
}

const DIFFICULTY_PROMPTS = {
  easy: 'Generate a simple, verbose sentence that can be made more concise. The sentence should be about 15-20 words.',
  medium: 'Generate a moderately complex sentence with unnecessary words that can be reduced. The sentence should be about 20-25 words.',
  hard: 'Generate a complex, wordy sentence that can be significantly shortened while maintaining meaning. The sentence should be about 25-30 words.'
}

const FALLBACK_SENTENCES = {
  easy: [
    'The small puppy that was brown in color ran very quickly to the food bowl that was located in the kitchen.',
    'In the morning time, she always makes sure to drink a cup of hot coffee before starting her day at work.'
  ],
  medium: [
    'The experienced professor, who has been teaching for many years at the university, gave a very detailed lecture about the historical events of World War II.',
    'Despite the fact that it was raining heavily outside, the determined athletes continued to practice their sports skills on the wet field.'
  ],
  hard: [
    'In spite of the fact that the economic conditions were extremely challenging during that particular time period, the small business managed to achieve significant growth and expansion in the market.',
    'The comprehensive research study, which was conducted over a period of several years by a team of dedicated scientists, ultimately led to the discovery of a groundbreaking new treatment method.'
  ]
}

export async function generateSentence({ difficulty }: GenerateSentenceOptions): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const prompt = DIFFICULTY_PROMPTS[difficulty]
    
    const result = await model.generateContent(prompt)
    const response = await result.response
    const sentence = response.text().trim()
    
    // Validate sentence length and structure
    if (!isValidSentence(sentence, difficulty)) {
      return getRandomFallbackSentence(difficulty)
    }
    
    return sentence
  } catch (error) {
    console.error('Error generating sentence:', error)
    return getRandomFallbackSentence(difficulty)
  }
}

function isValidSentence(sentence: string, difficulty: keyof typeof FALLBACK_SENTENCES): boolean {
  const wordCount = sentence.split(' ').length
  const minWords = difficulty === 'easy' ? 15 : difficulty === 'medium' ? 20 : 25
  const maxWords = difficulty === 'easy' ? 20 : difficulty === 'medium' ? 25 : 30
  
  return wordCount >= minWords && wordCount <= maxWords && sentence.endsWith('.')
}

function getRandomFallbackSentence(difficulty: keyof typeof FALLBACK_SENTENCES): string {
  const sentences = FALLBACK_SENTENCES[difficulty]
  return sentences[Math.floor(Math.random() * sentences.length)]
}

export function calculateScore(originalSentence: string, editedSentence: string): number {
  const originalWords = originalSentence.split(' ').length
  const editedWords = editedSentence.split(' ').length
  const reduction = originalWords - editedWords
  
  if (reduction <= 0) return 0
  
  // Base score: 10 points per word reduced
  let score = reduction * 10
  
  // Bonus for significant reductions
  if (reduction >= 5) score += 25
  if (reduction >= 10) score += 50
  
  return score
} 