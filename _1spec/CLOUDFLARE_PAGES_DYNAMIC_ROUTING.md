# Cloudflare Pages + Dynamic Routing - Jak to działa

## 🎯 Problem

Obecne rozwiązanie działa lokalnie, ale na Cloudflare Pages trzeba skonfigurować dynamic routing.

## ✅ Rozwiązanie: @cloudflare/next-on-pages

Cloudflare Pages **WSPIERA** dynamic routing przez `@cloudflare/next-on-pages`, który konwertuje Next.js na Cloudflare Workers/Edge Functions.

### Jak to działa:

```
1. Next.js App z dynamic routes (/wedding/[subdomain])
   ↓
2. @cloudflare/next-on-pages build
   ↓
3. Konwertuje na Cloudflare Workers/Edge Functions
   ↓
4. Middleware działa na Edge
   ↓
5. Dynamic routing działa automatycznie!
```

## 📋 Konfiguracja

### Krok 1: Zainstaluj @cloudflare/next-on-pages

```bash
npm install -D @cloudflare/next-on-pages wrangler --legacy-peer-deps
```

### Krok 2: Build dla Cloudflare Pages

```bash
npm run pages:build
```

To tworzy output w `.vercel/output/static` który Cloudflare Pages może deployować.

### Krok 3: Deploy na Cloudflare Pages

**W Cloudflare Dashboard:**
- Build command: `npm run pages:build`
- Build output: `.vercel/output/static`
- Root directory: `/`

### Krok 4: Subdomain Routing

Cloudflare Pages automatycznie obsługuje subdomain routing przez:
1. **Middleware** (`middleware.ts`) - działa na Edge
2. **Dynamic route** (`/wedding/[subdomain]`) - renderuje z bazy danych

**DNS Configuration:**
- Dodaj wildcard CNAME: `*` → `your-project.pages.dev`
- Albo dla custom domain: `*` → `yourdomain.com`

## 🔄 Automatyczny Deployment

### Opcja 1: Dynamic Routing (REKOMENDOWANE) ✅

**Jak działa:**
- Użytkownik publikuje stronę → `published: true` w bazie
- Middleware wykrywa subdomain → rewrite do `/wedding/[subdomain]`
- Next.js renderuje dynamicznie z bazy danych
- **Zero manual deployment!**

**Zalety:**
- ✅ Automatyczne - zero ręcznej pracy
- ✅ Real-time updates
- ✅ Skaluje się nieograniczenie
- ✅ Działa od razu po publikacji

**Wady:**
- ⚠️ Wymaga @cloudflare/next-on-pages
- ⚠️ Edge Functions mają limity (ale wystarczające dla tego use case)

### Opcja 2: Static HTML Generation (Alternatywa)

Jeśli chcesz statyczne HTML dla każdej strony:

```typescript
// Po publikacji - generuj statyczne HTML
export async function generateStaticHTML(websiteId: string) {
  const website = await prisma.website.findUnique({...})
  
  // Render HTML
  const html = await renderWebsiteToHTML(website)
  
  // Upload do Cloudflare R2 lub KV
  await uploadToCloudflare(website.subdomain, html)
}
```

**Wady:**
- ❌ Wymaga generowania HTML dla każdej strony
- ❌ Wymaga uploadu do storage
- ❌ Nie ma real-time updates
- ❌ Więcej komplikacji

## 🚀 Rekomendacja

**Użyj Opcji 1: Dynamic Routing**

1. ✅ Zainstaluj `@cloudflare/next-on-pages`
2. ✅ Skonfiguruj build w Cloudflare Pages
3. ✅ Dodaj wildcard DNS
4. ✅ Gotowe! Wszystko działa automatycznie

## 📝 Checklist Deployment

- [ ] Zainstalować `@cloudflare/next-on-pages`
- [ ] Skonfigurować Cloudflare Pages project
- [ ] Ustawić build command: `npm run pages:build`
- [ ] Ustawić build output: `.vercel/output/static`
- [ ] Dodać environment variables w Cloudflare Dashboard
- [ ] Skonfigurować DNS (wildcard CNAME)
- [ ] Przetestować subdomain routing

## 🔍 Weryfikacja

Po deployment:

1. **Stwórz stronę** przez builder
2. **Opublikuj** (published: true)
3. **Odwiedź** `subdomain.yourdomain.com`
4. **Powinna się wyświetlić** automatycznie!

Jeśli nie działa:
- Sprawdź czy middleware działa (logi w Cloudflare Dashboard)
- Sprawdź czy DNS jest skonfigurowany (wildcard CNAME)
- Sprawdź czy build się powiódł

## 💡 FAQ

### Q: Czy dynamic routing działa na Cloudflare Pages?

**A:** Tak! Przez `@cloudflare/next-on-pages` - konwertuje Next.js na Edge Functions które obsługują dynamic routing.

### Q: Czy potrzebuję generować statyczne HTML?

**A:** Nie! Dynamic routing renderuje strony z bazy danych w czasie rzeczywistym.

### Q: Jak szybko są widoczne zmiany?

**A:** Natychmiast! Po ustawieniu `published: true` w bazie, strona jest dostępna od razu.

### Q: Czy to działa dla nieograniczonej liczby stron?

**A:** Tak! Każda strona jest renderowana dynamicznie z bazy danych. Nie ma limitu.

## ✅ Podsumowanie

**Dynamic routing na Cloudflare Pages działa automatycznie!**

- ✅ Middleware obsługuje subdomain routing
- ✅ Next.js renderuje strony dynamicznie
- ✅ Zero manual deployment
- ✅ Real-time updates

**Wszystko co potrzebujesz:**
1. `@cloudflare/next-on-pages` (build tool)
2. Cloudflare Pages deployment
3. Wildcard DNS
4. Gotowe! 🎉


