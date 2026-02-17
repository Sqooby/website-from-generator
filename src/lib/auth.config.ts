import type { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'
import { config } from '@/lib/config/env'

/**
 * Auth config safe for Edge Runtime (middleware).
 * Must NOT import any Node.js modules (fs, crypto, bcrypt, prisma, etc.)
 *
 * Used by: src/middleware.ts
 * Full config (with Credentials provider + DB): src/lib/auth.ts
 */
export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: config.auth.google.clientId ?? '',
      clientSecret: config.auth.google.clientSecret ?? '',
    }),
  ],

  session: { strategy: 'jwt' },

  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl
      const isAuthenticated = !!auth?.user

      if (pathname.startsWith('/dashboard') && !isAuthenticated) {
        return false // triggers redirect to signIn page
      }

      return true
    },

    async jwt({ token, user }) {
      if (user?.id) token.id = user.id
      return token
    },

    async session({ session, token }) {
      if (token.id) session.user.id = token.id as string
      return session
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  secret: config.auth.secret,
}
