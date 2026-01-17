import type { SectionProps } from '../types'

export function Footer({ content, config }: SectionProps) {
  return (
    <footer
      className="py-12 px-4 text-center"
      style={{
        backgroundColor: config.colors.primary,
        color: 'white',
      }}
    >
      <p
        className="text-2xl font-bold mb-2"
        style={{ fontFamily: config.fonts.heading }}
      >
        {content.brideName} & {content.groomName}
      </p>
      <p className="text-sm" style={{ fontFamily: config.fonts.body }}>
        {new Date(content.weddingDate).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </p>
    </footer>
  )
}
