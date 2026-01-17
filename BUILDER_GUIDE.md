# Wedding Website Builder - Quick Start Guide

## ✅ Implementation Complete!

All phases of the wedding website builder have been successfully implemented:

- ✅ **Phase 1:** Database (SQLite + Prisma)
- ✅ **Phase 2:** Template System (3 templates with modular sections)
- ✅ **Phase 3:** Form Components (7 UI components)
- ✅ **Phase 4:** Builder Page (5-step wizard with live preview)
- ✅ **Phase 5:** API & Deployment (Cloudflare Workers integration)

## 🚀 Getting Started

### 1. Start the Development Server

```bash
npm run dev
```

### 2. Access the Builder

Open your browser and navigate to:
```
http://localhost:3000/builder
```

### 3. Build a Wedding Website

Follow the 5-step wizard:

**Step 1: Choose Template**
- Select from 3 beautiful templates:
  - Classic Elegance (serif, gold accents)
  - Modern Minimal (sans-serif, black/white)
  - Rustic Charm (warm earth tones)

**Step 2: Basic Information**
- Enter bride's name
- Enter groom's name
- Select wedding date

**Step 3: Content Details**
- Toggle sections on/off (story, events, RSVP, etc.)
- Add your love story
- Enter ceremony and reception details

**Step 4: Theme Customization**
- Choose from 4 color presets OR
- Create custom colors (primary, secondary, accent)

**Step 5: Review & Publish**
- Review all your information
- Choose a subdomain (e.g., `john-mary`)
- Click "Publish Website"

### 4. View Your Website

After publishing, your website will be:
- Saved to the SQLite database
- Available at: `http://localhost:3000/wedding/[your-subdomain]`
- Ready for Cloudflare Workers deployment (when configured)

## 📂 Key Files & Directories

```
src/
├── app/
│   ├── (public)/builder/          # Builder wizard pages
│   │   ├── page.tsx                # Main builder entry
│   │   ├── success/page.tsx        # Success page
│   │   └── layout.tsx              # Full-screen layout
│   ├── (wedding)/wedding/[subdomain]/  # Wedding site renderer
│   └── api/
│       ├── websites/               # Website CRUD API
│       ├── rsvp/                   # RSVP submission API
│       └── deploy/                 # Cloudflare deployment API
├── components/
│   ├── ui/                         # Reusable UI components
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── color-picker.tsx
│   │   └── ...
│   └── builder/                    # Builder-specific components
│       ├── wedding-builder.tsx     # Main orchestrator
│       ├── step-indicator.tsx      # Progress indicator
│       ├── preview-frame.tsx       # Live preview
│       └── steps/                  # 5 step components
└── templates/
    ├── base/sections/              # Shared section components
    ├── classic-elegance/           # Template 1
    ├── modern-minimal/             # Template 2
    ├── rustic-charm/               # Template 3
    └── registry.ts                 # Template registry
```

## 🗄️ Database

The SQLite database is located at `dev.db` and includes:

**Tables:**
- `Website` - Main website records
- `WebsiteContent` - All website content and customization
- `Photo` - Gallery photos
- `RSVP` - Guest RSVP submissions

**View Database:**
```bash
npx prisma studio
```

## 🎨 Available Templates

