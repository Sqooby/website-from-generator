# Wedding Website Generator - Implementation Plan

## Overview

Build a complete wedding website builder at `/builder` with:
- Multi-step form for collecting wedding data (names, dates, story, events, theme)
- Real-time preview pane showing template with user's data
- 3 selectable templates (Classic Elegance, Modern Minimal, Rustic Charm)
- SQLite database with Prisma ORM for persistence
- Automatic deployment to Cloudflare Workers on publish

## Architecture Decisions

**Why Separate Builder Page?**
- Cleaner user flow without authentication friction
- Can add auth later without restructuring
- Public builder encourages trial before signup

**Why Cloudflare Workers?**
- Serverless deployment per website (scales to thousands of sites)
- Static HTML generation (fast, SEO-friendly)
- KV storage for HTML content (low cost, high performance)

**Why SQLite for MVP?**
- Zero configuration (file-based database)
- No Docker or PostgreSQL setup required
- Easy to migrate to PostgreSQL later (Prisma handles this)
- Perfect for development and MVP testing

**Why Component-Based Templates?**
- Matches existing spec in `_1spec/template-system-architecture.md`
- Reusable base sections shared across templates
- Easy to add more templates later
- Template-specific configs for colors/fonts

## Implementation Phases

### Phase 1: Database Setup (Days 1-2) ✅

**Install Dependencies:** ✅
```bash
npm install @prisma/client prisma zod react-hook-form @hookform/resolvers date-fns react-colorful
npm install @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-switch @radix-ui/react-tabs
```

**Files to Create:** ✅
- `prisma/schema.prisma` - Database schema matching `src/types/index.ts`
  - Provider: sqlite (file-based, zero configuration)
  - Website model: id, subdomain (unique), templateId, published, publishedAt, deploymentUrl
  - WebsiteContent model: all fields from WebsiteContent type, sections as JSON
  - Photo and RSVP models with relations
- `src/lib/db/prisma.ts` - Prisma singleton client
- `.env.local` - DATABASE_URL, CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID, NEXT_PUBLIC_API_URL

**Database Setup:** ✅
```bash
npx prisma init --datasource-provider sqlite
# Edit schema.prisma to add models
npx prisma migrate dev --name init
npx prisma generate
```

**Environment Variables:** ✅
```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### Phase 2: Template System (Days 3-7) ✅

**Directory Structure:**
```
src/templates/
  base/
    types.ts                    # TemplateConfig, SectionProps interfaces
    sections/
      Hero.tsx                  # Full-screen hero with couple names
      Countdown.tsx             # Live countdown timer (client component)
      Story.tsx                 # Love story section
      EventDetails.tsx          # Ceremony & reception details
      RSVP.tsx                  # RSVP form component
      Gallery.tsx               # Photo gallery grid
      Footer.tsx                # Simple footer
  classic-elegance/
    config.ts                   # Brown/beige colors, serif fonts
    index.tsx                   # Template component using base sections
  modern-minimal/
    config.ts                   # Black/white colors, sans-serif fonts
    index.tsx
  rustic-charm/
    config.ts                   # Brown/cornsilk colors, mixed fonts
    index.tsx
  registry.ts                   # Central template lookup
