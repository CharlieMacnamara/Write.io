import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface MDXComponentProps {
  className?: string
  children?: React.ReactNode
}

interface MDXImageProps extends MDXComponentProps {
  alt?: string
  src: string
  width?: number
  height?: number
}

export const mdxComponents = {
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
  code: ({ className, ...props }: MDXComponentProps) => (
    <code 
      className={cn("bg-muted/30 rounded px-1.5 py-0.5", className)} 
      {...props} 
    />
  ),
  Image: ({ className, alt, ...props }: MDXImageProps) => (
    <Image 
      className={cn("rounded-lg my-4", className)}
      alt={alt || ''}
      {...props}
    />
  ),
} 