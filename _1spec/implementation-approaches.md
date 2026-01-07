# Wedding Website Generator - Technical Implementation Guide

## Overview
This document explores different technical approaches to building a wedding website generator where users can select templates, customize them, pay, and have their site go live.

---

## Approach Comparison Matrix

| Approach | Complexity | Cost | Performance | Real-time Updates | Custom Domains | Time to Market |
|----------|-----------|------|-------------|-------------------|----------------|----------------|
| Static Site Generator | High | Low | Excellent | No (rebuild) | Easy | 3-4 months |
| Multi-Tenant SaaS | Medium | Medium | Good | Yes | Medium | 2-3 months |
| Hybrid Static Export | High | Medium | Excellent | Builder only | Easy | 4-5 months |
| WordPress Multisite | Low | Medium | Fair | Yes | Medium | 1-2 months |
| No-Code Backend | Low | Low | Good | Yes | Medium | 1-2 months |

---

## Recommended Approach: Multi-Tenant SaaS with Dynamic Rendering

### Why This Approach?
- **Instant updates** - Users see changes immediately
- **Easier management** - Single codebase, centralized hosting
- **Real-time features** - RSVP, guest list updates
- **Scalable** - Can handle thousands of wedding sites
- **Fast development** - Modern frameworks like Next.js

---

## Detailed Implementation Plan

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Main Platform                             │
│  (yourplatform.com)                                          │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐        │
│  │  Marketing  │  │    Dashboard │  │   Builder   │        │
│  │    Site     │  │   (User App) │  │   (Editor)  │        │
│  └─────────────┘  └──────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
                  ┌──────────────────┐
                  │   Database       │
                  │  (PostgreSQL)    │
                  │                  │
                  │  • Users         │
                  │  • Websites      │
                  │  • Content       │
                  │  • RSVPs         │
                  └──────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Wedding Websites (Rendering)                    │
│                                                              │
│  john-mary.yourplatform.com → Dynamic Template Rendering    │
│  custom-domain.com → CNAME Proxy                            │
└─────────────────────────────────────────────────────────────┘
```

---

## Tech Stack Breakdown

### Frontend
- **Next.js 14+** (App Router)
  - Server Components for performance
  - API Routes for backend
  - Middleware for subdomain routing
- **React 18+**
  - Template components
  - Builder/editor interface
- **Tailwind CSS**
  - Utility-first styling
  - Template theming
- **shadcn/ui**
  - Pre-built components
  - Consistent design system

### Backend
- **Next.js API Routes** or **tRPC**
  - REST or type-safe APIs
- **Prisma ORM**
  - Type-safe database access
  - Migrations management
- **PostgreSQL**
  - Main database
  - Supabase for hosted option

### Authentication
- **NextAuth.js** or **Clerk**
  - Email/password
  - Social login (Google, Facebook)
  - Session management

### Payment
- **Stripe**
  - Checkout sessions
  - Subscriptions
  - Webhooks for payment events

### File Storage
- **AWS S3** or **Cloudflare R2**
  - Photo uploads
  - Profile images
- **Cloudinary** (alternative)
  - Image optimization
  - Transformations

### Hosting
- **Vercel**
  - Next.js optimized
  - Edge functions
  - Subdomain support
- **Cloudflare** (DNS & CDN)
  - Custom domain management
  - SSL certificates

---

## Implementation Steps

### Step 1: Project Setup

```bash
# Create Next.js project
npx create-next-app@latest wedding-generator --typescript --tailwind --app

# Install dependencies
npm install @prisma/client prisma
npm install next-auth
npm install stripe
npm install @radix-ui/react-* # for shadcn/ui
npm install zod react-hook-form
npm install uploadthing # for file uploads
```

### Step 2: Database Schema (Prisma)

```prisma
// prisma/schema.prisma

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String
  name          String?
  createdAt     DateTime  @default(now())
  websites      Website[]
  subscriptions Subscription[]
}

