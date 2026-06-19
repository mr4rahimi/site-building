import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getSiteData } from '../../../_lib/getSiteData'
import { getPayloadClient } from '../../../_lib/payload'
import RenderBlocks from '../../../_components/RenderBlocks'

type Props = { params: Promise<{ siteSlug: string; serviceSlug: string }> }

async function getService(siteSlug: string, serviceSlug: string) {
  const data = await getSiteData(siteSlug)
  if (!data) return null

  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'services',
    limit: 1,
    depth: 3,
    where: {
      and: [
        { slug: { equals: serviceSlug } },
        { site: { equals: (data.site as any).id } },
      ],
    },
  })
  return { service: res.docs?.[0] || null, settings: data.settings }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { siteSlug, serviceSlug } = await params
  const result = await getService(siteSlug, serviceSlug)
  if (!result?.service) return {}

  const service = result.service as any
  return {
    title: service.title,
    description: result.settings?.seo?.defaultMetaDescription || '',
  }
}

export default async function ServicePage({ params }: Props) {
  const { siteSlug, serviceSlug } = await params

  const result = await getService(siteSlug, serviceSlug)
  if (!result?.service) return notFound()

  const service = result.service as any

  return (
    <>
      {service.sections?.length > 0 ? (
        <RenderBlocks layout={service.sections} />
      ) : (
        <section style={{ padding: '80px 0', textAlign: 'center' }}>
          <div className="sf-container">
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '16px' }}>
              {service.title}
            </h1>
          </div>
        </section>
      )}
    </>
  )
}
