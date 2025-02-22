'use client'

export function WordCount({ original, edited }: { original: string, edited: string }) {
  const originalCount = original.trim().split(/\s+/).length
  const editedCount = edited.trim().split(/\s+/).length
  const difference = originalCount - editedCount

  return (
    <div className="absolute bottom-2 right-2 text-sm text-muted">
      <span className={difference > 0 ? 'text-success' : ''}>
        {editedCount}/{originalCount} words
      </span>
    </div>
  )
} 