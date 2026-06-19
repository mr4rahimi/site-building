import { notFound } from 'next/navigation'
import { getPayloadClient } from '../_lib/payload'
import RenderBlocks from '../_components/RenderBlocks'

export const dynamic = 'force-dynamic'

export default async function DynamicPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug: slugParts } = await params
  const payload = await getPayloadClient()

  // URL pattern: /{site-slug}/{page-slug}
  // e.g. /asus/about  or  /asus (→ home)
  const [siteSlug, ...rest] = slugParts || []
  const pageSlug = rest.join('/') || 'home'

  if (!siteSlug) return notFound()

  // Find site by slug
  const siteRes = await payload.find({
    collection: 'sites',
    limit: 1,
    depth: 0,
    where: { slug: { equals: siteSlug } },
  })

  const site = siteRes.docs?.[0]
  if (!site) return notFound()

  // Find page by slug scoped to this site
  const res = await payload.find({
    collection: 'pages',
    limit: 1,
    depth: 3,
    where: {
      and: [
        { slug: { equals: pageSlug } },
        { site: { equals: site.id } },
      ],
    },
  })

  const page = res.docs?.[0]
  if (!page) return notFound()

  return (
    <main>
      <RenderBlocks layout={(page as any).layout} />
    </main>
  )
}
