import type { SectionProps } from '../types'
import type { StoryBlock } from '@/types'

export function Story({ content, config }: SectionProps) {
  if (!content.sections || !(content.sections as Record<string, boolean>).story) return null

  const storyBlocks = content.storyBlocks as StoryBlock[] | undefined
  const hasBlocks = Array.isArray(storyBlocks) && storyBlocks.length > 0

  if (hasBlocks) {
    return (
      <section
        className="py-20 px-4"
        style={{ backgroundColor: config.colors.background }}
      >
        <div className="container mx-auto max-w-6xl">
          {content.storyTitle && (
            <h2
              className="text-4xl md:text-5xl font-bold text-center mb-16"
              style={{
                fontFamily: config.fonts.heading,
                color: config.colors.text,
              }}
            >
              {content.storyTitle}
            </h2>
          )}
          <div className="flex flex-col gap-16">
            {storyBlocks.map((block) => (
              <div key={block.id} className="py-8 first:pt-0 last:pb-0">
                <StoryBlockRow block={block} config={config} />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Legacy: single storyContent + optional storyImage + storyLayout
  if (!content.storyTitle && !content.storyContent) return null

  const storyImage = content.storyImage as string | undefined
  const storyLayout = (content.storyLayout as
    | 'text-only'
    | 'image-left'
    | 'image-right'
    | 'image-top'
    | undefined)
  const layout = storyImage ? (storyLayout || 'image-right') : 'text-only'

  const TextBlock = (
    <div className="flex flex-col justify-center">
      <h2
        className="text-4xl md:text-5xl font-bold mb-6"
        style={{
          fontFamily: config.fonts.heading,
          color: config.colors.text,
        }}
      >
        {content.storyTitle || 'Nasza historia'}
      </h2>
      <p
        className="text-lg leading-relaxed whitespace-pre-wrap"
        style={{
          fontFamily: config.fonts.body,
          color: config.colors.text,
          opacity: 0.85,
        }}
      >
        {content.storyContent}
      </p>
    </div>
  )

  const ImageBlock = storyImage ? (
    <div
      className="rounded-2xl overflow-hidden shadow-xl"
      style={{ aspectRatio: layout === 'image-top' ? '16/9' : '4/5' }}
    >
      <img
        src={storyImage}
        alt="Nasza historia"
        className="w-full h-full object-cover"
      />
    </div>
  ) : null

  return (
    <section
      className="py-20 px-4"
      style={{ backgroundColor: config.colors.background }}
    >
      <div className="container mx-auto max-w-6xl">
        {layout === 'text-only' && (
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-4xl md:text-5xl font-bold mb-8"
              style={{ fontFamily: config.fonts.heading, color: config.colors.text }}
            >
              {content.storyTitle || 'Nasza historia'}
            </h2>
            <p
              className="text-lg leading-relaxed whitespace-pre-wrap"
              style={{ fontFamily: config.fonts.body, color: config.colors.text, opacity: 0.85 }}
            >
              {content.storyContent}
            </p>
          </div>
        )}

        {layout === 'image-top' && (
          <div className="space-y-10">
            {ImageBlock}
            <div className="max-w-3xl mx-auto text-center">{TextBlock}</div>
          </div>
        )}

        {layout === 'image-left' && (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {ImageBlock}
            {TextBlock}
          </div>
        )}

        {layout === 'image-right' && (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {TextBlock}
            {ImageBlock}
          </div>
        )}
      </div>
    </section>
  )
}

function StoryBlockRow({
  block,
  config,
}: {
  block: StoryBlock
  config: SectionProps['config']
}) {
  const layout = block.image ? block.layout : 'text-only'

  const textEl = (
    <div
      className="text-lg leading-relaxed whitespace-pre-wrap"
      style={{
        fontFamily: config.fonts.body,
        color: config.colors.text,
        opacity: 0.9,
      }}
    >
      {block.text}
    </div>
  )

  const imageEl = block.image ? (
    <div
      className="rounded-2xl overflow-hidden shadow-xl flex-shrink-0"
      style={{ aspectRatio: '4/5', minHeight: 280 }}
    >
      <img
        src={block.image}
        alt=""
        className="w-full h-full object-cover"
      />
    </div>
  ) : null

  if (layout === 'text-only') {
    return (
      <div className="max-w-3xl mx-auto">
        {textEl}
      </div>
    )
  }

  // Ten sam odstęp między zdjęciem a tekstem w obu układach: gap + padding
  const gridGap = 'gap-8 md:gap-12'
  const colPadding = 'md:pr-6' // padding od wewnętrznej krawędzi (między kolumnami)
  const colPaddingRight = 'md:pl-6'

  if (layout === 'image-left') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 ${gridGap} items-center`}>
        <div className={`md:col-start-1 ${colPadding}`}>{imageEl}</div>
        <div className={`md:col-start-2 flex flex-col justify-center ${colPaddingRight}`}>
          {textEl}
        </div>
      </div>
    )
  }

  // image-right
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ${gridGap} items-center`}>
      <div className={`md:col-start-1 flex flex-col justify-center ${colPadding}`}>{textEl}</div>
      <div className={`md:col-start-2 ${colPaddingRight}`}>{imageEl}</div>
    </div>
  )
}
