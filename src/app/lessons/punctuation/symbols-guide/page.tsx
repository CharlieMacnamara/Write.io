import { notFound } from 'next/navigation'
import { getLessonBySlug } from '@/lib/mdx/get-lesson'
import { LessonLayout } from '@/components/lesson/lesson-layout'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/lib/mdx/mdx-components'

export default async function SymbolsGuidePage() {
  const lesson = await getLessonBySlug('punctuation/symbols-guide')
  
  if (!lesson) {
    notFound()
  }

  return (
    <LessonLayout>
      <article className="prose dark:prose-invert max-w-none">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-3">
            {lesson.title}
          </h1>
          <p className="text-lg text-muted">
            {lesson.description}
          </p>
        </header>

        <div className="mt-8">
          <MDXRemote 
            source={lesson.content}
            components={mdxComponents}
            options={{
              parseFrontmatter: true,
              mdxOptions: {
                development: process.env.NODE_ENV === 'development'
              }
            }}
          />
        </div>
      </article>
    </LessonLayout>
  )
} 