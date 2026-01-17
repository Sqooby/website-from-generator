-- CreateTable
CREATE TABLE "Website" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subdomain" TEXT NOT NULL,
    "customDomain" TEXT,
    "templateId" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" DATETIME,
    "deploymentUrl" TEXT,
    "deploymentId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "WebsiteContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "websiteId" TEXT NOT NULL,
    "brideName" TEXT NOT NULL,
    "groomName" TEXT NOT NULL,
    "weddingDate" DATETIME NOT NULL,
    "primaryColor" TEXT NOT NULL DEFAULT '#8B7355',
    "secondaryColor" TEXT NOT NULL DEFAULT '#F5F5DC',
    "accentColor" TEXT,
    "fontFamily" TEXT NOT NULL DEFAULT 'Playfair Display',
    "heroImage" TEXT,
    "heroTitle" TEXT,
    "heroSubtitle" TEXT,
    "storyTitle" TEXT,
    "storyContent" TEXT,
    "timeline" TEXT,
    "ceremonyVenue" TEXT,
    "ceremonyTime" DATETIME,
    "ceremonyAddress" TEXT,
    "ceremonyMapUrl" TEXT,
    "receptionVenue" TEXT,
    "receptionTime" DATETIME,
    "receptionAddress" TEXT,
    "receptionMapUrl" TEXT,
    "sections" TEXT NOT NULL,
    "settings" TEXT,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "WebsiteContent_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "websiteId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "order" INTEGER NOT NULL,
    "uploadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Photo_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RSVP" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "websiteId" TEXT NOT NULL,
    "guestName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "attending" BOOLEAN NOT NULL,
    "plusOne" BOOLEAN NOT NULL DEFAULT false,
    "plusOneName" TEXT,
    "dietaryRequirements" TEXT,
    "message" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RSVP_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Website_subdomain_key" ON "Website"("subdomain");

-- CreateIndex
CREATE UNIQUE INDEX "WebsiteContent_websiteId_key" ON "WebsiteContent"("websiteId");
