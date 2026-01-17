# Architecture Documentation

## Overview

This is a **full-stack monorepo** built with Next.js 14+ using the App Router. The application serves three main purposes:

1. **Marketing Site** - Public pages for attracting customers
2. **User Dashboard** - Protected area for managing wedding websites
3. **Wedding Websites** - Generated sites for couples' guests

## Technology Decisions

### Why Next.js All-in-One?

We chose a single Next.js repository over separate frontend/backend because:

✅ **Faster Development** - Single codebase, single deployment
✅ **Better Performance** - Server-side rendering, optimized images
✅ **Type Safety** - Share types between frontend and backend
✅ **Simpler Deployment** - One app on Vercel
✅ **Cost Effective** - Lower hosting costs
✅ **Better DX** - Hot reload, file-based routing

### Alternative: Separate Repos

If you later need to separate frontend and backend:

**Frontend (Next.js/React)**
- Would be in `/frontend` repo
- API calls to backend via `fetch()`
- Deploy to Vercel/Netlify

**Backend (Node.js/Express)**
- Would be in `/backend` repo
- RESTful API or GraphQL
- Deploy to Railway/Render/AWS

## Folder Structure Explained

### `/src/app` - Next.js App Router

Next.js 14+ uses file-system based routing in the `app/` directory:

```
app/
├── (public)/          # Route group - adds layout but doesn't affect URL
├── (dashboard)/       # Route group - protected routes
├── (wedding)/         # Route group - wedding sites
├── api/              # API routes (backend endpoints)
├── layout.tsx        # Root layout (applies to all routes)
└── page.tsx          # Homepage at "/"
```

**Route Groups** `(folder)`:
- Folders wrapped in parentheses don't appear in the URL
- Used to organize routes and apply different layouts
- Example: `(public)/templates/page.tsx` → URL is `/templates`

### Component Organization

```
components/
├── ui/               # Reusable UI primitives (Button, Input, Card)
├── layouts/          # Layout components (Header, Footer, Sidebar)
└── features/         # Feature-specific components (TemplateCard, RSVPForm)
```

**When to create a component:**
- Used in 2+ places → `ui/`
- Layout element → `layouts/`
- Specific feature → `features/`
- Used once → Keep in page file

### Type Definitions

```typescript
// src/types/index.ts

export interface Website {
  id: string
  userId: string
  subdomain: string
  templateId: string
  published: boolean
  content?: WebsiteContent
}
```

All TypeScript types are centralized in `/src/types/index.ts` and shared across frontend and backend.

## Routing Architecture

### 1. Public Routes (Marketing Site)

```
/ → app/page.tsx (inherits root layout)
/templates → app/(public)/templates/page.tsx
/pricing → app/(public)/pricing/page.tsx
```

**Layout:** Uses `(public)/layout.tsx` which adds Header + Footer

### 2. Dashboard Routes (Protected)

```
/dashboard → app/(dashboard)/dashboard/page.tsx
/dashboard/websites/new → app/(dashboard)/dashboard/websites/new/page.tsx
```

**Layout:** Uses `(dashboard)/dashboard/layout.tsx` with dashboard nav

**TODO:** Add authentication middleware to protect these routes

### 3. Wedding Website Routes (Dynamic)

```
john-mary.yoursite.com → app/(wedding)/wedding/[subdomain]/page.tsx
```

**How it works:**
1. User visits `john-mary.yoursite.com`
2. Middleware intercepts the request
3. Rewrites to `/wedding/john-mary`
4. Next.js renders `[subdomain]/page.tsx` with `params.subdomain = "john-mary"`
5. Page fetches website data from database
6. Renders the appropriate template

## Middleware & Subdomain Routing

**File:** `src/middleware.ts`

```typescript
export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')
  const subdomain = hostname.split('.')[0]

  if (isSubdomain) {
    // Rewrite to /wedding/[subdomain]
    return NextResponse.rewrite(
      new URL(`/wedding/${subdomain}`, request.url)
    )
  }
}
```