model Website {
  id             String   @id @default(cuid())
  userId         String
  user           User     @relation(fields: [userId], references: [id])

  subdomain      String   @unique
  customDomain   String?  @unique
  templateId     String

  published      Boolean  @default(false)
  publishedAt    DateTime?

  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  content        WebsiteContent?
  rsvps          RSVP[]
  photos         Photo[]
}

model WebsiteContent {
  id             String   @id @default(cuid())
  websiteId      String   @unique
  website        Website  @relation(fields: [websiteId], references: [id])

  // Couple Info
  brideName      String
  groomName      String
  weddingDate    DateTime

  // Theme
  primaryColor   String   @default("#8B7355")
  secondaryColor String   @default("#F5F5DC")
  fontFamily     String   @default("Playfair Display")

  // Content Sections
  heroImage      String?
  storyTitle     String?
  storyContent   String?  @db.Text

  // Event Details
  ceremonyVenue  String?
  ceremonyTime   DateTime?
  ceremonyAddress String?
  receptionVenue String?
  receptionTime  DateTime?
  receptionAddress String?

  // Settings
  sections       Json     // Which sections to show
  settings       Json     // Additional settings

  updatedAt      DateTime @updatedAt
}

model RSVP {
  id                  String   @id @default(cuid())
  websiteId           String
  website             Website  @relation(fields: [websiteId], references: [id])

  guestName           String
  email               String
  attending           Boolean
  plusOne             Boolean  @default(false)
  plusOneName         String?
  dietaryRequirements String?
  message             String?  @db.Text

  createdAt           DateTime @default(now())
}

model Photo {
  id          String   @id @default(cuid())
  websiteId   String
  website     Website  @relation(fields: [websiteId], references: [id])

  url         String
  caption     String?
  order       Int      @default(0)

  uploadedAt  DateTime @default(now())
}

model Subscription {
  id                   String   @id @default(cuid())
  userId               String
  user                 User     @relation(fields: [userId], references: [id])

  planType             String   // "basic", "standard", "premium"
  status               String   // "active", "expired", "cancelled"

  stripeCustomerId     String?
  stripeSubscriptionId String?

  startDate            DateTime
  endDate              DateTime

  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt
}

model Template {
  id          String @id @default(cuid())
  name        String
  slug        String @unique
  category    String
  thumbnail   String
  previewUrl  String
  description String
  isPremium   Boolean @default(false)
}
```

### Step 3: Subdomain Routing (Next.js Middleware)

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const { pathname } = request.nextUrl

  // Get subdomain
  const subdomain = hostname.split('.')[0]
  const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN // 'yourplatform.com'

  // Check if it's a subdomain (not www or main domain)
  if (subdomain && subdomain !== 'www' && !hostname.includes('localhost')) {
    // Rewrite to wedding website route
    return NextResponse.rewrite(
      new URL(`/wedding/${subdomain}${pathname}`, request.url)
    )
  }

  // Handle custom domains
  if (hostname !== mainDomain && !hostname.includes('localhost')) {
    // Look up custom domain in database (you'll need edge config or cache)
    return NextResponse.rewrite(
      new URL(`/wedding/custom-domain/${hostname}${pathname}`, request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

### Step 4: Template System

```typescript
// lib/templates/template-registry.ts
import { ClassicTemplate } from './classic'
import { ModernTemplate } from './modern'
import { RusticTemplate } from './rustic'

export const templates = {
  'classic-elegance': ClassicTemplate,
  'modern-minimal': ModernTemplate,
  'rustic-charm': RusticTemplate,
  // ... more templates
}

export type TemplateId = keyof typeof templates

// lib/templates/base-template.tsx
export interface TemplateProps {
  content: WebsiteContent
  rsvps?: RSVP[]
  photos?: Photo[]
}

export interface TemplateConfig {
  id: string
  name: string
  category: string
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  fonts: {
    heading: string
    body: string
  }
}

