'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface FormData {
  brideName: string
  groomName: string
  weddingDate: string
  storyTitle: string
  storyContent: string
  ceremonyVenue: string
  ceremonyAddress: string
  receptionVenue: string
  receptionAddress: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
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

interface ReviewPublishProps {
  data: FormData
  templateId: string
  onUpdate: (data: Partial<FormData>) => void
  onBack: () => void
}

export function ReviewPublish({ data, templateId, onUpdate, onBack }: ReviewPublishProps) {
  const router = useRouter()
  const [subdomain, setSubdomain] = useState(
    `${data.brideName.toLowerCase()}-${data.groomName.toLowerCase()}`.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  )
  const [isPublishing, setIsPublishing] = useState(false)
  const [error, setError] = useState('')

  const handleSubdomainChange = (value: string) => {
    const cleaned = value.toLowerCase().replace(/[^a-z0-9-]/g, '')
    setSubdomain(cleaned)
  }

  const handlePublish = async () => {
    if (!subdomain) {
      setError('Subdomena jest wymagana')
      return
    }

    setIsPublishing(true)
    setError('')

    try {
      // Krok 1: Utwórz stronę w bazie (szkic)
      const createRes = await fetch('/api/websites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subdomain,
          templateId,
          brideName: data.brideName,
          groomName: data.groomName,
          weddingDate: data.weddingDate,
          primaryColor: data.primaryColor,
          secondaryColor: data.secondaryColor,
          accentColor: data.accentColor,
          storyTitle: data.storyTitle || undefined,
          storyContent: data.storyContent || undefined,
          ceremonyVenue: data.ceremonyVenue || undefined,
          ceremonyAddress: data.ceremonyAddress || undefined,
          receptionVenue: data.receptionVenue || undefined,
          receptionAddress: data.receptionAddress || undefined,
          sections: data.sections,
        }),
      })

      if (!createRes.ok) {
        const errorData = await createRes.json()
        throw new Error(errorData.error || 'Nie udało się utworzyć strony')
      }

      const { data: website } = await createRes.json()

      // Krok 2: Opublikuj stronę
      const publishRes = await fetch(`/api/websites/${website.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: true }),
      })

      if (!publishRes.ok) {
        throw new Error('Nie udało się opublikować strony')
      }

      // Krok 3: Przekieruj na stronę sukcesu
      const hostname = window.location.hostname
      const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1'
      const port = window.location.port
      const websiteUrl = isLocalhost
        ? `http://${subdomain}.localhost${port ? ':' + port : ''}`
        : `https://${subdomain}.${hostname.split('.').slice(-2).join('.')}`

      router.push(`/builder/success?url=${encodeURIComponent(websiteUrl)}&subdomain=${encodeURIComponent(subdomain)}`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd')
      setIsPublishing(false)
    }
  }

  const templateLabel = templateId
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-stone-900 mb-2">
          Przegląd i publikacja
        </h2>
        <p className="text-stone-600">
          Prawie gotowe! Opublikujmy Twoją stronę weselną
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Podsumowanie */}
        <div className="bg-white p-6 rounded-lg border border-stone-200">
          <h3 className="font-semibold text-lg mb-4">Podsumowanie</h3>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-stone-600">Para:</dt>
              <dd className="font-medium">{data.brideName} & {data.groomName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-600">Data ślubu:</dt>
              <dd className="font-medium">
                {data.weddingDate
                  ? new Date(data.weddingDate).toLocaleDateString('pl-PL', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : '—'}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-600">Szablon:</dt>
              <dd className="font-medium">{templateLabel}</dd>
            </div>
            {data.ceremonyVenue && (
              <div className="flex justify-between">
                <dt className="text-stone-600">Ceremonia:</dt>
                <dd className="font-medium">{data.ceremonyVenue}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Subdomena */}
        <div className="bg-white p-6 rounded-lg border border-stone-200 space-y-4">
          <h3 className="font-semibold text-lg">Adres Twojej strony</h3>
          <div>
            <Label required>Subdomena</Label>
            <div className="flex items-center gap-2">
              <Input
                value={subdomain}
                onChange={(e) => handleSubdomainChange(e.target.value)}
                placeholder="jan-anna"
                required
              />
              <span className="text-stone-600 whitespace-nowrap">.yoursite.com</span>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Tylko małe litery, cyfry i myślniki
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded text-rose-700 text-sm">
              {error}
            </div>
          )}
        </div>

        <div className="flex justify-between pt-4">
          <button
            onClick={onBack}
            disabled={isPublishing}
            className="px-8 py-3 border border-stone-300 text-stone-700 font-semibold rounded-lg hover:bg-stone-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Wstecz
          </button>
          <button
            onClick={handlePublish}
            disabled={!subdomain || isPublishing}
            className="px-8 py-3 bg-rose-500 text-white font-semibold rounded-lg hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {isPublishing ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Publikowanie...
              </>
            ) : (
              'Opublikuj stronę'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