### 1. Classic Elegance
- **Style:** Timeless, sophisticated
- **Colors:** Brown (#8B7355), Beige (#F5F5DC), Gold (#D4AF37)
- **Fonts:** Playfair Display, Lora (serif)
- **Best For:** Traditional weddings

### 2. Modern Minimal
- **Style:** Clean, contemporary
- **Colors:** Black (#000000), White (#FFFFFF), Gray (#808080)
- **Fonts:** Montserrat, Inter (sans-serif)
- **Best For:** Modern, minimalist weddings

### 3. Rustic Charm
- **Style:** Warm, natural
- **Colors:** Brown (#8B4513), Cornsilk (#FFF8DC), Peru (#CD853F)
- **Fonts:** Merriweather, Open Sans
- **Best For:** Rustic, outdoor weddings

## 🔧 Cloudflare Workers Setup (Optional)

To enable actual Cloudflare deployment:

### 1. Install Wrangler CLI
```bash
npm install -g wrangler
```

### 2. Login to Cloudflare
```bash
wrangler login
```

### 3. Create KV Namespace
```bash
cd cloudflare-worker
wrangler kv:namespace create "WEDDING_SITES"
```

### 4. Update Configuration
Copy the namespace ID from the output and update:
- `cloudflare-worker/wrangler.toml` (replace `YOUR_KV_NAMESPACE_ID`)
- `.env.local` (add `CLOUDFLARE_KV_NAMESPACE_ID`)

### 5. Deploy Worker
```bash
wrangler deploy
```

### 6. Get Cloudflare Credentials
- **API Token:** Cloudflare Dashboard → My Profile → API Tokens → Create Token
- **Account ID:** Cloudflare Dashboard → Workers & Pages → Overview (right sidebar)

Add to `.env.local`:
```env
CLOUDFLARE_API_TOKEN=your_token
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_KV_NAMESPACE_ID=your_namespace_id
```

## 🎯 Features

✅ **Builder Features:**
- 5-step wizard with progress indicator
- Live preview (updates in real-time)
- Template selection (3 templates)
- Color customization (presets + custom)
- Section toggling (show/hide sections)
- Form validation
- Responsive design

✅ **Template Features:**
- Modular section components
- Dynamic theming (colors, fonts)
- Conditional rendering (section toggles)
- Live countdown timer
- Functional RSVP forms (with CORS)
- Photo gallery support
- Mobile responsive

✅ **Backend Features:**
- SQLite database (Prisma ORM)
- Full API (websites, RSVP, deployment)
- Input validation (Zod schemas)
- Error handling
- CORS support for deployed sites

## 📝 Testing the Builder

### Test the Complete Flow:

1. **Navigate to Builder:**
   ```
   http://localhost:3000/builder
   ```

2. **Create a Website:**
   - Choose "Classic Elegance" template
   - Enter names: "Jane" and "John"
   - Select a future date
   - Toggle all sections ON
   - Add a love story
   - Enter venue details
   - Pick colors (or use preset)
   - Enter subdomain: "jane-john"
   - Click "Publish Website"

3. **View Published Website:**
   ```
   http://localhost:3000/wedding/jane-john
   ```

4. **Test RSVP Form:**
   - Scroll to RSVP section
   - Fill out the form
   - Submit RSVP
   - Check database: `npx prisma studio`

## 🐛 Troubleshooting

**Issue:** Builder page doesn't load
- **Solution:** Make sure dev server is running (`npm run dev`)

**Issue:** Preview not updating
- **Solution:** Check browser console for errors

**Issue:** Can't publish website
- **Solution:** Check that subdomain is unique (not already taken)

**Issue:** Deployed site returns 404
- **Solution:** Check that website is marked as `published` in database

**Issue:** RSVP form doesn't work
- **Solution:** Check CORS headers in `/api/rsvp/route.ts`

## 🎉 What's Next?

The builder is fully functional! You can now:

1. **Create multiple websites** - Test different templates and designs
2. **Collect RSVPs** - Functional RSVP forms save to database
3. **Add Cloudflare deployment** - Set up Cloudflare Workers for live hosting
4. **Add authentication** - Protect the builder (future enhancement)
5. **Add photo uploads** - Enable gallery features (future enhancement)
6. **Add custom domains** - Let users use their own domains (future enhancement)

## 📚 Additional Resources

- **Plan File:** `_1spec/builder-implementation-plan.md`
- **Architecture:** `_1spec/ARCHITECTURE.md`
- **Template System:** `_1spec/template-system-architecture.md`
- **Prisma Docs:** https://www.prisma.io/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Cloudflare Workers:** https://developers.cloudflare.com/workers
