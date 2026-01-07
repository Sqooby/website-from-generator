import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-20">
          {/* Logo - Left */}
          <div>
            <Link
              href="/"
              className="text-2xl font-serif font-semibold text-stone-900 tracking-tight hover:text-rose-600 transition-colors duration-300"
            >
              Évora
            </Link>
          </div>

          {/* Navigation - Center */}
          <nav className="hidden md:flex items-center gap-8 justify-center">
            <Link
              href="/templates"
              className="text-sm font-medium text-stone-700 hover:text-rose-600 transition-colors duration-300 relative group"
            >
              Templates
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-stone-700 hover:text-rose-600 transition-colors duration-300 relative group"
            >
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/features"
              className="text-sm font-medium text-stone-700 hover:text-rose-600 transition-colors duration-300 relative group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/help"
              className="text-sm font-medium text-stone-700 hover:text-rose-600 transition-colors duration-300 relative group"
            >
              Help
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Buttons - Right */}
          <div className="flex items-center gap-3 justify-end">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log In</Button>
            </Link>
            <Link href="/register">
              <Button variant="primary" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
