import { getAllLessons } from '@/lib/mdx/get-lesson'
import { LessonCard } from '@/components/lessons/lesson-card'

export default async function LessonsPage() {
  const lessons = await getAllLessons()
  
  const lessonsByCategory = lessons.reduce((acc, lesson) => {
    const category = lesson.category
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(lesson)
    return acc
  }, {})

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-8">Writing Lessons</h1>
        
        {Object.entries(lessonsByCategory).map(([category, categoryLessons]) => (
          <section key={category} className="mb-12">
            <h2 className="text-2xl font-semibold text-primary mb-4 capitalize">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryLessons.map((lesson) => (
                <LessonCard key={lesson.slug} lesson={lesson} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
} 