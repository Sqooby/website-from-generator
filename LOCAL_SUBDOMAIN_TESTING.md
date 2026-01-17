# 🧪 Testowanie Subdomain Lokalnie

## Problem

Lokalnie nie możesz użyć `dsa-das.localhost:3000` bez dodatkowej konfiguracji.

## ✅ Rozwiązania

### Opcja 1: Użyj `/wedding/[subdomain]` bezpośrednio (NAJPROSTSZE)

Zamiast subdomain, odwiedź bezpośrednio:
```
http://localhost:3000/wedding/dsa-das
```

Middleware jest potrzebny tylko na production dla prawdziwych subdomainów.

### Opcja 2: Skonfiguruj localhost subdomains (dla dokładniejszego testowania)

#### macOS/Linux - Edytuj `/etc/hosts`:

```bash
sudo nano /etc/hosts
```

Dodaj linie:
```
127.0.0.1    dsa-das.localhost
127.0.0.1    john-mary.localhost
127.0.0.1    *.localhost
```

Zapisz i użyj:
```
http://dsa-das.localhost:3000
```

⚠️ **Uwaga:** Wildcard `*.localhost` może nie działać na wszystkich systemach.

#### Windows - Edytuj `C:\Windows\System32\drivers\etc\hosts`:

```bash
notepad C:\Windows\System32\drivers\etc\hosts
```

Dodaj te same linie (jako administrator).

### Opcja 3: Zaktualizuj middleware dla lepszego wsparcia localhost

Zaktualizuj `middleware.ts` żeby lepiej obsługiwał localhost:

```typescript
// Sprawdź czy hostname zawiera localhost subdomain
const isLocalhostSubdomain = hostname.includes('.localhost') || 
                             (hostname.split('.').length > 2 && hostname.includes('localhost'))
```

### Opcja 4: Użyj Wrangler Pages Dev (dokładne symulowanie Cloudflare)

```bash
npm run pages:build
npm run pages:dev
```

To uruchomi lokalny serwer który symuluje Cloudflare Pages.

## 🎯 Rekomendacja: Opcja 1

Dla lokalnego developmentu użyj:
```
http://localhost:3000/wedding/dsa-das
```

Middleware będzie działał automatycznie na production z prawdziwymi subdomainami.

## 🔧 Szybki Fix Middleware

Jeśli chcesz testować subdomain lokalnie, możesz zaktualizować middleware:

```typescript
// Sprawdź czy to localhost subdomain
const isLocalhostSubdomain = hostname.includes('.localhost') || 
                             (hostname.split('.').length > 3 && hostname.startsWith('localhost'))

if (isSubdomain || isLocalhostSubdomain) {
  // ... rewrite logic
}
```

Ale to nie jest konieczne - `/wedding/[subdomain]` działa bezpośrednio! 🎉

