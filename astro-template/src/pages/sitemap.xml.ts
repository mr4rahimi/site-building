import type { APIRoute } from 'astro'
import { getSiteData, getAllPages, getAllPosts, getAllServices } from '../lib/api'

export const GET: APIRoute = async () => {
  const { site } = await getSiteData()
  const baseUrl = import.meta.env.SITE_URL || `http://localhost:4321`

  const [pages, posts, services] = await Promise.all([
    getAllPages(site.id),
    getAllPosts(site.id),
    getAllServices(site.id),
  ])

  const urls = [
    `<url><loc>${baseUrl}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`,
    `<url><loc>${baseUrl}/blog</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    ...pages.filter((p: any) => p.slug && p.slug !== 'home').map((p: any) =>
      `<url><loc>${baseUrl}/${p.slug}</loc><lastmod>${p.updatedAt?.split('T')[0]||''}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`
    ),
    ...posts.map((p: any) =>
      `<url><loc>${baseUrl}/blog/${p.slug}</loc><lastmod>${p.updatedAt?.split('T')[0]||''}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
    ),
    ...services.map((s: any) =>
      `<url><loc>${baseUrl}/services/${s.slug}</loc><lastmod>${s.updatedAt?.split('T')[0]||''}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`
    ),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } })
}
