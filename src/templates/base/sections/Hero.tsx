import type { SectionProps } from '../types'

export function Hero({ content, config }: SectionProps) {
  if (!content.sections || !(content.sections as any).hero) return null

  return (
    <section
      className="h-screen relative flex items-center justify-center text-white"
      style={{
        backgroundImage: content.heroImage
          ? `url(${content.heroImage})`
          : 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '--primary': config.colors.primary,
        '--secondary': config.colors.secondary,
      } as React.CSSProperties}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative text-center z-10 px-4">
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
          style={{ fontFamily: config.fonts.heading }}
        >
          {content.heroTitle || `${content.brideName} & ${content.groomName}`}
        </h1>
        <p
          className="text-xl md:text-2xl lg:text-3xl"
          style={{ fontFamily: config.fonts.body }}
        >
          {content.heroSubtitle ||
            new Date(content.weddingDate).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
        </p>
      </div>
    </section>
  )
}
