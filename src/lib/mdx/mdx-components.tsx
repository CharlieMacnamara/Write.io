import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export const mdxComponents = {
  h1: ({ className, ...props }) => (
    <h1 
      className={cn("text-3xl font-bold mt-8 mb-4", className)} 
      {...props} 
    />
  ),
  h2: ({ className, ...props }) => (
    <h2 
      className={cn("text-2xl font-semibold mt-6 mb-3", className)} 
      {...props} 
    />
  ),
  p: ({ className, ...props }) => (
    <p 
      className={cn("leading-7 mb-4", className)} 
      {...props} 
    />
  ),
  ul: ({ className, ...props }) => (
    <ul 
      className={cn("list-disc list-inside mb-4 space-y-2", className)} 
      {...props} 
    />
  ),
  code: ({ className, ...props }) => (
    <code 
      className={cn("bg-muted/30 rounded px-1.5 py-0.5", className)} 
      {...props} 
    />
  ),
  Image: ({ className, alt, ...props }) => (
    <Image 
      className={cn("rounded-lg my-4", className)}
      alt={alt || ''}
      {...props}
    />
  ),
} 