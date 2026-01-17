# 🤖 Automatyczny Deployment na Cloudflare Pages

## ✅ Dobra wiadomość: Dynamic Routing działa automatycznie!

**Nie musisz nic "wrzucać" ręcznie!** 

Gdy publikujesz stronę (`published: true`), **automatycznie**:
1. ✅ Strona jest zapisana w bazie danych
2. ✅ Middleware wykrywa subdomain
3. ✅ Next.js renderuje stronę dynamicznie z bazy danych
4. ✅ **Działa od razu!**

## 🎯 Jak to działa

### Dynamic Routing (Obecne rozwiązanie - REKOMENDOWANE)

```
User publikuje stronę → published: true
   ↓
User odwiedza: john-mary.yourdomain.com
   ↓
Middleware (na Cloudflare Edge) wykrywa subdomain
   ↓
Next.js Edge Function renderuje z bazy danych
   ↓
Strona wyświetlona! 🎉
```

**Zalety:**
- ✅ **Zero deployment** - działa automatycznie
- ✅ **Real-time** - zmiany widoczne natychmiast
- ✅ **Nieograniczone** - obsługuje nieskończenie wiele stron

## 🔄 Opcjonalne: Auto-Rebuild Cloudflare Pages

Jeśli chcesz triggerować rebuild całego projektu (dla pewności że najnowszy kod jest wdrożony):

### 1. Włącz auto-rebuild

W Cloudflare Dashboard → Environment Variables dodaj:
```
CLOUDFLARE_AUTO_REBUILD=true
```

### 2. Skonfiguruj Cloudflare API credentials

```
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_API_TOKEN=your-api-token
CLOUDFLARE_PAGES_PROJECT_NAME=website-from-generator
```

### 3. Jak to działa

Po publikacji strony:
- ✅ Dynamic routing działa automatycznie (główny sposób)
- ✅ Optional: Triggeruje rebuild całego projektu (jeśli włączone)

**UWAGA:** Rebuild trwa 2-5 minut, ale **strona działa od razu** dzięki dynamic routing!

## 📋 Konfiguracja

### Cloudflare API Token

1. Przejdź do [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
2. Create Token → Custom token
3. Permissions:
   - Account: Cloudflare Pages:Edit
   - Zone: Read (jeśli potrzebujesz)
4. Copy token

### Environment Variables w Cloudflare Pages

```
# Wymagane dla auto-rebuild (opcjonalne)
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_API_TOKEN=your-api-token
CLOUDFLARE_PAGES_PROJECT_NAME=website-from-generator

# Opcjonalne: Włącz auto-rebuild po publikacji
CLOUDFLARE_AUTO_REBUILD=true

# App config
NEXT_PUBLIC_MAIN_DOMAIN=yourdomain.com
DATABASE_URL=postgresql://...
```

## 🎯 Rekomendacja

**Zostań przy dynamic routing!**

1. ✅ **Działa automatycznie** - zero ręcznej pracy
2. ✅ **Natychmiastowe** - strony dostępne od razu
3. ✅ **Skaluje się** - nieograniczone strony

**Auto-rebuild potrzebujesz tylko jeśli:**
- Zmieniłeś kod w Next.js i chcesz wymusić rebuild
- Chcesz mieć pewność że najnowsza wersja kodu jest wdrożona

## 💡 FAQ

### Q: Czy muszę triggerować rebuild po każdej publikacji?

**A:** NIE! Dynamic routing działa automatycznie. Rebuild potrzebny tylko przy zmianach w kodzie aplikacji.

### Q: Czy strony są dostępne od razu po publikacji?

**A:** TAK! Dzięki dynamic routing - middleware + Edge Functions renderują z bazy danych w czasie rzeczywistym.

### Q: Kiedy potrzebuję rebuild?

**A:** Tylko gdy zmieniasz kod aplikacji (np. nowy komponent, zmiana w middleware). Publikacja nowych stron nie wymaga rebuild.

## ✅ Podsumowanie

**Dynamic routing = automatyczny deployment! 🎉**

- ✅ Publikujesz stronę → `published: true`
- ✅ Middleware obsługuje subdomain → `/wedding/[subdomain]`
- ✅ Next.js renderuje z bazy danych
- ✅ **Gotowe! Zero ręcznej pracy!**

**Auto-rebuild = opcjonalne, tylko gdy zmieniasz kod aplikacji**

