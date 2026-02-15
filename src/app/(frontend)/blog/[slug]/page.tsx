import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getPayloadClient } from '../../_lib/payload'

export const dynamic = 'force-dynamic'

export default async function PostPage({ params }: { params: { slug: string } }) {
  const payload = await getPayloadClient()
  const now = new Date().toISOString()

  const result = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 1,
    where: {
      and: [
        { slug: { equals: params.slug } },
        { publishedAt: { less_than_equal: now } },
      ],
    },
  })

  const post = result.docs?.[0]
  if (!post) return notFound()

  const img =
    post.featuredImage && typeof post.featuredImage === 'object' ? post.featuredImage : null

  const imgSrc = img?.url || (img?.filename ? `/api/media/file/${img.filename}` : null)

  return (
    <main style={{ maxWidth: 860, margin: '0 auto', padding: '24px 16px' }}>
      {imgSrc && (
        <img
          src={imgSrc}
          alt={img?.alt || post.title}
          style={{ width: '100%', height: 360, objectFit: 'cover', borderRadius: 16 }}
        />
      )}

      <h1 style={{ margin: '16px 0 8px' }}>{post.title}</h1>

      {Array.isArray(post.categories) && post.categories.length > 0 && (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '10px 0 0' }}>
    {post.categories.map((c: any) => (
      <span
        key={typeof c === 'string' ? c : c.id}
        style={{
          border: '1px solid #EAECF0',
          borderRadius: 999,
          padding: '6px 10px',
          fontSize: 13,
          color: '#667085',
        }}
      >
        {typeof c === 'string' ? c : c.title || c.name || c.slug}
      </span>
    ))}
  </div>
)}


      <div style={{ marginTop: 14, lineHeight: 2 }}>
        <RichText data={post.content} />
      </div>
    </main>
  )
}
