import '@testing-library/jest-dom'

// Basic mocks
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
  }),
}))

// Mock zustand persist
jest.mock('zustand/middleware', () => ({
  persist: () => (fn: any) => fn,
}))

// Suppress console errors in tests
global.console.error = jest.fn() 