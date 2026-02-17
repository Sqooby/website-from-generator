# Architektura: Firebase vs Prisma + Cloudflare

## 🎯 Obecna Architektura (Next.js + Prisma)

```
┌─────────────────┐
│   Next.js App   │
│  (Vercel/Deploy)│
├─────────────────┤
│  API Routes     │ ← Backend w Next.js
│  + Prisma       │
├─────────────────┤
│  PostgreSQL     │ ← Baza danych (planowane: Supabase/Neon)
│  (SQLite dev)   │
└─────────────────┘
         │
         ↓
┌─────────────────┐
│  Cloudflare     │ ← Deployment statycznego HTML
│  Workers KV     │
└─────────────────┘
```

**Zalety:**
- ✅ Type-safe (Prisma generuje typy)
- ✅ Relacyjna baza danych (dobra dla złożonych relacji)
- ✅ Wszystko w jednym miejscu (monorepo)
- ✅ Next.js API routes są serverless na Vercel
- ✅ Łatwa migracja z SQLite na PostgreSQL

**Wady:**
- ❌ Backend jest częścią frontendu (mniejsze możliwości skalowania backendu)
- ❌ Next.js API routes mają limit czasu wykonania (Vercel: 60s)
- ❌ Cold start przy pierwszym request (serverless functions)

---

## 🔥 Alternatywa: Firebase + Cloudflare

```
┌─────────────────┐
│   Next.js App   │
│  (Cloudflare    │
│   Pages)        │
├─────────────────┤
│  Frontend Only  │ ← Tylko UI
└─────────────────┘
         │
         ↓ HTTP
┌─────────────────┐
│ Firebase        │
│  ├─ Firestore   │ ← NoSQL baza danych
│  ├─ Functions   │ ← Backend logic
│  ├─ Auth        │ ← Autentykacja
│  └─ Storage     │ ← Zdjęcia/pliki
└─────────────────┘
         │
         ↓ (opcjonalnie)
┌─────────────────┐
│  Cloudflare     │ ← Cache/Edge dla statycznych stron
│  Pages/KV       │
└─────────────────┘
```

**Zalety:**
- ✅ Oddzielony backend (lepsze skalowanie)
- ✅ Real-time capabilities (Firestore listeners)
- ✅ Wbudowana autentykacja
- ✅ Functions bez limitu czasu (w przeciwieństwie do Vercel)
- ✅ Firebase Storage dla zdjęć
- ✅ Cloudflare Pages = szybszy niż Vercel dla statycznych stron

**Wady:**
- ❌ NoSQL (zmiana paradygmatu z relacyjnego)
- ❌ Więcej vendor lock-in
- ❌ Koszty mogą rosnąć z ruchem
- ❌ Wymaga przepisania całego backendu
- ❌ Firestore querying jest mniej elastyczny niż SQL

---

## 🏆 REKOMENDACJA: Hybrydowe Podejście

### Opcja 1: Prisma + PostgreSQL + Cloudflare (REKOMENDOWANE dla tego projektu)

```
┌─────────────────────────┐
│   Next.js App           │
│   (Cloudflare Pages)    │
├─────────────────────────┤
│   Frontend              │
│   + API Routes          │ ← Backend pozostaje w Next.js
└─────────────────────────┘
         │
         ↓
┌─────────────────────────┐
│   Neon/Supabase         │ ← PostgreSQL serverless
│   PostgreSQL            │
│   + Prisma ORM          │
└─────────────────────────┘
         │
         ↓
┌─────────────────────────┐
│   Cloudflare            │
│   ├─ Pages (hosting)    │
│   ├─ R2 (zdjęcia)       │ ← Tani storage (lepszy niż S3)
│   └─ Workers (cache)    │ ← Edge computing
└─────────────────────────┘
```

**Dlaczego to lepsze:**

1. **Zachowujesz type-safety Prisma** - bez przepisywania backendu
2. **PostgreSQL > Firestore** dla tego use case:
   - Relacje między Website, User, RSVP, Photos
   - Złożone query z JOINami
   - Transakcje (ważne dla płatności)
3. **Cloudflare R2** - tani storage dla zdjęć (compatybilny z S3 API)
4. **Cloudflare Pages** - hostuje Next.js z lepszym CDN niż Vercel
5. **Minimalne zmiany** - tylko zmieniasz hosting i bazę danych

**Migration Path:**
```bash
# 1. Zmień SQLite → PostgreSQL (Neon)
#    - Dodaj DATABASE_URL do .env
#    - npx prisma migrate deploy

# 2. Przenieś zdjęcia na Cloudflare R2
#    - Zamiast local upload → R2 bucket

# 3. Deploy na Cloudflare Pages
#    - Zamiast Vercel → Cloudflare Pages
#    - Next.js działa bez zmian
```

---

### Opcja 2: Pełne Firebase (Jeśli chcesz kompletną zmianę)

**Kiedy ma sens:**
- Potrzebujesz real-time features (live RSVP counter)
- Chcesz mobilną appę później (Firebase SDK)
- Nie boisz się NoSQL
- Masz czas na przepisanie backendu

**Struktura Firestore:**
```typescript
// Zamiast relacyjnej bazy:
users/{userId}
  websites/{websiteId}
    content: {...}
    photos: [...]
    rsvps: [...]

// Firestore (NoSQL):
/users/{userId}
  email: string
  name: string

/websites/{websiteId}
  userId: string  // reference
  subdomain: string
  templateId: string
  published: boolean

/websiteContent/{websiteId}  // subcollection lub embedded
  brideName: string
  groomName: string
  // ...

/photos/{photoId}
  websiteId: string  // reference
  url: string
  order: number

/rsvps/{rsvpId}
  websiteId: string
  guestName: string
  // ...
```

