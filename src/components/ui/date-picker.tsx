import * as React from 'react'

export interface DatePickerProps {
  value?: string
  onChange: (date: string) => void
  label?: string
  required?: boolean
}

export function DatePicker({ value, onChange, label, required }: DatePickerProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-stone-900">
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>
      )}
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="flex h-11 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
      />
    </div>
  )
}
