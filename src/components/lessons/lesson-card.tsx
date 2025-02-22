import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Lesson } from '@/types/lesson'

interface LessonCardProps {
  lesson: Lesson
}

export function LessonCard({ lesson }: LessonCardProps) {
  return (
    <Link 
      href={`/lessons/${lesson.category}/${lesson.slug}`}
      className="block"
    >
      <div className="p-4 rounded-lg border border-muted/20 hover:border-primary/20 transition-colors">
        <h3 className="font-semibold text-primary mb-2">{lesson.title}</h3>
        <p className="text-sm text-muted mb-3">{lesson.description}</p>
        <div className="flex items-center gap-3 text-xs text-muted">
          <span>{lesson.duration} min</span>
          <span>•</span>
          <span className="capitalize">{lesson.difficulty}</span>
        </div>
      </div>
    </Link>
  )
} 