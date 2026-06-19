import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getSiteData } from '../../_lib/getSiteData'
import { getPayloadClient } from '../../_lib/payload'
import RenderBlocks from '../../_components/RenderBlocks'

type Props = { params: Promise<{ siteSlug: string; pageSlug?: string[] }> }

async function getPage(siteSlug: string, pageSlug: string) {
  const data = await getSiteData(siteSlug)
  if (!data) return null

  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'pages',
    limit: 1,
    depth: 3,
    where: {
      and: [
        { slug: { equals: pageSlug } },
        { site: { equals: (data.site as any).id } },
      ],
    },
  })
  return { page: res.docs?.[0] || null, settings: data.settings }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { siteSlug, pageSlug } = await params
  const slug = pageSlug?.join('/') || 'home'
  const result = await getPage(siteSlug, slug)
  if (!result?.page) return {}

  const page = result.page as any
  const siteTitle = result.settings?.siteTitle || ''

  return {
    title: page.title || page.slug,
    description: page.meta?.description || result.settings?.seo?.defaultMetaDescription || '',
  }
}

export default async function SitePage({ params }: Props) {
  const { siteSlug, pageSlug } = await params
  const slug = pageSlug?.join('/') || 'home'

  const result = await getPage(siteSlug, slug)
  if (!result?.page) return notFound()

  return <RenderBlocks layout={(result.page as any).layout} siteSlug={siteSlug} />
}
