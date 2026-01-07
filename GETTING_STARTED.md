# Getting Started Guide

## ✅ What's Been Created

Your frontend architecture is ready! Here's what we've built:

### 🎯 Project Structure
```
✓ Next.js 14+ with App Router
✓ TypeScript configured
✓ Tailwind CSS set up
✓ Complete folder structure
✓ Route groups (public, dashboard, wedding)
✓ API routes structure
✓ Middleware for subdomain routing
✓ Type definitions
✓ Base UI components
```

### 📄 Pages Created

**Public Pages:**
- ✅ Homepage (`/`)
- ✅ Templates Gallery (`/templates`)
- ✅ Pricing (`/pricing`)

**Dashboard:**
- ✅ Dashboard home (`/dashboard`)
- ✅ Layout with navigation

**Wedding Sites:**
- ✅ Dynamic wedding website (`/wedding/[subdomain]`)

**API Endpoints:**
- ✅ `/api/websites` - CRUD for websites
- ✅ `/api/rsvp` - RSVP submissions

## 🚀 Quick Start

### 1. The app is ready to run!

```bash
npm run dev
```

Then visit: http://localhost:3000

### 2. Explore the Pages

- **Homepage**: http://localhost:3000
- **Templates**: http://localhost:3000/templates
- **Pricing**: http://localhost:3000/pricing
- **Dashboard**: http://localhost:3000/dashboard

### 3. Test the Wedding Site

To test the subdomain routing locally, you need to:

**Option A: Edit /etc/hosts (Mac/Linux)**
```bash
sudo nano /etc/hosts
```

Add this line:
```
127.0.0.1 john-mary.localhost
```

Then visit: http://john-mary.localhost:3000

**Option B: Just test the route directly**
Visit: http://localhost:3000/wedding/john-mary

## 📁 Project Structure Overview

```
src/
├── app/
│   ├── (public)/          👉 Marketing pages (header + footer)
│   │   ├── templates/     👉 /templates
│   │   └── pricing/       👉 /pricing
│   ├── (dashboard)/       👉 Protected dashboard
│   │   └── dashboard/     👉 /dashboard
│   ├── (wedding)/         👉 Generated wedding sites
│   │   └── wedding/[subdomain]/
│   ├── api/               👉 Backend API routes
│   │   ├── websites/      👉 /api/websites
│   │   └── rsvp/          👉 /api/rsvp
│   ├── layout.tsx         👉 Root layout
│   └── page.tsx           👉 Homepage
├── components/
│   ├── ui/                👉 Reusable UI (Button, etc.)
│   └── layouts/           👉 Header, Footer
├── types/                 👉 TypeScript types
├── lib/                   👉 Utilities
└── styles/                👉 Global CSS
```

## 🎨 Key Files to Know

### 1. Homepage
**File:** `src/app/page.tsx`

This is your main landing page. Edit this to customize your marketing message.

### 2. Templates Page
**File:** `src/app/(public)/templates/page.tsx`

Shows all available wedding templates. Currently has 3 mock templates.

### 3. Dashboard
**File:** `src/app/(dashboard)/dashboard/page.tsx`

Where users manage their wedding websites. Currently shows mock data.

### 4. Wedding Website Renderer
**File:** `src/app/(wedding)/wedding/[subdomain]/page.tsx`

Dynamically renders each couple's wedding site based on subdomain.

### 5. Type Definitions
**File:** `src/types/index.ts`

All TypeScript interfaces shared across the app.

### 6. API Routes
**Files:** `src/app/api/websites/route.ts` and `[id]/route.ts`

Backend endpoints for creating/updating websites.

## 🔧 Next Steps

### Phase 1: Add Database (Recommended First)

1. **Install Prisma:**
```bash
npm install @prisma/client prisma
npx prisma init
```

2. **Copy the schema from:** `_1spec/implementation-approaches.md`

3. **Create and run migration:**
```bash
npx prisma migrate dev --name init
```

