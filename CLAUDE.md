# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# TypeScript type checking (no build)
npm run type-check

# Linting
npm run lint
```

## Architecture Overview

This is a **full-stack Next.js 14+ wedding website generator** using the App Router. Frontend and backend live in a single repository deployed as one application.

### Three-Tier Route Architecture

The app uses **Route Groups** to create three distinct layout hierarchies:

1. **`(public)/`** - Marketing pages with header/footer (homepage, templates, pricing)
2. **`(dashboard)/`** - Protected user dashboard for managing wedding websites
3. **`(wedding)/`** - Dynamically rendered wedding websites accessed via subdomains

Route groups like `(public)` don't appear in URLs but allow different layouts. For example, `app/(public)/templates/page.tsx` renders at `/templates` with the public layout.

### Subdomain Routing Architecture

**Critical:** The `src/middleware.ts` file is the heart of multi-tenancy:

```
User visits: john-mary.yoursite.com
       ↓
Middleware intercepts request
       ↓
Rewrites to: /wedding/john-mary
       ↓
Renders: app/(wedding)/wedding/[subdomain]/page.tsx
```

The middleware:
- Detects subdomains from the `host` header
- Excludes `www`, `localhost`, and the main domain
- Rewrites subdomain requests to the `[subdomain]` dynamic route
- Passes through main domain traffic normally
- Uses `NEXT_PUBLIC_MAIN_DOMAIN` environment variable

### API Routes Structure

RESTful backend using Next.js Route Handlers in `src/app/api/`:

```
GET    /api/websites       # List user's websites
POST   /api/websites       # Create new website
GET    /api/websites/:id   # Get single website
PATCH  /api/websites/:id   # Update website
DELETE /api/websites/:id   # Delete website
POST   /api/rsvp          # Submit RSVP
```

**Current state:** All APIs return mock data with TODO comments for database integration.

### Type System

All types are centralized in `src/types/index.ts` and shared between frontend/backend. Key interfaces:

- `Website` - Main website model with subdomain, templateId, published status
- `WebsiteContent` - All editable fields (couple names, dates, venues, sections visibility)
- `TemplateConfig` - Template metadata with colors, fonts, section configs
- `ApiResponse<T>` - Generic wrapper for all API responses

The type system is **intentionally complete** - it matches the planned database schema from `_1spec/implementation-approaches.md` even though the database isn't connected yet.

## Tailwind CSS v4 Setup

This project uses **Tailwind CSS v4** with its new PostCSS plugin:

**PostCSS config** (`postcss.config.mjs`):
```javascript
plugins: {
  '@tailwindcss/postcss': {},
}
```

**Global styles** (`src/styles/globals.css`):
```css
@import "tailwindcss";
```

**No `tailwind.config.js` file** - Tailwind v4 uses CSS-based configuration instead of JavaScript config.

If you need to modify Tailwind settings, use CSS `@theme` directives in `globals.css`, not a config file.

## Adding New Features

### Adding a Public Page

```typescript
// src/app/(public)/about/page.tsx
export default function AboutPage() {
  return <div>About content</div>
}
```

Automatically available at `/about` with header/footer from `(public)/layout.tsx`.

### Adding a Dashboard Page

```typescript
// src/app/(dashboard)/dashboard/settings/page.tsx
export default function SettingsPage() {
  // TODO: Add auth check when implemented
  return <div>Settings</div>
}
```

Available at `/dashboard/settings` with dashboard layout.

### Adding an API Endpoint

```typescript
// src/app/api/photos/route.ts
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // TODO: Fetch from database when connected
  const photos = []
  return NextResponse.json({ success: true, data: photos })
}

export async function POST(request: Request) {
  const body = await request.json()
  // TODO: Validate and save to database
  return NextResponse.json({ success: true, data: body }, { status: 201 })
}
```

### Adding a Component

**UI primitives:** `src/components/ui/`
**Layout components:** `src/components/layouts/`
**Feature components:** `src/components/features/`

Use the variant pattern from `button.tsx` for consistent styling:

```typescript
interface Props {
  variant?: 'default' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}
```

## Development Patterns

### Server Components by Default

All pages are Server Components unless you add `'use client'`. Only use client components when you need:
- `useState`, `useEffect`, or other React hooks
- Event handlers (`onClick`, `onChange`)
- Browser APIs

### API Response Pattern

All API routes follow this pattern:

```typescript
return NextResponse.json({
  success: boolean,
  data?: T,
  error?: string,
  message?: string
})
```

### Wedding Site Rendering

The wedding site page (`app/(wedding)/wedding/[subdomain]/page.tsx`):
1. Receives subdomain from middleware rewrite
2. Fetches website data by subdomain (currently mock function)
3. Returns 404 if unpublished or not found
4. Renders template sections based on `content.sections` boolean flags
5. Applies dynamic styling via CSS variables

## Important Files

**Middleware:** `src/middleware.ts` - Subdomain routing logic
**Types:** `src/types/index.ts` - Complete type system
**Root Layout:** `src/app/layout.tsx` - Loads Google Fonts (Inter, Playfair Display)
**Wedding Renderer:** `src/app/(wedding)/wedding/[subdomain]/page.tsx`

**Configuration:**
- `next.config.mjs` - Image optimization, server actions
- `postcss.config.mjs` - Tailwind v4 PostCSS integration
- `tsconfig.json` - Path aliases (`@/*` → `./src/*`), strict mode

**Documentation:**
- `README.md` - Project overview and setup
- `ARCHITECTURE.md` - Deep dive into design decisions (534 lines)
- `GETTING_STARTED.md` - Quick start guide
- `_1spec/implementation-approaches.md` - Complete implementation guide with database schema
- `_1spec/template-system-architecture.md` - Template system design (888 lines)

## Planned Features (Not Yet Implemented)

The architecture has strategic TODOs where these will plug in:

1. **Database** - Prisma schema defined in `_1spec/implementation-approaches.md`
2. **Authentication** - NextAuth.js, protect dashboard routes
3. **Payment** - Stripe checkout and webhooks
4. **Template System** - Component-based templates (design in `_1spec/template-system-architecture.md`)
5. **Custom Domains** - Placeholder logic exists in middleware

All API routes have TODO comments showing where database calls will go. The type system is already complete and matches the planned database schema.

## Wedding Website Data Flow

```
Guest visits subdomain → Middleware rewrites URL → [subdomain] page
    ↓
Fetch website by subdomain (getWebsiteBySubdomain function)
    ↓
Check if published (return 404 if not)
    ↓
Render template with content.sections controlling visibility
    ↓
Apply dynamic styling (primaryColor, fontFamily)
```

## Notes on Current State

- **MVP Foundation** - Structure is production-ready, but features use mock data
- **Type-First** - Types are complete before implementation
- **Intentional Incompleteness** - Strategic TODOs mark integration points
- **Gradual Enhancement** - Designed for incremental feature addition
- **Next.js 16 + React 19** - Using latest stable versions
- **Tailwind v4** - Early adoption of CSS-based configuration

When implementing database, auth, or payment features, refer to the detailed implementation guides in `_1spec/` which include complete code examples and schemas.
- all md files put in _1spec folder