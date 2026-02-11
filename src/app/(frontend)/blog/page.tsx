import Link from 'next/link'
import { getPayloadClient } from '../_lib/payload'

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const payload = await getPayloadClient()

  const now = new Date().toISOString()

  const posts = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 50,
    sort: '-publishedAt',
    where: {
      publishedAt: {
        less_than_equal: now,
      },
    },
  })

  return (
    <main style={{ maxWidth: 1160, margin: '0 auto', padding: '24px 16px' }}>
      <h1 style={{ margin: '0 0 16px' }}>وبلاگ</h1>

      <div style={{ display: 'grid', gap: 16 }}>
        {posts.docs.map((post: any) => {
          const img =
            post.featuredImage && typeof post.featuredImage === 'object'
              ? post.featuredImage
              : null

          const imgSrc = img?.url || (img?.filename ? `/api/media/file/${img.filename}` : null)

          return (
            <article
              key={post.id}
              style={{
                border: '1px solid #EAECF0',
                borderRadius: 16,
                padding: 16,
              }}
            >
              {imgSrc && (
                <Link href={`/blog/${post.slug}`}>
                  <img
                    src={imgSrc}
                    alt={img?.alt || post.title}
                    style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 12 }}
                    loading="lazy"
                  />
                </Link>
              )}

              <h2 style={{ margin: '12px 0 6px' }}>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>

              {post.excerpt && <p style={{ margin: 0, color: '#667085' }}>{post.excerpt}</p>}
            </article>
          )
        })}
      </div>
    </main>
  )
}
