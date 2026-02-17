import { z } from 'zod'

export const rsvpSchema = z.object({
  subdomain: z.string(),
  guestName: z.string().min(1),
  email: z.string().email(),
  attending: z.boolean(),
  plusOne: z.boolean().optional(),
  plusOneName: z.string().optional(),
  dietaryRequirements: z.string().optional(),
  message: z.string().optional(),
})

export type RsvpInput = z.infer<typeof rsvpSchema>
