import { getAllLessons } from '@/lib/mdx/get-lesson'
import { LessonCard } from '@/components/lessons/lesson-card'
import type { Lesson, LessonCategory } from '@/types/lesson'

export default async function LessonsPage() {
  const lessons = await getAllLessons()
  
  const initialCategories: Record<LessonCategory, Lesson[]> = {
    punctuation: [],
    grammar: [],
    style: [],
    structure: [],
    uncategorized: []
  }
  
  const lessonsByCategory = lessons.reduce<Record<LessonCategory, Lesson[]>>((acc, lesson) => {
    const category = lesson.category || 'uncategorized'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(lesson)
    return acc
  }, initialCategories)

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-8">Writing Lessons</h1>
        
        {Object.entries(lessonsByCategory).map(([category, categoryLessons]) => (
          categoryLessons.length > 0 && (
            <section key={category} className="mb-12">
              <h2 className="text-2xl font-semibold text-primary mb-4 capitalize">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryLessons.map((lesson: Lesson) => (
                  <LessonCard key={lesson.slug} lesson={lesson} />
                ))}
              </div>
            </section>
          )
        ))}
      </div>
    </main>
  )
} 