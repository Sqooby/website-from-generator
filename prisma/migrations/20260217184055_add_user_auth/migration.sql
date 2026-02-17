-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- Insert placeholder owner for existing websites (dev data)
INSERT INTO "User" ("id", "email", "name", "updatedAt")
VALUES ('dev-seed-user', 'dev@localhost', 'Dev User', CURRENT_TIMESTAMP);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Website" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subdomain" TEXT NOT NULL,
    "customDomain" TEXT,
    "templateId" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" DATETIME,
    "deploymentUrl" TEXT,
    "deploymentId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL DEFAULT 'dev-seed-user',
    CONSTRAINT "Website_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Website" ("createdAt", "customDomain", "deploymentId", "deploymentUrl", "id", "published", "publishedAt", "subdomain", "templateId", "updatedAt")
    SELECT "createdAt", "customDomain", "deploymentId", "deploymentUrl", "id", "published", "publishedAt", "subdomain", "templateId", "updatedAt" FROM "Website";
DROP TABLE "Website";
ALTER TABLE "new_Website" RENAME TO "Website";
CREATE UNIQUE INDEX "Website_subdomain_key" ON "Website"("subdomain");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
