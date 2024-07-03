import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/:slug', (c) => {
  const slug = c.req.param('slug')
  const search = new URLSearchParams({
    'socialDescription': 'Blue House Vacuum cleaner BH007M',
    'socialImageUrl': 'https://media.allonline.7eleven.co.th/Blue_House_Vacuum_cleaner_BH007M/plist/118584_010_AM_01.jpg',
    'socialTitle': 'Blue House Vacuum cleaner BH007M'
  })
  return c.redirect(`/i/${slug}?${search}`, 302)
})

app.get('/i/:slug', (c) => {
  const slug = c.req.param('slug')
  return c.html(`<h1>${slug}</h1>`)
})

const port = 3001
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
