/// <reference types="next" />
/// <reference types="next/navigation" />

import type { LinkProps as NextLinkProps } from 'next/dist/client/link'
import type { PropsWithChildren } from 'react'

declare module 'next/link' {
  export interface LinkProps extends Omit<NextLinkProps, 'href'>, PropsWithChildren {
    href: string
    className?: string
  }

  export default function Link(props: LinkProps): JSX.Element
}

declare module 'next/font/google' {
  const Inter: (config: { subsets: string[] }) => {
    className: string
  }
  export { Inter }
}

declare module 'next/navigation' {
  export const useRouter: () => {
    push: (url: string) => void;
    replace: (url: string) => void;
    prefetch: (url: string) => void;
  };
  export const usePathname: () => string;
}

declare module 'next-themes' {
  export const useTheme: () => {
    theme: string;
    setTheme: (theme: string) => void;
  };
} 