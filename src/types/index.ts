// Core Types
export interface User {
  id: string
  email: string
  name?: string
  createdAt: Date
}

export interface Website {
  id: string
  userId: string
  subdomain: string
  customDomain?: string
  templateId: string
  published: boolean
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
  content?: WebsiteContent
  photos?: Photo[]
  rsvps?: RSVP[]
}

export interface WebsiteContent {
  id: string
  websiteId: string

  // Couple Info
  brideName: string
  groomName: string
  weddingDate: Date

  // Theme Customization
  primaryColor: string
  secondaryColor: string
  accentColor?: string
  fontFamily: string

  // Hero Section
  heroImage?: string
  heroTitle?: string
  heroSubtitle?: string

  // Story Section
  storyTitle?: string
  storyContent?: string
  timeline?: TimelineEvent[]

  // Event Details
  ceremonyVenue?: string
  ceremonyTime?: Date
  ceremonyAddress?: string
  ceremonyMapUrl?: string

  receptionVenue?: string
  receptionTime?: Date
  receptionAddress?: string
  receptionMapUrl?: string

  // Settings
  sections: {
    hero: boolean
    countdown: boolean
    story: boolean
    events: boolean
    rsvp: boolean
    gallery: boolean
    travel: boolean
    faq: boolean
  }

  // Additional Settings
  settings?: Record<string, any>

  updatedAt: Date
}

export interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  image?: string
}

export interface Photo {
  id: string
  websiteId: string
  url: string
  caption?: string
  order: number
  uploadedAt: Date
}

export interface RSVP {
  id: string
  websiteId: string
  guestName: string
  email: string
  attending: boolean
  plusOne: boolean
  plusOneName?: string
  dietaryRequirements?: string
  message?: string
  createdAt: Date
}

export interface Subscription {
  id: string
  userId: string
  planType: 'basic' | 'standard' | 'premium'
  status: 'active' | 'expired' | 'cancelled'
  stripeCustomerId?: string
  stripeSubscriptionId?: string
  startDate: Date
  endDate: Date
  createdAt: Date
  updatedAt: Date
}

export interface Template {
  id: string
  name: string
  slug: string
  category: string
  thumbnail: string
  previewUrl: string
  description: string
  isPremium: boolean
  features: string[]
}

// Template Configuration
export interface TemplateConfig {
  id: string
  name: string
  category: string
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
  sections: {
    [key: string]: {
      enabled: boolean
      customizable: boolean
    }
  }
  layouts?: {
    [key: string]: string[]
  }
}

export interface TemplateProps {
  content: WebsiteContent
  photos?: Photo[]
  rsvps?: RSVP[]
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Form Types
export interface CreateWebsiteInput {
  templateId: string
  brideName: string
  groomName: string
  weddingDate: string
}

export interface UpdateWebsiteContentInput {
  brideName?: string
  groomName?: string
  weddingDate?: string
  primaryColor?: string
  secondaryColor?: string
  fontFamily?: string
  storyTitle?: string
  storyContent?: string
  ceremonyVenue?: string
  ceremonyTime?: string
  receptionVenue?: string
  receptionTime?: string
  sections?: WebsiteContent['sections']
}
