import { Hero } from '../base/sections/Hero'
import { Countdown } from '../base/sections/Countdown'
import { Story } from '../base/sections/Story'
import { EventDetails } from '../base/sections/EventDetails'
import { RSVP } from '../base/sections/RSVP'
import { Gallery } from '../base/sections/Gallery'
import { Footer } from '../base/sections/Footer'
import { modernMinimalConfig } from './config'
import type { TemplateProps } from '../base/types'

export function ModernMinimal({ content, photos, rsvps }: TemplateProps) {
  return (
    <div className="font-sans">
      <Hero content={content} config={modernMinimalConfig} />
      <Countdown content={content} config={modernMinimalConfig} />
      <Story content={content} config={modernMinimalConfig} />
      <EventDetails content={content} config={modernMinimalConfig} />
      <Gallery content={content} config={modernMinimalConfig} photos={photos} />
      <RSVP content={content} config={modernMinimalConfig} />
      <Footer content={content} config={modernMinimalConfig} />
    </div>
  )
}
