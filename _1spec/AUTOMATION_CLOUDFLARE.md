# 🤖 Automatyzacja Deploymentu Stron Weselnych na Cloudflare

## 📊 Obecna Sytuacja

Masz już podstawowy workflow:
1. ✅ Użytkownik tworzy stronę przez builder → `POST /api/websites`
2. ✅ Po kliknięciu "Publish" → `POST /api/deploy` → upload HTML do Cloudflare KV

**Problem:** Każda nowa strona wymaga ręcznego deploymentu lub kliknięcia "Publish".

## 🎯 Opcje Automatyzacji

### Opcja 1: Dynamic Routing przez Next.js (NAJLEPSZE - Już działasz tak!)

**Zalety:**
- ✅ **Zero deployment** - wszystko automatyczne
- ✅ **Real-time updates** - zmiany od razu widoczne
- ✅ **Prostsze** - nie potrzeba statycznego HTML
- ✅ **Skaluje się** - obsługuje nieograniczoną liczbę stron

**Jak działa:**
```
User visits: john-mary.yourdomain.com
       ↓
Middleware (middleware.ts) wykrywa subdomain
       ↓
Rewrite to: /wedding/john-mary
       ↓
Next.js renderuje dynamicznie z bazy danych
       ↓
Strona gotowa!
```

**Co trzeba zrobić:**
- ✅ **Już masz!** Middleware już to robi
- ✅ **Już masz!** Route `/wedding/[subdomain]` renderuje dynamicznie
- ✅ **Już masz!** Cloudflare Pages hostuje Next.js

**Koniec!** To już działa automatycznie! 🎉

---

### Opcja 2: Automatyczny Deployment do Cloudflare KV (obecne rozwiązanie)

Jeśli chcesz kontynuować z statycznym HTML w KV:

#### 2A: Automatyczne po zapisaniu w bazie

Dodaj trigger w `POST /api/websites`:

```typescript
// src/app/api/websites/route.ts

export async function POST(request: Request) {
  // ... istniejący kod tworzenia strony ...
  
  const website = await prisma.website.create({...})
  
  // Automatyczny deployment w tle (nie blokuje response)
  deployToCloudflare(website.id).catch(err => {
    console.error('Background deployment failed:', err)
    // Możesz dodać retry logic lub queue
  })
  
  return NextResponse.json({ success: true, data: website })
}
```

#### 2B: Webhook z Prisma (zaawansowane)

Użyj Prisma middleware do automatycznego deploymentu:

```typescript
// src/lib/db/prisma-middleware.ts

import { Prisma } from '@prisma/client'

export function deploymentMiddleware(prisma: PrismaClient) {
  prisma.$use(async (params, next) => {
    const result = await next(params)
    
    // Automatyczny deploy gdy website jest publikowany
    if (params.model === 'Website' && params.action === 'update') {
      const website = result as Website
      
      if (website.published && !website.deploymentUrl) {
        // Deploy w tle
        deployToCloudflare(website.id).catch(console.error)
      }
    }
    
    return result
  })
}
```

---

### Opcja 3: Queue System (dla większego ruchu)

Jeśli będziesz miał dużo stron dziennie, użyj queue:

```typescript
// src/lib/queue/deployment-queue.ts

import { Queue } from 'bullmq'

const deploymentQueue = new Queue('website-deployment', {
  connection: {
    host: process.env.REDIS_HOST,
    port: 6379,
  }
})

export async function queueWebsiteDeployment(websiteId: string) {
  await deploymentQueue.add('deploy', { websiteId }, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    }
  })
}

// Worker (może być w osobnym procesie)
deploymentQueue.process('deploy', async (job) => {
  const { websiteId } = job.data
  await deployToCloudflare(websiteId)
})
```

---

## 🏆 REKOMENDACJA: Opcja 1 - Dynamic Routing

**Najlepsze rozwiązanie:** Zostań przy dynamic routing przez Next.js!

### Dlaczego?

1. **Już działa** - middleware + dynamic route = automatyczne
2. **Zero deployment** - nie potrzeba uploadować HTML
3. **Real-time** - zmiany w bazie od razu widoczne
4. **Prostsze** - mniej komponentów do utrzymania
5. **Tanie** - Cloudflare Pages = free tier

### Co masz zrobić?

