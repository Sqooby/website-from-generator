import Link from 'next/link'
import { Button } from '@/components/ui/button'

const templates = [
  {
    id: 'classic-elegance',
    name: 'Classic Elegance',
    category: 'Timeless',
    thumbnail: '/images/young-wedding-couple-their-wedding.jpg',
    description: 'Refined sophistication with serif typography and romantic gold accents',
    features: ['Elegant serif fonts', 'Gold decorative elements', 'Timeline section'],
    isPremium: false,
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    category: 'Contemporary',
    thumbnail: '/images/pexels-alexander-mass-748453803-35556937.jpg',
    description: 'Clean lines and contemporary design for the modern couple',
    features: ['Sans-serif typography', 'Minimalist layout', 'Bold photography'],
    isPremium: false,
  },
  {
    id: 'garden-romance',
    name: 'Garden Romance',
    category: 'Botanical',
    thumbnail: '/images/closeup-shot-bride-holding-bouquet.jpg',
    description: 'Lush botanical elements perfect for garden and outdoor weddings',
    features: ['Floral illustrations', 'Soft color palette', 'Nature-inspired'],
    isPremium: true,
  },
  {
    id: 'editorial-luxury',
    name: 'Editorial Luxury',
    category: 'Magazine',
    thumbnail: '/images/notebook-3820634.jpg',
    description: 'High-fashion editorial styling with sophisticated asymmetric layouts',
    features: ['Magazine-style grid', 'Bold typography', 'Artistic layouts'],
    isPremium: true,
  },
  {
    id: 'rustic-charm',
    name: 'Rustic Charm',
    category: 'Natural',
    thumbnail: '/images/pexels-asadphoto-169190.jpg',
    description: 'Warm earthy tones and natural textures for rustic celebrations',
    features: ['Wood grain textures', 'Warm color palette', 'Handwritten fonts'],
    isPremium: false,
  },
  {
    id: 'coastal-breeze',
    name: 'Coastal Breeze',
    category: 'Destination',
    thumbnail: '/images/bride-groom-having-their-wedding-beach.jpg',
    description: 'Breezy beach vibes perfect for coastal and destination weddings',
    features: ['Ocean-inspired palette', 'Light & airy', 'Relaxed elegance'],
    isPremium: true,
  },
]

export default function TemplatesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-rose-50/50 to-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="text-sm font-medium text-rose-600 tracking-[0.2em] uppercase">Curated Collections</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light mb-6 text-stone-900 leading-tight">
              Templates Designed to
              <span className="font-semibold italic block mt-2">Make You Unforgettable</span>
            </h1>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Each template is meticulously crafted by our design team to ensure your wedding website
              is as unique and beautiful as your love story.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="border-b border-stone-200 bg-white sticky top-20 z-40">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-8 overflow-x-auto py-4">
            {['All Templates', 'Timeless', 'Contemporary', 'Botanical', 'Magazine', 'Natural', 'Destination'].map((filter) => (
              <button
                key={filter}
                className={`whitespace-nowrap text-sm font-medium transition-colors duration-300 pb-2 border-b-2 ${
                  filter === 'All Templates'
                    ? 'text-rose-600 border-rose-600'
                    : 'text-stone-600 border-transparent hover:text-rose-600'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {templates.map((template, index) => (
              <div
                key={template.id}
                className="group relative animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[3/4]">
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-3">
                      <Link href={`/templates/${template.id}/preview`}>
                        <Button variant="secondary" size="sm">
                          Preview
                        </Button>
                      </Link>
                      <Link href={`/dashboard/websites/new?template=${template.id}`}>
                        <Button variant="primary" size="sm">
                          Use Template
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Premium Badge */}
                  {template.isPremium && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-stone-900 backdrop-blur-sm">
                        <svg className="w-3 h-3 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Premium
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-rose-600 uppercase tracking-wider">
                      {template.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif font-semibold mb-2 text-stone-900 group-hover:text-rose-600 transition-colors">
                    {template.name}
                  </h3>

                  <p className="text-stone-600 mb-4 leading-relaxed">
                    {template.description}
                  </p>

                  <ul className="space-y-1.5">
                    {template.features.map((feature, i) => (
                      <li key={i} className="text-sm text-stone-500 flex items-center gap-2">
                        <svg className="w-4 h-4 text-rose-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-stone-900 to-stone-800 text-white">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-4">
            Can't Decide?
            <span className="font-semibold italic block mt-2">Try All Templates with Your Free Trial</span>
          </h2>
          <p className="text-lg text-stone-300 mb-8 max-w-2xl mx-auto">
            Change templates anytime during your trial. No commitment required.
          </p>
          <Link href="/register">
            <Button size="lg" variant="primary">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
