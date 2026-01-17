# 🚀 Deployment na Cloudflare Pages

## Krok 1: Instalacja zależności

⚠️ **WAŻNE:** `@cloudflare/next-on-pages` obecnie wspiera Next.js 14-15, a Ty masz Next.js 16.

### Opcja A: Instalacja z `--legacy-peer-deps` (zalecane)

```bash
npm install -D @cloudflare/next-on-pages wrangler --legacy-peer-deps
```

To powinno zadziałać, mimo konfliktu peer dependencies.

### Opcja B: Sprawdź najnowszą wersję

Sprawdź czy pojawiła się nowsza wersja wspierająca Next.js 16:

```bash
npm view @cloudflare/next-on-pages versions --json
```

Jeśli jest nowsza wersja, zainstaluj ją:

```bash
npm install -D @cloudflare/next-on-pages@latest wrangler --legacy-peer-deps
```

### Opcja C: Alternatywa - OpenNext (jeśli `next-on-pages` nie działa)

Jeśli `@cloudflare/next-on-pages` ma problemy z Next.js 16, możesz użyć `@opennextjs/cloudflare`:

```bash
npm install @opennextjs/cloudflare@latest --save-dev
```

Zobacz więcej w sekcji "Alternatywne rozwiązania" poniżej.

## Krok 2: Konfiguracja Next.js

Konfiguracja w `next.config.mjs` jest już gotowa. Jeśli używasz `better-sqlite3` lokalnie, upewnij się, że w production używasz PostgreSQL.

## Krok 3: Build i lokalne testy

```bash
# Zbuduj projekt dla Cloudflare
npm run pages:build

# Uruchom lokalnie z Wrangler (symuluje Cloudflare Pages)
npm run pages:dev
```

## Krok 4: Konfiguracja w Cloudflare Dashboard

### 4.1 Stwórz projekt Cloudflare Pages