**Prawie nic!** Obecny kod już to obsługuje:

```typescript
// middleware.ts - JUŻ MASZ ✅
export function middleware(request: NextRequest) {
  // Wykrywa subdomain → rewrite do /wedding/[subdomain]
}

// app/(wedding)/wedding/[subdomain]/page.tsx - JUŻ MASZ ✅
export default async function WeddingWebsitePage({ params }) {
  const { subdomain } = await params
  const website = await getWebsiteBySubdomain(subdomain)
  // Render dynamicznie z bazy danych
}
```

### Możesz uprościć deployment:

Usuń Cloudflare KV deployment z `review-publish.tsx`:

```typescript
// PRZED (obecne):
const deployResponse = await fetch('/api/deploy', {...}) // ❌ Niepotrzebne

// PO (uproszczone):
const response = await fetch('/api/websites', {...})
// To wszystko! Next.js automatycznie obsłuży routing ✅
```

---

## 🔄 Ulepszenie: Auto-deployment przy aktualizacji

Jeśli chcesz, żeby zmiany były od razu widoczne (bez reload całej aplikacji):

### Cache Invalidation (dla Cloudflare Pages)

```typescript
// src/app/api/websites/[id]/route.ts - PATCH

export async function PATCH(request: Request, { params }) {
  const { id } = await params
  const body = await request.json()
  
  // Update website
  const website = await prisma.website.update({
    where: { id },
    data: body,
  })
  
  // Invalidate cache dla tego subdomain
  await fetch(
    `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CF_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        files: [
          `https://${website.subdomain}.${MAIN_DOMAIN}/*`,
        ],
      }),
    }
  )
  
  return NextResponse.json({ success: true, data: website })
}
```

---

## 📋 Plan Wdrożenia Automatyzacji

### Krok 1: Potwierdź, że dynamic routing działa

Sprawdź czy to działa:
1. Stwórz stronę przez builder
2. Odwiedź `subdomain.yourdomain.com`
3. Powinna się wyświetlić automatycznie

### Krok 2: Usuń zbędny KV deployment (opcjonalnie)

Jeśli dynamic routing działa, możesz:
- Usunąć `/api/deploy` route
- Usunąć wywołanie `deployToCloudflare` z `review-publish.tsx`
- Zostaw tylko `POST /api/websites`

### Krok 3: Dodaj auto-invalidation cache (opcjonalnie)

Jeśli chcesz, żeby zmiany były natychmiast widoczne:
- Dodaj cache purging przy update website

---

## 💡 FAQ

### Q: Czy dynamic routing jest wolniejszy niż statyczny HTML?

**A:** Nie, Cloudflare Pages cache'uje odpowiedzi Next.js. Pierwszy request może być wolniejszy, ale kolejne są z cache.

### Q: Czy mogę mieć mix - niektóre strony statyczne, niektóre dynamiczne?

**A:** Tak! Możesz mieć:
- Premium strony → statyczny HTML w KV (szybsze)
- Podstawowe strony → dynamic routing (prostsze)

### Q: Jak dodać automatyczne deployment dla przyszłych stron?

**A:** Jeśli zostaniesz przy dynamic routing (rekomendowane), to **już działa automatycznie**! Każda nowa strona w bazie jest dostępna od razu przez subdomain.

---

## ✅ Podsumowanie

**Najlepsze rozwiązanie:** Dynamic routing przez Next.js (już masz!)

**Co zrobić:**
1. ✅ Sprawdź czy middleware działa
2. ✅ Sprawdź czy `/wedding/[subdomain]` renderuje strony
3. ✅ Opcjonalnie: usuń KV deployment (jeśli nie potrzebujesz statycznego HTML)
4. ✅ Gotowe! Wszystko działa automatycznie 🎉

**Nie potrzebujesz:**
- ❌ Cloudflare KV dla każdej strony
- ❌ `/api/deploy` endpoint
- ❌ Ręcznego deploymentu
- ❌ Queue system (chyba że masz 1000+ stron/dzień)

**Twoja aplikacja już automatycznie:**
- ✅ Wykrywa subdomain przez middleware
- ✅ Renderuje stronę dynamicznie z bazy danych
- ✅ Działa dla nieograniczonej liczby stron
- ✅ Zero manual deployment

**Koniec!** 🎉


