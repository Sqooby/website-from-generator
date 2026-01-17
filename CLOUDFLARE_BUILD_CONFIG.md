# ⚙️ Build Configuration dla Cloudflare Pages

## 🎯 Główna Aplikacja Next.js na Cloudflare Pages

Konfiguracja dla całego projektu (marketing site + dashboard + builder + API).

---

## 📋 Build Settings w Cloudflare Dashboard

**Lokalizacja:** Cloudflare Dashboard → Workers & Pages → Twój projekt → Settings → Builds & deployments

### Build Configuration:

| Setting | Wartość | Opis |
|---------|---------|------|
| **Framework preset** | `None` (Custom) | Nie używamy predefiniowanego framework preset |
| **Build command** | `npm run pages:build` | Komenda która buduje dla Cloudflare |
| **Build output directory** | `.vercel/output/static` | Folder z output po build |
| **Root directory** | `/` (pusty) | Root projektu (domyślnie `/`) |
| **Node version** | `18` lub `20` | Wersja Node.js (zalecane: 20) |

### Kompletna konfiguracja Build:

```
Framework preset: None (Custom)
Build command: npm run pages:build
Build output directory: .vercel/output/static
Root directory: / (pusty - root projektu)
Node version: 20 (lub 18)
```

---

## 🔑 Environment Variables (WYMAGANE)

### Production Environment Variables:

```env
# === Database (WYMAGANE - PostgreSQL) ===
DATABASE_URL=postgresql://user:password@host/db?sslmode=require

# === App URLs (WYMAGANE) ===
NEXT_PUBLIC_APP_URL=https://website-from-generator.pages.dev
NEXT_PUBLIC_MAIN_DOMAIN=yourdomain.com

# === Cloudflare API (dla auto-rebuild) ===
CLOUDFLARE_ACCOUNT_ID=d7373455e5f6963f18623c356629823c
CLOUDFLARE_API_TOKEN=EZans2XbNk3cN0dFLYiDdT83TSH6u3o5bxdq1qQt
CLOUDFLARE_PAGES_PROJECT_NAME=website-from-generator
CLOUDFLARE_AUTO_REBUILD=true

# === Optional (gdy dodasz później) ===
# NEXTAUTH_URL=https://yourdomain.com
# NEXTAUTH_SECRET=your-secret-key
# STRIPE_SECRET_KEY=sk_live_...
# etc.
```

---

## 📝 Krok po Kroku - Konfiguracja w Cloudflare Dashboard

### Krok 1: Stwórz projekt Cloudflare Pages

