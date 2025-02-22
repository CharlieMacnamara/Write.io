export function calculateBaseScore(wordCount: number, timeSpent: number): number {
  // Move shared scoring logic here
  return Math.round((wordCount / timeSpent) * 1000)
} 