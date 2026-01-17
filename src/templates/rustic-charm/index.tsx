import { Hero } from '../base/sections/Hero'
import { Countdown } from '../base/sections/Countdown'
import { Story } from '../base/sections/Story'
import { EventDetails } from '../base/sections/EventDetails'
import { RSVP } from '../base/sections/RSVP'
import { Gallery } from '../base/sections/Gallery'
import { Footer } from '../base/sections/Footer'
import { rusticCharmConfig } from './config'
import type { TemplateProps } from '../base/types'

export function RusticCharm({ content, photos, rsvps }: TemplateProps) {
  return (
    <div className="font-sans">
      <Hero content={content} config={rusticCharmConfig} />
      <Countdown content={content} config={rusticCharmConfig} />
      <Story content={content} config={rusticCharmConfig} />
      <EventDetails content={content} config={rusticCharmConfig} />
      <Gallery content={content} config={rusticCharmConfig} photos={photos} />
      <RSVP content={content} config={rusticCharmConfig} />
      <Footer content={content} config={rusticCharmConfig} />
    </div>
  )
}