**Firebase Functions (zamiast Next.js API):**
```typescript
// functions/src/index.ts
export const createWebsite = functions.https.onCall(async (data, context) => {
  const { subdomain, templateId, ...content } = data
  // Validation, create in Firestore
  return { success: true, websiteId: '...' }
})

export const submitRSVP = functions.https.onCall(async (data, context) => {
  // Handle RSVP
})
```

---

## 🔄 Porównanie: Co wybrać?

### Stick with Prisma + PostgreSQL + Cloudflare jeśli:

✅ **Masz już działający kod** z Prisma  
✅ **Potrzebujesz relacyjnej bazy** (Website → Content → Photos → RSVPs)  
✅ **Chcesz szybki deployment** bez przepisywania  
✅ **SQL queries są ważne** (aggregacje, JOINs)  
✅ **Type-safety jest priorytetem**  

### Przejdź na Firebase jeśli:

✅ **Chcesz real-time features** (live updates)  
✅ **Planujesz mobilną appę** (Firebase SDK)  
✅ **NoSQL pasuje do modelu danych** (proste dokumenty)  
✅ **Masz czas na przepisanie backendu** (2-3 tygodnie pracy)  
✅ **Chcesz wbudowaną autentykację** (ale NextAuth też działa)  

---

## 💡 Moja Rekomendacja dla Twojego Projektu

**IDŹ Z OPCJĄ 1: Prisma + PostgreSQL (Neon/Supabase) + Cloudflare**

**Powody:**

1. **Masz już działający kod** - minimalna zmiana
2. **PostgreSQL jest lepsze** dla tego modelu (relacje, transakcje)
3. **Cloudflare R2** - tani storage dla zdjęć (zamiast Firebase Storage)
4. **Cloudflare Pages** - hostuje Next.js (zamiast Vercel)
5. **Zachowujesz type-safety** Prisma
6. **Łatwiejsze debugowanie** - SQL > NoSQL queries

**Plan migracji:**

```bash
# Tydzień 1: Baza danych
1. Załóż konto na Neon.tech (free tier)
2. Skopiuj DATABASE_URL do .env
3. npx prisma migrate deploy
4. ✅ Done - działa od razu

# Tydzień 2: Storage
1. Załóż Cloudflare R2 bucket
2. Zainstaluj @aws-sdk/client-s3 (compatible z R2)
3. Zmień upload logic → R2
4. ✅ Done

# Tydzień 3: Hosting
1. Deploy na Cloudflare Pages (via Wrangler)
2. Skonfiguruj custom domains
3. ✅ Done
```

**Całkowity czas: ~3 tygodnie vs ~6-8 tygodni na Firebase**

---

## 📊 Cost Comparison

### Prisma + Neon + Cloudflare
- **Neon PostgreSQL**: Free tier (0.5GB), potem ~$19/mo
- **Cloudflare R2**: $0.015/GB storage + $0.36/GB transfer
- **Cloudflare Pages**: Free tier, potem $20/mo
- **Total**: ~$0-40/mo dla małego SaaS

### Firebase
- **Firestore**: Free tier (1GB), potem $0.18/GB storage
- **Functions**: 2M invocations free, potem $0.40/million
- **Storage**: 5GB free, potem $0.026/GB
- **Auth**: Free do 50K users
- **Total**: ~$0-60/mo (może rosnąć szybciej z ruchem)

**Wniosek:** Podobne koszty, ale Prisma ma przewidywalniejsze koszty.

---

## 🚀 Konkretny Plan: Cloudflare Integration

Jeśli chcesz zostać przy Prisma, ale dodać Cloudflare:

### 1. Baza danych → Neon PostgreSQL

```bash
# .env
DATABASE_URL="postgresql://user:pass@ep-xxx.region.neon.tech/db?sslmode=require"

# Migracja
npx prisma migrate deploy
```

### 2. Storage → Cloudflare R2

```typescript
// lib/storage/r2.ts
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
})

export async function uploadPhoto(file: File, websiteId: string) {
  const key = `websites/${websiteId}/${file.name}`
  await r2.send(new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
    Body: Buffer.from(await file.arrayBuffer()),
  }))
  return `https://yourdomain.com/${key}`
}
```

### 3. Hosting → Cloudflare Pages

```bash
# wrangler.toml
name = "wedding-generator"
compatibility_date = "2024-01-01"

[env.production]
route = { pattern = "yourdomain.com/*", zone_name = "yourdomain.com" }

# Deploy
npx wrangler pages deploy .next
```

---

## ✅ Final Recommendation

**Zostań przy Prisma + PostgreSQL**, ale:
1. ✅ Przenieś bazę na **Neon PostgreSQL** (serverless, free tier)
2. ✅ Dodaj **Cloudflare R2** dla zdjęć (tani, S3-compatible)
3. ✅ Deploy na **Cloudflare Pages** (szybszy CDN niż Vercel)
4. ✅ Zachowaj **Next.js API Routes** (nie potrzeba Firebase Functions)

**Firebase** rozważ dopiero jeśli:
- Będziesz potrzebować real-time features
- Chcesz mobilną appę
- Model danych stanie się prostszy (mniej relacji)

**Bottom line:** Nie przepisuj backendu jeśli nie musisz. Prisma + PostgreSQL + Cloudflare to solidne, skalowalne rozwiązanie.


