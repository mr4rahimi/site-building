import React from 'react'
import type { Page } from '@/payload-types'
import styles from './coverage.module.css'
import { cssVarStyle } from '../_shared/blockTheme'
import { coverageThemeVars } from '../_shared/coverageTheme'
import { MapPinned, Truck, Store, Check } from 'lucide-react'

function getUploadUrl(doc: any): string | null {
  if (!doc || typeof doc !== 'object') return null
  return doc.url || doc?.sizes?.card?.url || doc?.sizes?.hero?.url || null
}

function isVideoMime(doc: any): boolean {
  const mime = doc?.mimeType || doc?.mime || ''
  return typeof mime === 'string' && mime.startsWith('video/')
}

function getAparatEmbed(doc: any): { iframe?: string | null; url?: string | null } {
  if (!doc || typeof doc !== 'object') return { iframe: null, url: null }
  return {
    iframe: doc.aparatIframe ?? null,
    url: doc.aparatUrl ?? null,
  }
}

function sanitizeIframe(html?: string | null) {
  if (!html) return null
  const trimmed = html.trim()

  if (!trimmed.toLowerCase().startsWith('<iframe')) return null
  if (trimmed.toLowerCase().includes('<script')) return null
  return trimmed
}

type CoverageProps = Extract<NonNullable<Page['layout']>[number], { blockType: 'coverage' }>

function getMediaUrl(img: any): string | null {
  // Works with both populated upload objects and plain ids (in which case we can't render)
  if (!img || typeof img !== 'object') return null
  return img.url || img?.sizes?.card?.url || img?.sizes?.hero?.url || null
}

export default function CoverageBlock(props: CoverageProps) {
  const { title, pickup, branches, image, areasServed, theme } = props
  const style = cssVarStyle(coverageThemeVars(theme as any))

  const imgUrl = getMediaUrl(image as any)
  const hasAreas = !!areasServed?.length
  const branchItems = branches?.items?.filter(Boolean) ?? []

  const mediaDoc = image as any
  const isAparat = mediaDoc?.mediaKind === 'aparat'
  const uploadUrl = getUploadUrl(mediaDoc)
  const aparat = getAparatEmbed(mediaDoc)
  const aparatIframe = sanitizeIframe(aparat.iframe)
  const video = isVideoMime(mediaDoc)

  return (
    <section
      className={`sf-section ${styles.rtl} ${styles.section}`}
      style={style}
      aria-labelledby="coverage-heading"
    >
      <div className="sf-container">
        <header className={styles.header}>
          <div className={styles.headingRow}>
            <div className={styles.iconBadge} aria-hidden="true">
              <MapPinned className={styles.headingIcon} />
            </div>
            <h2 id="coverage-heading" className={styles.title}>
              {title || 'نقاط تحت پوشش'}
            </h2>
          </div>

          {hasAreas ? (
            <p className={styles.sub}>
              برخی از مناطق تحت پوشش (قابل توسعه برای شهرها/محله‌های بیشتر)
            </p>
          ) : null}
        </header>

        <div className={styles.grid}>
          {/* Left/Main content */}
          <div className={styles.stack}>
            <div className={`sf-card ${styles.card}`}>
              <div className={styles.cardTop}>
                <div className={styles.cardIconWrap} aria-hidden="true">
                  <Truck className={styles.cardIcon} />
                </div>
                <div className={styles.cardHead}>
                  <div className={styles.cardTitle}>{pickup?.title || 'پیک رایگان'}</div>
                  {pickup?.description ? (
                    <p className={styles.cardDesc}>{pickup.description}</p>
                  ) : null}
                </div>
              </div>

              <div className={styles.cardMeta}>
                <span className={styles.metaPill}>
                  <Check className={styles.metaIcon} aria-hidden="true" />
                  دریافت و ارسال
                </span>
                <span className={styles.metaPill}>
                  <Check className={styles.metaIcon} aria-hidden="true" />
                  هماهنگی تلفنی
                </span>
              </div>
            </div>

            <div className={`sf-card ${styles.card}`}>
              <div className={styles.cardTop}>
                <div className={styles.cardIconWrap} aria-hidden="true">
                  <Store className={styles.cardIcon} />
                </div>
                <div className={styles.cardHead}>
                  <div className={styles.cardTitle}>{branches?.title || 'شعب حضوری'}</div>
                  <p className={styles.cardDesc}>
                    برای مراجعه حضوری، نزدیک‌ترین شعبه را انتخاب کنید.
                  </p>
                </div>
              </div>

              {!!branchItems.length ? (
                <ul className={styles.branchList}>
                  {branchItems.map((it) => (
                    <li key={it.id ?? it.text} className={styles.branchItem}>
                      <span className={styles.bullet} aria-hidden="true" />
                      <span className={styles.branchText}>{it.text}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className={styles.empty}>هنوز شعبه‌ای ثبت نشده است.</div>
              )}
            </div>

            {hasAreas ? (
              <div className={styles.chipsWrap} aria-label="مناطق تحت پوشش">
                {areasServed!.map((a) => (
                  <span key={a.id ?? a.area} className={styles.chip}>
                    {a.area}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          {/* Right media card */}
          <aside className={`sf-card ${styles.mediaCard}`} aria-label="تصویر پوشش">
            <div className={styles.mediaTop}>
              <div className={styles.mediaTitle}>پوشش خدمات</div>
              <div className={styles.mediaHint}>ارسال از سراسر کشور • پشتیبانی سریع</div>
            </div>

            <div className={styles.media}>
              {isAparat ? (
                aparatIframe ? (
                  <div
                    className={styles.embed}
                    // iframe خام فقط در صورت معتبر بودن (sanitizeIframe)
                    dangerouslySetInnerHTML={{ __html: aparatIframe }}
                  />
                ) : aparat.url ? (
                  <div className={styles.aparatHint}>
                    لینک آپارات ثبت شده است، اما iframe وارد نشده. برای نمایش بهتر، iframe را در
                    Media وارد کنید.
                  </div>
                ) : (
                  <div className={styles.mediaFallback} aria-hidden="true">
                    <div className={styles.fallbackText}>
                      مدیای آپارات انتخاب شده، اما لینک/iframe ثبت نشده است.
                    </div>
                  </div>
                )
              ) : uploadUrl ? (
                video ? (
                  <video className={styles.video} controls preload="metadata">
                    <source src={uploadUrl} />
                    مرورگر شما از پخش ویدئو پشتیبانی نمی‌کند.
                  </video>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className={styles.img}
                    src={uploadUrl}
                    alt={mediaDoc?.alt || title || 'Coverage'}
                    loading="lazy"
                  />
                )
              ) : (
                <div className={styles.mediaFallback} aria-hidden="true">
                  <div className={styles.fallbackIconWrap}>{/* ... همون قبلی */}</div>
                  <div className={styles.fallbackText}>
                    تصویر/ویدئو یا آپارات را از بخش Media انتخاب کنید.
                  </div>
                </div>
              )}
            </div>

            <div className={styles.mediaGlow} aria-hidden="true" />
          </aside>
        </div>
      </div>
    </section>
  )
}
