# Template System Architecture

## Overview
This document details how to build a flexible, scalable template system for the wedding website generator.

---

## Template System Requirements

### Must-Have Features
- ✅ Multiple distinct visual styles (8-10 templates)
- ✅ Easy customization (colors, fonts, images)
- ✅ Section visibility controls
- ✅ Responsive design (mobile-first)
- ✅ Fast rendering performance
- ✅ Easy to add new templates
- ✅ Preview before purchase
- ✅ Export to production

---

## Template Architecture Approaches

### Option 1: Component-Based Templates (Recommended)

**Structure:**
```
templates/
├── base/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Story.tsx
│   │   ├── EventDetails.tsx
│   │   ├── RSVP.tsx
│   │   ├── Gallery.tsx
│   │   └── Footer.tsx
│   └── Layout.tsx
├── classic-elegance/
│   ├── index.tsx
│   ├── config.ts
│   ├── sections/
│   │   ├── Hero.tsx (override)
│   │   └── Story.tsx (override)
│   └── styles.css
├── modern-minimal/
│   ├── index.tsx
│   ├── config.ts
│   └── sections/
└── registry.ts
```

**Implementation:**

```typescript
// templates/base/sections/Hero.tsx
import { WebsiteContent } from '@/types'

interface HeroProps {
  content: WebsiteContent
  config: TemplateConfig
}

export function Hero({ content, config }: HeroProps) {
  return (
    <section
      className="h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${content.heroImage})`,
        fontFamily: config.fonts.heading,
      }}
    >
      <div className="text-center text-white">
        <h1 className="text-6xl mb-4 font-bold">
          {content.brideName} & {content.groomName}
        </h1>
        <p className="text-2xl">
          {new Date(content.weddingDate).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </p>
      </div>
    </section>
  )
}

// templates/classic-elegance/config.ts
export const classicEleganceConfig: TemplateConfig = {
  id: 'classic-elegance',
  name: 'Classic Elegance',
  category: 'Classic',
  description: 'Timeless and sophisticated design with serif fonts',

  colors: {
    primary: '#8B7355',
    secondary: '#F5F5DC',
    accent: '#D4AF37',
    text: '#333333',
    background: '#FFFFFF',
  },

  fonts: {
    heading: 'Playfair Display, serif',
    body: 'Lora, serif',
    accent: 'Cinzel, serif',
  },

  sections: {
    hero: { enabled: true, customizable: true },
    countdown: { enabled: true, customizable: false },
    story: { enabled: true, customizable: true },
    events: { enabled: true, customizable: true },
    rsvp: { enabled: true, customizable: false },
    gallery: { enabled: true, customizable: true },
    travel: { enabled: true, customizable: true },
    footer: { enabled: true, customizable: true },
  },

  layouts: {
    hero: ['centered', 'split'],
    story: ['timeline', 'paragraph'],
    gallery: ['grid', 'masonry', 'carousel'],
  }
}

// templates/classic-elegance/index.tsx
import { Hero } from './sections/Hero'
import { Story } from './sections/Story'
import { EventDetails } from '@/templates/base/sections/EventDetails'
import { RSVP } from '@/templates/base/sections/RSVP'
import { Gallery } from '@/templates/base/sections/Gallery'
import { Footer } from '@/templates/base/sections/Footer'
import { classicEleganceConfig } from './config'

interface TemplateProps {
  content: WebsiteContent
  photos?: Photo[]
}

export function ClassicEleganceTemplate({ content, photos }: TemplateProps) {
  const config = classicEleganceConfig

  return (
    <div
      className="classic-elegance-template"
      style={{
        '--color-primary': config.colors.primary,
        '--color-secondary': config.colors.secondary,
        '--color-accent': config.colors.accent,
        '--font-heading': config.fonts.heading,
        '--font-body': config.fonts.body,
      } as React.CSSProperties}
    >
      {/* Hero */}
      {content.sections?.hero !== false && (
        <Hero content={content} config={config} />
      )}

      {/* Story */}
      {content.sections?.story !== false && (
        <Story content={content} config={config} />
      )}

      {/* Event Details */}
      {content.sections?.events !== false && (
        <EventDetails content={content} config={config} />
      )}

      {/* RSVP */}
      {content.sections?.rsvp !== false && (
        <RSVP content={content} config={config} />
      )}

      {/* Gallery */}
      {content.sections?.gallery !== false && photos && photos.length > 0 && (
        <Gallery photos={photos} config={config} />
      )}

      {/* Footer */}
      <Footer content={content} config={config} />
    </div>
  )
}

