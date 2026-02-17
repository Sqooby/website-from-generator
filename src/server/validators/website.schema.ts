import { z } from 'zod'

export const createWebsiteSchema = z.object({
  subdomain: z.string().min(3).max(50).regex(/^[a-z0-9-]+$/),
  templateId: z.string(),
  brideName: z.string().min(1),
  groomName: z.string().min(1),
  weddingDate: z.string(),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  accentColor: z.string().optional(),
  storyTitle: z.string().optional(),
  storyContent: z.string().optional(),
  ceremonyVenue: z.string().optional(),
  ceremonyAddress: z.string().optional(),
  receptionVenue: z.string().optional(),
  receptionAddress: z.string().optional(),
  sections: z
    .object({
      hero: z.boolean(),
      countdown: z.boolean(),
      story: z.boolean(),
      events: z.boolean(),
      rsvp: z.boolean(),
      gallery: z.boolean(),
      travel: z.boolean(),
      faq: z.boolean(),
    })
    .optional(),
})

export const updateWebsiteSchema = z.object({
  published: z.boolean().optional(),
  templateId: z.string().optional(),
})

export type CreateWebsiteInput = z.infer<typeof createWebsiteSchema>
export type UpdateWebsiteInput = z.infer<typeof updateWebsiteSchema>
