import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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