// lib/templates/classic/index.tsx
export function ClassicTemplate({ content, photos }: TemplateProps) {
  return (
    <div className="font-serif" style={{
      '--color-primary': content.primaryColor,
      '--color-secondary': content.secondaryColor
    } as React.CSSProperties}>
      {/* Hero Section */}
      <section className="h-screen bg-cover bg-center"
               style={{ backgroundImage: `url(${content.heroImage})` }}>
        <div className="h-full flex items-center justify-center bg-black/30">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-4">
              {content.brideName} & {content.groomName}
            </h1>
            <p className="text-2xl">
              {new Date(content.weddingDate).toLocaleDateString()}
            </p>
            <CountdownTimer targetDate={content.weddingDate} />
          </div>
        </div>
      </section>

      {/* Story Section */}
      {content.sections?.story && (
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl text-center mb-8">{content.storyTitle}</h2>
            <div className="prose lg:prose-xl mx-auto">
              {content.storyContent}
            </div>
          </div>
        </section>
      )}

      {/* Event Details */}
      <section className="py-20 bg-gray-50">
        <EventDetails content={content} />
      </section>

      {/* RSVP Section */}
      <section className="py-20">
        <RSVPForm websiteId={content.websiteId} />
      </section>

      {/* Gallery */}
      {photos && photos.length > 0 && (
        <section className="py-20 bg-gray-50">
          <PhotoGallery photos={photos} />
        </section>
      )}
    </div>
  )
}
```

### Step 5: Wedding Website Rendering

```typescript
// app/wedding/[subdomain]/page.tsx
import { getWebsiteBySubdomain } from '@/lib/db/queries'
import { templates } from '@/lib/templates/template-registry'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    subdomain: string
  }
}

export async function generateMetadata({ params }: Props) {
  const website = await getWebsiteBySubdomain(params.subdomain)

  if (!website) return {}

  return {
    title: `${website.content.brideName} & ${website.content.groomName} - Wedding`,
    description: `Join us for our wedding on ${new Date(website.content.weddingDate).toLocaleDateString()}`,
  }
}

export default async function WeddingPage({ params }: Props) {
  const website = await getWebsiteBySubdomain(params.subdomain)

  if (!website || !website.published) {
    notFound()
  }

  const Template = templates[website.templateId as keyof typeof templates]

  if (!Template) {
    notFound()
  }

  return (
    <Template
      content={website.content}
      photos={website.photos}
      rsvps={website.rsvps}
    />
  )
}

// lib/db/queries.ts
export async function getWebsiteBySubdomain(subdomain: string) {
  return await prisma.website.findUnique({
    where: { subdomain },
    include: {
      content: true,
      photos: {
        orderBy: { order: 'asc' }
      },
      rsvps: true
    }
  })
}
```

### Step 6: Website Builder/Editor

```typescript
// app/dashboard/websites/[id]/edit/page.tsx
'use client'

import { useState } from 'react'
import { TemplatePreview } from '@/components/builder/template-preview'
import { ContentEditor } from '@/components/builder/content-editor'
import { DesignCustomizer } from '@/components/builder/design-customizer'

export default function WebsiteEditor({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'preview'>('content')

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-80 border-r bg-gray-50 overflow-y-auto">
        <div className="p-4">
          <nav className="space-x-2 mb-4">
            <button
              onClick={() => setActiveTab('content')}
              className={activeTab === 'content' ? 'active' : ''}
            >
              Content
            </button>
            <button
              onClick={() => setActiveTab('design')}
              className={activeTab === 'design' ? 'active' : ''}
            >
              Design
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={activeTab === 'preview' ? 'active' : ''}
            >
              Preview
            </button>
          </nav>

          {activeTab === 'content' && <ContentEditor websiteId={params.id} />}
          {activeTab === 'design' && <DesignCustomizer websiteId={params.id} />}
        </div>
      </aside>

      {/* Main Preview Area */}
      <main className="flex-1 overflow-auto">
        <TemplatePreview websiteId={params.id} />
      </main>
    </div>
  )
}
```

### Step 7: Payment Integration (Stripe)

```typescript
// app/api/checkout/route.ts
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getServerSession } from 'next-auth'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: Request) {
  const session = await getServerSession()

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { planType, websiteId } = await request.json()

  const prices = {
    basic: 9900, // $99 in cents
    standard: 14900,
    premium: 24900
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Wedding Website - ${planType}`,
            description: '1 year subscription',
          },
          unit_amount: prices[planType as keyof typeof prices],
          recurring: {
            interval: 'year',
          },
        },
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/websites/${websiteId}`,
    metadata: {
      userId: session.user.id,
      websiteId,
      planType,
    },
  })

  return NextResponse.json({ url: checkoutSession.url })
}

