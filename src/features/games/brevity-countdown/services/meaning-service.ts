import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)

interface MeaningCheckResult {
  score: number
  feedback: string[]
  isPreserved: boolean
}

const MEANING_CHECK_PROMPT = `
Compare these two sentences and evaluate if the edited version maintains the core meaning of the original.
Focus on:
1. Key information preserved
2. No significant meaning changes
3. Clarity maintained

Original: "{original}"
Edited: "{edited}"

Respond in JSON format:
{
  "score": <number 0-100>,
  "isPreserved": <boolean>,
  "feedback": [<specific feedback points>]
}
`

export async function checkMeaningPreservation(
  original: string,
  edited: string
): Promise<MeaningCheckResult> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const prompt = MEANING_CHECK_PROMPT
      .replace('{original}', original)
      .replace('{edited}', edited)

    const result = await model.generateContent(prompt)
    const response = await result.response
    const analysis = JSON.parse(response.text())

    return {
      score: analysis.score,
      feedback: analysis.feedback,
      isPreserved: analysis.isPreserved
    }
  } catch (error) {
    console.error('Error checking meaning preservation:', error)
    // Fallback to basic comparison if API fails
    return fallbackMeaningCheck(original, edited)
  }
}

function fallbackMeaningCheck(original: string, edited: string): MeaningCheckResult {
  const originalWords = new Set(original.toLowerCase().split(/\W+/).filter(Boolean))
  const editedWords = new Set(edited.toLowerCase().split(/\W+/).filter(Boolean))
  
  const keyWordsPreserved = Array.from(originalWords)
    .filter(word => editedWords.has(word))
    .length
  
  const score = Math.min(100, Math.floor((keyWordsPreserved / originalWords.size) * 100))
  
  return {
    score,
    isPreserved: score >= 70,
    feedback: [
      score < 70 ? 'Key words missing from the original meaning' : 'Basic meaning check passed'
    ]
  }
} 