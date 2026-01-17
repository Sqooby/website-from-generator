# 🗺️ Wedding Website Generator - Complete Project Roadmap

## 📌 Przegląd projektu

**Nazwa**: Évora - Wedding Website Generator
**Cel**: Platforma SaaS do tworzenia eleganckich, w pełni personalizowanych stron ślubnych
**Model biznesowy**: Subscription-based (Essential $99, Complete $149, Luxe $249/rok)
**Architektura**: Multi-tenant Next.js z subdomain routing

---

## ✅ FAZA 1: Frontend Foundation (COMPLETED ✅)

### 1.1 Setup & Configuration ✅
- [x] Next.js 16 + TypeScript setup
- [x] Tailwind CSS v4 configuration
- [x] Google Fonts (Cormorant Garamond, Outfit)
- [x] Route groups architecture
- [x] Middleware subdomain routing
- [x] Image optimization setup

### 1.2 Core Pages ✅
- [x] Homepage z hero, features, testimonial
- [x] Templates gallery (6 templates planned)
- [x] Pricing page (3 tiers)
- [x] Header z centered navigation
- [x] Footer z links

### 1.3 Design System ✅
- [x] Button component (4 variants, 3 sizes)
- [x] Color palette (Rose + Stone)
- [x] Typography system
- [x] Animation keyframes
- [x] Editorial split layouts

---

## 🔄 FAZA 2: Database & Backend (CURRENT PRIORITY)

### 2.1 Database Setup
**Priority: CRITICAL**
**Estimated time: 4-6 hours**

#### Tasks:
```
[ ] Zainstalować Prisma
    - npm install prisma @prisma/client
    - npx prisma init

[ ] Stworzyć schema.prisma
    Modele:
    - User (id, email, password, name, createdAt)
    - Website (id, userId, subdomain, customDomain, templateId, published, content)
    - Template (id, name, category, isPremium, previewImage, config)
    - RSVP (id, websiteId, guestName, email, attending, mealPreference)
    - Subscription (id, userId, plan, status, currentPeriodEnd)
    - Payment (id, userId, amount, status, stripePaymentId)

[ ] Setup PostgreSQL
    Opcja A: Neon.tech (free tier, serverless)
    Opcja B: Supabase (free tier, full postgres)
    Opcja C: Local PostgreSQL

[ ] Przygotować migrations
    - npx prisma migrate dev --name init
    - npx prisma generate

[ ] Seed initial data
    - 6 templates z danymi
    - Test user account
```

**Files to create:**
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `src/lib/prisma.ts` (Prisma client singleton)

---

### 2.2 Authentication System
**Priority: HIGH**
**Estimated time: 6-8 hours**

#### Tasks:
```
[ ] Zainstalować NextAuth.js v5
    - npm install next-auth@beta
    - Stworzyć auth.config.ts

[ ] Providers setup
    - Credentials (email/password)
    - Google OAuth (optional)
    - GitHub OAuth (optional)

[ ] Strony auth
    - /login - formularz logowania
    - /register - rejestracja nowego użytkownika
    - /forgot-password - reset hasła
    - /verify-email - weryfikacja email

[ ] Middleware protection
    - Chronić /dashboard routes
    - Redirect niezalogowanych do /login

[ ] Password hashing
    - npm install bcryptjs
    - Hash passwords przy rejestracji
```

**Files to create:**
- `src/auth.config.ts`
- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/register/page.tsx`
- `src/app/api/auth/[...nextauth]/route.ts`
- `src/lib/auth.ts` (helpers)

---

### 2.3 API Endpoints
**Priority: HIGH**
**Estimated time: 8-10 hours**

#### Websites API
```
[ ] GET /api/websites
    - Lista websites użytkownika
    - Pagination, filtering

[ ] POST /api/websites
    - Tworzenie nowej strony ślubnej
    - Input: templateId, subdomain, initialContent
    - Walidacja subdomain (unikalność)

[ ] GET /api/websites/[id]
    - Szczegóły pojedynczej strony
    - Tylko właściciel może zobaczyć

[ ] PATCH /api/websites/[id]
    - Aktualizacja contentu
    - Zmiana koloru, czcionki, sekcji
    - Real-time auto-save

[ ] DELETE /api/websites/[id]
    - Usunięcie strony (soft delete)

[ ] POST /api/websites/[id]/publish
    - Publikacja strony
    - Sprawdzenie czy subdomain dostępny
```

#### RSVP API
```
[ ] POST /api/rsvp
    - Guest submits RSVP
    - Input: websiteId, name, email, attending, meal, etc.
    - Email confirmation

[ ] GET /api/websites/[id]/rsvps
    - Lista RSVPs dla właściciela
    - Export do CSV

