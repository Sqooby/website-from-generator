'use client'

import { templateRegistry } from '@/templates/registry'
import type { WebsiteContent } from '@/types'

interface PreviewFrameProps {
  templateId: string
  content: Partial<WebsiteContent>
}

export function PreviewFrame({ templateId, content }: PreviewFrameProps) {
  const template = templateRegistry[templateId]

  if (!template) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-stone-100 rounded-lg">
        <p className="text-stone-500">Select a template to preview</p>
      </div>
    )
  }

  const Template = template.component

  // Fill in default values for incomplete data
  const defaultContent: WebsiteContent = {
    id: 'preview',
    websiteId: 'preview',
    brideName: content.brideName || 'Jane',
    groomName: content.groomName || 'John',
    weddingDate: content.weddingDate || new Date('2024-12-31'),
    primaryColor: content.primaryColor || template.config.colors.primary,
    secondaryColor: content.secondaryColor || template.config.colors.secondary,
    accentColor: content.accentColor || template.config.colors.accent,
    fontFamily: content.fontFamily || template.config.fonts.heading,
    heroImage: content.heroImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200',
    heroTitle: content.heroTitle,
    heroSubtitle: content.heroSubtitle,
    storyTitle: content.storyTitle || 'Our Love Story',
    storyContent: content.storyContent || 'Once upon a time...',
    ceremonyVenue: content.ceremonyVenue || 'Beautiful Chapel',
    ceremonyTime: content.ceremonyTime,
    ceremonyAddress: content.ceremonyAddress,
    ceremonyMapUrl: content.ceremonyMapUrl,
    receptionVenue: content.receptionVenue || 'Grand Ballroom',
    receptionTime: content.receptionTime,
    receptionAddress: content.receptionAddress,
    receptionMapUrl: content.receptionMapUrl,
    sections: content.sections || {
      hero: true,
      countdown: true,
      story: true,
      events: true,
      rsvp: true,
      gallery: false,
      travel: false,
      faq: false,
    },
    updatedAt: new Date(),
  }

  return (
    <div className="w-full h-full overflow-auto bg-white rounded-lg shadow-lg border border-stone-200">
      <div className="transform scale-75 origin-top-left w-[133.33%]">
        <Template content={defaultContent} photos={[]} rsvps={[]} />
      </div>
    </div>
  )
}
