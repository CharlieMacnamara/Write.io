import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { mdxComponents } from './mdx-components'
import type { Lesson } from '@/types/lesson'

const LESSONS_PATH = path.join(process.cwd(), 'src/app/lessons')

export async function getLessonBySlug(slug: string): Promise<Lesson | null> {
  try {
    // Look for MDX file in the lessons directory structure
    const mdxFile = path.join(LESSONS_PATH, `${slug}.mdx`)
    if (!fs.existsSync(mdxFile)) {
      // Try nested directory structure
      const nestedFile = await findMdxFile(LESSONS_PATH, slug)
      if (!nestedFile) return null
      return await loadLesson(nestedFile, slug)
    }
    
    return await loadLesson(mdxFile, slug)
  } catch (error) {
    console.error(`Failed to get lesson ${slug}:`, error)
    return null
  }
}

async function loadLesson(filePath: string, slug: string): Promise<Lesson> {
  const fileContent = await fs.promises.readFile(filePath, 'utf8')
  
  const { content, frontmatter } = await compileMDX({
    source: fileContent,
    components: mdxComponents,
    options: { 
      parseFrontmatter: true,
      mdxOptions: {
        development: process.env.NODE_ENV === 'development'
      }
    }
  })

  return {
    id: slug,
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    content,
    category: frontmatter.category,
    difficulty: frontmatter.difficulty,
    duration: frontmatter.duration,
    prerequisites: frontmatter.prerequisites,
  }
}

export async function getAllLessons(): Promise<Lesson[]> {
  const lessons: Lesson[] = []
  
  async function scanDirectory(dir: string) {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      
      if (entry.isDirectory() && entry.name !== '[slug]') {
        await scanDirectory(fullPath)
      } else if (entry.name.endsWith('.mdx')) {
        const slug = path.relative(LESSONS_PATH, fullPath)
          .replace(/\.mdx$/, '')
          .replace(/\\/g, '/')
        
        const lesson = await loadLesson(fullPath, slug)
        if (lesson) lessons.push(lesson)
      }
    }
  }

  await scanDirectory(LESSONS_PATH)
  return lessons
}

async function findMdxFile(dir: string, slug: string): Promise<string | null> {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true })
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    
    if (entry.isDirectory() && entry.name !== '[slug]') {
      const found = await findMdxFile(fullPath, slug)
      if (found) return found
    } else if (
      entry.name.endsWith('.mdx') && 
      entry.name.replace(/\.mdx$/, '') === slug.split('/').pop()
    ) {
      return fullPath
    }
  }
  
  return null
} 