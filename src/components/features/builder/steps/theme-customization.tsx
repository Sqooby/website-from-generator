'use client'

import { ColorPicker } from '@/components/ui/color-picker'
import { useState } from 'react'

interface ThemeCustomizationProps {
  data: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
  }
  onUpdate: (data: any) => void
  onNext: () => void
  onBack: () => void
}

const colorPresets = [
  {
    name: 'Classic Gold',
    primary: '#8B7355',
    secondary: '#F5F5DC',
    accent: '#D4AF37',
  },
  {
    name: 'Modern Black',
    primary: '#000000',
    secondary: '#FFFFFF',
    accent: '#808080',
  },
  {
    name: 'Rustic Brown',
    primary: '#8B4513',
    secondary: '#FFF8DC',
    accent: '#CD853F',
  },
  {
    name: 'Romantic Rose',
    primary: '#E91E63',
    secondary: '#FCE4EC',
    accent: '#F48FB1',
  },
]

export function ThemeCustomization({ data, onUpdate, onNext, onBack }: ThemeCustomizationProps) {
  const [formData, setFormData] = useState(data)

  const handleColorChange = (field: string, color: string) => {
    const updated = { ...formData, [field]: color }
    setFormData(updated)
    onUpdate(updated)
  }

  const applyPreset = (preset: typeof colorPresets[0]) => {
    const updated = {
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent,
    }
    setFormData(updated)
    onUpdate(updated)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-stone-900 mb-2">
          Theme Customization
        </h2>
        <p className="text-stone-600">
          Choose your wedding colors
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Color Presets */}
        <div className="bg-white p-6 rounded-lg border border-stone-200">
          <h3 className="font-semibold text-lg mb-4">Color Presets</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colorPresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset)}
                className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-stone-200 hover:border-rose-500 transition-all group"
              >
                <div className="flex gap-1">
                  <div
                    className="w-8 h-8 rounded-full border border-stone-200"
                    style={{ backgroundColor: preset.primary }}
                  />
                  <div
                    className="w-8 h-8 rounded-full border border-stone-200"
                    style={{ backgroundColor: preset.secondary }}
                  />
                  <div
                    className="w-8 h-8 rounded-full border border-stone-200"
                    style={{ backgroundColor: preset.accent }}
                  />
                </div>
                <span className="text-xs font-medium text-stone-700 group-hover:text-rose-600">
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Colors */}
        <div className="bg-white p-6 rounded-lg border border-stone-200 space-y-6">
          <h3 className="font-semibold text-lg">Custom Colors</h3>

          <ColorPicker
            label="Primary Color"
            color={formData.primaryColor}
            onChange={(color) => handleColorChange('primaryColor', color)}
          />

          <ColorPicker
            label="Secondary Color"
            color={formData.secondaryColor}
            onChange={(color) => handleColorChange('secondaryColor', color)}
          />

          <ColorPicker
            label="Accent Color"
            color={formData.accentColor}
            onChange={(color) => handleColorChange('accentColor', color)}
          />
        </div>

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
