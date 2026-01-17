import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import path from 'path'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Prisma 7 requires an adapter for SQLite connections
const databaseUrl = process.env.DATABASE_URL || 'file:./dev.db'

// Extract file path from database URL and convert to absolute path
const filePath = databaseUrl.replace(/^file:/, '')
const absolutePath = path.isAbsolute(filePath)
  ? filePath
  : path.join(process.cwd(), filePath)

// Create adapter with the absolute path URL
const adapter = new PrismaBetterSqlite3({ url: absolutePath })

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ['query', 'error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
