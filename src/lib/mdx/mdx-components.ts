import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { RuleExample, Wrong, Right, Explanation } from '@/components/mdx/rule-example'
import { TextPractice } from '@/components/mdx/text-practice'
import { MultipleChoice } from '@/components/mdx/multiple-choice'
import { TimedExercise } from '@/components/mdx/timed-exercise'
import { ProgressCheck } from '@/components/mdx/progress-check'
import { NavigationButtons } from '@/components/mdx/navigation-buttons'

interface MDXComponentProps {
  className?: string
  children?: React.ReactNode
}

interface MDXImageProps extends MDXComponentProps {
  src: string
  alt: string
  width?: number
  height?: number
}

export const mdxComponents = {
  // Custom lesson components
  RuleExample,
  Wrong,
  Right,
  Explanation,
  TextPractice,
  MultipleChoice,
  TimedExercise,
  ProgressCheck,
  NavigationButtons,

  // Base HTML elements
  h1: ({ className, ...props }: MDXComponentProps) => (
    <h1 
      className={cn("text-3xl font-bold mt-8 mb-4", className)} 
      {...props} 
    />
  ),
  h2: ({ className, ...props }: MDXComponentProps) => (
    <h2 
      className={cn("text-2xl font-semibold mt-6 mb-3", className)} 
      {...props} 
    />
  ),
  h3: ({ className, ...props }: MDXComponentProps) => (
    <h3 
      className={cn("text-xl font-semibold mt-4 mb-2", className)} 
      {...props} 
    />
  ),
  p: ({ className, ...props }: MDXComponentProps) => (
    <p 
      className={cn("leading-7 mb-4", className)} 
      {...props} 
    />
  ),
  ul: ({ className, ...props }: MDXComponentProps) => (
    <ul 
      className={cn("list-disc list-inside mb-4 space-y-2", className)} 
      {...props} 
    />
  ),
  ol: ({ className, ...props }: MDXComponentProps) => (
    <ol 
      className={cn("list-decimal list-inside mb-4 space-y-2", className)} 
      {...props} 
    />
  ),
  li: ({ className, ...props }: MDXComponentProps) => (
    <li 
      className={cn("leading-7", className)} 
      {...props} 
    />
  ),
  blockquote: ({ className, ...props }: MDXComponentProps) => (
    <blockquote 
      className={cn("border-l-4 border-primary pl-4 italic my-4", className)} 
      {...props} 
    />
  ),
  code: ({ className, ...props }: MDXComponentProps) => (
    <code 
      className={cn("bg-muted/30 rounded px-1.5 py-0.5", className)} 
      {...props} 
    />
  ),
  Image: ({ className, alt, ...props }: MDXImageProps) => (
    <Image 
      className={cn("rounded-lg my-4", className)}
      alt={alt}
      {...props}
    />
  ),
} 