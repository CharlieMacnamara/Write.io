export interface ThemeConfig {
  primary: string
  secondary: string
  background: string
  surface: string
  text: string
  muted: string
}

export interface Theme {
  light: ThemeConfig
  dark: ThemeConfig
} 