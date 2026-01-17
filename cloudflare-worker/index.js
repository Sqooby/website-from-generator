addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const hostname = url.hostname

  // Extract subdomain (e.g., john-mary from john-mary.yoursite.com)
  const parts = hostname.split('.')
  const subdomain = parts[0]

  // Ignore www and non-subdomain requests
  if (subdomain === 'www' || parts.length < 3) {
    return new Response('Not a wedding website subdomain', { status: 404 })
  }

  // Fetch HTML from KV storage
  const html = await WEDDING_SITES.get(subdomain)

  if (!html) {
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Website Not Found</title>
          <style>
            body {
              font-family: system-ui, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
            }
            .container {
              text-align: center;
              padding: 2rem;
            }
            h1 { font-size: 3rem; margin-bottom: 1rem; }
            p { font-size: 1.25rem; opacity: 0.9; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>404</h1>
            <p>Wedding website not found</p>
            <p style="font-size: 1rem; margin-top: 2rem;">
              The website "${subdomain}" doesn't exist or hasn't been published yet.
            </p>
          </div>
        </body>
      </html>
      `,
      {
        status: 404,
        headers: {
          'content-type': 'text/html;charset=UTF-8',
        },
      }
    )
  }

  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
      'cache-control': 'public, max-age=3600', // Cache for 1 hour
      'x-wedding-site': subdomain,
    },
  })
}
