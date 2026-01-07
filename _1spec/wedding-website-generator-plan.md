# Wedding Website Generator - Project Plan

## 1. Main Website Structure (Inspired by Slubly.pl)

### Core Pages/Subsites

#### 1.1 Public Pages
- **Homepage (Strona Główna)**
  - Hero section with value proposition
  - Featured templates showcase
  - How it works (3-step process)
  - Pricing overview
  - Customer testimonials
  - Call-to-action

- **Templates Gallery (Wzory)**
  - Filterable template gallery
  - Categories: Classic, Modern, Rustic, Floral, Minimalist
  - Live preview option
  - Template details page

- **Pricing (Cennik)**
  - Tiered pricing packages
  - Feature comparison table
  - Annual vs. custom duration options
  - Add-ons and extras

- **Features/Offer (Oferta)**
  - Detailed feature explanations
  - RSVP system
  - Photo gallery
  - Timeline/Story section
  - Countdown timer
  - Maps & directions
  - Guest management
  - Custom domain options

- **Help & FAQ**
  - Common questions
  - Video tutorials
  - Documentation
  - Support contact

- **About Us**
  - Company story
  - Mission & values
  - Team (optional)

- **Contact**
  - Contact form
  - Support channels
  - Business information

- **Legal Pages**
  - Terms of Service
  - Privacy Policy
  - Return/Refund Policy
  - Cookie Policy

#### 1.2 User Dashboard Area
- **Account Dashboard**
  - My websites overview
  - Active subscriptions
  - Payment history
  - Account settings

- **Website Builder/Editor**
  - Template selection
  - Content editor
  - Design customization
  - Preview mode
  - Publish controls

- **Authentication**
  - Login page
  - Registration page
  - Password reset
  - Email verification

---

## 2. Wedding Website Generator - Technical Implementation Approaches

### Approach 1: Static Site Generator (SSG) with Build Process

**How it works:**
- Templates built with frameworks like Next.js, Gatsby, or Astro
- User fills form → triggers build process → generates static HTML/CSS/JS
- Deploys to CDN (Vercel, Netlify, Cloudflare Pages)

**Pros:**
- Fast loading times
- SEO-friendly
- Low hosting costs
- High security (no server-side vulnerabilities)

**Cons:**
- Rebuild needed for content updates
- Build time delays
- Complex real-time features (RSVP) need API integration

**Tech Stack Example:**
- Next.js/Astro for templates
- Headless CMS (Strapi, Payload CMS) for user data
- GitHub/GitLab API for repository management
- Vercel/Netlify for deployment
- PostgreSQL for user/subscription data

---

### Approach 2: Multi-Tenant SaaS with Dynamic Rendering

**How it works:**
- Single application serves all wedding websites
- Each couple gets a subdomain (john-mary.yourplatform.com)
- Content stored in database, rendered dynamically
- Custom domains via DNS configuration

**Pros:**
- Instant updates
- Easy to manage
- Real-time features simple to implement
- Centralized hosting

**Cons:**
- Higher hosting costs
- Performance optimization needed
- Database dependency

**Tech Stack Example:**
- Next.js/React for frontend
- Node.js/Express or Next.js API routes
- PostgreSQL/MongoDB for data
- Redis for caching
- Subdomain routing with middleware
- Payment: Stripe/PayPal

---

### Approach 3: Hybrid - Editor + Static Export

**How it works:**
- Visual editor in main platform
- User edits → saves to database
- On publish → exports to static files
- Static files hosted on CDN
- RSVP/dynamic features use serverless functions

**Pros:**
- Best of both worlds
- Fast end-user experience
- Real-time editing in builder
- Scalable

**Cons:**
- More complex architecture
- Build pipeline management
- Dual infrastructure

**Tech Stack Example:**
- React/Vue builder with drag-and-drop
- Template engine (Handlebars, EJS, or React)
- Export to static HTML/CSS/JS
- AWS S3 + CloudFront or Netlify
- Serverless functions (AWS Lambda, Vercel Functions) for RSVP

---

### Approach 4: WordPress Multisite/Subdirectory

**How it works:**
- WordPress multisite installation
- Each wedding = new site in network
- Pre-built themes as templates
- Plugins for RSVP, galleries, etc.

**Pros:**
- Established ecosystem
- Many plugins available
- Easy content management
- Familiar to many users