// templates/registry.ts
import { ClassicEleganceTemplate } from './classic-elegance'
import { ModernMinimalTemplate } from './modern-minimal'
import { RusticCharmTemplate } from './rustic-charm'

export const templateRegistry = {
  'classic-elegance': {
    component: ClassicEleganceTemplate,
    config: classicEleganceConfig,
  },
  'modern-minimal': {
    component: ModernMinimalTemplate,
    config: modernMinimalConfig,
  },
  'rustic-charm': {
    component: RusticCharmTemplate,
    config: rusticCharmConfig,
  },
}

export type TemplateId = keyof typeof templateRegistry
```

---

### Option 2: Theme-Based System (Simpler)

**Single template with multiple themes:**

```typescript
// components/wedding-template/index.tsx
export function UniversalTemplate({ content, theme }: Props) {
  const themeClasses = {
    'classic': 'font-serif text-neutral-800',
    'modern': 'font-sans text-gray-900',
    'rustic': 'font-serif text-amber-900',
  }

  return (
    <div className={themeClasses[theme]} style={getThemeVariables(theme)}>
      <Hero {...content} />
      <Story {...content} />
      {/* ... other sections */}
    </div>
  )
}

function getThemeVariables(theme: string) {
  const themes = {
    classic: {
      '--primary': '#8B7355',
      '--secondary': '#F5F5DC',
      '--font-heading': 'Playfair Display',
    },
    modern: {
      '--primary': '#000000',
      '--secondary': '#FFFFFF',
      '--font-heading': 'Inter',
    },
    rustic: {
      '--primary': '#8B4513',
      '--secondary': '#FFF8DC',
      '--font-heading': 'Merriweather',
    },
  }
  return themes[theme]
}
```

---

### Option 3: Block/Page Builder System (Most Flexible)

**Drag-and-drop sections:**

```typescript
// lib/builder/blocks.ts
export const blocks = {
  hero: {
    id: 'hero',
    name: 'Hero Section',
    icon: '🎭',
    defaultProps: {
      layout: 'centered',
      showCountdown: true,
      backgroundType: 'image',
    },
    variations: ['centered', 'split', 'video'],
  },
  story: {
    id: 'story',
    name: 'Our Story',
    icon: '💕',
    defaultProps: {
      layout: 'timeline',
      showPhotos: true,
    },
    variations: ['timeline', 'paragraph', 'accordion'],
  },
  // ... more blocks
}

// Database schema for page builder
model WebsitePage {
  id        String @id
  websiteId String
  blocks    Json   // Array of block configurations

  // Example blocks value:
  // [
  //   { type: 'hero', props: { layout: 'centered', ... } },
  //   { type: 'story', props: { layout: 'timeline', ... } },
  //   { type: 'events', props: { ... } },
  // ]
}

// components/builder/BlockRenderer.tsx
export function BlockRenderer({ block, content }: Props) {
  const BlockComponent = blockComponents[block.type]
  return <BlockComponent {...block.props} content={content} />
}