[ ] PATCH /api/rsvp/[id]
    - Guest może edytować RSVP
```

#### Templates API
```
[ ] GET /api/templates
    - Lista wszystkich templates
    - Filter: category, isPremium

[ ] GET /api/templates/[id]
    - Szczegóły template
    - Default configuration
```

**Files to create:**
- `src/app/api/websites/route.ts`
- `src/app/api/websites/[id]/route.ts`
- `src/app/api/websites/[id]/publish/route.ts`
- `src/app/api/rsvp/route.ts`
- `src/app/api/rsvp/[id]/route.ts`
- `src/app/api/templates/route.ts`
- `src/lib/validations/website.ts` (Zod schemas)

---

## 🎨 FAZA 3: Template System

### 3.1 Template Designs
**Priority: HIGH**
**Estimated time: 20-25 hours (4-5h per template)**

#### 6 Templates do stworzenia:

**1. Classic Elegance (Free)**
- Serif typography
- Gold accents
- Timeline section
- Cream/ivory palette
- Files: `src/templates/classic-elegance/`

**2. Modern Minimal (Free)**
- Sans-serif typography
- Clean lines
- Bold photography focus
- Black/white/gray palette
- Files: `src/templates/modern-minimal/`

**3. Garden Romance (Premium)**
- Floral illustrations
- Soft pastels
- Botanical elements
- Green/blush palette
- Files: `src/templates/garden-romance/`

**4. Editorial Luxury (Premium)**
- Magazine-style grids
- Asymmetric layouts
- Large typography
- Rose/stone palette (current brand)
- Files: `src/templates/editorial-luxury/`

**5. Rustic Charm (Free)**
- Wood textures
- Warm earth tones
- Handwritten accents
- Brown/orange palette
- Files: `src/templates/rustic-charm/`

**6. Coastal Breeze (Premium)**
- Ocean-inspired
- Light & airy
- Blue gradients
- Relaxed elegance
- Files: `src/templates/coastal-breeze/`

#### Template Structure:
```typescript
// Each template folder contains:
src/templates/[template-id]/
  ├── components/
  │   ├── Hero.tsx
  │   ├── Countdown.tsx
  │   ├── Story.tsx
  │   ├── Events.tsx
  │   ├── RSVP.tsx
  │   ├── Gallery.tsx
  │   └── FAQ.tsx
  ├── config.ts (default colors, fonts, layout)
  └── preview.tsx (static preview)
```

### 3.2 Template Preview System
```
[ ] /templates/[id]/preview route
    - Full-page interactive preview
    - Sample content pre-filled
    - "Use This Template" CTA

[ ] Template switching
    - User może zmienić template w dashboard
    - Content migration między templates
```

---

## 🎛️ FAZA 4: Website Builder (Dashboard)

### 4.1 Dashboard Layout
**Priority: HIGH**
**Estimated time: 12-15 hours**

```
[ ] Dashboard sidebar navigation
    - My Websites
    - Create New
    - Settings
    - Billing
    - Help

[ ] Websites list page
    - Cards z preview
    - Status badges (Draft, Published)
    - Quick actions (Edit, Preview, Analytics, Delete)

[ ] Empty states
    - Żadnych websites → "Create your first"
    - No RSVPs yet
```

### 4.2 Website Editor
**Priority: CRITICAL**
**Estimated time: 25-30 hours**

#### Builder Interface:
```
[ ] Split view editor
    Left: Settings panel
    Right: Live preview (iframe)

[ ] Basic Info section
    - Bride name
    - Groom name
    - Wedding date picker
    - Venue
    - Subdomain picker (real-time availability check)

[ ] Design Customization
    - Color picker (primary, secondary, accent)
    - Font selector (serif/sans-serif pairs)
    - Upload photos (hero, gallery)

[ ] Sections Management
    - Toggle sections on/off (hero, countdown, story, etc.)
    - Drag to reorder sections
    - Configure each section

[ ] Content Editing
    - Rich text editor (Tiptap/Lexical)
    - Image uploader (Uploadthing/Cloudinary)
    - Event details (ceremony, reception, etc.)

[ ] Auto-save
    - Debounced save every 3 seconds
    - "Saving..." indicator
    - "All changes saved" confirmation

[ ] Preview modes
    - Desktop, Tablet, Mobile
    - Real device preview (optional)
```

### 4.3 RSVP Management
```
[ ] RSVP Dashboard
    - Total guests
    - Attending vs Not Attending
    - Meal preferences breakdown
    - Search/filter guests

[ ] Guest details modal
    - View full response
    - Add notes
    - Mark as VIP

