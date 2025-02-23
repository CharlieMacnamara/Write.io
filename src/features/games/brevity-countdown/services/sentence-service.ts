import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)

interface GenerateSentenceOptions {
  difficulty: 'easy' | 'medium' | 'hard'
}

// More focused prompts for better sentence generation
const DIFFICULTY_PROMPTS = {
  easy: `Generate a simple sentence with obvious redundancies that can be easily removed.
Rules:
- Use 12-15 words
- Include "that is" or "which is" phrases
- Use redundant adjectives
- Keep subject matter simple and concrete
Example: "The red car, which is parked in the driveway, is very fast in speed."
Respond with only the sentence.`,

  medium: `Generate a sentence with clear redundancies but more complex structure.
Rules:
- Use 15-20 words
- Include "due to the fact that" or similar phrases
- Use formal language where simpler words would work
- Include one subordinate clause
Example: "Due to the fact that it was raining outside, the students quickly rushed inside the school building."
Respond with only the sentence.`,

  hard: `Generate a complex sentence with multiple opportunities for reduction.
Rules:
- Use 20-25 words
- Include multiple redundant formal phrases
- Use unnecessarily complex language
- Include multiple clauses
Example: "In light of the fact that the meeting was scheduled for a later time, the team members proceeded to continue their work."
Respond with only the sentence.`
}

// Expanded fallback sentences with clearer redundancies
const FALLBACK_SENTENCES = {
  easy: [
    'The blue book, which is sitting on the desk, is very large in size.',
    'The cat that is sleeping on the couch is black in color.',
    'The hot coffee, which is in the mug, has steam rising up from it.'
  ],
  medium: [
    'Due to the fact that the movie was long, the audience became tired and fatigued.',
    'The student made the decision to study for the reason that the test was important.',
    'In spite of the fact that it was cold, they went outside to play games.'
  ],
  hard: [
    'Taking into consideration the fact that the deadline was approaching near, the team made the decision to work additional extra hours.',
    'Despite the fact that the circumstances were challenging and difficult, the company still managed to achieve its goals and objectives.',
    'In light of the fact that the weather conditions were unfavorable, the outdoor event was subsequently postponed to a later date.'
  ]
} as const

export async function generateSentence({ difficulty }: GenerateSentenceOptions): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-pro',
      generationConfig: {
        temperature: 0.9, // Higher temperature for more variety
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 100
      }
    })

    const prompt = DIFFICULTY_PROMPTS[difficulty]
    const result = await model.generateContent(prompt)
    const response = await result.response
    const sentence = response.text().trim()

    // Validate the generated sentence
    if (isValidSentence(sentence, difficulty)) {
      return sentence
    }
    
    console.warn('Generated sentence did not meet criteria, using fallback')
    return getRandomFallbackSentence(difficulty)
  } catch (error) {
    console.error('Error generating sentence:', error)
    return getRandomFallbackSentence(difficulty)
  }
}

function isValidSentence(sentence: string, difficulty: keyof typeof FALLBACK_SENTENCES): boolean {
  const wordCount = sentence.split(' ').length
  const minWords = difficulty === 'easy' ? 12 : difficulty === 'medium' ? 15 : 20
  const maxWords = difficulty === 'easy' ? 15 : difficulty === 'medium' ? 20 : 25
  
  return (
    wordCount >= minWords &&
    wordCount <= maxWords &&
    sentence.endsWith('.') &&
    !sentence.includes('\n') &&
    !sentence.includes('Example:') &&
    !sentence.includes('Generate')
  )
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