// app/wedding/[subdomain]/page.tsx
export default function WeddingPage({ subdomain }: Props) {
  const website = await getWebsite(subdomain)

  return (
    <div>
      {website.blocks.map((block, index) => (
        <BlockRenderer
          key={index}
          block={block}
          content={website.content}
        />
      ))}
    </div>
  )
}
```

---

## Template Design Patterns

### 8 Core Template Styles

#### 1. Classic Elegance
```typescript
export const classicElegance = {
  fonts: {
    heading: 'Playfair Display',
    body: 'Lora',
  },
  colors: {
    primary: '#8B7355',
    secondary: '#F5F5DC',
    accent: '#D4AF37',
  },
  style: {
    heroLayout: 'centered-with-overlay',
    sectionSpacing: 'large',
    decorativeElements: ['borders', 'dividers'],
  }
}
```

#### 2. Modern Minimal
```typescript
export const modernMinimal = {
  fonts: {
    heading: 'Inter',
    body: 'Inter',
  },
  colors: {
    primary: '#000000',
    secondary: '#FFFFFF',
    accent: '#0066CC',
  },
  style: {
    heroLayout: 'full-screen-centered',
    sectionSpacing: 'minimal',
    decorativeElements: ['simple-lines'],
  }
}
```

#### 3. Rustic Charm
```typescript
export const rusticCharm = {
  fonts: {
    heading: 'Merriweather',
    body: 'Open Sans',
  },
  colors: {
    primary: '#8B4513',
    secondary: '#FFF8DC',
    accent: '#556B2F',
  },
  style: {
    heroLayout: 'wood-texture-background',
    sectionSpacing: 'natural',
    decorativeElements: ['leaves', 'wood-grain', 'burlap'],
  }
}
```

#### 4. Floral Romance
```typescript
export const floralRomance = {
  fonts: {
    heading: 'Great Vibes',
    body: 'Raleway',
  },
  colors: {
    primary: '#E6A4B4',
    secondary: '#F7EDF0',
    accent: '#B76E79',
  },
  style: {
    heroLayout: 'floral-border',
    sectionSpacing: 'romantic',
    decorativeElements: ['flowers', 'vines', 'petals'],
  }
}
```

#### 5. Beach Paradise
```typescript
export const beachParadise = {
  fonts: {
    heading: 'Pacifico',
    body: 'Quicksand',
  },
  colors: {
    primary: '#0077BE',
    secondary: '#F0F8FF',
    accent: '#FFD700',
  },
  style: {
    heroLayout: 'ocean-waves',
    sectionSpacing: 'breezy',
    decorativeElements: ['waves', 'shells', 'palm-leaves'],
  }
}
```

#### 6. Garden Vintage
```typescript
export const gardenVintage = {
  fonts: {
    heading: 'Cormorant Garamond',
    body: 'Crimson Text',
  },
  colors: {
    primary: '#5F7161',
    secondary: '#E8F3E8',
    accent: '#A4B5A4',
  },
  style: {
    heroLayout: 'vintage-frame',
    sectionSpacing: 'classic',
    decorativeElements: ['ornate-frames', 'botanical'],
  }
}
```

#### 7. Night Sky
```typescript
export const nightSky = {
  fonts: {
    heading: 'Montserrat',
    body: 'Roboto',
  },
  colors: {
    primary: '#1A1A2E',
    secondary: '#16213E',
    accent: '#FFD700',
  },
  style: {
    heroLayout: 'starry-night',
    sectionSpacing: 'dramatic',
    decorativeElements: ['stars', 'constellations', 'moon'],
  }
}
```

#### 8. Bohemian Chic
```typescript
export const bohemianChic = {
  fonts: {
    heading: 'Josefin Sans',
    body: 'Lato',
  },
  colors: {
    primary: '#C19A6B',
    secondary: '#FAF0E6',
    accent: '#8B6F47',
  },
  style: {
    heroLayout: 'feather-accents',
    sectionSpacing: 'relaxed',
    decorativeElements: ['feathers', 'dreamcatchers', 'geometric'],
  }
}
```

---

## Customization System

### Color Customization

```typescript
// components/builder/ColorPicker.tsx
export function ColorCustomizer({ websiteId }: Props) {
  const [colors, setColors] = useState({
    primary: '#8B7355',
    secondary: '#F5F5DC',
    accent: '#D4AF37',
  })

  const presetPalettes = [
    {
      name: 'Warm Autumn',
      colors: { primary: '#C19A6B', secondary: '#FFF8DC', accent: '#8B4513' }
    },
    {
      name: 'Cool Blues',
      colors: { primary: '#4A90E2', secondary: '#E8F4F8', accent: '#2E5C8A' }
    },
    {
      name: 'Romantic Pink',
      colors: { primary: '#E6A4B4', secondary: '#F7EDF0', accent: '#B76E79' }
    },
  ]

  const updateColors = async (newColors: typeof colors) => {
    setColors(newColors)
    await fetch(`/api/websites/${websiteId}/colors`, {
      method: 'PATCH',
      body: JSON.stringify(newColors)
    })
  }

  return (
    <div className="space-y-4">
      <h3>Customize Colors</h3>

      {/* Color Pickers */}
      <div className="space-y-2">
        <ColorInput
          label="Primary Color"
          value={colors.primary}
          onChange={(val) => updateColors({ ...colors, primary: val })}
        />
        <ColorInput
          label="Secondary Color"
          value={colors.secondary}
          onChange={(val) => updateColors({ ...colors, secondary: val })}
        />
        <ColorInput
          label="Accent Color"
          value={colors.accent}
          onChange={(val) => updateColors({ ...colors, accent: val })}
        />
      </div>

      {/* Preset Palettes */}
      <div>
        <h4>Preset Palettes</h4>
        <div className="grid grid-cols-3 gap-2">
          {presetPalettes.map((palette) => (
            <button
              key={palette.name}
              onClick={() => updateColors(palette.colors)}
              className="p-2 border rounded"
            >
              <div className="flex gap-1 mb-1">
                <div
                  className="w-4 h-4 rounded"
                  style={{ background: palette.colors.primary }}
                />
                <div
                  className="w-4 h-4 rounded"
                  style={{ background: palette.colors.secondary }}
                />
                <div
                  className="w-4 h-4 rounded"
                  style={{ background: palette.colors.accent }}
                />
              </div>
              <span className="text-xs">{palette.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
```

### Font Customization

```typescript
// lib/fonts.ts
export const fontPairings = [
  {
    id: 'classic',
    name: 'Classic Serif',
    heading: 'Playfair Display',
    body: 'Lora',
    googleFonts: 'Playfair+Display:wght@400;700&family=Lora:wght@400;500'
  },
  {
    id: 'modern',
    name: 'Modern Sans',
    heading: 'Montserrat',
    body: 'Open Sans',
    googleFonts: 'Montserrat:wght@400;700&family=Open+Sans:wght@400;500'
  },
  {
    id: 'elegant',
    name: 'Elegant Script',
    heading: 'Great Vibes',
    body: 'Raleway',
    googleFonts: 'Great+Vibes&family=Raleway:wght@400;500'
  },
  {
    id: 'rustic',
    name: 'Rustic Charm',
    heading: 'Merriweather',
    body: 'Open Sans',
    googleFonts: 'Merriweather:wght@400;700&family=Open+Sans:wght@400;500'
  },
]

// Load fonts dynamically
export function loadGoogleFonts(fontPairingId: string) {
  const pairing = fontPairings.find(f => f.id === fontPairingId)
  if (!pairing) return

  const link = document.createElement('link')
  link.href = `https://fonts.googleapis.com/css2?family=${pairing.googleFonts}`
  link.rel = 'stylesheet'
  document.head.appendChild(link)
}
```

### Section Visibility Controls

```typescript
// components/builder/SectionToggle.tsx
export function SectionVisibilityControls({ websiteId }: Props) {
  const [sections, setSections] = useState({
    hero: true,
    countdown: true,
    story: true,
    events: true,
    rsvp: true,
    gallery: true,
    travel: true,
    faq: false,
  })

  const toggleSection = async (section: keyof typeof sections) => {
    const newSections = { ...sections, [section]: !sections[section] }
    setSections(newSections)

    await fetch(`/api/websites/${websiteId}/sections`, {
      method: 'PATCH',
      body: JSON.stringify(newSections)
    })
  }

  return (
    <div className="space-y-2">
      <h3>Show/Hide Sections</h3>
      {Object.entries(sections).map(([section, visible]) => (
        <label key={section} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={visible}
            onChange={() => toggleSection(section as any)}
          />
          <span className="capitalize">{section}</span>
        </label>
      ))}
    </div>
  )
}
```

---

## Live Preview System

```typescript
// components/builder/LivePreview.tsx
'use client'

import { useEffect, useState } from 'react'
import { templateRegistry } from '@/templates/registry'

export function LivePreview({ websiteId }: { websiteId: string }) {
  const [content, setContent] = useState<WebsiteContent | null>(null)
  const [scale, setScale] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')

  useEffect(() => {
    // Subscribe to real-time updates
    const ws = new WebSocket(`ws://localhost:3000/preview/${websiteId}`)

    ws.onmessage = (event) => {
      const updatedContent = JSON.parse(event.data)
      setContent(updatedContent)
    }

    return () => ws.close()
  }, [websiteId])

  if (!content) return <div>Loading preview...</div>

  const Template = templateRegistry[content.templateId].component

  const dimensions = {
    mobile: 'w-[375px] h-[667px]',
    tablet: 'w-[768px] h-[1024px]',
    desktop: 'w-full h-full',
  }

  return (
    <div className="h-full flex flex-col">
      {/* Device Toggle */}
      <div className="border-b p-2 flex gap-2">
        <button onClick={() => setScale('mobile')}>📱 Mobile</button>
        <button onClick={() => setScale('tablet')}>📱 Tablet</button>
        <button onClick={() => setScale('desktop')}>💻 Desktop</button>
      </div>

      {/* Preview Frame */}
      <div className="flex-1 overflow-auto bg-gray-100 p-4 flex justify-center">
        <div className={`${dimensions[scale]} bg-white shadow-lg overflow-auto`}>
          <Template content={content} />
        </div>
      </div>
    </div>
  )
}
```

---

## Template Preview Gallery

```typescript
// app/templates/page.tsx
export default function TemplatesPage() {
  const templates = [
    {
      id: 'classic-elegance',
      name: 'Classic Elegance',
      category: 'Classic',
      thumbnail: '/templates/classic-thumb.jpg',
      preview: '/templates/classic-preview.jpg',
      features: ['Serif fonts', 'Elegant borders', 'Timeless design'],
      isPremium: false,
    },
    // ... more templates
  ]

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-12">
        Choose Your Perfect Template
      </h1>

      {/* Filter */}
      <div className="flex gap-4 mb-8">
        <button>All</button>
        <button>Classic</button>
        <button>Modern</button>
        <button>Rustic</button>
        <button>Floral</button>
      </div>

      {/* Template Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  )
}

function TemplateCard({ template }: { template: Template }) {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition">
      <img
        src={template.thumbnail}
        alt={template.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{template.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{template.category}</p>
        <ul className="text-sm space-y-1 mb-4">
          {template.features.map((feature, i) => (
            <li key={i}>✓ {feature}</li>
          ))}
        </ul>
        <div className="flex gap-2">
          <Link
            href={`/templates/${template.id}/preview`}
            className="flex-1 text-center py-2 border rounded"
          >
            Preview
          </Link>
          <Link
            href={`/dashboard/websites/new?template=${template.id}`}
            className="flex-1 text-center py-2 bg-blue-600 text-white rounded"
          >
            Use Template
          </Link>
        </div>
      </div>
    </div>
  )
}
```

---

## Performance Considerations

### Code Splitting Templates

```typescript
// templates/registry.ts
import dynamic from 'next/dynamic'

export const templateRegistry = {
  'classic-elegance': {
    component: dynamic(() =>
      import('./classic-elegance').then(m => m.ClassicEleganceTemplate)
    ),
    config: classicEleganceConfig,
  },
  // Only load the template that's being used
}
```

### Image Optimization

```typescript
// All images should use Next.js Image
import Image from 'next/image'

<Image
  src={content.heroImage}
  alt="Wedding hero"
  fill
  priority
  quality={90}
  className="object-cover"
/>
```

### CSS Optimization

```typescript
// Use Tailwind for most styling
// Extract template-specific styles to separate files
// Only load the CSS for the active template

// pages/_app.tsx
import '@/styles/globals.css'
// Conditionally load template styles
if (templateId === 'classic-elegance') {
  import('@/templates/classic-elegance/styles.css')
}
```

---

## Conclusion

**Recommended Approach:**

Use **Component-Based Templates (Option 1)** with:
- Base sections that all templates inherit
- Template-specific overrides for unique designs
- Configuration-driven customization
- Real-time preview with WebSocket updates

This provides the best balance of:
- ✅ Flexibility for designers
- ✅ Consistency for users
- ✅ Performance optimization
- ✅ Easy maintenance
- ✅ Scalability for adding new templates

Start with 3-5 well-designed templates and expand based on user demand and feedback.
