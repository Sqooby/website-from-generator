import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface Props {
  searchParams: Promise<{ url?: string; subdomain?: string }>
}

export default async function BuilderSuccessPage({ searchParams }: Props) {
  const { url, subdomain } = await searchParams

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-900 mb-3">
            Strona opublikowana!
          </h1>
          <p className="text-stone-600">
            Twoja strona weselna jest już dostępna online
          </p>
        </div>

        {url && (
          <div className="bg-white border border-stone-200 rounded-lg p-6 space-y-3">
            <p className="text-sm text-stone-500">Adres Twojej strony:</p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-rose-600 hover:text-rose-700 hover:underline break-all"
            >
              {url}
            </a>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2"
            >
              <Button className="w-full">Otwórz stronę weselną</Button>
            </a>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/dashboard">
            <Button variant="outline">Przejdź do panelu</Button>
          </Link>
          <Link href="/builder">
            <Button variant="ghost">Utwórz kolejną stronę</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
