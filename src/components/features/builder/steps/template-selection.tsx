'use client'

import { templateMetadata } from '@/templates/registry'
import Image from 'next/image'

interface TemplateSelectionProps {
  selectedTemplate: string | null
  onSelectTemplate: (templateId: string) => void
  onNext: () => void
}

export function TemplateSelection({
  selectedTemplate,
  onSelectTemplate,
  onNext,
}: TemplateSelectionProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-stone-900 mb-2">
          Choose Your Template
        </h2>
        <p className="text-stone-600">
          Select a beautiful template to get started
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {templateMetadata.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            className={`group relative rounded-lg overflow-hidden border-2 transition-all hover:shadow-xl ${
              selectedTemplate === template.id
                ? 'border-rose-500 ring-4 ring-rose-100'
                : 'border-stone-200 hover:border-rose-300'
            }`}
          >
            <div className="aspect-[3/4] bg-stone-100 relative">
              <div className="absolute inset-0 flex items-center justify-center text-stone-400">
                {template.name}
              </div>
            </div>
            <div className="p-4 bg-white">
              <h3 className="font-semibold text-stone-900 mb-1">
                {template.name}
              </h3>
              <p className="text-sm text-stone-600 mb-2">
                {template.description}
              </p>
              <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-stone-100 text-stone-700">
                {template.category}
              </span>
            </div>
            {selectedTemplate === template.id && (
              <div className="absolute top-4 right-4 w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white">
                ✓
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!selectedTemplate}
          className="px-8 py-3 bg-rose-500 text-white font-semibold rounded-lg hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
