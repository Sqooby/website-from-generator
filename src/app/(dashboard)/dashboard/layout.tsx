import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="text-xl font-serif font-bold text-pink-600">
            WeddingSite
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-pink-600 transition"
            >
              My Websites
            </Link>
            <Link
              href="/dashboard/subscription"
              className="text-gray-700 hover:text-pink-600 transition"
            >
              Subscription
            </Link>
            <Link
              href="/dashboard/settings"
              className="text-gray-700 hover:text-pink-600 transition"
            >
              Settings
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost">Logout</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
