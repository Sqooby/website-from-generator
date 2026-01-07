import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const { pathname } = request.nextUrl

  // Get the main domain from environment
  const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'localhost:3000'

  // Extract subdomain
  const subdomain = hostname.split('.')[0]

  // Check if it's a subdomain (not www, not the main domain)
  const isSubdomain = hostname !== mainDomain &&
                      subdomain !== 'www' &&
                      !hostname.includes('localhost')

  if (isSubdomain) {
    // Rewrite to wedding website route
    return NextResponse.rewrite(
      new URL(`/wedding/${subdomain}${pathname}`, request.url)
    )
  }

  // Handle custom domains (TODO: implement later)
  // You would check if the hostname is a custom domain in your database
  // and rewrite accordingly

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - images (public images)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
}
