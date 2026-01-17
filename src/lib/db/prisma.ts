import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import Database from 'better-sqlite3'
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

// Create SQLite database instance
const sqlite = new Database(absolutePath)

// Create adapter with the Database instance
const adapter = new PrismaBetterSqlite3(sqlite)

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ['query', 'error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
