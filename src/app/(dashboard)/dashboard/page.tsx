import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { websiteService } from '@/server/services/website.service'
import { Button } from '@/components/ui/button'
import { WebsiteCard } from '@/components/features/dashboard/website-card'

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const websites = await websiteService.listWebsites(session.user.id)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold mb-2">Moje strony weselne</h1>
          <p className="text-gray-600">Zarządzaj i edytuj swoje strony weselne</p>
        </div>
        <Link href="/builder">
          <Button size="lg">Utwórz nową stronę</Button>
        </Link>
      </div>

      {websites.length === 0 ? (
        <div className="bg-white rounded-lg border p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Brak stron</h2>
          <p className="text-gray-600 mb-6">
            Stwórz swoją pierwszą stronę weselną, aby zacząć
          </p>
          <Link href="/builder">
            <Button>Przejdź do kreatora</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {websites.map((website) => (
            <WebsiteCard key={website.id} website={website} />
          ))}
        </div>
      )}
    </div>
  )
}
