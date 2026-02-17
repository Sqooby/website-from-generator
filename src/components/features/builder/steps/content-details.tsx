'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useState, useRef } from 'react'
import type { StoryBlock } from '@/types'

type StoryLayout = 'text-only' | 'image-left' | 'image-right' | 'image-top'

interface ContentDetailsProps {
  data: {
    heroImage?: string
    heroTitle?: string
    heroSubtitle?: string
    storyTitle?: string
    storyContent?: string
    storyImage?: string
    storyLayout?: StoryLayout
    storyBlocks?: StoryBlock[]
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

function generateBlockId() {
  return `block-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function ImageUploadZone({
  value,
  onChange,
  label,
  hint,
}: {
  value?: string
  onChange: (url: string) => void
  label: string
  hint?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) onChange(e.target.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {hint && <p className="text-xs text-stone-400 -mt-1">{hint}</p>}

      {value ? (
        <div className="relative rounded-xl overflow-hidden group">
          <img src={value} alt="Preview" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-3 py-1.5 bg-white text-stone-800 text-xs font-medium rounded-lg"
            >
              Zmień zdjęcie
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-lg"
            >
              Usuń
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-rose-400 bg-rose-50'
              : 'border-stone-200 hover:border-rose-300 hover:bg-rose-50/30'
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-stone-600">Kliknij lub przeciągnij zdjęcie</p>
              <p className="text-xs text-stone-400 mt-0.5">PNG, JPG, WEBP do 5MB</p>
            </div>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }}
      />
    </div>
  )
}

const BLOCK_LAYOUT_OPTIONS: { value: 'text-only' | 'image-left' | 'image-right'; label: string; icon: React.ReactNode }[] = [
  {
    value: 'text-only',
    label: 'Tylko tekst',
    icon: (
      <svg className="w-8 h-6" viewBox="0 0 32 24" fill="currentColor">
        <rect x="2" y="4" width="28" height="2" rx="1" opacity="0.8" />
        <rect x="2" y="9" width="28" height="2" rx="1" opacity="0.6" />
        <rect x="2" y="14" width="20" height="2" rx="1" opacity="0.4" />
      </svg>
    ),
  },
  {
    value: 'image-left',
    label: 'Zdjęcie po lewej',
    icon: (
      <svg className="w-8 h-6" viewBox="0 0 32 24" fill="currentColor">
        <rect x="2" y="2" width="12" height="20" rx="1.5" opacity="0.7" />
        <rect x="17" y="5" width="13" height="2" rx="1" opacity="0.8" />
        <rect x="17" y="10" width="13" height="2" rx="1" opacity="0.6" />
        <rect x="17" y="15" width="9" height="2" rx="1" opacity="0.4" />
      </svg>
    ),
  },
  {
    value: 'image-right',
    label: 'Zdjęcie po prawej',
    icon: (
      <svg className="w-8 h-6" viewBox="0 0 32 24" fill="currentColor">
        <rect x="18" y="2" width="12" height="20" rx="1.5" opacity="0.7" />
        <rect x="2" y="5" width="13" height="2" rx="1" opacity="0.8" />
        <rect x="2" y="10" width="13" height="2" rx="1" opacity="0.6" />
        <rect x="2" y="15" width="9" height="2" rx="1" opacity="0.4" />
      </svg>
    ),
  },
]

const LAYOUT_OPTIONS: { value: StoryLayout; label: string; icon: React.ReactNode }[] = [
  {
    value: 'text-only',
    label: 'Tylko tekst',
    icon: (
      <svg className="w-8 h-6" viewBox="0 0 32 24" fill="currentColor">
        <rect x="2" y="4" width="28" height="2" rx="1" opacity="0.8" />
        <rect x="2" y="9" width="28" height="2" rx="1" opacity="0.6" />
        <rect x="2" y="14" width="20" height="2" rx="1" opacity="0.4" />
      </svg>
    ),
  },
  {
    value: 'image-left',
    label: 'Zdjęcie po lewej',
    icon: (
      <svg className="w-8 h-6" viewBox="0 0 32 24" fill="currentColor">
        <rect x="2" y="2" width="12" height="20" rx="1.5" opacity="0.7" />
        <rect x="17" y="5" width="13" height="2" rx="1" opacity="0.8" />
        <rect x="17" y="10" width="13" height="2" rx="1" opacity="0.6" />
        <rect x="17" y="15" width="9" height="2" rx="1" opacity="0.4" />
      </svg>
    ),
  },
  {
    value: 'image-right',
    label: 'Zdjęcie po prawej',
    icon: (
      <svg className="w-8 h-6" viewBox="0 0 32 24" fill="currentColor">
        <rect x="18" y="2" width="12" height="20" rx="1.5" opacity="0.7" />
        <rect x="2" y="5" width="13" height="2" rx="1" opacity="0.8" />
        <rect x="2" y="10" width="13" height="2" rx="1" opacity="0.6" />
        <rect x="2" y="15" width="9" height="2" rx="1" opacity="0.4" />
      </svg>
    ),
  },
  {
    value: 'image-top',
    label: 'Zdjęcie na górze',
    icon: (
      <svg className="w-8 h-6" viewBox="0 0 32 24" fill="currentColor">
        <rect x="2" y="2" width="28" height="10" rx="1.5" opacity="0.7" />
        <rect x="2" y="15" width="28" height="2" rx="1" opacity="0.8" />
        <rect x="2" y="20" width="20" height="2" rx="1" opacity="0.6" />
      </svg>
    ),
  },
]

const SECTION_OPTIONS = [
  { key: 'hero', label: 'Hero', icon: '🏔️' },
  { key: 'countdown', label: 'Odliczanie', icon: '⏱️' },
  { key: 'story', label: 'Historia', icon: '💑' },
  { key: 'events', label: 'Wydarzenia', icon: '📍' },
  { key: 'rsvp', label: 'RSVP', icon: '✉️' },
  { key: 'gallery', label: 'Galeria', icon: '🖼️' },
]

function StoryTab({
  formData,
  onUpdate,
  ImageUploadZone,
  Label,
  Input,
  Textarea,
}: {
  formData: ContentDetailsProps['data']
  onUpdate: (field: string, value: unknown) => void
  ImageUploadZone: React.ComponentType<{ value?: string; onChange: (url: string) => void; label: string; hint?: string }>
  Label: React.ComponentType<{ children: React.ReactNode }>
  Input: React.ComponentType<React.ComponentPropsWithoutRef<'input'>>
  Textarea: React.ComponentType<React.ComponentPropsWithoutRef<'textarea'>>
}) {
  const blocks: StoryBlock[] =
    (formData.storyBlocks?.length ?? 0) > 0
      ? formData.storyBlocks!
      : [
          {
            id: 'legacy',
            text: formData.storyContent || '',
            image: formData.storyImage,
            layout: formData.storyLayout === 'image-top' ? 'image-right' : (formData.storyLayout as 'text-only' | 'image-left' | 'image-right') || 'text-only',
          },
        ]

  const setBlocks = (newBlocks: StoryBlock[]) => {
    onUpdate('storyBlocks', newBlocks)
  }

  const updateBlock = (id: string, patch: Partial<StoryBlock>) => {
    setBlocks(
      blocks.map((b) => (b.id === id ? { ...b, ...patch } : b))
    )
  }

  const addBlock = () => {
    setBlocks([...blocks, { id: generateBlockId(), text: '', layout: 'text-only' }])
  }

  const removeBlock = (id: string) => {
    if (blocks.length <= 1) return
    setBlocks(blocks.filter((b) => b.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <Label>Tytuł historii</Label>
        <Input
          value={formData.storyTitle || ''}
          onChange={(e) => onUpdate('storyTitle', e.target.value)}
          placeholder="Nasza historia miłości"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Paragrafy (bloki)</Label>
          <button
            type="button"
            onClick={addBlock}
            className="text-sm font-medium text-rose-600 hover:text-rose-700"
          >
            + Dodaj blok
          </button>
        </div>
        <p className="text-xs text-stone-400 mb-3">
          Każdy blok to paragraf z opcjonalnym zdjęciem. Ustaw układ: zdjęcie po lewej, po prawej lub tylko tekst.
        </p>

        <div className="space-y-6">
          {blocks.map((block, index) => (
            <div
              key={block.id}
              className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-500">Blok {index + 1}</span>
                {blocks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeBlock(block.id)}
                    className="text-xs text-red-600 hover:text-red-700"
                  >
                    Usuń blok
                  </button>
                )}
              </div>
              <Textarea
                value={block.text}
                onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                placeholder="Opowiedz fragment historii..."
                rows={3}
              />
              <ImageUploadZone
                value={block.image}
                onChange={(url) => updateBlock(block.id, { image: url })}
                label="Zdjęcie (opcjonalnie)"
                hint="Romantyczne zdjęcie do tego fragmentu"
              />
              {block.image && (
                <div className="space-y-2">
                  <Label>Układ bloku</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {BLOCK_LAYOUT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => updateBlock(block.id, { layout: opt.value })}
                        className={`flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all ${
                          block.layout === opt.value
                            ? 'border-rose-400 bg-rose-50 text-rose-700'
                            : 'border-stone-200 hover:border-stone-300 text-stone-500'
                        }`}
                      >
                        {opt.icon}
                        <span className="text-xs font-medium">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ContentDetails({ data, onUpdate, onNext, onBack }: ContentDetailsProps) {
  const [formData, setFormData] = useState({
    ...data,
    storyLayout: (data.storyLayout || 'image-right') as StoryLayout,
  })
  const [activeTab, setActiveTab] = useState<'sections' | 'hero' | 'story' | 'events'>('sections')

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

  const tabs = [
    { id: 'sections', label: 'Sekcje' },
    { id: 'hero', label: 'Hero' },
    { id: 'story', label: 'Historia' },
    { id: 'events', label: 'Lokalizacje' },
  ] as const

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900 mb-1">Treść i szczegóły</h2>
        <p className="text-stone-500 text-sm">Dostosuj zawartość swojej strony weselnej</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-stone-100 p-1 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-5">
        {/* SEKCJE */}
        {activeTab === 'sections' && (
          <div className="space-y-3">
            <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">Włącz lub wyłącz sekcje strony</p>
            <div className="grid grid-cols-2 gap-3">
              {SECTION_OPTIONS.map((opt) => {
                const isOn = formData.sections[opt.key as keyof typeof formData.sections]
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => handleSectionToggle(opt.key, !isOn)}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                      isOn
                        ? 'border-rose-400 bg-rose-50 text-rose-900'
                        : 'border-stone-200 bg-white text-stone-500 hover:border-stone-300'
                    }`}
                  >
                    <span className="text-xl">{opt.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{opt.label}</div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      isOn ? 'border-rose-500 bg-rose-500' : 'border-stone-300'
                    }`}>
                      {isOn && (
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* HERO */}
        {activeTab === 'hero' && (
          <div className="space-y-5">
            <ImageUploadZone
              value={formData.heroImage}
              onChange={(url) => handleChange('heroImage', url)}
              label="Zdjęcie w tle (Hero)"
              hint="Zalecane: zdjęcie poziome min. 1920×1080px"
            />
            <div>
              <Label>Nagłówek (opcjonalny)</Label>
              <Input
                value={formData.heroTitle || ''}
                onChange={(e) => handleChange('heroTitle', e.target.value)}
                placeholder="Jan & Anna"
              />
              <p className="text-xs text-stone-400 mt-1">Domyślnie: imiona pary</p>
            </div>
            <div>
              <Label>Podtytuł (opcjonalny)</Label>
              <Input
                value={formData.heroSubtitle || ''}
                onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                placeholder="15 sierpnia 2025"
              />
              <p className="text-xs text-stone-400 mt-1">Domyślnie: data ślubu</p>
            </div>
          </div>
        )}

        {/* HISTORIA */}
        {activeTab === 'story' && (
          <StoryTab
            formData={formData}
            onUpdate={handleChange}
            ImageUploadZone={ImageUploadZone}
            Label={Label}
            Input={Input}
            Textarea={Textarea}
          />
        )}

        {/* LOKALIZACJE */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            {formData.sections.events ? (
              <>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-base">⛪</span>
                    <h4 className="font-semibold text-stone-800">Ceremonia</h4>
                  </div>
                  <div>
                    <Label>Nazwa miejsca</Label>
                    <Input
                      value={formData.ceremonyVenue || ''}
                      onChange={(e) => handleChange('ceremonyVenue', e.target.value)}
                      placeholder="Kościół Św. Marii"
                    />
                  </div>
                  <div>
                    <Label>Adres</Label>
                    <Input
                      value={formData.ceremonyAddress || ''}
                      onChange={(e) => handleChange('ceremonyAddress', e.target.value)}
                      placeholder="ul. Kościelna 1, Warszawa"
                    />
                  </div>
                </div>

                <div className="border-t border-stone-100 pt-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🥂</span>
                    <h4 className="font-semibold text-stone-800">Wesele</h4>
                  </div>
                  <div>
                    <Label>Nazwa miejsca</Label>
                    <Input
                      value={formData.receptionVenue || ''}
                      onChange={(e) => handleChange('receptionVenue', e.target.value)}
                      placeholder="Pałac Romantyczny"
                    />
                  </div>
                  <div>
                    <Label>Adres</Label>
                    <Input
                      value={formData.receptionAddress || ''}
                      onChange={(e) => handleChange('receptionAddress', e.target.value)}
                      placeholder="ul. Weselna 5, Kraków"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-stone-400">
                <p className="text-sm">Sekcja &quot;Wydarzenia&quot; jest wyłączona.</p>
                <button
                  type="button"
                  onClick={() => { setActiveTab('sections'); handleSectionToggle('events', true) }}
                  className="text-rose-500 text-sm font-medium mt-2 hover:underline"
                >
                  Włącz ją w zakładce Sekcje →
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4 border-t border-stone-100">
        <button
          onClick={onBack}
          className="px-6 py-2.5 border border-stone-300 text-stone-700 font-medium rounded-xl hover:bg-stone-50 transition-all text-sm"
        >
          Wstecz
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2.5 bg-rose-500 text-white font-medium rounded-xl hover:bg-rose-600 transition-all text-sm"
        >
          Dalej →
        </button>
      </div>
    </div>
  )
}
