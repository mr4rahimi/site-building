import type { MetadataRoute } from 'next'
import { getSiteData } from '../_lib/getSiteData'
import { getPayloadClient } from '../_lib/payload'

export default async function sitemap({
  params,
}: {
  params: { siteSlug: string }
}): Promise<MetadataRoute.Sitemap> {
  const { siteSlug } = params
  const data = await getSiteData(siteSlug)
  if (!data) return []

  const siteId = (data.site as any).id
  const baseUrl = process.env.PUBLIC_SERVER_URL || 'http://localhost:3000'
  const base = `${baseUrl}/${siteSlug}`

  const payload = await getPayloadClient()

  const [pages, posts, services] = await Promise.all([
    payload.find({ collection: 'pages', limit: 200, depth: 0, where: { site: { equals: siteId } } }),
    payload.find({ collection: 'posts', limit: 200, depth: 0, where: { site: { equals: siteId } } }),
    payload.find({ collection: 'services', limit: 200, depth: 0, where: { site: { equals: siteId } } }),
  ])

  const urls: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
  ]

  for (const page of pages.docs) {
    const p = page as any
    if (p.slug && p.slug !== 'home') {
      urls.push({
        url: `${base}/${p.slug}`,
        lastModified: new Date(p.updatedAt),
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    }
  }

  for (const post of posts.docs) {
    const p = post as any
    urls.push({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  for (const service of services.docs) {
    const s = service as any
    urls.push({
      url: `${base}/services/${s.slug}`,
      lastModified: new Date(s.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  }

  return urls
}
