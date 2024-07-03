import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { html } from 'hono/html'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/:slug{^[A-Za-z0-9]{4}$}', (c) => {
  const slug = c.req.param('slug')
  const search = new URLSearchParams({
    socialTitle: 'Blue House Vacuum cleaner BH007M',
    socialDescription: 'Blue House Vacuum cleaner BH007M',
    socialImageUrl:
    'https://media.allonline.7eleven.co.th/Blue_House_Vacuum_cleaner_BH007M/plist/118584_010_AM_01.jpg',
    slug,
  })
  return c.redirect(`/product?${search}`, 302)
})

app.get('/product', (c) => {
  const slug = c.req.query('slug')
  const title = c.req.query('socialTitle')
  const description = c.req.query('socialDescription')
  const imageUrl = c.req.query('socialImageUrl')
  return c.html(html` <!DOCTYPE html>
    <html>
      <head>
        <meta name="twitter:card" content="summary_large_image" />
        <title>${title}</title>
        <meta name="description" content="${description}" />
        <meta property="og:title" content="${title}" />
        <meta name="twitter:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta name="twitter:description" content="${description}" />
        <meta property="og:image" content="${imageUrl}" />
        <meta name="twitter:image" content="${imageUrl}" />
      </head>
      <body>
        <h1>${slug}</h1>
        <h2>${title}</h2>
        <p>${description}</p>
        <img src="${imageUrl}" alt="${title}" />
      </body>
    </html>`)
})

const port = 3001
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})
