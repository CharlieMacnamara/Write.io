declare module 'next-mdx-remote/rsc' {
  import type { ReactElement } from 'react'
  
  export function compileMDX<TFrontmatter = any>(options: {
    source: string
    options?: {
      parseFrontmatter?: boolean
      scope?: Record<string, unknown>
      mdxOptions?: Record<string, unknown>
    }
  }): Promise<{
    content: string
    frontmatter: TFrontmatter
  }>
}

declare module 'next-mdx-remote' {
  import type { ComponentType } from 'react'

  export interface MDXRemoteSerializeResult {
    compiledSource: string
    scope?: Record<string, unknown>
    frontmatter?: Record<string, unknown>
  }

  export interface MDXRemoteProps {
    compiledSource: string
    scope?: Record<string, unknown>
    components?: Record<string, ComponentType<any>>
  }

  export function MDXRemote(props: MDXRemoteProps): JSX.Element
} 