import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { mdxComponents } from './mdx-components'
import type { Lesson } from '@/types/lesson'
import { readFile } from 'fs/promises'
import matter from 'gray-matter'

const LESSONS_PATH = path.join(process.cwd(), 'src/app/lessons')

export async function getLessonBySlug(slug: string): Promise<Lesson | null> {
  try {
    const mdxFile = path.join(LESSONS_PATH, slug, 'content.mdx')
    
    if (!fs.existsSync(mdxFile)) {
      console.error(`No MDX file found at: ${mdxFile}`)
      return null
    }

    const fileContent = await fs.promises.readFile(mdxFile, 'utf8')
    const { content, data: frontmatter } = matter(fileContent)

    return {
      id: slug,
      slug,
      title: frontmatter.title,
      description: frontmatter.description,
      content,
      category: frontmatter.category || slug.split('/')[0],
      difficulty: frontmatter.difficulty,
      duration: frontmatter.duration,
      prerequisites: frontmatter.prerequisites || [],
    }
  } catch (error) {
    console.error(`Failed to get lesson ${slug}:`, error)
    return null
  }
}

async function loadLesson(filePath: string, slug: string): Promise<Lesson | null> {
  try {
    const fileContent = await fs.promises.readFile(filePath, 'utf8')
    const { content, data: frontmatter } = matter(fileContent)
    
    const { content: compiledContent } = await compileMDX({
      source: content,
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
      title: frontmatter.title || 'Untitled Lesson',
      description: frontmatter.description || '',
      content: compiledContent,
      category: frontmatter.category || slug.split('/')[0],
      difficulty: frontmatter.difficulty || 'beginner',
      duration: frontmatter.duration || 0,
      prerequisites: frontmatter.prerequisites || [],
    }
  } catch (error) {
    console.error(`Failed to load lesson ${slug}:`, error)
    return null
  }
}

export async function getAllLessons(): Promise<Lesson[]> {
  const lessons: Lesson[] = []

  async function scanDirectory(dir: string) {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('_') && entry.name !== 'api') {
        const fullPath = path.join(dir, entry.name)
        const contentPath = path.join(fullPath, 'content.mdx')

        if (fs.existsSync(contentPath)) {
          const relativePath = path.relative(LESSONS_PATH, fullPath)
          const lesson = await getLessonBySlug(relativePath)
          if (lesson) {
            lessons.push(lesson)
          }
        }

        await scanDirectory(fullPath)
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

export async function getLessonContent(slug: string) {
  try {
    const fullPath = path.join(
      process.cwd(), 
      'src/app/lessons', 
      slug,
      'content.mdx'
    )
    
    const fileContents = await readFile(fullPath, 'utf8')
    const { content, data } = matter(fileContents)
    
    const { content: compiledContent } = await compileMDX({
      source: content,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          development: process.env.NODE_ENV === 'development'
        }
      }
    })
    
    return {
      content: compiledContent,
      frontmatter: data
    }
  } catch (error) {
    console.error('Error loading lesson:', error)
    return null
  }
} 