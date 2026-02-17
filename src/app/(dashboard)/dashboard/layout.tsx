import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth, signOut } from '@/lib/auth'
import { Button } from '@/components/ui/button'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session) redirect('/login')

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
            <span className="text-sm text-gray-600 hidden md:block">
              {session.user?.name || session.user?.email}
            </span>
            <form
              action={async () => {
                'use server'
                await signOut({ redirectTo: '/login' })
              }}
            >
              <Button type="submit" variant="ghost">
                Wyloguj
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
