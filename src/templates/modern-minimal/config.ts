import type { TemplateConfig } from '../base/types'

export const modernMinimalConfig: TemplateConfig = {
  id: 'modern-minimal',
  name: 'Modern Minimal',
  description: 'Clean lines and contemporary design with sans-serif typography',
  colors: {
    primary: '#000000', // Black
    secondary: '#FFFFFF', // White
    accent: '#808080', // Gray
    text: '#1A1A1A', // Almost black
    background: '#F9FAFB', // Light gray
  },
  fonts: {
    heading: 'Montserrat, sans-serif',
    body: 'Inter, sans-serif',
    accent: 'Outfit, sans-serif',
  },
}
