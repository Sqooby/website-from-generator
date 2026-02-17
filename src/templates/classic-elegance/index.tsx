import { Hero } from '../base/sections/Hero'
import { Countdown } from '../base/sections/Countdown'
import { Story } from '../base/sections/Story'
import { EventDetails } from '../base/sections/EventDetails'
import { RSVP } from '../base/sections/RSVP'
import { Gallery } from '../base/sections/Gallery'
import { Footer } from '../base/sections/Footer'
import { mergeContentTheme } from '../base/theme'
import { classicEleganceConfig } from './config'
import type { TemplateProps } from '../base/types'

export function ClassicElegance({ content, photos, rsvps }: TemplateProps) {
  const config = mergeContentTheme(classicEleganceConfig, content)
  return (
    <div className="font-serif">
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