// app/api/webhooks/stripe/route.ts
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = headers().get('Stripe-Signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return new Response('Webhook signature verification failed', { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session

      // Create subscription
      await prisma.subscription.create({
        data: {
          userId: session.metadata!.userId,
          planType: session.metadata!.planType,
          status: 'active',
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: session.subscription as string,
          startDate: new Date(),
          endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
        },
      })

      // Publish website
      await prisma.website.update({
        where: { id: session.metadata!.websiteId },
        data: {
          published: true,
          publishedAt: new Date(),
        },
      })

      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription

      // Unpublish website
      await prisma.subscription.update({
        where: { stripeSubscriptionId: subscription.id },
        data: { status: 'cancelled' },
      })

      break
    }
  }

  return new Response(JSON.stringify({ received: true }))
}
```

### Step 8: Publishing Workflow

```typescript
// lib/publishing/publish-website.ts
export async function publishWebsite(websiteId: string, userId: string) {
  // 1. Verify user owns website
  const website = await prisma.website.findFirst({
    where: { id: websiteId, userId },
    include: { content: true }
  })

  if (!website) throw new Error('Website not found')

  // 2. Validate content is complete
  if (!website.content.brideName || !website.content.groomName) {
    throw new Error('Please complete all required fields')
  }

  // 3. Check for active subscription
  const subscription = await prisma.subscription.findFirst({
    where: {
      userId,
      status: 'active',
      endDate: { gte: new Date() }
    }
  })

  if (!subscription) {
    throw new Error('Active subscription required')
  }

  // 4. Generate subdomain if not exists
  if (!website.subdomain) {
    const subdomain = generateSubdomain(
      website.content.brideName,
      website.content.groomName
    )

    await prisma.website.update({
      where: { id: websiteId },
      data: { subdomain }
    })
  }

  // 5. Publish
  await prisma.website.update({
    where: { id: websiteId },
    data: {
      published: true,
      publishedAt: new Date()
    }
  })

  return {
    success: true,
    url: `https://${website.subdomain}.${process.env.NEXT_PUBLIC_DOMAIN}`
  }
}

function generateSubdomain(bride: string, groom: string): string {
  const base = `${bride}-${groom}`
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .substring(0, 30)

  // Check uniqueness, add number if needed
  return base // + uniqueness check logic
}
```

---

## Alternative: Static Export Approach

If you want better performance and lower hosting costs, consider static export:

### Workflow
1. User customizes in builder (saves to DB)
2. On publish → trigger build process
3. Generate static HTML/CSS/JS files
4. Deploy to CDN (Vercel, Netlify, Cloudflare Pages)

### Implementation

```typescript
// lib/export/static-generator.ts
import { renderToString } from 'react-dom/server'
import fs from 'fs/promises'
import path from 'path'

