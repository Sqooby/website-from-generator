'use client'

import * as React from 'react'
import { HexColorPicker } from 'react-colorful'

export interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  label?: string
}

export function ColorPicker({ color, onChange, label }: ColorPickerProps) {
  const [showPicker, setShowPicker] = React.useState(false)
  const pickerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-stone-900">{label}</label>}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className="w-12 h-12 rounded-md border-2 border-stone-300 shadow-sm hover:border-stone-400 transition-colors"
          style={{ backgroundColor: color }}
        />
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="flex h-11 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
          placeholder="#000000"
        />
      </div>
      {showPicker && (
        <div ref={pickerRef} className="absolute z-10 mt-2">
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  )
}
