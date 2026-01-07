# Wedding Website Generator

A modern, full-stack wedding website generator built with Next.js 14+, allowing couples to create beautiful, personalized wedding websites in minutes.

## 🚀 Features

- **Beautiful Templates** - Multiple professionally designed templates
- **Easy Customization** - Customize colors, fonts, and content
- **RSVP Management** - Built-in RSVP system with guest tracking
- **Photo Galleries** - Upload and showcase wedding photos
- **Mobile Responsive** - Perfect on all devices
- **Custom Domains** - Use your own domain (coming soon)
- **Real-time Preview** - See changes instantly
- **Subdomain Routing** - Each couple gets their own subdomain

## 📁 Project Structure

```
wedding-website-generator/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (public)/            # Public pages (marketing site)
│   │   │   ├── templates/       # Template gallery
│   │   │   ├── pricing/         # Pricing page
│   │   │   └── layout.tsx       # Public layout with header/footer
│   │   ├── (dashboard)/         # Protected dashboard routes
│   │   │   └── dashboard/       # User dashboard
│   │   │       ├── page.tsx     # Dashboard home (websites list)
│   │   │       └── layout.tsx   # Dashboard layout
│   │   ├── (wedding)/           # Wedding website routes
│   │   │   └── wedding/[subdomain]/  # Dynamic wedding sites
│   │   ├── api/                 # API routes
│   │   │   ├── websites/        # Website CRUD operations
│   │   │   └── rsvp/           # RSVP submissions
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Homepage
│   ├── components/              # React components
│   │   ├── ui/                  # UI components (buttons, inputs)
│   │   ├── layouts/             # Layout components (header, footer)
│   │   └── features/            # Feature-specific components
│   ├── lib/                     # Utilities and helpers
│   │   ├── utils/              # Utility functions
│   │   └── api/                # API client functions
│   ├── types/                   # TypeScript type definitions
│   │   └── index.ts            # Main types
│   └── styles/                  # Global styles
│       └── globals.css         # Global CSS with Tailwind
├── _1spec/                      # Project planning documents
├── public/                      # Static assets (images, fonts)
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## 🏗️ Architecture

### Route Groups

This project uses Next.js **Route Groups** for clean organization:

- `(public)` - Marketing pages with header/footer
- `(dashboard)` - Protected user dashboard
- `(wedding)` - Generated wedding websites

### Subdomain Routing

The `middleware.ts` handles subdomain routing:

```
john-mary.yoursite.com → /wedding/john-mary
```

Each couple's wedding website is served from their unique subdomain.

### API Structure

RESTful API routes in `/app/api`:

- `GET /api/websites` - List user's websites
- `POST /api/websites` - Create new website
- `GET /api/websites/:id` - Get single website
- `PATCH /api/websites/:id` - Update website
- `DELETE /api/websites/:id` - Delete website
- `POST /api/rsvp` - Submit RSVP

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (Inter, Playfair Display)
- **Deployment**: Vercel (recommended)

### Future Additions

- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js or Clerk
- **Payment**: Stripe
- **Storage**: AWS S3 or Cloudflare R2
- **Email**: Resend or SendGrid

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/wedding-website-generator.git
cd wedding-website-generator
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run type-check # TypeScript type checking
```

## 📋 Next Steps

### Phase 1: MVP (Current)
- [x] Project setup
- [x] Basic routing structure
- [x] Homepage
- [x] Templates page
- [x] Pricing page
- [x] Dashboard layout
- [x] Wedding website renderer
- [x] API route structure
- [ ] Database integration (Prisma + PostgreSQL)
- [ ] Authentication (NextAuth.js)
- [ ] Payment integration (Stripe)

### Phase 2: Core Features
- [ ] Website editor/builder
- [ ] Photo upload system
- [ ] RSVP form functionality
- [ ] Guest management
- [ ] Email notifications
- [ ] Template customization

### Phase 3: Advanced Features
- [ ] Custom domains
- [ ] Analytics dashboard
- [ ] Multiple template options
- [ ] Timeline/story builder
- [ ] Advanced theming

## 🎨 Adding a New Template

1. Create template file: `src/templates/my-template/index.tsx`
2. Define template config: `src/templates/my-template/config.ts`
3. Register in `src/templates/registry.ts`
4. Add thumbnail to public assets
5. Update templates page

## 🗄️ Database Setup (TODO)

When ready to add the database:

1. Install Prisma:
```bash
npm install @prisma/client prisma
npx prisma init
```

2. Use the schema from `_1spec/implementation-approaches.md`

3. Run migrations:
```bash
npx prisma migrate dev
```

## 🔐 Environment Variables

Required when you add features:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_MAIN_DOMAIN=localhost:3000

# Database (Prisma)
DATABASE_URL=postgresql://user:password@localhost:5432/wedding_db

# Auth (NextAuth)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Storage (S3)
AWS_S3_BUCKET=your-bucket
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_REGION=us-east-1
```

## 📝 API Documentation

### Create Website

```typescript
POST /api/websites
Content-Type: application/json

{
  "templateId": "classic-elegance",
  "brideName": "Mary",
  "groomName": "John",
  "weddingDate": "2024-08-15"
}
```

### Submit RSVP

```typescript
POST /api/rsvp
Content-Type: application/json

{
  "websiteId": "website-id",
  "guestName": "Jane Doe",
  "email": "jane@example.com",
  "attending": true,
  "plusOne": false
}
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy!

Vercel automatically handles:
- Subdomain routing
- SSL certificates
- Serverless functions
- Edge caching

### Manual Deployment

```bash
npm run build
npm run start
```

## 📚 Documentation

See the `_1spec/` folder for detailed planning documents:

- `wedding-website-generator-plan.md` - Overall project plan
- `implementation-approaches.md` - Technical implementation details
- `template-system-architecture.md` - Template system design
- `slubly-reference-structure.md` - Reference structure

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For questions or issues:
- Open an issue on GitHub
- Check the documentation in `_1spec/`
- Review the planning documents

## 🎯 Roadmap

- Q1 2024: MVP launch with basic features
- Q2 2024: Payment integration and custom domains
- Q3 2024: Advanced editor and more templates
- Q4 2024: Mobile app and additional features

---

Built with ❤️ using Next.js and TypeScript
