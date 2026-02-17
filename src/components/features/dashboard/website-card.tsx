'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

type WebsiteWithContent = {
  id: string
  subdomain: string
  templateId: string
  published: boolean
  publishedAt: Date | null
  deploymentUrl: string | null
  content: {
    brideName: string
    groomName: string
    weddingDate: Date
  } | null
}

interface WebsiteCardProps {
  website: WebsiteWithContent
}

export function WebsiteCard({ website }: WebsiteCardProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }

    setIsDeleting(true)
    try {
      const res = await fetch(`/api/websites/${website.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      router.refresh()
    } catch {
      setIsDeleting(false)
      setConfirmDelete(false)
    }
  }

  const templateLabel = website.templateId
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  const weddingDate = website.content?.weddingDate
    ? new Date(website.content.weddingDate).toLocaleDateString('pl-PL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null

  const websiteUrl = website.published
    ? (() => {
        if (typeof window !== 'undefined') {
          const hostname = window.location.hostname
          const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1'
          const port = window.location.port
          if (isLocalhost) return `http://${website.subdomain}.localhost${port ? ':' + port : ''}`
          const rootDomain = hostname.split('.').slice(-2).join('.')
          return `https://${website.subdomain}.${rootDomain}`
        }
        return null
      })()
    : null

  return (
    <div className="bg-white rounded-lg border p-6 hover:shadow-lg transition flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-pink-600">{templateLabel}</span>
        <span
          className={`text-xs px-2 py-1 rounded ${
            website.published
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {website.published ? 'Opublikowana' : 'Szkic'}
        </span>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-1">
          {website.content?.brideName} & {website.content?.groomName}
        </h3>
        {weddingDate && (
          <p className="text-sm text-gray-600">{weddingDate}</p>
        )}
        <p className="text-xs text-gray-400 mt-1">{website.subdomain}.yoursite.com</p>
      </div>

      {websiteUrl && (
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline truncate"
        >
          {websiteUrl}
        </a>
      )}

      <div className="flex gap-2 mt-auto pt-2">
        <Link href={`/dashboard/websites/${website.id}/edit`} className="flex-1">
          <Button variant="outline" className="w-full" size="sm">
            Edytuj
          </Button>
        </Link>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`flex-1 px-3 py-1.5 text-sm font-medium rounded border transition-all disabled:opacity-50 ${
            confirmDelete
              ? 'bg-red-600 text-white border-red-600 hover:bg-red-700'
              : 'border-red-300 text-red-600 hover:bg-red-50'
          }`}
        >
          {isDeleting ? 'Usuwanie...' : confirmDelete ? 'Potwierdź usunięcie' : 'Usuń'}
        </button>
      </div>

      {confirmDelete && !isDeleting && (
        <button
          onClick={() => setConfirmDelete(false)}
          className="text-xs text-gray-400 hover:text-gray-600 text-center"
        >
          Anuluj
        </button>
      )}
    </div>
  )
}
