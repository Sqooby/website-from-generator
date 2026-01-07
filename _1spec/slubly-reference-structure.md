# Slubly.pl - Reference Website Structure

## Complete Site Map (Based on slubly.pl)

### Main Navigation Pages

#### 1. **Homepage (Strona Główna)**
   - **URL:** `/`
   - **Sections:**
     - Hero section with value proposition
     - "How it works" (3-step process)
     - Featured templates showcase
     - Pricing comparison
     - Customer testimonials
     - FAQ highlights
     - CTA (Call to Action) buttons

#### 2. **Templates Gallery (Wzory)**
   - **URL:** `/wzory` or `/templates`
   - **Content:**
     - Filterable template grid
     - Categories:
       - Klasyczna Elegancja (Classic Elegance)
       - Kwiatowa Fantazja (Floral Fantasy)
       - Nocny Blask (Night Glow)
       - Nowoczesny Minimalizm (Modern Minimalism)
       - Rustykalna Finezja (Rustic Finesse)
     - Template preview cards
     - "View Demo" buttons
     - "Use This Template" buttons

#### 3. **Pricing (Cennik)**
   - **URL:** `/cennik` or `/pricing`
   - **Content:**
     - Three pricing tiers:
       1. **Basic Wedding Page (250 PLN/year)**
          - Wedding information display
          - Countdown timer
          - Basic customization
       2. **Page + Thank You (325 PLN/year)**
          - Everything in Basic
          - RSVP forms
          - Thank you messages
       3. **Premium E-Wedding (400 PLN/year)**
          - Everything in Standard
          - Photo gallery
          - Interactive timeline
          - Priority support
     - Feature comparison table
     - Annual subscription model
     - Payment methods accepted

#### 4. **Offer/Features (Oferta)**
   - **URL:** `/oferta` or `/features`
   - **Detailed feature explanations:**
     - Website customization capabilities
     - RSVP system functionality
     - Guest management
     - Photo gallery
     - Timeline/Story section
     - Countdown timer
     - Maps & directions
     - Thank you cards
     - Mobile responsiveness
     - Custom domains
     - Email notifications

#### 5. **Help & FAQ (Pomoc i FAQ)**
   - **URL:** `/pomoc` or `/faq`
   - **Sections:**
     - Getting started guide
     - Common questions:
       - How to create a website?
       - How to customize template?
       - How to add guests?
       - How does RSVP work?
       - Can I use my own domain?
       - How to add photos?
       - What happens after subscription expires?
     - Video tutorials (optional)
     - Contact support

#### 6. **About Us (O Nas)**
   - **URL:** `/o-nas` or `/about`
   - **Content:**
     - Company story
     - Mission statement
     - Why we created this service
     - Team introduction (optional)
     - Media mentions

#### 7. **Contact (Kontakt)**
   - **URL:** `/kontakt` or `/contact`
   - **Content:**
     - Contact form
     - Email address
     - Phone number (optional)
     - Business hours
     - Social media links

#### 8. **Blog (Optional)**
   - **URL:** `/blog`
   - **Content:**
     - Wedding planning tips
     - Template inspiration
     - Customer stories
     - Feature announcements
     - SEO content

---

### User Account Pages (Authenticated)

#### 9. **Login (Logowanie)**
   - **URL:** `/login` or `/logowanie`
   - **Features:**
     - Email/password login
     - "Forgot password" link
     - Social login (Google, Facebook)
     - "Don't have an account?" signup link

#### 10. **Register (Rejestracja)**
   - **URL:** `/register` or `/rejestracja`
   - **Form fields:**
     - Email
     - Password
     - Confirm password
     - Accept terms checkbox
     - "Already have an account?" login link

#### 11. **Dashboard (Panel Użytkownika)**
   - **URL:** `/dashboard`
   - **Sections:**
     - My Websites overview
     - Active subscriptions status
     - Quick actions:
       - Create new website
       - Edit existing website
       - View published sites
     - Account statistics
     - Recent activity

#### 12. **My Websites (Moje Strony)**
   - **URL:** `/dashboard/websites`
   - **Content:**
     - List of created wedding websites
     - Status indicators (draft, published, expired)
     - Quick actions per website:
       - Edit
       - Preview
       - View analytics
       - Delete
     - "Create New Website" button

#### 13. **Website Editor (Edytor Strony)**
   - **URL:** `/dashboard/websites/[id]/edit`
   - **Sections:**
     - **Content Tab:**
       - Couple information
       - Wedding date & time
       - Venue details
       - Story/timeline
       - RSVP settings
     - **Design Tab:**
       - Template selection
       - Color customization
       - Font selection
       - Section visibility
     - **Media Tab:**
       - Photo uploads
       - Gallery management
     - **Settings Tab:**
       - Domain settings
       - Privacy options
       - Notification preferences
     - Live preview pane

#### 14. **Guest Management (Zarządzanie Gośćmi)**
   - **URL:** `/dashboard/websites/[id]/guests`
   - **Features:**
     - Guest list
     - RSVP responses
     - Attendance tracking
     - Dietary requirements
     - Plus-ones
     - Send invitations
     - Export guest list (CSV)

