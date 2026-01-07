import { notFound } from 'next/navigation'

interface Props {
  params: {
    subdomain: string
  }
}

// This would fetch from your database
async function getWebsiteBySubdomain(subdomain: string) {
  // Mock data for now
  if (subdomain === 'john-mary') {
    return {
      id: '1',
      subdomain: 'john-mary',
      templateId: 'classic-elegance',
      published: true,
      content: {
        brideName: 'Mary',
        groomName: 'John',
        weddingDate: new Date('2024-08-15'),
        primaryColor: '#8B7355',
        secondaryColor: '#F5F5DC',
        fontFamily: 'Playfair Display',
        heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200',
        storyTitle: 'Our Love Story',
        storyContent: 'We met in college and have been inseparable ever since...',
        ceremonyVenue: 'St. Mary\'s Church',
        ceremonyTime: new Date('2024-08-15T14:00:00'),
        ceremonyAddress: '123 Main St, Anytown, USA',
        receptionVenue: 'Grand Ballroom',
        receptionTime: new Date('2024-08-15T18:00:00'),
        receptionAddress: '456 Park Ave, Anytown, USA',
        sections: {
          hero: true,
          countdown: true,
          story: true,
          events: true,
          rsvp: true,
          gallery: true,
          travel: false,
          faq: false,
        },
      },
    }
  }
  return null
}

export default async function WeddingWebsitePage({ params }: Props) {
  const website = await getWebsiteBySubdomain(params.subdomain)

  if (!website || !website.published) {
    notFound()
  }

  const { content } = website

  return (
    <div className="font-serif" style={{ fontFamily: content.fontFamily }}>
      {/* Hero Section */}
      <section
        className="h-screen relative flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${content.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative text-center z-10">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            {content.brideName} & {content.groomName}
          </h1>
          <p className="text-2xl md:text-3xl">
            {content.weddingDate.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
      </section>

      {/* Story Section */}
      {content.sections.story && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold text-center mb-8">{content.storyTitle}</h2>
            <div className="prose prose-lg mx-auto">
              <p>{content.storyContent}</p>
            </div>
          </div>
        </section>
      )}

      {/* Event Details */}
      {content.sections.events && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold text-center mb-12">Event Details</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {/* Ceremony */}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Ceremony</h3>
                <p className="text-lg mb-2">{content.ceremonyVenue}</p>
                <p className="text-gray-600 mb-2">
                  {content.ceremonyTime?.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </p>
                <p className="text-gray-600">{content.ceremonyAddress}</p>
              </div>

              {/* Reception */}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Reception</h3>
                <p className="text-lg mb-2">{content.receptionVenue}</p>
                <p className="text-gray-600 mb-2">
                  {content.receptionTime?.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </p>
                <p className="text-gray-600">{content.receptionAddress}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* RSVP Section */}
      {content.sections.rsvp && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-4xl font-bold text-center mb-8">RSVP</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-pink-600"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-pink-600"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Will you attend?</label>
                <select className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-pink-600">
                  <option value="">Select...</option>
                  <option value="yes">Yes, I'll be there!</option>
                  <option value="no">Sorry, can't make it</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-3 rounded-md hover:bg-pink-700 transition"
              >
                Submit RSVP
              </button>
            </form>
          </div>
        </section>
      )}
    </div>
  )
}
