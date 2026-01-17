import type { SectionProps } from '../types'

export function EventDetails({ content, config }: SectionProps) {
  if (!content.sections || !(content.sections as any).events) return null

  return (
    <section className="py-20 px-4 bg-stone-50">
      <div className="container mx-auto max-w-5xl">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          style={{
            fontFamily: config.fonts.heading,
            color: config.colors.text,
          }}
        >
          Event Details
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Ceremony */}
          {content.ceremonyVenue && (
            <div className="text-center">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-2xl"
                style={{ backgroundColor: config.colors.primary }}
              >
                💍
              </div>
              <h3
                className="text-2xl font-bold mb-4"
                style={{
                  fontFamily: config.fonts.heading,
                  color: config.colors.text,
                }}
              >
                Ceremony
              </h3>
              <p
                className="text-lg font-semibold mb-2"
                style={{ color: config.colors.text }}
              >
                {content.ceremonyVenue}
              </p>
              {content.ceremonyTime && (
                <p
                  className="text-base mb-2"
                  style={{ color: config.colors.text }}
                >
                  {new Date(content.ceremonyTime).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </p>
              )}
              {content.ceremonyAddress && (
                <p
                  className="text-base text-stone-600"
                  style={{ fontFamily: config.fonts.body }}
                >
                  {content.ceremonyAddress}
                </p>
              )}
            </div>
          )}

          {/* Reception */}
          {content.receptionVenue && (
            <div className="text-center">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-2xl"
                style={{ backgroundColor: config.colors.primary }}
              >
                🎉
              </div>
              <h3
                className="text-2xl font-bold mb-4"
                style={{
                  fontFamily: config.fonts.heading,
                  color: config.colors.text,
                }}
              >
                Reception
              </h3>
              <p
                className="text-lg font-semibold mb-2"
                style={{ color: config.colors.text }}
              >
                {content.receptionVenue}
              </p>
              {content.receptionTime && (
                <p
                  className="text-base mb-2"
                  style={{ color: config.colors.text }}
                >
                  {new Date(content.receptionTime).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </p>
              )}
              {content.receptionAddress && (
                <p
                  className="text-base text-stone-600"
                  style={{ fontFamily: config.fonts.body }}
                >
                  {content.receptionAddress}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
