'use client'

import { MDXProvider } from '@mdx-js/react'
import { mdxComponents } from '@/lib/mdx/mdx-components'

export function MDXWrapper({ children }: { children: React.ReactNode }) {
  return (
    <MDXProvider components={mdxComponents}>
      {children}
    </MDXProvider>
  )
} 