#### 15. **Analytics (Statystyki)**
   - **URL:** `/dashboard/websites/[id]/analytics`
   - **Metrics:**
     - Page views
     - Unique visitors
     - RSVP response rate
     - Most viewed sections
     - Traffic sources
     - Device breakdown (mobile/desktop)

#### 16. **Subscription Management (Subskrypcja)**
   - **URL:** `/dashboard/subscription`
   - **Content:**
     - Current plan details
     - Expiration date
     - Renewal options
     - Upgrade/downgrade
     - Payment history
     - Invoices download

#### 17. **Account Settings (Ustawienia Konta)**
   - **URL:** `/dashboard/settings`
   - **Sections:**
     - Profile information
     - Change email
     - Change password
     - Notification preferences
     - Delete account

---

### Legal & Footer Pages

#### 18. **Terms of Service (Regulamin)**
   - **URL:** `/regulamin` or `/terms`
   - Legal terms and conditions

#### 19. **Privacy Policy (Polityka Prywatności)**
   - **URL:** `/polityka-prywatnosci` or `/privacy`
   - GDPR compliance, data handling

#### 20. **Cookie Policy (Polityka Cookies)**
   - **URL:** `/cookies`
   - Cookie usage explanation

#### 21. **Refund Policy (Zwroty i Reklamacje)**
   - **URL:** `/zwroty` or `/refunds`
   - Return and complaint procedures

---

### Generated Wedding Website Pages

These are the pages that get generated for each couple:

#### 22. **Wedding Homepage**
   - **URL:** `john-mary.yourplatform.com` or custom domain
   - **Sections:**
     - Hero with couple names & date
     - Countdown timer
     - Our Story
     - Event Details (ceremony & reception)
     - RSVP Form
     - Photo Gallery
     - Travel & Accommodations
     - FAQ
     - Thank You / Footer

#### 23. **RSVP Confirmation Page**
   - **URL:** `/rsvp/success`
   - Thank you message after RSVP submission

#### 24. **Gallery Page (Optional)**
   - **URL:** `/gallery`
   - Full-screen photo gallery if separated from main page

---

## Content Hierarchy

```
Main Website (yourplatform.com)
├── Public Pages
│   ├── Homepage
│   ├── Templates Gallery
│   ├── Pricing
│   ├── Features
│   ├── Help & FAQ
│   ├── About Us
│   ├── Contact
│   └── Blog (optional)
│
├── Authentication
│   ├── Login
│   ├── Register
│   └── Password Reset
│
├── User Dashboard
│   ├── Dashboard Home
│   ├── My Websites
│   ├── Website Editor
│   │   ├── Content Editor
│   │   ├── Design Customizer
│   │   ├── Media Manager
│   │   └── Settings
│   ├── Guest Management
│   ├── Analytics
│   ├── Subscription
│   └── Account Settings
│
├── Legal
│   ├── Terms of Service
│   ├── Privacy Policy
│   ├── Cookie Policy
│   └── Refund Policy
│
└── Generated Wedding Sites
    └── [subdomain].yourplatform.com
        ├── Homepage (all sections)
        ├── RSVP Form
        └── Confirmation Pages
```

---

## Key Features Per Page Type

### Homepage Must-Haves
- Clear value proposition
- Visual template showcase
- Simple 3-step "How it works"
- Pricing at a glance
- Trust indicators (testimonials, number of couples)
- Strong CTAs ("Create Your Wedding Website")

### Template Gallery Must-Haves
- High-quality template thumbnails
- Category filtering
- Live preview functionality
- Template details (features, style)
- "Use This Template" CTA

### Dashboard Must-Haves
- Quick access to all websites
- Clear status indicators
- One-click edit/preview
- Subscription status prominent
- Easy navigation

### Website Editor Must-Haves
- Live preview
- Auto-save
- Undo/redo
- Mobile preview
- Publish button (only after payment)

### Wedding Website Must-Haves
- Fast loading
- Mobile responsive
- RSVP form functionality
- Easy sharing (social media)
- Professional design

---

## User Journey Flow

### New User Flow
```
1. Land on Homepage
   ↓
2. Browse Templates
   ↓
3. Click "Use This Template"
   ↓
4. Sign Up / Login
   ↓
5. Enter Wedding Details (Wizard)
   ↓
6. Customize Design
   ↓
7. Preview Website
   ↓
8. Choose Pricing Plan
   ↓
9. Payment (Stripe)
   ↓
10. Website Published ✅
    ↓
11. Share URL with Guests
```

### Returning User Flow
```
1. Login
   ↓
2. Dashboard
   ↓
3. Edit Existing Website OR Create New
   ↓
4. Make Changes
   ↓
5. Publish Updates
```

### Guest Flow
```
1. Receive Wedding Website URL
   ↓
2. Browse Website
   ↓
3. Fill RSVP Form
   ↓
4. Confirmation Message
   ↓
5. (Optional) Update RSVP Later
```

---

## Recommended Page Priorities for Development