[ ] Export functionality
    - CSV export
    - PDF guest list
```

---

## 💳 FAZA 5: Payments & Subscriptions

### 5.1 Stripe Integration
**Priority: HIGH**
**Estimated time: 10-12 hours**

```
[ ] Stripe setup
    - npm install stripe @stripe/stripe-js
    - Stripe account + API keys
    - Webhook endpoint

[ ] Pricing plans jako Stripe Products
    - Essential ($99/year)
    - Complete ($149/year)
    - Luxe ($249/year)

[ ] Checkout flow
    - /checkout/[planId] page
    - Stripe Checkout integration
    - Success/Cancel redirects

[ ] Subscription management
    - Active subscription check
    - Feature gating (templates, custom domain, etc.)
    - Upgrade/downgrade flow
    - Cancel subscription

[ ] Webhooks handler
    - checkout.session.completed
    - customer.subscription.updated
    - customer.subscription.deleted
    - invoice.payment_failed

[ ] Billing portal
    - Stripe Customer Portal
    - Update payment method
    - View invoices
```

**Files to create:**
- `src/lib/stripe.ts`
- `src/app/api/stripe/webhook/route.ts`
- `src/app/api/create-checkout-session/route.ts`
- `src/app/checkout/[planId]/page.tsx`
- `src/app/(dashboard)/dashboard/billing/page.tsx`

---

## 🌐 FAZA 6: Public Wedding Websites

### 6.1 Subdomain Rendering
**Priority: HIGH**
**Estimated time: 8-10 hours**

```
[ ] Dynamic subdomain route
    /wedding/[subdomain]/page.tsx już istnieje

[ ] Pobieranie danych website z DB
    - Fetch by subdomain
    - 404 jeśli nie istnieje lub unpublished

[ ] Render wybranego template
    - Dynamically import template components
    - Inject user content
    - Apply custom colors/fonts

[ ] SEO optimization
    - Dynamic meta tags (couple names, date)
    - OG images
    - Sitemap dla każdej strony
```

### 6.2 RSVP Form (Guest-facing)
```
[ ] Public RSVP form
    - Guest enters email (lookup if exists)
    - Fill attending, meal preference, +1, message
    - Submit → Save to DB
    - Thank you page

[ ] Email confirmations
    - Send confirmation email to guest
    - Notify couple
```

### 6.3 Guest Features
```
[ ] Photo gallery lightbox
[ ] Countdown timer (real-time)
[ ] Interactive map (Google Maps embed)
[ ] FAQ accordion
[ ] Gift registry links
```

---

## 🚀 FAZA 7: Custom Domains

### 7.1 Custom Domain Setup
**Priority: MEDIUM**
**Estimated time: 6-8 hours**

```
[ ] Custom domain field w Website model
[ ] DNS verification
    - User adds CNAME record
    - Verify ownership

[ ] SSL certificate
    - Let's Encrypt / Vercel auto SSL
    - HTTPS enforcement

[ ] Domain routing w middleware
    - Check if hostname matches custom domain
    - Serve correct website
```

---

## 📊 FAZA 8: Analytics & Insights

### 8.1 Website Analytics
**Priority: LOW**
**Estimated time: 6-8 hours**

```
[ ] Basic analytics tracking
    - Page views
    - Unique visitors
    - RSVP conversion rate
    - Most viewed sections

[ ] Analytics dashboard
    - Charts (recharts/visx)
    - Date range picker
    - Export data
```

---

## 📧 FAZA 9: Email System

### 9.1 Transactional Emails
**Priority: MEDIUM**
**Estimated time: 8-10 hours**

```
[ ] Email provider setup
    Opcja A: Resend (modern, developer-friendly)
    Opcja B: SendGrid
    Opcja C: AWS SES

[ ] Email templates (React Email)
    - Welcome email
    - RSVP confirmation (guest)
    - New RSVP notification (couple)
    - Subscription confirmation
    - Payment receipt
    - Password reset

[ ] Email service
    - src/lib/email.ts
    - Send function z error handling
    - Queue dla bulk emails (optional)
```

---

## 🔧 FAZA 10: Additional Features

### 10.1 Image Management
```
[ ] Image upload service
    Uploadthing lub Cloudinary

[ ] Image optimization
    - Resize/compress na upload
    - WebP conversion
    - Thumbnail generation

[ ] Gallery management
    - Bulk upload
    - Reorder images
    - Captions
