import { notFound } from 'next/navigation'
import { getPayloadClient } from '../_lib/payload'
import RenderBlocks from '../_components/RenderBlocks'

export const dynamic = 'force-dynamic'

export default async function DynamicPage({ params }: { params: { slug?: string[] } }) {
  const payload = await getPayloadClient()
  const slug = params.slug?.[params.slug.length - 1] ?? 'home'

  const res = await payload.find({
    collection: 'pages',
    limit: 1,
    depth: 3,
    where: { slug: { equals: slug } },
  })

  const page = res.docs?.[0]
  if (!page) return notFound()

  return (
    <main>
      <RenderBlocks layout={(page as any).layout} />
    </main>
  )
}
