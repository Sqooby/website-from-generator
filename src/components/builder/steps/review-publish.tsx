'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ReviewPublishProps {
  data: {
    brideName: string
    groomName: string
    weddingDate: string
    subdomain?: string
  }
  templateId: string
  onUpdate: (data: any) => void
  onBack: () => void
}

export function ReviewPublish({ data, templateId, onUpdate, onBack }: ReviewPublishProps) {
  const router = useRouter()
  const [subdomain, setSubdomain] = useState(
    data.subdomain ||
      `${data.brideName.toLowerCase()}-${data.groomName.toLowerCase()}`.replace(/\s+/g, '')
  )
  const [isPublishing, setIsPublishing] = useState(false)
  const [error, setError] = useState('')

  const handleSubdomainChange = (value: string) => {
    // Allow only lowercase letters, numbers, and hyphens
    const cleaned = value.toLowerCase().replace(/[^a-z0-9-]/g, '')
    setSubdomain(cleaned)
    onUpdate({ ...data, subdomain: cleaned })
  }

  const handlePublish = async () => {
    setIsPublishing(true)
    setError('')

    try {
      // Step 1: Create website in database (as draft - published: false)
      const response = await fetch('/api/websites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subdomain,
          templateId,
          ...data,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create website')
      }

      const { data: website } = await response.json()

      // Step 2: Publish website (set published: true)
      // Dynamic routing will automatically handle subdomain → /wedding/[subdomain]
      const publishResponse = await fetch(`/api/websites/${website.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: true }),
      })

      if (!publishResponse.ok) {
        throw new Error('Failed to publish website')
      }

      // Step 3: Generate website URL (dynamic routing handles this automatically)
      // Extract main domain from current hostname
      const hostname = window.location.hostname
      const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1'
      const mainDomain = isLocalhost 
        ? hostname + (window.location.port ? `:${window.location.port}` : '')
        : hostname.split('.').slice(-2).join('.') // Get domain.com from subdomain.domain.com
      
      const protocol = isLocalhost ? 'http' : 'https'
      const websiteUrl = `${protocol}://${subdomain}.${mainDomain}`

      // Redirect to success page
      router.push(`/builder/success?url=${encodeURIComponent(websiteUrl)}`)
    } catch (err: any) {
      setError(err.message)
      setIsPublishing(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-stone-900 mb-2">
          Review & Publish
        </h2>
        <p className="text-stone-600">
          Almost there! Let's publish your wedding website
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Summary */}
        <div className="bg-white p-6 rounded-lg border border-stone-200">
          <h3 className="font-semibold text-lg mb-4">Website Summary</h3>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-stone-600">Couple:</dt>
              <dd className="font-medium">{data.brideName} & {data.groomName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-600">Wedding Date:</dt>
              <dd className="font-medium">
                {new Date(data.weddingDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-600">Template:</dt>
              <dd className="font-medium capitalize">{templateId.replace('-', ' ')}</dd>
            </div>
          </dl>
        </div>

        {/* Subdomain */}
        <div className="bg-white p-6 rounded-lg border border-stone-200 space-y-4">
          <h3 className="font-semibold text-lg">Your Website URL</h3>
          <div>
            <Label required>Subdomain</Label>
            <div className="flex items-center gap-2">
              <Input
                value={subdomain}
                onChange={(e) => handleSubdomainChange(e.target.value)}
                placeholder="john-mary"
                required
              />
              <span className="text-stone-600 whitespace-nowrap">.yoursite.com</span>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Only lowercase letters, numbers, and hyphens allowed
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
            Back
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
                Publishing...
              </>
            ) : (
              'Publish Website'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