**Flow:**
```
john-mary.yoursite.com
       ↓
  Middleware detects subdomain
       ↓
  Rewrites to /wedding/john-mary
       ↓
  Renders wedding/[subdomain]/page.tsx
```

## API Routes (Backend)

Next.js API routes are serverless functions:

```
app/api/
├── websites/
│   ├── route.ts           # GET /api/websites, POST /api/websites
│   └── [id]/
│       └── route.ts       # GET/PATCH/DELETE /api/websites/:id
└── rsvp/
    └── route.ts           # POST /api/rsvp
```

**Example:**

```typescript
// app/api/websites/route.ts
export async function GET(request: Request) {
  // Fetch from database
  return NextResponse.json({ success: true, data: websites })
}

export async function POST(request: Request) {
  const body = await request.json()
  // Create in database
  return NextResponse.json({ success: true, data: newWebsite })
}
```

**Why this approach:**
- No separate Express server needed
- Deployed as serverless functions
- Automatic API routes
- Share types with frontend

## Data Flow

### Creating a Website

```
User Dashboard (Frontend)
       ↓
  POST /api/websites
       ↓
  API Route Handler
       ↓
  Database (Prisma)
       ↓
  Return Website Object
       ↓
  Frontend Updates UI
```

### Rendering a Wedding Website

```
Guest visits subdomain
       ↓
  Middleware rewrites URL
       ↓
  wedding/[subdomain]/page.tsx
       ↓
  getWebsiteBySubdomain(subdomain)
       ↓
  Database Query
       ↓
  Return Website + Content
       ↓
  Render Template with Data
```

## State Management

**Current:** No global state management (not needed yet)

**When you need it:**
- User authentication state → Use Context or NextAuth
- Form state → Use React Hook Form
- Server state (API data) → Use React Query or SWR

**Recommendations:**
- Start simple with React useState
- Add Context for shared state across components
- Use React Query/SWR for API caching
- Only add Redux/Zustand if really needed

## Styling Architecture

### Tailwind CSS

We use **utility-first** CSS with Tailwind:

```tsx
<button className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700">
  Click me
</button>
```

### Component Styles

For complex components, extract to reusable classes:

```css
/* globals.css */
@layer components {
  .btn-primary {
    @apply bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700;
  }
}
```

### Template Theming

Each wedding website can have custom colors:

```tsx
<div style={{
  '--color-primary': content.primaryColor,
  '--color-secondary': content.secondaryColor,
} as React.CSSProperties}>
  {/* Use CSS variables */}
</div>
```

## Database Architecture (TODO)

When you add Prisma:

```
prisma/
├── schema.prisma      # Database schema
└── migrations/        # Migration history
```

**Key Models:**
- `User` - Account owners
- `Website` - Wedding websites
- `WebsiteContent` - Editable content
- `Photo` - Uploaded images
- `RSVP` - Guest responses
- `Subscription` - Payment records

**Relationships:**
```
User (1) → (Many) Website
Website (1) → (1) WebsiteContent
Website (1) → (Many) Photo
Website (1) → (Many) RSVP
User (1) → (Many) Subscription
```

## Authentication Flow (TODO)

When you add NextAuth.js:

```
Login Page
    ↓
POST /api/auth/signin
    ↓
NextAuth validates credentials
    ↓
Creates session
    ↓
Redirect to /dashboard
```

**Protecting Routes:**
```typescript
// app/(dashboard)/dashboard/page.tsx
import { getServerSession } from 'next-auth'

export default async function Dashboard() {
  const session = await getServerSession()
  if (!session) redirect('/login')
  // ... rest of page
}
```

## Payment Integration (TODO)

### Stripe Checkout Flow

```
1. User clicks "Choose Plan"
2. Frontend: POST /api/checkout
3. Backend: Create Stripe Checkout Session
4. Redirect to Stripe Checkout
5. User completes payment
6. Stripe webhook: POST /api/webhooks/stripe
7. Backend: Update subscription in DB
8. Backend: Publish website
9. Email confirmation to user
```

