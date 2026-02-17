import { Hero } from '../base/sections/Hero'
import { Countdown } from '../base/sections/Countdown'
import { Story } from '../base/sections/Story'
import { EventDetails } from '../base/sections/EventDetails'
import { RSVP } from '../base/sections/RSVP'
import { Gallery } from '../base/sections/Gallery'
import { Footer } from '../base/sections/Footer'
import { mergeContentTheme } from '../base/theme'
import { modernMinimalConfig } from './config'
import type { TemplateProps } from '../base/types'

export function ModernMinimal({ content, photos, rsvps }: TemplateProps) {
  const config = mergeContentTheme(modernMinimalConfig, content)
  return (
    <div className="font-sans">
      <Hero content={content} config={config} />
      <Countdown content={content} config={config} />
      <Story content={content} config={config} />
      <EventDetails content={content} config={config} />
      <Gallery content={content} config={config} photos={photos} />
      <RSVP content={content} config={config} />
      <Footer content={content} config={config} />
    </div>
  )
}
