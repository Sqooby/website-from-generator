import type { SectionProps } from '../types'

export function Story({ content, config }: SectionProps) {
  if (!content.sections || !(content.sections as any).story) return null
  if (!content.storyTitle && !content.storyContent) return null

  return (
    <section
      className="py-20 px-4"
      style={{ backgroundColor: config.colors.background }}
    >
      <div className="container mx-auto max-w-4xl">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-12"
          style={{
            fontFamily: config.fonts.heading,
            color: config.colors.text,
          }}
        >
          {content.storyTitle || 'Our Love Story'}
        </h2>
        <div
          className="text-lg md:text-xl leading-relaxed"
          style={{
            fontFamily: config.fonts.body,
            color: config.colors.text,
          }}
        >
          <p className="whitespace-pre-wrap">{content.storyContent}</p>
        </div>
      </div>
    </section>
  )
}
