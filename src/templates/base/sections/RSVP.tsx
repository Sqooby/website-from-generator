'use client'

import { useState } from 'react'
import type { SectionProps } from '../types'

export function RSVP({ content, config }: SectionProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!content.sections || !(content.sections as any).rsvp) return null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      subdomain: window.location.hostname.split('.')[0],
      guestName: formData.get('guestName'),
      email: formData.get('email'),
      attending: formData.get('attending') === 'yes',
      plusOne: formData.get('plusOne') === 'true',
      dietaryRequirements: formData.get('dietaryRequirements') || undefined,
      message: formData.get('message') || undefined,
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/rsvp`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      )

      if (response.ok) {
        setSubmitted(true)
      }
    } catch (error) {
      console.error('RSVP submission error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      className="py-20 px-4"
      style={{ backgroundColor: config.colors.background }}
    >
      <div className="container mx-auto max-w-2xl">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-12"
          style={{
            fontFamily: config.fonts.heading,
            color: config.colors.text,
          }}
        >
          RSVP
        </h2>

        {submitted ? (
          <div
            className="text-center py-12 px-6 rounded-lg"
            style={{ backgroundColor: 'white' }}
          >
            <div
              className="text-5xl mb-4"
              style={{ color: config.colors.primary }}
            >
              ✓
            </div>
            <h3
              className="text-2xl font-bold mb-2"
              style={{
                fontFamily: config.fonts.heading,
                color: config.colors.text,
              }}
            >
              Thank You!
            </h3>
            <p style={{ fontFamily: config.fonts.body }}>
              We've received your RSVP and can't wait to celebrate with you!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: config.colors.text }}
              >
                Your Name *
              </label>
              <input
                type="text"
                name="guestName"
                required
                className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-offset-2 focus:outline-none"
                style={{ borderColor: config.colors.primary }}
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: config.colors.text }}
              >
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-offset-2 focus:outline-none"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: config.colors.text }}
              >
                Will you attend? *
              </label>
              <select
                name="attending"
                required
                className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="yes">Yes, I'll be there!</option>
                <option value="no">Sorry, can't make it</option>
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: config.colors.text }}
              >
                Bringing a plus one?
              </label>
              <select
                name="plusOne"
                className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: config.colors.text }}
              >
                Dietary Requirements
              </label>
              <input
                type="text"
                name="dietaryRequirements"
                className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-offset-2 focus:outline-none"
                placeholder="e.g., Vegetarian, Gluten-free"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: config.colors.text }}
              >
                Message to the couple
              </label>
              <textarea
                name="message"
                rows={4}
                className="w-full px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-offset-2 focus:outline-none"
                placeholder="Share your well wishes..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white py-4 rounded-md font-semibold text-lg transition-all hover:opacity-90 disabled:opacity-50"
              style={{
                backgroundColor: config.colors.primary,
                fontFamily: config.fonts.body,
              }}
            >
              {loading ? 'Submitting...' : 'Submit RSVP'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