### Phase 1 (MVP)
1. ✅ Homepage (simplified)
2. ✅ Template Gallery (3 templates)
3. ✅ Pricing Page
4. ✅ Login/Register
5. ✅ Dashboard
6. ✅ Basic Website Editor
7. ✅ Wedding Website Renderer
8. ✅ Payment Integration
9. ✅ Terms & Privacy

### Phase 2
1. ✅ Advanced Editor (more customization)
2. ✅ Guest Management
3. ✅ Analytics
4. ✅ Help & FAQ
5. ✅ Contact Page
6. ✅ Account Settings
7. ✅ 5 more templates

### Phase 3
1. ✅ Blog
2. ✅ About Us
3. ✅ Advanced Features (custom domains)
4. ✅ Email notifications
5. ✅ Social sharing
6. ✅ More template variations

---

## Navigation Structure Example

### Main Website Header
```
Logo | Templates | Pricing | Features | Help | Blog | Login | Sign Up
```

### Dashboard Navigation
```
Logo | My Websites | Analytics | Subscription | Settings | Logout
```

### Wedding Website Header (Guest View)
```
[Couple Names] | Our Story | Event Details | RSVP | Gallery | Travel
```

---

## Comparison: Your Platform vs Slubly.pl

| Feature | Slubly.pl | Your Platform |
|---------|-----------|---------------|
| Templates | 5+ templates | Start with 3-5, expand to 10+ |
| Pricing | 250-400 PLN/year | ~$99-249/year (adjust for market) |
| RSVP System | ✅ Yes | ✅ Yes |
| Photo Gallery | ✅ Premium only | ✅ Standard+ |
| Custom Domains | ✅ Yes | ✅ Yes |
| Timeline/Story | ✅ Premium only | ✅ Standard+ |
| Mobile App | ❌ No | ❌ Future consideration |
| Multi-language | Polish only | English + future languages |

---

## Additional Features to Consider (Beyond Slubly)

### Differentiators You Could Add
1. **Live Streaming Integration**
   - Embed YouTube/Zoom for virtual attendance
   - Recorded ceremony viewing

2. **Gift Registry Integration**
   - Link to Amazon, Target, etc.
   - Cash fund options (honeymoon fund)

3. **Guest Communication**
   - Send mass emails/SMS to guests
   - Update notifications

4. **Seating Chart Tool**
   - Visual table arrangement
   - Guest assignment

5. **Wedding Day Timeline**
   - Detailed schedule for vendors
   - Timeline for guests

6. **Vendor Directory**
   - Recommended photographers, caterers, etc.
   - Affiliate program potential

7. **Photo Sharing by Guests**
   - Guests upload their photos from wedding
   - Shared gallery

8. **QR Code Generator**
   - Easy sharing via printed materials
   - RSVP via QR code

9. **Multi-Event Support**
   - Engagement party
   - Rehearsal dinner
   - Wedding ceremony
   - Reception

10. **Accessibility Features**
    - Screen reader optimization
    - High contrast mode
    - Language translation

---

## Tech Stack Recommendation Summary

**For a Slubly-like platform:**

- **Frontend:** Next.js + React + Tailwind CSS
- **Backend:** Next.js API Routes + Prisma ORM
- **Database:** PostgreSQL (Supabase)
- **Auth:** NextAuth.js or Clerk
- **Payment:** Stripe
- **Hosting:** Vercel
- **Storage:** AWS S3 or Cloudflare R2
- **Email:** Resend or SendGrid

**Estimated Development Time:**
- MVP (Phase 1): 2-3 months
- Full Platform (Phase 2): 4-6 months
- Advanced Features (Phase 3): 6-12 months

**Estimated Costs:**
- Development (if solo): Time investment
- Development (if hiring): $20k-50k for MVP
- Monthly Operating Costs: $50-200/month initially
- Marketing Budget: $500-2000/month to start

---

## Next Steps Checklist

- [ ] Validate market demand (surveys, interviews with engaged couples)
- [ ] Choose tech stack based on your skills
- [ ] Design 3 initial templates (Figma/Sketch)
- [ ] Set up development environment
- [ ] Build MVP (homepage, 3 templates, basic editor, payment)
- [ ] Beta test with 10-20 couples
- [ ] Iterate based on feedback
- [ ] Launch publicly
- [ ] Marketing & SEO
- [ ] Add more templates and features iteratively

---

## Quick Start Command

If you're ready to start building, here's a quick setup:

```bash
# Create Next.js project
npx create-next-app@latest wedding-generator \
  --typescript \
  --tailwind \
  --app \
  --src-dir

cd wedding-generator

# Install core dependencies
npm install @prisma/client prisma
npm install next-auth @auth/prisma-adapter
npm install stripe @stripe/stripe-js
npm install zod react-hook-form @hookform/resolvers
npm install lucide-react # for icons

# Install shadcn/ui
npx shadcn-ui@latest init

# Initialize Prisma
npx prisma init

# Create initial database schema (from plans)
# Edit prisma/schema.prisma with the schema from implementation-approaches.md

# Run migrations
npx prisma migrate dev --name init

# Start development
npm run dev
```

---

Good luck with your wedding website generator! 🎉💒
