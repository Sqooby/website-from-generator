import { ClassicElegance } from './classic-elegance'
import { ModernMinimal } from './modern-minimal'
import { RusticCharm } from './rustic-charm'
import { classicEleganceConfig } from './classic-elegance/config'
import { modernMinimalConfig } from './modern-minimal/config'
import { rusticCharmConfig } from './rustic-charm/config'
import type { TemplateConfig } from './base/types'

export interface TemplateRegistryEntry {
  component: React.ComponentType<any>
  config: TemplateConfig
}

export const templateRegistry: Record<string, TemplateRegistryEntry> = {
  'classic-elegance': {
    component: ClassicElegance,
    config: classicEleganceConfig,
  },
  'modern-minimal': {
    component: ModernMinimal,
    config: modernMinimalConfig,
  },
  'rustic-charm': {
    component: RusticCharm,
    config: rusticCharmConfig,
  },
}

// Template metadata for display in template selection
export const templateMetadata = [
  {
    id: 'classic-elegance',
    name: 'Classic Elegance',
    description: 'Timeless sophistication with serif typography and gold accents',
    category: 'Traditional',
    thumbnail: '/templates/classic-elegance.jpg',
    isPremium: false,
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'Clean lines and contemporary design',
    category: 'Modern',
    thumbnail: '/templates/modern-minimal.jpg',
    isPremium: false,
  },
  {
    id: 'rustic-charm',
    name: 'Rustic Charm',
    description: 'Warm earthy tones and natural textures',
    category: 'Rustic',
    thumbnail: '/templates/rustic-charm.jpg',
    isPremium: false,
  },
]

// Helper function to get template by ID
export function getTemplate(templateId: string): TemplateRegistryEntry | null {
  return templateRegistry[templateId] || null
}
