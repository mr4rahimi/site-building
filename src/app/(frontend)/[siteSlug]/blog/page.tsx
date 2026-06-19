import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayloadClient } from '../../_lib/payload'
import styles from './blog.module.css'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ siteSlug: string }> }

export default async function SiteBlogPage({ params }: Props) {
  const { siteSlug } = await params
  const payload = await getPayloadClient()

  const siteRes = await payload.find({
    collection: 'sites',
    limit: 1,
    depth: 0,
    where: { slug: { equals: siteSlug } },
  })
  const site = siteRes.docs?.[0]
  if (!site) return notFound()

  const now = new Date().toISOString()
  const posts = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 24,
    sort: '-publishedAt',
    where: {
      and: [
        { site: { equals: site.id } },
        { publishedAt: { less_than_equal: now } },
      ],
    },
  })

  return (
    <main className={`${styles.page}`} dir="rtl">
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>وبلاگ</h1>
          <p className={styles.pageSubtitle}>آخرین مقالات و اخبار</p>
        </header>

        {posts.docs.length === 0 ? (
          <div className={styles.empty}>
            <p>هنوز مقاله‌ای منتشر نشده است.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {posts.docs.map((post: any) => {
              const img =
                post.featuredImage && typeof post.featuredImage === 'object'
                  ? post.featuredImage
                  : null
              const imgSrc = img?.url || (img?.filename ? `/api/media/file/${img.filename}` : null)
              const date = post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('fa-IR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : null

              return (
                <article key={post.id} className={styles.card}>
                  <Link href={`/${siteSlug}/blog/${post.slug}`} className={styles.cardLink}>
                    <div className={styles.cardImg}>
                      {imgSrc ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={imgSrc} alt={img?.alt || post.title} loading="lazy" />
                      ) : (
                        <div className={styles.cardImgPlaceholder} aria-hidden="true" />
                      )}
                    </div>

                    <div className={styles.cardBody}>
                      {Array.isArray(post.categories) && post.categories.length > 0 && (
                        <div className={styles.cats}>
                          {post.categories.slice(0, 2).map((c: any) => (
                            <span key={typeof c === 'string' ? c : c.id} className={styles.cat}>
                              {typeof c === 'string' ? c : c.title || c.slug}
                            </span>
                          ))}
                        </div>
                      )}

                      <h2 className={styles.cardTitle}>{post.title}</h2>

                      {post.excerpt && (
                        <p className={styles.cardExcerpt}>{post.excerpt}</p>
                      )}

                      <div className={styles.cardMeta}>
                        {date && <time dateTime={post.publishedAt}>{date}</time>}
                        <span className={styles.readMore}>ادامه مطلب ←</span>
                      </div>
                    </div>
                  </Link>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
