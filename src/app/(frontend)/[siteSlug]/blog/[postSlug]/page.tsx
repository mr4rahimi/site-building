import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getPayloadClient } from '../../../_lib/payload'
import { buildMeta } from '@/lib/seo'
import { articleSchema } from '@/lib/schema'
import styles from './post.module.css'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ siteSlug: string; postSlug: string }> }

export async function generateMetadata({ params }: Props) {
  const { siteSlug, postSlug } = await params
  const payload = await getPayloadClient()

  const siteRes = await payload.find({
    collection: 'sites',
    limit: 1,
    depth: 0,
    where: { slug: { equals: siteSlug } },
  })
  const site = siteRes.docs?.[0]
  if (!site) return {}

  const result = await payload.find({
    collection: 'posts',
    limit: 1,
    where: {
      and: [{ slug: { equals: postSlug } }, { site: { equals: site.id } }],
    },
  })
  const post = result.docs?.[0]
  if (!post) return {}

  const url = `${process.env.PUBLIC_SERVER_URL}/${siteSlug}/blog/${postSlug}`
  const img = post.featuredImage && typeof post.featuredImage === 'object' ? post.featuredImage : null
  const imageUrl = img?.url || (img?.filename ? `/api/media/file/${img.filename}` : undefined)

  return buildMeta({
    title: post.title,
    description: (post as any).excerpt || post.title,
    image: imageUrl || undefined,
    url,
  })
}

export default async function PostPage({ params }: Props) {
  const { siteSlug, postSlug } = await params
  const payload = await getPayloadClient()
  const now = new Date().toISOString()

  const siteRes = await payload.find({
    collection: 'sites',
    limit: 1,
    depth: 0,
    where: { slug: { equals: siteSlug } },
  })
  const site = siteRes.docs?.[0]
  if (!site) return notFound()

  const result = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 1,
    where: {
      and: [
        { slug: { equals: postSlug } },
        { site: { equals: site.id } },
        { publishedAt: { less_than_equal: now } },
      ],
    },
  })
  const post = result.docs?.[0]
  if (!post) return notFound()

  const img = post.featuredImage && typeof post.featuredImage === 'object' ? post.featuredImage : null
  const imgSrc = img?.url || (img?.filename ? `/api/media/file/${img.filename}` : null)

  const schema = articleSchema(post, `${process.env.PUBLIC_SERVER_URL}/${siteSlug}/blog/${post.slug}`)

  const date = (post as any).publishedAt
    ? new Date((post as any).publishedAt).toLocaleDateString('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  const categories = Array.isArray((post as any).categories) ? (post as any).categories : []

  return (
    <article className={styles.article} dir="rtl">
      {/* Featured image */}
      {imgSrc && (
        <div className={styles.hero}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgSrc} alt={img?.alt || post.title} className={styles.heroImg} />
          <div className={styles.heroOverlay} aria-hidden="true" />
        </div>
      )}

      <div className={styles.container}>
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        {/* Header */}
        <header className={styles.header}>
          {categories.length > 0 && (
            <div className={styles.cats}>
              {categories.map((c: any) => (
                <span key={typeof c === 'string' ? c : c.id} className={styles.cat}>
                  {typeof c === 'string' ? c : c.title || c.slug}
                </span>
              ))}
            </div>
          )}

          <h1 className={styles.title}>{post.title}</h1>

          {(post as any).excerpt && (
            <p className={styles.excerpt}>{(post as any).excerpt}</p>
          )}

          <div className={styles.meta}>
            {date && (
              <time dateTime={(post as any).publishedAt} className={styles.date}>
                {date}
              </time>
            )}
          </div>

          <div className={styles.divider} aria-hidden="true" />
        </header>

        {/* Content */}
        <div className={styles.content}>
          <RichText data={post.content} />
        </div>

        {/* Back link */}
        <footer className={styles.footer}>
          <a href={`/${siteSlug}/blog`} className={styles.backLink}>
            ← بازگشت به وبلاگ
          </a>
        </footer>
      </div>
    </article>
  )
}
