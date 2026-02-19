import React from 'react'
import type { Page } from '@/payload-types'
import styles from './coverageWithBranches.module.css'
import { cssVarStyle } from '../_shared/blockTheme'
import { coverageWithBranchesThemeVars } from '../_shared/coverageWithBranchesTheme'
import { MapPinned, MapPin, ArrowLeft, CheckCircle2, PhoneCall } from 'lucide-react'

type Props = Extract<NonNullable<Page['layout']>[number], { blockType: 'coverageWithBranches' }>

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
  return { iframe: doc.aparatIframe ?? null, url: doc.aparatUrl ?? null }
}

function sanitizeIframe(html?: string | null) {
  if (!html) return null
  const t = html.trim()
  if (!t.toLowerCase().startsWith('<iframe')) return null
  if (t.toLowerCase().includes('<script')) return null
  return t
}

export default function CoverageWithBranchesBlock(props: Props) {
  const { sectionId, title, description, branchesTitle, branches, image, cta, theme } = props
  const style = cssVarStyle(coverageWithBranchesThemeVars(theme as any))

  const mediaDoc = image as any
  const isAparat = mediaDoc?.mediaKind === 'aparat'
  const uploadUrl = getUploadUrl(mediaDoc)
  const aparat = getAparatEmbed(mediaDoc)
  const aparatIframe = sanitizeIframe(aparat.iframe)
  const video = isVideoMime(mediaDoc)

  const descItems = description?.filter(Boolean) ?? []
  const branchItems = branches?.filter(Boolean) ?? []

  return (
    <section
      id={sectionId || undefined}
      className={`sf-section ${styles.rtl} ${styles.section}`}
      style={style}
      aria-labelledby="cwb-heading"
    >
      <div className="sf-container">
        <div className={styles.shell}>
          <div className={styles.glow} aria-hidden="true" />
          <div className={styles.noise} aria-hidden="true" />

          <div className={styles.grid}>
            {/* Content */}
            <div className={styles.content}>
              <div className={styles.kicker}>
                <span className={styles.kdot} aria-hidden="true" />
                <span className={styles.ktext}>پوشش خدمات و شعب</span>
              </div>

              <h2 id="cwb-heading" className={styles.title}>
                {title}
              </h2>

              {!!descItems.length ? (
                <div className={styles.desc}>
                  {descItems.map((d) => (
                    <div key={d.id ?? d.text} className={styles.descRow}>
                      <CheckCircle2 className={styles.descIcon} aria-hidden="true" />
                      <p className={styles.descText}>{d.text}</p>
                    </div>
                  ))}
                </div>
              ) : null}

              {cta?.href ? (
                <div className={styles.ctaRow}>
                  <a className={styles.ctaBtn} href={cta.href}>
                    <span className={styles.ctaIconWrap} aria-hidden="true">
                      <PhoneCall className={styles.ctaIcon} />
                    </span>
                    <span className={styles.ctaLabel}>
                      {cta.label || 'ثبت سفارش و اعزام پیک رایگان'}
                    </span>
                    <span className={styles.ctaArrow} aria-hidden="true">
                      <ArrowLeft className={styles.ctaArrowIcon} />
                    </span>
                  </a>
                </div>
              ) : null}
            </div>

            {/* Media */}
            <aside className={`sf-card ${styles.mediaCard}`} aria-label="رسانه">
              <div className={styles.mediaTop}>
                <div className={styles.mediaTitle}>نقشه و محدوده خدمات</div>
                <div className={styles.mediaHint}>پیک • مراجعه حضوری • ارسال از سراسر کشور</div>
              </div>

              <div className={styles.media}>
                {isAparat ? (
                  aparatIframe ? (
                    <div
                      className={styles.embed}
                      dangerouslySetInnerHTML={{ __html: aparatIframe }}
                    />
                  ) : aparat.url ? (
                    <div className={styles.aparatHint}>
                      لینک آپارات ثبت شده است؛ برای نمایش بهتر، iframe را در Media وارد کنید.
                    </div>
                  ) : (
                    <div className={styles.mediaFallback}>
                      <div className={styles.fallbackIconWrap} aria-hidden="true">
                        <MapPinned className={styles.fallbackIcon} />
                      </div>
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
                      alt={mediaDoc?.alt || title}
                      loading="lazy"
                    />
                  )
                ) : (
                  <div className={styles.mediaFallback}>
                    <div className={styles.fallbackIconWrap} aria-hidden="true">
                      <MapPinned className={styles.fallbackIcon} />
                    </div>
                    <div className={styles.fallbackText}>
                      یک تصویر/ویدئو یا آپارات از بخش Media انتخاب کنید.
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.mediaGlow} aria-hidden="true" />
            </aside>
          </div>

          {/* Branches */}
          <div className={styles.branchesWrap}>
            <div className={styles.brHeader}>
              <div className={styles.brTitleRow}>
                <div className={styles.brIconBadge} aria-hidden="true">
                  <MapPin className={styles.brIcon} />
                </div>
                <h3 className={styles.brTitle}>{branchesTitle || 'آدرس شعب حضوری'}</h3>
              </div>
              <div className={styles.brHint}>آدرس‌ها و اطلاعات مراجعه حضوری</div>
            </div>

            <div className={styles.brGrid}>
              {branchItems.map((b) => (
                <article
                  key={b.id ?? `${b.title}-${b.address}`}
                  className={`sf-card ${styles.brCard}`}
                >
                  <div className={styles.brCardTop}>
                    <div className={styles.brCardIconWrap} aria-hidden="true" />
                    <div className={styles.brCardHead}>
                      <div className={styles.brCardTitle}>{b.title}</div>
                      <address className={styles.brCardAddr}>{b.address}</address>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
