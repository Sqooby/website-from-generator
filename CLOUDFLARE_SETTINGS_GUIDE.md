# ⚙️ Kompletna Konfiguracja Cloudflare Pages Settings

## 📍 Gdzie ustawić

**Cloudflare Dashboard → Workers & Pages → Twój projekt → Settings → Environment Variables**

---

## 🔧 Build Settings

W sekcji **"Builds & deployments"** ustaw:

| Setting | Wartość |
|---------|---------|
| **Framework preset** | `None` (lub Custom) |
| **Build command** | `npm run pages:build` |
| **Build output directory** | `.vercel/output/static` |
| **Root directory** | `/` (root projektu) |
| **Node version** | `18` lub `20` (domyślnie użyje najnowszej) |

---

## 🔑 Environment Variables (Production)

W sekcji **"Environment Variables"** → **Production** dodaj:

### 1. Database (WYMAGANE dla dynamic routing)

```env
DATABASE_URL=postgresql://user:password@host/db?sslmode=require
```

**⚠️ WAŻNE:** SQLite nie działa na Cloudflare Pages! Musisz użyć PostgreSQL (Neon, Supabase, Railway, etc.)

**Przykład dla Neon.tech:**
```env
DATABASE_URL=postgresql://user:pass@ep-xxx.region.neon.tech/db?sslmode=require
```

### 2. App URLs (WYMAGANE)

```env
NEXT_PUBLIC_APP_URL=https://website-from-generator.pages.dev
NEXT_PUBLIC_MAIN_DOMAIN=yourdomain.com
```

**Uwaga:** 
- `NEXT_PUBLIC_APP_URL` - URL Twojego Cloudflare Pages projektu (np. `https://website-from-generator.pages.dev`)
- `NEXT_PUBLIC_MAIN_DOMAIN` - Twoja główna domena bez subdomainów (np. `yourdomain.com`)

### 3. Cloudflare API (dla auto-rebuild)

```env
CLOUDFLARE_ACCOUNT_ID=d7373455e5f6963f18623c356629823c
CLOUDFLARE_API_TOKEN=EZans2XbNk3cN0dFLYiDdT83TSH6u3o5bxdq1qQt
CLOUDFLARE_PAGES_PROJECT_NAME=website-from-generator
CLOUDFLARE_AUTO_REBUILD=true
```

### 4. Optional Variables (gdy dodasz później)

```env
# Authentication (jeśli używasz NextAuth)
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-secret-key-here

# Stripe (jeśli dodasz płatności)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Storage (jeśli używasz Cloudflare R2 dla zdjęć)
R2_ACCOUNT_ID=d7373455e5f6963f18623c356629823c
R2_ACCESS_KEY_ID=your-r2-access-key
R2_SECRET_ACCESS_KEY=your-r2-secret-key
R2_BUCKET_NAME=wedding-photos
```

---

## 📋 Kompletna Lista - Copy & Paste

Oto gotowa lista do skopiowania (zastąp placeholder wartości):

### Production Environment Variables:

```env
# === Database (WYMAGANE) ===
DATABASE_URL=postgresql://user:password@host/db?sslmode=require

# === App URLs (WYMAGANE) ===
NEXT_PUBLIC_APP_URL=https://website-from-generator.pages.dev
NEXT_PUBLIC_MAIN_DOMAIN=yourdomain.com

# === Cloudflare API (dla auto-rebuild) ===
CLOUDFLARE_ACCOUNT_ID=d7373455e5f6963f18623c356629823c
CLOUDFLARE_API_TOKEN=EZans2XbNk3cN0dFLYiDdT83TSH6u3o5bxdq1qQt
CLOUDFLARE_PAGES_PROJECT_NAME=website-from-generator
CLOUDFLARE_AUTO_REBUILD=true
```

### Preview Environment Variables (opcjonalnie):

Dla preview deployments (PR branches) możesz mieć inne wartości:

```env
# === Database (test/dev) ===
DATABASE_URL=postgresql://user:password@dev-host/db?sslmode=require

# === App URLs (preview) ===
NEXT_PUBLIC_APP_URL=https://preview-branch.pages.dev
NEXT_PUBLIC_MAIN_DOMAIN=yourdomain.com

# === Cloudflare API (te same) ===
CLOUDFLARE_ACCOUNT_ID=d7373455e5f6963f18623c356629823c
CLOUDFLARE_API_TOKEN=EZans2XbNk3cN0dFLYiDdT83TSH6u3o5bxdq1qQt
CLOUDFLARE_PAGES_PROJECT_NAME=website-from-generator
```