```

**Base Sections Pattern:**
Each section receives `content: WebsiteContent` and `config: TemplateConfig` props:
- Use CSS variables for theming (`style={{ '--primary': config.colors.primary }}`)
- Conditional rendering based on `content.sections.sectionName`
- Responsive Tailwind classes
- Client components only where needed (Countdown)

**Template Registry:**
```typescript
export const templateRegistry = {
  'classic-elegance': { component: ClassicElegance, config: classicConfig },
  'modern-minimal': { component: ModernMinimal, config: modernConfig },
  'rustic-charm': { component: RusticCharm, config: rusticConfig },
}
```

**Update Wedding Page:** ✅
- File: `src/app/(wedding)/wedding/[subdomain]/page.tsx`
- Replace hardcoded template with registry lookup:
  ```typescript
  const website = await prisma.website.findUnique({ where: { subdomain } })
  const Template = templateRegistry[website.templateId].component
  return <Template content={website.content} photos={website.photos} />
  ```

### Phase 3: Form Components (Days 8-10) ✅

**Create UI Components** (in `src/components/ui/`):
- `input.tsx` - Text input (h-11, rose-400 focus ring, stone colors)
- `textarea.tsx` - Multi-line text input
- `label.tsx` - Form label with optional required indicator
- `select.tsx` - Dropdown select
- `color-picker.tsx` - HexColorPicker wrapper with preview swatch
- `date-picker.tsx` - Date input with formatting
- `toggle.tsx` - Switch component for section visibility

All components follow existing Button pattern:
- Consistent styling with design system (rose/stone colors)
- ForwardRef for form integration
- TypeScript interfaces for props
- Smooth transitions (300ms)

**Create Builder Components** (in `src/components/builder/`):
- `step-indicator.tsx` - Progress indicator for 5-step wizard
- `preview-frame.tsx` - Live preview pane rendering template

### Phase 4: Builder Page (Days 11-14) ✅

**File Structure:**
- `src/app/(public)/builder/layout.tsx` - Full-screen layout (no header/footer)
- `src/app/(public)/builder/page.tsx` - Renders WeddingBuilder component
- `src/components/builder/wedding-builder.tsx` - Main orchestrator

**Wedding Builder Component:**
- State: currentStep (1-5), selectedTemplate, formData
- Layout: Split-pane (form left, preview right) with responsive collapse
- Real-time preview updates as form changes
- Navigation with validation between steps

**5 Step Components** (in `src/components/builder/steps/`):

1. **template-selection.tsx**
   - Grid of 3 template cards with thumbnails
   - Shows name, description, preview image
   - Visual selection indicator
   - Sets selectedTemplate and advances

2. **basic-info.tsx**
   - React Hook Form + Zod validation
   - Fields: brideName (required), groomName (required), weddingDate (required)
   - Updates formData on continue

3. **content-details.tsx**
   - Section toggles at top (story, events, rsvp, gallery, etc.)
   - Conditional fields based on toggles:
     - Story: title + content textarea
     - Events: ceremony (venue, time, address) + reception (venue, time, address)
     - Map URLs for both locations

4. **theme-customization.tsx**
   - 4 preset color palettes with visual swatches
   - 3 custom color pickers (primary, secondary, accent)
   - Clicking preset applies all colors
   - Real-time preview updates with new colors

5. **review-publish.tsx**
   - Summary of all entered data
   - Subdomain input (auto-generated from names, editable)
   - Subdomain validation (unique, valid characters)
   - "Publish Website" button triggers deployment
   - Shows loading state during deployment
   - Redirects to success page with URL

### Phase 5: API & Deployment (Days 15-20) ✅

**Update API Routes:**

**`src/app/api/websites/route.ts` (MODIFY):**
```typescript
POST /api/websites
- Validate with Zod schema
- Check subdomain availability (unique constraint)
- Create Website + WebsiteContent in transaction
- Return created website with ID

