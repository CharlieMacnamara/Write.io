import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)

interface MeaningCheckResult {
  score: number
  feedback: string[]
  isPreserved: boolean
}

const MEANING_CHECK_PROMPT = `
You are a precise meaning comparison tool. Compare these sentences and determine if the edited version maintains the EXACT same core meaning.

Original: "{original}"
Edited: "{edited}"

Rules:
1. The edited sentence must convey the EXACT same key information
2. No important details should be lost or changed
3. Context and implications must remain identical
4. Only the way of expressing the meaning should differ

Respond in JSON format:
{
  "score": <0-100 based on meaning preservation>,
  "isPreserved": <true only if meaning is exactly preserved>,
  "feedback": ["Specific details about what meaning was lost or changed, if any"]
}
`

export async function checkMeaningPreservation(
  original: string,
  edited: string
): Promise<MeaningCheckResult> {
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-pro',
    generationConfig: {
      temperature: 0.1, // Very low temperature for consistent evaluation
      maxOutputTokens: 150,
      topP: 0.1,
      topK: 10
    }
  })

  const prompt = MEANING_CHECK_PROMPT
    .replace('{original}', original)
    .replace('{edited}', edited)

  const result = await model.generateContent(prompt)
  const response = await result.response
  const analysis = JSON.parse(response.text())

  return {
    score: analysis.score,
    feedback: Array.isArray(analysis.feedback) ? analysis.feedback : [analysis.feedback],
    isPreserved: analysis.isPreserved
  }
} 