**Cons:**
- Performance limitations
- Security concerns at scale
- Customization complexity
- WordPress-specific constraints

**Tech Stack:**
- WordPress Multisite
- Custom wedding themes
- WooCommerce for payments
- Custom plugins for wedding features

---

### Approach 5: No-Code/Low-Code Backend (Recommended for MVP)

**How it works:**
- Use platforms like Webflow, Framer, or custom React templates
- Backend with Supabase/Firebase
- Template variations as components
- User customization through configuration

**Pros:**
- Fast development
- Lower initial costs
- Focus on business logic
- Easy scaling

**Cons:**
- Platform dependency
- Limited customization
- Potential vendor lock-in

**Tech Stack Example:**
- React component library (Chakra UI, shadcn/ui)
- Supabase (database, auth, storage)
- Stripe for payments
- Template variations as React components
- Custom subdomain routing

---

## 3. Recommended Architecture (Hybrid Approach)

### 3.1 Main Platform (Your Marketing Site)
- **Framework:** Next.js 14+ (App Router)
- **UI:** Tailwind CSS + shadcn/ui components
- **Database:** PostgreSQL (via Supabase)
- **Authentication:** NextAuth.js or Supabase Auth
- **Payment:** Stripe
- **Hosting:** Vercel

### 3.2 Template System
- **Template Storage:** React components in monorepo
- **Template Categories:**
  - Classic Elegance
  - Modern Minimalist
  - Rustic Charm
  - Floral Romance
  - Night Sky
  - Vintage
  - Beach/Destination
  - Garden Party

### 3.3 Wedding Website Rendering
**Option A: Subdomain Multi-Tenant**
```
john-mary.yourplatform.com → renders from DB
custom-domain.com → CNAME to platform
```

**Option B: Static Export**
```
User publishes → Build static site → Deploy to CDN
john-mary.yourplatform.com → Cloudflare Pages
```

### 3.4 Database Schema (Core Tables)
```
users
  - id
  - email
  - password_hash
  - created_at

subscriptions
  - id
  - user_id
  - plan_type
  - status
  - expires_at
  - stripe_subscription_id

websites
  - id
  - user_id
  - subdomain
  - custom_domain
  - template_id
  - published
  - published_at

website_content
  - id
  - website_id
  - bride_name
  - groom_name
  - wedding_date
  - venue_info
  - story_timeline
  - settings_json

rsvp_responses
  - id
  - website_id
  - guest_name
  - email
  - attending
  - plus_one
  - dietary_requirements

photos
  - id
  - website_id
  - url
  - caption
  - order
```

---

## 4. Payment & Publishing Workflow

### 4.1 User Journey
1. **Browse Templates** (no account needed)
2. **Sign Up** → Create account
3. **Select Template** → Preview customization
4. **Enter Wedding Details** → Form wizard
5. **Customize Design** → Color, fonts, sections
6. **Preview** → See full wedding site
7. **Select Plan** → Choose pricing tier
8. **Payment** → Stripe checkout
9. **Publish** → Website goes live
10. **Share** → Get custom URL

### 4.2 Payment Integration
- **Stripe Checkout** for one-time payments
- **Stripe Subscriptions** for annual renewals
- **Webhook handling** for payment confirmations
- **Grace period** after expiration (e.g., 7 days)
- **Automatic unpublish** if not renewed

### 4.3 Publishing Options

**Option 1: Immediate (Multi-tenant)**
- Payment confirmed → `published = true` in DB
- Website immediately accessible
- Real-time updates

**Option 2: Build & Deploy (Static)**
- Payment confirmed → Trigger build pipeline
- Generate static files
- Deploy to CDN
- 2-5 minutes to go live
- Email notification when ready

---

## 5. Template Creation Strategy

### 5.1 Template Structure
Each template should include:
- **Header/Hero** - Couple names, date, countdown
- **Our Story** - Timeline with photos
- **Event Details** - Ceremony & reception info
- **RSVP Form** - Guest confirmation
- **Gallery** - Photo album
- **Travel Info** - Maps, hotels, transport
- **FAQ** - Common questions
- **Footer** - Thank you message

### 5.2 Customization Levels
- **Color Scheme** - Primary, secondary, accent colors
- **Typography** - Font pairings (3-4 per template)
- **Section Visibility** - Toggle sections on/off
- **Layout Options** - Alternative section layouts
- **Content Editing** - All text editable
- **Image Upload** - Background, gallery, timeline photos