GET /api/websites
- List all websites (for future features)
- Include content relation
```

**`src/app/api/rsvp/route.ts` (MODIFY):**
```typescript
POST /api/rsvp
- Body: { subdomain, guestName, email, attending, plusOne, dietaryRequirements, message }
- Fetch website by subdomain
- Create RSVP record linked to website
- Return success response
- CORS headers enabled (deployed sites will call this endpoint)
```

**IMPORTANT:** RSVP endpoints need CORS configuration:
```typescript
export async function POST(request: Request) {
  const response = await handleRSVP(request)
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
  return response
}
```

**Deployment System:**

**`src/lib/cloudflare/deploy.ts` (NEW):**
```typescript
async function deployToCloudflare(websiteId: string) {
  // 1. Fetch website with content from database
  const website = await prisma.website.findUnique({
    where: { id: websiteId },
    include: { content: true, photos: true }
  })

  // 2. Get template from registry
  const { component: Template } = templateRegistry[website.templateId]

  // 3. Render template to static HTML using renderToStaticMarkup
  const bodyHtml = renderToStaticMarkup(
    <Template content={website.content} photos={website.photos} />
  )

  // 4. Wrap in full HTML document with:
  const fullHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${website.content.brideName} & ${website.content.groomName}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">
        <script>
          // RSVP form handler that calls back to main app
          async function handleRSVP(e) {
            e.preventDefault()
            const formData = new FormData(e.target)
            await fetch('${process.env.NEXT_PUBLIC_API_URL}/api/rsvp', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                subdomain: '${website.subdomain}',
                ...Object.fromEntries(formData)
              })
            })
          }
        </script>
      </head>
      <body>${bodyHtml}</body>
    </html>
  `

  // 5. Upload HTML to Cloudflare Workers KV
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${process.env.CLOUDFLARE_KV_NAMESPACE_ID}/values/${website.subdomain}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        'Content-Type': 'text/html'
      },
      body: fullHtml
    }
  )

  // 6. Return deployment URL
  return `https://${website.subdomain}.${process.env.NEXT_PUBLIC_MAIN_DOMAIN}`
}
```

**`src/app/api/deploy/route.ts` (NEW):**
```typescript
POST /api/deploy
- Body: { websiteId }
- Call deployToCloudflare(websiteId)
- Update website: published=true, publishedAt, deploymentUrl
- Return deployment URL
```

**Cloudflare Worker Setup:**

**`cloudflare-worker/index.js` (NEW):**
```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const hostname = url.hostname

  // Extract subdomain (e.g., john-mary from john-mary.yoursite.com)
  const subdomain = hostname.split('.')[0]

  // Fetch HTML from KV storage
  const html = await WEDDING_SITES.get(subdomain)

  if (!html) {
    return new Response('Website not found', { status: 404 })
  }

  return new Response(html, {
    headers: {
      'content-type': 'text/html',
      'cache-control': 'public, max-age=3600'
    }
  })
}
```

**`cloudflare-worker/wrangler.toml` (NEW):**
```toml
name = "wedding-sites"
main = "index.js"
compatibility_date = "2024-01-01"

[[kv_namespaces]]
binding = "WEDDING_SITES"
id = "YOUR_KV_NAMESPACE_ID"

[env.production]
routes = [
  { pattern = "*.yoursite.com/*", zone_name = "yoursite.com" }
]
```

**Cloudflare Setup Steps:**
```bash
# 1. Install Wrangler CLI globally
npm install -g wrangler

# 2. Login to Cloudflare
wrangler login

# 3. Create KV namespace
wrangler kv:namespace create "WEDDING_SITES"
# Copy the ID from output and paste into wrangler.toml

# 4. Create KV namespace for preview
wrangler kv:namespace create "WEDDING_SITES" --preview

# 5. Deploy worker
cd cloudflare-worker
wrangler deploy

