import type { SectionProps } from '../types'
import type { Photo } from '@/types'

interface GalleryProps extends SectionProps {
  photos?: Photo[]
}

export function Gallery({ content, config, photos }: GalleryProps) {
  if (!content.sections || !(content.sections as any).gallery) return null
  if (!photos || photos.length === 0) return null

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          style={{
            fontFamily: config.fonts.heading,
            color: config.colors.text,
          }}
        >
          Photo Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos
            .sort((a, b) => a.order - b.order)
            .map((photo) => (
              <div
                key={photo.id}
                className="aspect-square overflow-hidden rounded-lg group cursor-pointer"
              >
                <img
                  src={photo.url}
                  alt={photo.caption || 'Wedding photo'}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