---

## 🔍 Jak dodać w Cloudflare Dashboard

### Krok 1: Przejdź do Environment Variables

1. Otwórz [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. **Workers & Pages** → Twój projekt
3. **Settings** → **Environment Variables**

### Krok 2: Dodaj zmienne

1. Kliknij **"Add variable"** (dla Production)
2. **Name:** `DATABASE_URL`
3. **Value:** `postgresql://...`
4. Kliknij **"Save"**
5. Powtórz dla każdej zmiennej

Lub użyj **"Bulk edit"** aby dodać wszystkie na raz:

1. Kliknij **"Bulk edit"**
2. Wklej wszystkie zmienne (format: `KEY=value`)
3. Kliknij **"Save"**

### Krok 3: Dla Preview (opcjonalnie)

1. Przełącz się na **"Preview"** environment
2. Dodaj te same zmienne (możesz mieć inne wartości)
3. Kliknij **"Save"**

---

## ✅ Checklist Konfiguracji

- [ ] Build command: `npm run pages:build`
- [ ] Build output: `.vercel/output/static`
- [ ] `DATABASE_URL` (PostgreSQL, NIE SQLite!)
- [ ] `NEXT_PUBLIC_APP_URL` (URL Cloudflare Pages)
- [ ] `NEXT_PUBLIC_MAIN_DOMAIN` (główna domena)
- [ ] `CLOUDFLARE_ACCOUNT_ID` = `d7373455e5f6963f18623c356629823c`
- [ ] `CLOUDFLARE_API_TOKEN` = `EZans2XbNk3cN0dFLYiDdT83TSH6u3o5bxdq1qQt`
- [ ] `CLOUDFLARE_PAGES_PROJECT_NAME` = `website-from-generator`
- [ ] `CLOUDFLARE_AUTO_REBUILD` = `true` (opcjonalnie)

---

## 🔒 Security Notes

1. **NIE commituj** `.env.local` do git (już jest w `.gitignore`)
2. **Używaj Secrets** w Cloudflare dla wrażliwych danych (API tokens, etc.)
3. **Różne wartości** dla Production vs Preview environments
4. **Rotuj tokeny** co jakiś czas dla bezpieczeństwa

---

## 🚨 Częste Problemy

### "DATABASE_URL is undefined"

**Rozwiązanie:** Sprawdź czy dodałeś `DATABASE_URL` w Cloudflare Dashboard → Environment Variables

### "Dynamic routing nie działa"

**Rozwiązanie:** 
1. Sprawdź czy `NEXT_PUBLIC_MAIN_DOMAIN` jest ustawione
2. Sprawdź czy DNS ma wildcard CNAME: `*` → `your-project.pages.dev`

### "Build failed"

**Rozwiązanie:**
1. Sprawdź czy `DATABASE_URL` wskazuje na PostgreSQL (nie SQLite!)
2. Sprawdź czy build command: `npm run pages:build`
3. Sprawdź logi w Cloudflare Dashboard → Deployments

---

## 📝 Przykładowe Wartości (dla referencji)

Jeśli używasz **Neon.tech** dla PostgreSQL:

```env
DATABASE_URL=postgresql://username:password@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

Jeśli używasz **Supabase**:

```env
DATABASE_URL=postgresql://postgres:password@db.abcdefgh.supabase.co:5432/postgres
```

Jeśli Twój projekt to `website-from-generator`:

```env
NEXT_PUBLIC_APP_URL=https://website-from-generator.pages.dev
NEXT_PUBLIC_MAIN_DOMAIN=yourdomain.com
```

---

## 🎯 Szybki Start

1. ✅ Dodaj wszystkie zmienne z sekcji "Kompletna Lista" powyżej
2. ✅ Zastąp `yourdomain.com` swoją domeną
3. ✅ Zastąp `DATABASE_URL` prawdziwym PostgreSQL URL
4. ✅ Zapisz i uruchom nowy deployment
5. ✅ Gotowe! 🎉