# 6. Copy Worker URL from output to .env.local as CLOUDFLARE_WORKER_URL
```

**After Deployment:**
- Set up custom domain in Cloudflare dashboard
- Configure DNS wildcard (*.yoursite.com) to point to worker
- Update CLOUDFLARE_WORKER_URL in environment variables

**Success Page:**

**`src/app/(public)/builder/success/page.tsx` (NEW):**
- Success message with checkmark
- Display deployment URL
- "View Your Website" and "Back to Home" buttons
- Next steps list

### Phase 6: Testing (Day 21) ✅

**Database Seed:**
- `prisma/seed.ts` - Create test websites for development

**Testing Checklist:**
- [ ] All 3 templates render correctly
- [ ] Section visibility toggles work
- [ ] Color customization applies to preview
- [ ] Countdown timer updates every second
- [ ] Form validation prevents invalid submissions
- [ ] Subdomain validation (unique, valid format)
- [ ] Preview updates in real-time
- [ ] Website saves to database
- [ ] Cloudflare deployment succeeds
- [ ] Deployed site accessible via subdomain
- [ ] RSVP form submits to database
- [ ] Mobile responsive on all breakpoints

## Critical Files to Implement

1. **`prisma/schema.prisma`** - Database foundation
2. **`src/templates/registry.ts`** - Template system core
3. **`src/components/builder/wedding-builder.tsx`** - Main orchestrator
4. **`src/lib/cloudflare/deploy.ts`** - Deployment logic
5. **`src/app/api/deploy/route.ts`** - Deployment endpoint

## Data Flow

```
User visits /builder
  ↓
Step 1: Select template (classic-elegance)
  ↓
Steps 2-4: Fill in data (preview updates in real-time)
  ↓
Step 5: Enter subdomain, click "Publish"
  ↓
POST /api/websites (saves to database)
  ↓
POST /api/deploy { websiteId }
  ↓
deployToCloudflare():
  - Fetch website with content
  - Render template to HTML
  - Upload to Cloudflare Workers KV
  ↓
Update website: published=true, deploymentUrl
  ↓
Redirect to /builder/success with deployment URL
  ↓
Guest visits subdomain.yoursite.com
  ↓
Cloudflare Worker fetches HTML from KV
  ↓
Returns static HTML to guest
```

## Environment Variables

```env
# Database (SQLite - file-based)
DATABASE_URL="file:./dev.db"

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_MAIN_DOMAIN=localhost:3000

# Cloudflare Workers
CLOUDFLARE_API_TOKEN=your_api_token_from_cloudflare_dashboard
CLOUDFLARE_ACCOUNT_ID=your_account_id_from_cloudflare
CLOUDFLARE_KV_NAMESPACE_ID=your_kv_namespace_id_from_wrangler_output
CLOUDFLARE_WORKER_URL=https://your-worker.workers.dev

# Production domain (when deployed)
# NEXT_PUBLIC_MAIN_DOMAIN=yoursite.com
```

**Getting Cloudflare Credentials:**
1. API Token: Cloudflare Dashboard → My Profile → API Tokens → Create Token (Workers KV Storage permissions)
2. Account ID: Cloudflare Dashboard → Workers & Pages → Overview (right sidebar)
3. KV Namespace ID: Run `wrangler kv:namespace create "WEDDING_SITES"` and copy the ID

## Design System Consistency

All new components should follow existing patterns:
- **Colors:** Rose (rose-500, rose-600) for primary, Stone (stone-800, stone-900) for backgrounds
- **Fonts:** Cormorant Garamond (serif), Outfit (sans-serif)
- **Spacing:** Tailwind default scale (gap-4, gap-6, px-4, py-8)
- **Transitions:** 300ms duration
- **Focus rings:** ring-2 ring-rose-400
- **Rounded corners:** rounded-md for inputs, rounded-lg for cards

## Notes

- **No authentication initially** - anyone can build and deploy
- **Subdomain must be unique** - validation on both client and server
- **Preview uses template registry** - renders same component as production
- **Cloudflare Workers KV** - stores static HTML (not React components)
- **RSVP is fully functional** - deployed sites call back to main app's `/api/rsvp` endpoint via CORS
- **SQLite for MVP** - easy to migrate to PostgreSQL later when scaling
- **Can add authentication later** - by wrapping builder in (dashboard) route group

## Migration Path (Future)

**SQLite → PostgreSQL:**
1. Change datasource provider in schema.prisma to postgresql
2. Update DATABASE_URL to PostgreSQL connection string
3. Run `npx prisma migrate dev`
4. Prisma handles all SQL differences automatically