4. **Generate Prisma Client:**
```bash
npx prisma generate
```

5. **Update API routes** to use Prisma instead of mock data

### Phase 2: Add Authentication

1. **Install NextAuth:**
```bash
npm install next-auth @auth/prisma-adapter
```

2. **Create auth route:**
```bash
mkdir -p src/app/api/auth/[...nextauth]
```

3. **Add login/register pages**

4. **Protect dashboard routes**

### Phase 3: Payment Integration

1. **Install Stripe:**
```bash
npm install stripe @stripe/stripe-js
```

2. **Create checkout API route**

3. **Add webhook handler**

4. **Link to subscription model**

## 📝 Making Changes

### Add a New Page

1. Create file in appropriate route group:
```bash
src/app/(public)/about/page.tsx
```

2. Export a default component:
```tsx
export default function AboutPage() {
  return <div>About Us</div>
}
```

3. It's automatically available at `/about`

### Add a New API Endpoint

1. Create route file:
```bash
src/app/api/your-endpoint/route.ts
```

2. Export HTTP methods:
```tsx
export async function GET(request: Request) {
  return NextResponse.json({ data: 'hello' })
}
```

### Add a New Component

1. Create in appropriate folder:
```bash
src/components/ui/card.tsx
```

2. Use in pages:
```tsx
import { Card } from '@/components/ui/card'
```

### Customize Styling

**Global styles:** `src/styles/globals.css`
**Tailwind config:** `tailwind.config.ts`

## 🐛 Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### TypeScript errors
```bash
npm run type-check
```

### Build errors
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## 📚 Important Documentation

1. **README.md** - Project overview and features
2. **ARCHITECTURE.md** - Detailed technical architecture
3. **_1spec/** - All planning documents
   - `wedding-website-generator-plan.md` - Full project plan
   - `implementation-approaches.md` - Technical approaches
   - `template-system-architecture.md` - Template design
   - `slubly-reference-structure.md` - Reference structure

## 🎯 Development Checklist

### Immediate Next Steps
- [ ] Review all created pages
- [ ] Customize homepage content
- [ ] Update template mock data
- [ ] Test all routes locally
- [ ] Read ARCHITECTURE.md

### Before Going Live
- [ ] Add database (Prisma)
- [ ] Implement authentication
- [ ] Add payment processing
- [ ] Create real templates
- [ ] Add image upload functionality
- [ ] Implement RSVP form submission
- [ ] Set up email notifications
- [ ] Add error handling
- [ ] Write tests
- [ ] Deploy to Vercel

## 🚢 Deployment

When ready to deploy:

1. **Push to GitHub:**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel:**
- Go to https://vercel.com
- Import your GitHub repo
- Configure environment variables
- Deploy!

3. **Configure custom domain**
- Add your domain in Vercel
- Update DNS settings
- Configure subdomain wildcard (`*.yourdomain.com`)

## 💡 Tips

### Development
- Use `npm run dev` for hot reload
- Use `npm run type-check` to catch TypeScript errors
- Check browser console for errors

### Code Organization
- Keep components small and focused
- Extract reusable logic to `/lib`
- Use TypeScript types from `/types`
- Follow the existing folder structure

### Best Practices
- Use Server Components by default
- Only use `'use client'` when needed (forms, interactivity)
- Optimize images with `next/image`
- Keep API routes thin (business logic in `/lib`)

## 🆘 Getting Help

1. **Check documentation** in `_1spec/` folder
2. **Read Next.js docs**: https://nextjs.org/docs
3. **Tailwind docs**: https://tailwindcss.com/docs
4. **TypeScript handbook**: https://www.typescriptlang.org/docs

## 🎉 You're Ready!

Your frontend architecture is complete and ready for development. Start by:

1. ✅ Running `npm run dev`
2. ✅ Exploring the created pages
3. ✅ Reading the ARCHITECTURE.md
4. ✅ Customizing the homepage
5. ✅ Adding the database (when ready)

Happy coding! 🚀
