import { Difficulty } from '@/types/game'

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY
const API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta'
const MODEL = 'gemini-pro'

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string
      }>
    }
  }>
}

const difficultyPrompts = {
  easy: 'Generate a slightly verbose business or technology sentence (20-30 words) that can be made more concise.',
  medium: 'Generate a moderately complex business or technology sentence (30-40 words) with redundant phrases that can be simplified.',
  hard: 'Generate a very verbose business or technology sentence (40-50 words) with multiple redundancies and complex structure that needs significant simplification.',
}

const fallbackSentences = {
  easy: 'In today\'s fast-paced business environment, companies are increasingly looking to implement new technological solutions to improve their operational efficiency.',
  medium: 'Given the rapid advancement and continuous evolution of artificial intelligence technologies in recent years, businesses are actively seeking to integrate these innovative solutions into their existing workflows.',
  hard: 'In light of recent developments and ongoing technological advancements in the field of artificial intelligence and machine learning algorithms, companies are increasingly focusing their efforts on implementing and integrating these cutting-edge solutions into their existing business processes and workflows.',
}

export async function generateSentence(difficulty: Difficulty): Promise<string> {
  if (!API_KEY) {
    throw new Error('Gemini API key not configured')
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: difficultyPrompts[difficulty],
            }],
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 100,
          },
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
          ],
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    const data: GeminiResponse = await response.json()
    
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format from Gemini API')
    }

    const sentence = data.candidates[0].content.parts[0].text.trim()
    
    // Validate sentence
    if (!sentence || sentence.length < 10) {
      throw new Error('Generated sentence is too short or empty')
    }

    return sentence
  } catch (error) {
    console.error('Gemini API error:', error)
    // Use fallback sentences in production, but throw in development
    if (process.env.NODE_ENV === 'development') {
      throw error
    }
    return fallbackSentences[difficulty]
  }
} 