```

### 10.2 Guest List Import
```
[ ] CSV import dla guest list
[ ] Bulk invite emails
[ ] Guest groups (family, friends, coworkers)
```

### 10.3 Additional Pages
```
[ ] /help - Help center z FAQ
[ ] /features - Detailed features page
[ ] /contact - Contact form
[ ] /terms - Terms of service
[ ] /privacy - Privacy policy
[ ] /blog - Blog o ślubach (SEO)
```

---

## 🧪 FAZA 11: Testing & Quality

### 11.1 Testing
```
[ ] Unit tests (Vitest)
    - Utility functions
    - Components
    - API handlers

[ ] Integration tests
    - Auth flow
    - Website creation flow
    - Payment flow

[ ] E2E tests (Playwright)
    - Critical user paths
    - Guest RSVP flow
```

### 11.2 Performance
```
[ ] Lighthouse audit
[ ] Image optimization review
[ ] Bundle size optimization
[ ] Database query optimization
[ ] Caching strategy (React Query, SWR)
```

---

## 🌍 FAZA 12: Deployment & DevOps

### 12.1 Production Setup
```
[ ] Vercel deployment
    - Environment variables
    - Domain setup
    - Preview deployments

[ ] Database
    - Production PostgreSQL
    - Backup strategy
    - Connection pooling

[ ] Monitoring
    - Vercel Analytics
    - Sentry error tracking
    - Uptime monitoring

[ ] CI/CD
    - GitHub Actions
    - Automated tests
    - Deploy previews
```

---

## 📈 FAZA 13: Launch & Growth

### 13.1 Pre-launch
```
[ ] Beta testing
    - 10-20 beta users
    - Feedback collection
    - Bug fixes

[ ] Marketing website improvements
[ ] Prepare launch materials
    - Product Hunt launch
    - Social media posts
    - Email to waitlist
```

### 13.2 Post-launch
```
[ ] User onboarding improvements
[ ] Support system (Intercom/Crisp)
[ ] Documentation/tutorials
[ ] Referral program
```

---

## 🎯 Priorytety i kolejność prac

### Sprint 1 (Tydzień 1-2): Backend Foundation
1. ✅ Database setup (Prisma + PostgreSQL)
2. ✅ Basic API endpoints (websites CRUD)
3. ✅ Authentication (NextAuth.js)

### Sprint 2 (Tydzień 3-4): Core Features
1. ✅ Dashboard layout
2. ✅ Website editor (basic version)
3. ✅ Template rendering system
4. ✅ Build 2-3 templates

### Sprint 3 (Tydzień 5-6): Templates & RSVP
1. ✅ Finish all 6 templates
2. ✅ RSVP system (frontend + backend)
3. ✅ Public website rendering

### Sprint 4 (Tydzień 7-8): Payments
1. ✅ Stripe integration
2. ✅ Subscription management
3. ✅ Feature gating
4. ✅ Billing portal

### Sprint 5 (Tydzień 9-10): Polish & Launch Prep
1. ✅ Email system
2. ✅ Analytics
3. ✅ Testing
4. ✅ Performance optimization
5. ✅ Production deployment

---

## 📋 Definition of Done dla każdej feature

Każda feature jest "done" gdy:
- [ ] Code napisany i działa lokalnie
- [ ] Responsive design (mobile + desktop)
- [ ] Error handling zaimplementowany
- [ ] Podstawowe testy napisane
- [ ] Code review (jeśli team)
- [ ] Deployed na preview
- [ ] Dokumentacja zaktualizowana

---

## 🔑 Kluczowe decyzje techniczne do podjęcia

1. **Database**: Neon.tech vs Supabase vs Local Postgres?
2. **Auth**: NextAuth.js v5 vs Clerk vs custom?
3. **Images**: Uploadthing vs Cloudinary vs Vercel Blob?
4. **Emails**: Resend vs SendGrid vs AWS SES?
5. **Rich text editor**: Tiptap vs Lexical vs Slate?
6. **State management**: Zustand vs Jotai vs React Query only?

---

## 📝 Notatki dla przyszłej pracy

### Przy każdej sesji pracy:
1. Przeczytaj ten roadmap
2. Wybierz zadanie z najwyższym priorytetem
3. Zaktualizuj checklisty po zakończeniu
4. Stwórz daily summary na koniec

### Konwencje projektu:
- Komponenty: PascalCase
- Pliki: kebab-case
- API routes: REST conventions
- Commits: Conventional Commits
- Branches: feature/name, fix/name

### Przydatne komendy:
```bash
# Development
npm run dev

# Build
npm run build

# Database
npx prisma migrate dev
npx prisma studio
npx prisma generate

# Type checking
npm run type-check

# Testing
npm run test
npm run test:e2e
```

---

**Last updated**: 2026-01-07
**Current phase**: ✅ Phase 1 Complete → 🔄 Phase 2 Starting
**Next session**: Database setup (Prisma + PostgreSQL)