1. Przejdź do [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. **Workers & Pages** → **Create application**
3. **Pages** → **Connect to Git**
4. Wybierz swoje GitHub repository
5. Wybierz branch: `main` (lub `production`)

### Krok 2: Konfiguruj Build Settings

1. W sekcji **"Builds & deployments"**:
   - **Framework preset:** `None` (Custom)
   - **Build command:** `npm run pages:build`
   - **Build output directory:** `.vercel/output/static`
   - **Root directory:** `/` (pusty - zostaw domyślne)
   - **Node version:** `20` (lub 18)

2. Kliknij **"Save"**

### Krok 3: Dodaj Environment Variables

1. Przejdź do **Settings** → **Environment Variables**
2. Kliknij **"Add variable"** (dla Production)

3. Dodaj każdą zmienną:

#### Wymagane zmienne:

| Name | Value | Przykład |
|------|-------|----------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host/db?sslmode=require` |
| `NEXT_PUBLIC_APP_URL` | URL Twojego Cloudflare Pages | `https://website-from-generator.pages.dev` |
| `NEXT_PUBLIC_MAIN_DOMAIN` | Główna domena | `yourdomain.com` |

#### Cloudflare API (dla auto-rebuild):

| Name | Value |
|------|-------|
| `CLOUDFLARE_ACCOUNT_ID` | `d7373455e5f6963f18623c356629823c` |
| `CLOUDFLARE_API_TOKEN` | `EZans2XbNk3cN0dFLYiDdT83TSH6u3o5bxdq1qQt` |
| `CLOUDFLARE_PAGES_PROJECT_NAME` | `website-from-generator` |
| `CLOUDFLARE_AUTO_REBUILD` | `true` |

### Krok 4: Szybkie dodanie (Bulk Edit)

Alternatywnie możesz użyć **"Bulk edit"**:

1. Kliknij **"Bulk edit"**
2. Wklej wszystkie zmienne (format: `KEY=value`):

```env
DATABASE_URL=postgresql://user:password@host/db?sslmode=require
NEXT_PUBLIC_APP_URL=https://website-from-generator.pages.dev
NEXT_PUBLIC_MAIN_DOMAIN=yourdomain.com
CLOUDFLARE_ACCOUNT_ID=d7373455e5f6963f18623c356629823c
CLOUDFLARE_API_TOKEN=EZans2XbNk3cN0dFLYiDdT83TSH6u3o5bxdq1qQt
CLOUDFLARE_PAGES_PROJECT_NAME=website-from-generator
CLOUDFLARE_AUTO_REBUILD=true
```

3. Zastąp wartości swoimi:
   - `DATABASE_URL` → Twój PostgreSQL URL
   - `NEXT_PUBLIC_APP_URL` → URL Twojego Cloudflare Pages projektu
   - `NEXT_PUBLIC_MAIN_DOMAIN` → Twoja główna domena

4. Kliknij **"Save"**

---

## ⚠️ Ważne: Konflikt Next.js 16 z @cloudflare/next-on-pages

Jeśli widzisz błąd `ERESOLVE could not resolve` podczas build:

**Rozwiązanie:** Dodaj `.npmrc` z `legacy-peer-deps=true` do root projektu.

Plik `.npmrc` został już utworzony i Cloudflare Pages automatycznie go użyje podczas instalacji zależności.

---

## 🔍 Sprawdzenie Build Process

Po skonfigurowaniu, sprawdź czy build działa:

1. **Trigger manual build:**
   - W Cloudflare Dashboard → Deployments
   - Kliknij **"Retry deployment"** lub push do GitHub

2. **Sprawdź build logs:**
   - Cloudflare Dashboard → Deployments → [deployment] → Build logs
   - Powinieneś zobaczyć:
     ```
     npm run pages:build
     @cloudflare/next-on-pages: Building for Cloudflare Pages...
     ✓ Build completed successfully
     ```

3. **Sprawdź czy strona działa:**
   - Odwiedź URL z Cloudflare Pages (np. `https://website-from-generator.pages.dev`)
   - Powinna się załadować główna strona (homepage)

---

## ⚠️ Ważne Uwagi

### 1. Database URL

**SQLite NIE działa na Cloudflare Pages!**

Musisz użyć **PostgreSQL**:
- Neon.tech (free tier, serverless)
- Supabase (free tier)
- Railway (free tier)
- Lub inny PostgreSQL hosting

### 2. Prisma Migrations

Przed pierwszym deploymentem uruchom migracje:

```bash
# Lokalnie z production DATABASE_URL
DATABASE_URL="postgresql://..." npx prisma migrate deploy

# Albo w Cloudflare Dashboard → Settings → Environment Variables
# Dodaj DATABASE_URL i uruchom build (migracje mogą być w build command)
```

### 3. Build Command

**Ważne:** Użyj `npm run pages:build`, nie `npm run build`!

- ❌ `npm run build` → Build dla Next.js standalone (nie dla Cloudflare)
- ✅ `npm run pages:build` → Build dla Cloudflare Pages (używa `@cloudflare/next-on-pages`)

---

## 🎯 Checklist Deployment

Przed pierwszym deploymentem sprawdź:

- [ ] Projekt jest połączony z GitHub
- [ ] Build command: `npm run pages:build`
- [ ] Build output: `.vercel/output/static`
- [ ] Root directory: `/` (pusty)
- [ ] Node version: `20` lub `18`
- [ ] `DATABASE_URL` (PostgreSQL!) dodany
- [ ] `NEXT_PUBLIC_APP_URL` dodany
- [ ] `NEXT_PUBLIC_MAIN_DOMAIN` dodany
- [ ] Cloudflare API credentials dodane
- [ ] Prisma migrations uruchomione

---

## 🚀 Po Deployment

Po pierwszym deploymentzie:

1. **Sprawdź główną stronę:**
   - Odwiedź URL z Cloudflare Pages
   - Powinna się załadować homepage

2. **Sprawdź marketing pages:**
   - `/templates` - powinna się załadować
   - `/pricing` - powinna się załadować
   - `/builder` - powinna się załadować

3. **Sprawdź dashboard:**
   - `/dashboard` - powinna się załadować

4. **Sprawdź API routes:**
   - `/api/websites` - powinno działać (GET request)

5. **Sprawdź dynamic routing:**
   - `subdomain.yourdomain.com` - powinno przekierować do `/wedding/[subdomain]`

---

## 📊 Monitoring

Po deploymentzie monitoruj:

1. **Build logs:** Cloudflare Dashboard → Deployments → [deployment] → Build logs
2. **Function logs:** Cloudflare Dashboard → Logs (dla Edge Functions)
3. **Analytics:** Cloudflare Dashboard → Analytics (dla ruchu)
4. **Errors:** Cloudflare Dashboard → Logs → Errors

---

## ✅ Gotowe!

Po konfiguracji:
1. ✅ Push do GitHub
2. ✅ Cloudflare automatycznie zbuduje
3. ✅ Główna strona będzie dostępna
4. ✅ Wszystkie routes będą działać
5. ✅ Dynamic routing dla subdomainów

**Wszystko automatycznie!** 🎉

