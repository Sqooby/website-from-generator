import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from '@/lib/auth.config'
import { authService } from '@/server/services/auth.service'
import { userRepository } from '@/server/repositories/user.repository'

/**
 * Full auth config - Node.js runtime only.
 * Extends authConfig with Credentials provider (bcrypt) and DB callbacks.
 *
 * Used by: API routes, Server Components, dashboard layout
 * Edge-safe config: src/lib/auth.config.ts
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null
        return authService.verifyCredentials(
          credentials.email as string,
          credentials.password as string
        )
      },
    }),
    // Google provider inherited from authConfig.providers
    ...authConfig.providers,
  ],

  callbacks: {
    ...authConfig.callbacks,

    async signIn({ user, account }) {
      // For Google OAuth: auto-create user on first sign-in
      if (account?.provider === 'google' && user.email) {
        const existing = await userRepository.findByEmail(user.email)
        if (!existing) {
          await userRepository.create({
            email: user.email,
            name: user.name,
            image: user.image,
          })
        }
      }
      return true
    },
  },
})
