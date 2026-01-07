import Link from 'next/link'
import { Button } from '@/components/ui/button'

// This would come from your database
const mockWebsites = [
  {
    id: '1',
    subdomain: 'john-mary',
    brideName: 'Mary',
    groomName: 'John',
    weddingDate: '2024-08-15',
    published: true,
    templateName: 'Classic Elegance',
  },
]

export default function DashboardPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold mb-2">My Wedding Websites</h1>
          <p className="text-gray-600">Manage and edit your wedding websites</p>
        </div>
        <Link href="/dashboard/websites/new">
          <Button size="lg">Create New Website</Button>
        </Link>
      </div>

      {mockWebsites.length === 0 ? (
        <div className="bg-white rounded-lg border p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">No websites yet</h2>
          <p className="text-gray-600 mb-6">
            Create your first wedding website to get started
          </p>
          <Link href="/templates">
            <Button>Browse Templates</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockWebsites.map((website) => (
            <div key={website.id} className="bg-white rounded-lg border p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-pink-600">
                  {website.templateName}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    website.published
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {website.published ? 'Published' : 'Draft'}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2">
                {website.brideName} & {website.groomName}
              </h3>

              <p className="text-sm text-gray-600 mb-4">
                {new Date(website.weddingDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>

              {website.published && (
                <a
                  href={`https://${website.subdomain}.yourplatform.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline block mb-4"
                >
                  {website.subdomain}.yourplatform.com
                </a>
              )}

              <div className="flex gap-2">
                <Link href={`/dashboard/websites/${website.id}/edit`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    Edit
                  </Button>
                </Link>
                <Link href={`/dashboard/websites/${website.id}`} className="flex-1">
                  <Button className="w-full">View</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
