import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import NextAuth from 'next-auth'
import { authConfig } from '@/lib/auth.config'
import { config as appConfig } from '@/lib/config/env'

/**
 * Middleware runs in Edge Runtime - must only use Edge-compatible imports.
 * Uses authConfig (no bcrypt/prisma/fs) instead of full auth.ts.
 */
const { auth } = NextAuth(authConfig)

export default auth(function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const { pathname } = request.nextUrl
  const isAuthenticated = !!(request as NextRequest & { auth?: unknown }).auth

  // Redirect logged-in users away from auth pages
  if ((pathname === '/login' || pathname === '/register') && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Subdomain routing
  const mainDomain = appConfig.app.mainDomain
  const subdomain = hostname.split('.')[0]
  const isLocalhostSubdomain = hostname.includes('.localhost')
  const isSubdomain =
    hostname !== mainDomain &&
    subdomain !== 'www' &&
    !hostname.includes('localhost') &&
    !isLocalhostSubdomain

  if (isLocalhostSubdomain) {
    const localhostSubdomain = hostname.split('.')[0]
    return NextResponse.rewrite(
      new URL(`/wedding/${localhostSubdomain}${pathname}`, request.url)
    )
  }

  if (isSubdomain) {
    return NextResponse.rewrite(
      new URL(`/wedding/${subdomain}${pathname}`, request.url)
    )
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
}