export async function generateStaticSite(websiteId: string) {
  const website = await getWebsiteWithContent(websiteId)
  const Template = templates[website.templateId]

  // Render template to HTML
  const html = renderToString(<Template content={website.content} />)

  // Wrap in document
  const fullHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${website.content.brideName} & ${website.content.groomName}</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        ${html}
        <script src="/bundle.js"></script>
      </body>
    </html>
  `

  // Write to file system or deploy to CDN
  const outputDir = path.join('/tmp', websiteId)
  await fs.mkdir(outputDir, { recursive: true })
  await fs.writeFile(path.join(outputDir, 'index.html'), fullHtml)

  // Deploy to Vercel/Netlify via API
  await deployToVercel(outputDir, website.subdomain)

  return { success: true, url: `https://${website.subdomain}.vercel.app` }
}
```

---

## Custom Domain Setup

### DNS Configuration Guide for Users

```typescript
// components/custom-domain-setup.tsx
export function CustomDomainSetup({ websiteId }: { websiteId: string }) {
  return (
    <div className="space-y-4">
      <h3>Add Your Custom Domain</h3>

      <div className="bg-blue-50 p-4 rounded">
        <p className="font-semibold mb-2">Step 1: Add these DNS records at your domain registrar:</p>
        <code className="block bg-white p-2 rounded">
          Type: CNAME<br />
          Name: www<br />
          Value: {websiteId}.yourplatform.com
        </code>
        <code className="block bg-white p-2 rounded mt-2">
          Type: A<br />
          Name: @<br />
          Value: 76.76.21.21 (Your IP or use CNAME flattening)
        </code>
      </div>

      <div className="bg-blue-50 p-4 rounded">
        <p className="font-semibold mb-2">Step 2: Enter your domain here:</p>
        <input
          type="text"
          placeholder="yourdomain.com"
          className="w-full p-2 border rounded"
        />
        <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
          Verify Domain
        </button>
      </div>
    </div>
  )
}
```

### Automated SSL (Let's Encrypt)

Use platforms like Vercel/Netlify that handle SSL automatically, or implement with:
- Certbot for Let's Encrypt
- Cloudflare SSL (free tier)
- AWS Certificate Manager

---

## Performance Optimizations

### Image Optimization
```typescript
// Use Next.js Image component
import Image from 'next/image'

<Image
  src={photo.url}
  alt={photo.caption}
  width={800}
  height={600}
  quality={85}
  placeholder="blur"
/>
```

### Caching Strategy
```typescript
// app/wedding/[subdomain]/page.tsx
export const revalidate = 60 // Revalidate every 60 seconds

// Or use on-demand revalidation
import { revalidatePath } from 'next/cache'

// After content update
revalidatePath(`/wedding/${subdomain}`)
```

---

## Monitoring & Analytics

```typescript
// Track website views
await prisma.analytics.create({
  data: {
    websiteId,
    event: 'page_view',
    path: pathname,
    userAgent: request.headers.get('user-agent'),
  }
})

// Track RSVP submissions
await prisma.analytics.create({
  data: {
    websiteId,
    event: 'rsvp_submitted',
    metadata: { attending: true }
  }
})
```

---

## Deployment Checklist

- [ ] Set up production database (PostgreSQL)
- [ ] Configure environment variables
- [ ] Set up Stripe account & webhooks
- [ ] Configure domain DNS
- [ ] Set up file storage (S3/R2)
- [ ] Configure email service (SendGrid, Resend)
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Test subdomain routing
- [ ] Test custom domain setup
- [ ] Test payment flow end-to-end
- [ ] Set up backups
- [ ] Configure SSL certificates
- [ ] Load testing
- [ ] Security audit

---

## Estimated Costs (Monthly)

**For 100 active wedding websites:**

- Hosting (Vercel Pro): $20
- Database (Supabase): $25
- File Storage (Cloudflare R2): $5
- Email (Resend): $10
- Monitoring (Sentry): $26
- Domain: $1/month
- **Total: ~$87/month**

**Revenue (100 sites):**
- $99/year = $8.25/month per site
- 100 sites × $8.25 = $825/month
- **Profit margin: ~90%**

---

## Conclusion

The **Multi-Tenant SaaS approach with Next.js** is recommended because:

1. ✅ Fastest time to market (2-3 months)
2. ✅ Modern tech stack with great DX
3. ✅ Scalable to thousands of wedding sites
4. ✅ Real-time updates for users
5. ✅ Easy to maintain and iterate
6. ✅ Low hosting costs with high profit margins
7. ✅ Excellent performance with Next.js optimizations

Start with the MVP (3 templates, basic editor, RSVP, payment), validate the market, then expand features based on user feedback.
