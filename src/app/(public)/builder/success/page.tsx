'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const url = searchParams.get('url') || ''

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
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

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
          Congratulations! 🎉
        </h1>
        <p className="text-lg text-stone-600 mb-8">
          Your wedding website has been successfully created and published!
        </p>

        {/* Website URL */}
        {url && (
          <div className="bg-stone-50 border border-stone-200 rounded-lg p-6 mb-8">
            <p className="text-sm text-stone-600 mb-2">Your website is live at:</p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg md:text-xl font-semibold text-rose-600 hover:text-rose-700 break-all"
            >
              {url}
            </a>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-rose-500 text-white font-semibold rounded-lg hover:bg-rose-600 transition-all"
            >
              View Your Website
            </a>
          )}
          <Link
            href="/"
            className="px-6 py-3 border border-stone-300 text-stone-700 font-semibold rounded-lg hover:bg-stone-50 transition-all"
          >
            Back to Home
          </Link>
        </div>

        {/* Next Steps */}
        <div className="text-left bg-stone-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-stone-900 mb-4">
            What's Next?
          </h2>
          <ul className="space-y-3 text-stone-700">
            <li className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Share your wedding website URL with family and friends</span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Check back regularly to see who has RSVP'd</span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                Upload photos to your gallery after the wedding
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-50" />}>
      <SuccessContent />
    </Suspense>
  )
}