1. Przejdź do [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Wybierz **Pages** → **Create a project**
3. Połącz z GitHub repository
4. Wybierz branch (`main` lub `production`)

### 4.2 Build Settings

**Framework preset:** None (custom)
**Build command:** `npm run pages:build`
**Build output directory:** `.vercel/output/static`
**Root directory:** `/` (root projektu)

### 4.3 Environment Variables

W Cloudflare Dashboard → Pages → Settings → Environment variables dodaj:

#### Production:
```env
# Database
DATABASE_URL=postgresql://user:pass@host/db

# App URLs
NEXT_PUBLIC_APP_URL=https://yourdomain.pages.dev
NEXT_PUBLIC_MAIN_DOMAIN=yourdomain.com

# Cloudflare Configuration
CLOUDFLARE_ACCOUNT_ID=d7373455e5f6963f18623c356629823c
CLOUDFLARE_API_TOKEN=EZans2XbNk3cN0dFLYiDdT83TSH6u3o5bxdq1qQt
CLOUDFLARE_PAGES_PROJECT_NAME=website-from-generator

# Optional: Auto-rebuild after publishing websites
CLOUDFLARE_AUTO_REBUILD=true

# Cloudflare KV (opcjonalne - dla static HTML storage)
CLOUDFLARE_KV_NAMESPACE_ID=your-kv-namespace-id

# Other variables...
# STRIPE_SECRET_KEY=...
# NEXTAUTH_SECRET=...
# etc.
```

#### Preview (dla preview deployments):
```env
# Te same zmienne ale z dev/test wartościami
DATABASE_URL=postgresql://user:pass@dev-host/db
NEXT_PUBLIC_APP_URL=https://preview-branch.pages.dev
```

## Krok 5: Deployment

### Opcja A: Automatyczny (przez GitHub)

1. Push do GitHub
2. Cloudflare automatycznie zbuduje i wdroży
3. Każdy PR dostanie preview URL

### Opcja B: Manual (przez Wrangler CLI)

```bash
# Login do Cloudflare
npx wrangler login

# Deploy
npm run pages:deploy

# Lub bezpośrednio:
npx wrangler pages deploy .vercel/output/static --project-name=website-from-generator
```

## Krok 6: Custom Domain (opcjonalnie)

1. W Cloudflare Dashboard → Pages → Custom domains
2. Dodaj domenę: `yourdomain.com`
3. Skonfiguruj DNS:
   - CNAME: `@` → `your-project.pages.dev`
   - CNAME: `www` → `your-project.pages.dev`
   - Lub użyj Cloudflare's DNS (automatycznie)

## Krok 7: Subdomain Routing

Cloudflare Pages automatycznie obsługuje subdomain routing przez middleware Next.js.

Dla każdego subdomain:
1. W Cloudflare DNS dodaj:
   - CNAME: `*` (wildcard) → `your-project.pages.dev`
2. Middleware Next.js automatycznie przekieruje:
   - `john-mary.yourdomain.com` → `/wedding/john-mary`

## ⚠️ Ważne uwagi

### Database Connection

**SQLite (`better-sqlite3`) NIE działa na Cloudflare Pages!**

Musisz użyć **PostgreSQL** (Neon, Supabase, Railway, etc.):

```env
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
```

### Prisma Migrations

Przed pierwszym deploymentem:

```bash
# Uruchom migracje na produkcji
DATABASE_URL="your-production-db-url" npx prisma migrate deploy

# Albo dodaj do build command:
# "build": "npx prisma migrate deploy && npx @cloudflare/next-on-pages"
```

### Environment Variables

- **NIE** commituj `.env` do repo
- Wszystkie secrets ustaw w Cloudflare Dashboard
- Użyj różnych wartości dla Production vs Preview

### Build Output

`@cloudflare/next-on-pages` tworzy output w `.vercel/output/static`
- Ten folder jest generowany podczas builda
- Dodaj do `.gitignore`: `.vercel/`

## 🔄 Alternatywne rozwiązania

### Jeśli `@cloudflare/next-on-pages` nie działa z Next.js 16

Możesz użyć **OpenNext for Cloudflare**, który lepiej wspiera nowsze wersje Next.js:

```bash
npm install @opennextjs/cloudflare@latest --save-dev
npm install wrangler@latest --save-dev
```

Zaktualizuj `package.json`:

```json
{
  "scripts": {
    "opennext:build": "opennextjs-cloudflare build",
    "opennext:deploy": "opennextjs-cloudflare deploy",
    "opennext:preview": "opennextjs-cloudflare preview"
  }
}
```

Więcej: https://opennext.js.org/cloudflare/get-started

## 🔧 Troubleshooting

### Błąd: "peer next@">=14.3.0 && <=15.5.2" from @cloudflare/next-on-pages"

**Rozwiązanie:** 
- Użyj `--legacy-peer-deps`: `npm install -D @cloudflare/next-on-pages wrangler --legacy-peer-deps`
- Albo przełącz się na `@opennextjs/cloudflare` (wspiera Next.js 16)

### Błąd: "Cannot find module 'better-sqlite3'"

**Rozwiązanie:** Użyj PostgreSQL zamiast SQLite w production.

### Błąd: "DATABASE_URL is undefined"

**Rozwiązanie:** Sprawdź czy environment variables są ustawione w Cloudflare Dashboard → Pages → Settings → Environment variables.

### Błąd: "Build output not found"

**Rozwiązanie:** 
1. Sprawdź czy `npm run pages:build` zakończył się sukcesem
2. Sprawdź czy `Build output directory` w Cloudflare = `.vercel/output/static`

### Subdomain routing nie działa

**Rozwiązanie:**
1. Dodaj wildcard CNAME w DNS: `*` → `your-project.pages.dev`
2. Sprawdź `middleware.ts` - powinien działać automatycznie
3. W Cloudflare → Pages → Custom domains, dodaj główną domenę

## 📊 Monitoring

Po deploymentzie sprawdź:

1. **Build logs:** Cloudflare Dashboard → Pages → Deployments → [deployment] → Build logs
2. **Function logs:** Cloudflare Dashboard → Pages → Functions → Logs
3. **Analytics:** Cloudflare Dashboard → Pages → Analytics

## 🎯 Next Steps

1. ✅ Setup PostgreSQL (Neon/Supabase)
2. ✅ Migrate from SQLite to PostgreSQL
3. ✅ Configure Cloudflare R2 for photo storage
4. ✅ Setup custom domain
5. ✅ Configure CDN caching rules

## 📚 Przydatne linki

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [@cloudflare/next-on-pages](https://github.com/cloudflare/next-on-pages)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

