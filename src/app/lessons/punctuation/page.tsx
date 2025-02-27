import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote'
import { getLessonBySlug } from '@/lib/mdx/get-lesson'
import { mdxComponents } from '@/lib/mdx/mdx-components'

interface LessonPageProps {
  params: {
    slug: string
  }
}

export default async function LessonPage({ params }: LessonPageProps) {
  const lesson = await getLessonBySlug(params.slug)
  
  if (!lesson) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <article className="container mx-auto px-4 py-8 max-w-3xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-3">
            {lesson.title}
          </h1>
          <p className="text-lg text-muted">
            {lesson.description}
          </p>
        </header>

        <div className="prose dark:prose-invert max-w-none">
          <MDXRemote 
            {...lesson.content}
            components={mdxComponents}
          />
        </div>
      </article>
    </main>
  )
} 