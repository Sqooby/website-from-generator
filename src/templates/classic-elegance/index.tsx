import { Hero } from '../base/sections/Hero'
import { Countdown } from '../base/sections/Countdown'
import { Story } from '../base/sections/Story'
import { EventDetails } from '../base/sections/EventDetails'
import { RSVP } from '../base/sections/RSVP'
import { Gallery } from '../base/sections/Gallery'
import { Footer } from '../base/sections/Footer'
import { classicEleganceConfig } from './config'
import type { TemplateProps } from '../base/types'

export function ClassicElegance({ content, photos, rsvps }: TemplateProps) {
  return (
    <div className="font-serif">
      <Hero content={content} config={classicEleganceConfig} />
      <Countdown content={content} config={classicEleganceConfig} />
      <Story content={content} config={classicEleganceConfig} />
      <EventDetails content={content} config={classicEleganceConfig} />
      <Gallery content={content} config={classicEleganceConfig} photos={photos} />
      <RSVP content={content} config={classicEleganceConfig} />
      <Footer content={content} config={classicEleganceConfig} />
    </div>
  )
}
