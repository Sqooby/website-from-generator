'use client'

import * as React from 'react'

export interface ToggleProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: string
  disabled?: boolean
}

export function Toggle({ checked, onCheckedChange, label, disabled }: ToggleProps) {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          disabled={disabled}
        />
        <div
          className={`block w-14 h-8 rounded-full transition-colors ${
            checked ? 'bg-rose-500' : 'bg-stone-300'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        ></div>
        <div
          className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
            checked ? 'transform translate-x-6' : ''
          }`}
        ></div>
      </div>
      {label && <span className="ml-3 text-sm font-medium text-stone-900">{label}</span>}
    </label>
  )
}
