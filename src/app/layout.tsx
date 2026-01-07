import type { Metadata } from 'next'
import { Cormorant_Garamond, Outfit } from 'next/font/google'
import '@/styles/globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Wedding Website Generator',
  description: 'Create your beautiful wedding website in minutes',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${cormorant.variable}`}>
      <body className="antialiased font-sans text-stone-800 bg-stone-50">
        {children}
      </body>
    </html>
  )
}
