import type { APIRoute } from 'astro'

export const GET: APIRoute = () => {
  const siteUrl = import.meta.env.SITE_URL || 'http://localhost:4321'
  return new Response(
    `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`,
    { headers: { 'Content-Type': 'text/plain' } }
  )
}
