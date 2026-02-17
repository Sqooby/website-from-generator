import type { TemplateConfig } from './types'
import type { WebsiteContent } from '@/types'

/**
 * Merges user content theme (primaryColor, fontFamily, etc.) into template config
 * so that color/font choices from the builder actually apply in the template.
 */
export function mergeContentTheme(
  templateConfig: TemplateConfig,
  content: Pick<WebsiteContent, 'primaryColor' | 'secondaryColor' | 'accentColor' | 'fontFamily'>
): TemplateConfig {
  return {
    ...templateConfig,
    colors: {
      ...templateConfig.colors,
      ...(content.primaryColor && { primary: content.primaryColor }),
      ...(content.secondaryColor && { secondary: content.secondaryColor }),
      ...(content.accentColor && { accent: content.accentColor }),
    },
    fonts: {
      ...templateConfig.fonts,
      ...(content.fontFamily && {
        heading: content.fontFamily,
        body: content.fontFamily,
      }),
    },
  }
}
