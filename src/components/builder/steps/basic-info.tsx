'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DatePicker } from '@/components/ui/date-picker'
import { useState } from 'react'

interface BasicInfoProps {
  data: {
    brideName: string
    groomName: string
    weddingDate: string
  }
  onUpdate: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export function BasicInfo({ data, onUpdate, onNext, onBack }: BasicInfoProps) {
  const [formData, setFormData] = useState(data)

  const handleChange = (field: string, value: string) => {
    const updated = { ...formData, [field]: value }
    setFormData(updated)
    onUpdate(updated)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const isValid = formData.brideName && formData.groomName && formData.weddingDate

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-stone-900 mb-2">
          Basic Information
        </h2>
        <p className="text-stone-600">
          Tell us about the happy couple
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
        <div>
          <Label required>Bride's Name</Label>
          <Input
            type="text"
            value={formData.brideName}
            onChange={(e) => handleChange('brideName', e.target.value)}
            placeholder="Jane"
            required
          />
        </div>

        <div>
          <Label required>Groom's Name</Label>
          <Input
            type="text"
            value={formData.groomName}
            onChange={(e) => handleChange('groomName', e.target.value)}
            placeholder="John"
            required
          />
        </div>

        <div>
          <DatePicker
            label="Wedding Date"
            value={formData.weddingDate}
            onChange={(date) => handleChange('weddingDate', date)}
            required
          />
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-8 py-3 border border-stone-300 text-stone-700 font-semibold rounded-lg hover:bg-stone-50 transition-all"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className="px-8 py-3 bg-rose-500 text-white font-semibold rounded-lg hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  )
}
