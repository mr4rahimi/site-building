import { cache } from 'react'
import { getPayloadClient } from './payload'

export const getSiteData = cache(async (siteSlug: string) => {
  const payload = await getPayloadClient()

  const siteRes = await payload.find({
    collection: 'sites',
    limit: 1,
    depth: 0,
    where: { slug: { equals: siteSlug } },
  })
  const site = siteRes.docs?.[0]
  if (!site) return null

  const settingsRes = await payload.find({
    collection: 'site-settings',
    limit: 1,
    depth: 2,
    where: { site: { equals: site.id } },
  })
  const settings = (settingsRes.docs?.[0] as any) || null

  return { site, settings }
})

export function mediaUrl(mediaObj: any): string | null {
  if (!mediaObj) return null
  if (typeof mediaObj === 'string') return null
  if (mediaObj.url) return mediaObj.url
  if (mediaObj.filename) return `/api/media/file/${mediaObj.filename}`
  return null
}
