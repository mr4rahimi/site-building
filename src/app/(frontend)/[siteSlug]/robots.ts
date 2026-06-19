import type { MetadataRoute } from 'next'

export default function robots({
  params,
}: {
  params: { siteSlug: string }
}): MetadataRoute.Robots {
  const baseUrl = process.env.PUBLIC_SERVER_URL || 'http://localhost:3000'
  const siteSlug = params.siteSlug

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${baseUrl}/${siteSlug}/sitemap.xml`,
  }
}