## Performance Optimizations

### Next.js Built-in

- ✅ **Automatic Code Splitting** - Only load needed JS
- ✅ **Image Optimization** - Next.js `<Image>` component
- ✅ **Server Components** - Reduce client-side JS
- ✅ **Static Generation** - Pre-render when possible

### Custom Optimizations

```typescript
// Caching
export const revalidate = 60 // Revalidate every 60 seconds

// Dynamic imports
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Spinner />
})
```

## Deployment Architecture

### Vercel (Recommended)

```
GitHub Repo
    ↓
Push to main branch
    ↓
Vercel Auto-Deploy
    ↓
Production URL: yoursite.com
Subdomain support: *.yoursite.com
```

**Vercel handles:**
- Automatic SSL
- Subdomain routing
- Serverless functions
- Edge caching
- Preview deployments

### Alternative: Self-Hosted

If you want to self-host:

1. **Build:** `npm run build`
2. **Start:** `npm run start`
3. **Reverse Proxy:** Nginx/Caddy for subdomain routing
4. **SSL:** Certbot for Let's Encrypt
5. **Process Manager:** PM2 to keep app running

## Scalability Considerations

### Current (MVP)

- ✅ Handles 100-1000 wedding websites easily
- ✅ Serverless functions scale automatically
- ✅ Next.js optimized for performance

### Future (10,000+ websites)

- Add Redis for caching
- CDN for static assets
- Database read replicas
- Image CDN (Cloudinary)
- Queue system for builds (Bull/BullMQ)

## Security Best Practices

### Current

- ✅ TypeScript for type safety
- ✅ Environment variables for secrets
- ✅ HTTPS by default (Vercel)

### TODO

- [ ] Input validation (Zod)
- [ ] CSRF protection
- [ ] Rate limiting
- [ ] SQL injection prevention (Prisma handles this)
- [ ] XSS prevention (React handles this)
- [ ] Authentication (NextAuth)
- [ ] Authorization (role-based access)

## Testing Strategy (TODO)

```
tests/
├── unit/              # Component tests
├── integration/       # API tests
└── e2e/              # End-to-end tests
```

**Recommended tools:**
- **Unit:** Jest + React Testing Library
- **E2E:** Playwright or Cypress
- **API:** Supertest

## Monitoring & Analytics (TODO)

**Error Tracking:** Sentry
**Analytics:** Vercel Analytics or Google Analytics
**Logging:** Vercel Logs or Datadog
**Uptime:** UptimeRobot

## Development Workflow

### Local Development

```bash
npm run dev           # Start dev server
npm run type-check    # Check TypeScript errors
npm run lint          # Check code style
```

### Git Workflow

```
main                  # Production
  ↓
develop              # Staging
  ↓
feature/xyz          # Feature branches
```

### Environment Setup

```
.env.local           # Local development (git-ignored)
.env.example         # Template for required vars
```

## Questions & Decisions

### Should I separate frontend/backend later?

**Keep together if:**
- Team < 5 people
- Deployment simplicity matters
- You want faster development

**Separate if:**
- Different teams for FE/BE
- Need to scale independently
- Want to use different languages

### When to add Prisma?

Add when you're ready to:
- Store real user data
- Implement authentication
- Launch to real users

### Should I use Server Components or Client Components?

**Server Components (default):**
- Fetch data from database
- No interactivity needed
- Better performance

**Client Components (`'use client'`):**
- Need useState, useEffect
- Event handlers (onClick, onChange)
- Browser APIs

---

## Summary

This architecture provides:

✅ **Full-stack in one repo** - Simpler development
✅ **Type-safe** - TypeScript everywhere
✅ **Scalable** - Easy to add features
✅ **Modern** - Latest Next.js patterns
✅ **Flexible** - Can separate later if needed

Start with the current setup, add features incrementally, and scale when needed!
