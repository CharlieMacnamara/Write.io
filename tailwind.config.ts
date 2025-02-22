import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      spacing: {
        safe: 'env(safe-area-inset-bottom)',
      },
      colors: {
        primary: '#0F172A',
        secondary: '#3B82F6',
        background: '#FFFFFF',
        surface: '#F8FAFC',
        text: '#1E293B',
        muted: '#64748B',
      },
    },
  },
  plugins: [],
}

export default config 