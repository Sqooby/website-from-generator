import type { WebsiteContent, Photo, RSVP } from '@/types'

export interface TemplateConfig {
  id: string
  name: string
  description: string
  colors: {
    primary: string
    secondary: string
    accent: string
    text: string
    background: string
  }
  fonts: {
    heading: string
    body: string
    accent?: string
  }
}

export interface TemplateProps {
  content: WebsiteContent
  photos?: Photo[]
  rsvps?: RSVP[]
}

export interface SectionProps {
  content: WebsiteContent
  config: TemplateConfig
}
