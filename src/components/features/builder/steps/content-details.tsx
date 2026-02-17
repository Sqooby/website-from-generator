'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Toggle } from '@/components/ui/toggle'
import { useState } from 'react'

interface ContentDetailsProps {
  data: {
    storyTitle?: string
    storyContent?: string
    ceremonyVenue?: string
    ceremonyAddress?: string
    receptionVenue?: string
    receptionAddress?: string
    sections: {
      hero: boolean
      countdown: boolean
      story: boolean
      events: boolean
      rsvp: boolean
      gallery: boolean
      travel: boolean
      faq: boolean
    }
  }
  onUpdate: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export function ContentDetails({ data, onUpdate, onNext, onBack }: ContentDetailsProps) {
  const [formData, setFormData] = useState(data)

  const handleChange = (field: string, value: any) => {
    const updated = { ...formData, [field]: value }
    setFormData(updated)
    onUpdate(updated)
  }

  const handleSectionToggle = (section: string, checked: boolean) => {
    const updated = {
      ...formData,
      sections: { ...formData.sections, [section]: checked },
    }
    setFormData(updated)
    onUpdate(updated)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-stone-900 mb-2">
          Content & Details
        </h2>
        <p className="text-stone-600">
          Customize what appears on your website
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Section Toggles */}
        <div className="bg-white p-6 rounded-lg border border-stone-200">
          <h3 className="font-semibold text-lg mb-4">Enable Sections</h3>
          <div className="grid grid-cols-2 gap-4">
            <Toggle
              label="Hero"
              checked={formData.sections.hero}
              onCheckedChange={(checked) => handleSectionToggle('hero', checked)}
            />
            <Toggle
              label="Countdown"
              checked={formData.sections.countdown}
              onCheckedChange={(checked) => handleSectionToggle('countdown', checked)}
            />
            <Toggle
              label="Story"
              checked={formData.sections.story}
              onCheckedChange={(checked) => handleSectionToggle('story', checked)}
            />
            <Toggle
              label="Events"
              checked={formData.sections.events}
              onCheckedChange={(checked) => handleSectionToggle('events', checked)}
            />
            <Toggle
              label="RSVP"
              checked={formData.sections.rsvp}
              onCheckedChange={(checked) => handleSectionToggle('rsvp', checked)}
            />
            <Toggle
              label="Gallery"
              checked={formData.sections.gallery}
              onCheckedChange={(checked) => handleSectionToggle('gallery', checked)}
            />
          </div>
        </div>

        {/* Story Section */}
        {formData.sections.story && (
          <div className="bg-white p-6 rounded-lg border border-stone-200 space-y-4">
            <h3 className="font-semibold text-lg">Your Love Story</h3>
            <div>
              <Label>Story Title</Label>
              <Input
                value={formData.storyTitle || ''}
                onChange={(e) => handleChange('storyTitle', e.target.value)}
                placeholder="Our Love Story"
              />
            </div>
            <div>
              <Label>Story Content</Label>
              <Textarea
                value={formData.storyContent || ''}
                onChange={(e) => handleChange('storyContent', e.target.value)}
                placeholder="Tell your story..."
                rows={6}
              />
            </div>
          </div>
        )}

        {/* Event Details */}
        {formData.sections.events && (
          <div className="bg-white p-6 rounded-lg border border-stone-200 space-y-6">
            <h3 className="font-semibold text-lg">Event Details</h3>

            <div className="space-y-4">
              <h4 className="font-medium text-stone-700">Ceremony</h4>
              <div>
                <Label>Venue Name</Label>
                <Input
                  value={formData.ceremonyVenue || ''}
                  onChange={(e) => handleChange('ceremonyVenue', e.target.value)}
                  placeholder="St. Mary's Church"
                />
              </div>
              <div>
                <Label>Address</Label>
                <Input
                  value={formData.ceremonyAddress || ''}
                  onChange={(e) => handleChange('ceremonyAddress', e.target.value)}
                  placeholder="123 Main St, City, State"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-stone-700">Reception</h4>
              <div>
                <Label>Venue Name</Label>
                <Input
                  value={formData.receptionVenue || ''}
                  onChange={(e) => handleChange('receptionVenue', e.target.value)}
                  placeholder="Grand Ballroom"
                />
              </div>
              <div>
                <Label>Address</Label>
                <Input
                  value={formData.receptionAddress || ''}
                  onChange={(e) => handleChange('receptionAddress', e.target.value)}
                  placeholder="456 Park Ave, City, State"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <button
            onClick={onBack}
            className="px-8 py-3 border border-stone-300 text-stone-700 font-semibold rounded-lg hover:bg-stone-50 transition-all"
          >
            Back
          </button>
          <button
            onClick={onNext}
            className="px-8 py-3 bg-rose-500 text-white font-semibold rounded-lg hover:bg-rose-600 transition-all"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