### 5.3 Template Development Process
1. Design in Figma/Sketch
2. Build as React components
3. Extract customizable props
4. Create configuration schema
5. Test responsive design
6. Add to template library

---

## 6. Monetization Models

### 6.1 Pricing Tiers (Inspired by Slubly)

**Basic Plan - $99/year**
- Single template choice
- Basic customization
- Countdown timer
- Event details
- 1 subdomain

**Standard Plan - $149/year**
- All templates
- Full customization
- RSVP system (up to 150 guests)
- Photo gallery (50 photos)
- Custom thank you page
- Email notifications

**Premium Plan - $249/year**
- Everything in Standard
- Custom domain support
- Unlimited RSVP guests
- Unlimited photos
- Timeline/Story section
- Advanced analytics
- Priority support
- Remove branding

**Add-ons**
- Extra year: $99
- Custom domain setup: $29
- Premium support: $49/year
- Professional photos editing: $99

### 6.2 Free Trial Strategy
- 14-day free trial
- Full feature access
- Preview-only mode (watermark)
- Credit card required / or not
- One-click upgrade

---

## 7. Technical Considerations

### 7.1 Custom Domain Setup
- DNS management instructions
- Automatic SSL certificates (Let's Encrypt)
- Verification process
- Support for www and root domain

### 7.2 Performance
- Image optimization (Next.js Image, Cloudinary)
- Lazy loading
- CDN for static assets
- Database query optimization
- Caching strategy (Redis)

### 7.3 Security
- HTTPS everywhere
- CSRF protection
- SQL injection prevention
- XSS sanitization
- Rate limiting
- Secure payment handling (PCI compliance via Stripe)

### 7.4 Scalability
- Horizontal scaling capability
- Database connection pooling
- CDN for static content
- Queue system for builds (Bull, BullMQ)
- Monitoring (Sentry, LogRocket)

---

## 8. Development Roadmap

### Phase 1: MVP (2-3 months)
- [ ] Main website (homepage, pricing, about)
- [ ] User authentication
- [ ] 3 basic templates
- [ ] Template selection & preview
- [ ] Basic content editor
- [ ] Stripe payment integration
- [ ] Subdomain deployment
- [ ] RSVP functionality

### Phase 2: Core Features (2-3 months)
- [ ] 5 additional templates
- [ ] Photo gallery
- [ ] Timeline/Story section
- [ ] Email notifications
- [ ] Custom domain support
- [ ] Admin dashboard
- [ ] Analytics

### Phase 3: Advanced Features (2-3 months)
- [ ] Drag-and-drop editor
- [ ] Guest management system
- [ ] Advanced customization
- [ ] Mobile app (optional)
- [ ] Multi-language support
- [ ] Integration marketplace

---

## 9. Competitor Analysis

### Similar Platforms
- Slubly.pl (Poland)
- Joy (getjoy.com)
- Zola (zola.com)
- The Knot (theknot.com)
- Withjoy (withjoy.com)
- Minted (minted.com/wedding-websites)

### Differentiation Opportunities
- More affordable pricing
- Better template designs
- Easier customization
- Superior UX
- Local market focus
- Additional features (virtual guestbook, live streaming)

---

## 10. Next Steps

1. **Validate Market** - Survey potential users, pricing sensitivity
2. **Choose Tech Stack** - Based on team skills and scalability needs
3. **Design Templates** - Start with 3-5 distinct styles
4. **Build MVP** - Focus on core wedding website features
5. **Beta Testing** - 10-20 couples for feedback
6. **Launch** - Marketing campaign, SEO, social media
7. **Iterate** - Gather feedback, add features, improve UX

---

## Recommended Starting Point

**For fastest time-to-market:**

1. **Main Platform:** Next.js + Supabase + Tailwind CSS
2. **Templates:** React components with theme configuration
3. **Hosting:** Vercel (multi-tenant with subdomain routing)
4. **Payment:** Stripe
5. **Start with:** 3 templates, basic editor, RSVP, gallery

**This allows you to:**
- Launch in 2-3 months
- Test market fit quickly
- Scale as you grow
- Keep costs low initially
- Focus on user experience over complex infrastructure
