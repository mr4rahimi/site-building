import React from 'react'
import type { Page } from '@/payload-types'
import styles from './landingHeroImage.module.css'
import { cssVarStyle } from '../_shared/blockTheme'
import { landingHeroImageThemeVars } from '../_shared/landingHeroImageTheme'
import { ArrowLeft, PhoneCall, Image as ImageIcon, PlayCircle } from 'lucide-react'

type Props = Extract<NonNullable<Page['layout']>[number], { blockType: 'landingHeroImage' }>

function getUploadUrl(doc: any): string | null {
  if (!doc || typeof doc !== 'object') return null
  return doc.url || doc?.sizes?.hero?.url || doc?.sizes?.card?.url || null
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

export default function LandingHeroImageBlock(props: Props) {
  const { kicker, title, description, heroImage, primaryButton, secondaryButton, pills, theme } =
    props as any
  const style = cssVarStyle(landingHeroImageThemeVars(theme as any))

  const descLines = (description || []).map((d: any) => d?.text).filter(Boolean)
  const pillItems = (pills || []).map((p: any) => p?.text).filter(Boolean)

  const pLabel = primaryButton?.label || 'تماس مستقیم'
  const pHref = primaryButton?.href || 'tel:02191300348'
  const sLabel = secondaryButton?.label || 'مشاهده خدمات'
  const sHref = secondaryButton?.href || '#services'

  const mediaDoc = heroImage as any
  const isAparat = mediaDoc?.mediaKind === 'aparat'
  const uploadUrl = getUploadUrl(mediaDoc)
  const aparat = getAparatEmbed(mediaDoc)
  const aparatIframe = sanitizeIframe(aparat.iframe)
  const video = isVideoMime(mediaDoc)

  return (
    <section
      className={`sf-section ${styles.rtl} ${styles.section}`}
      style={style}
      aria-labelledby="lhi-heading"
    >
      <div className="sf-container">
        <div className={styles.hero}>
          {/* Poster image */}
          <div className={styles.poster} aria-label="تصویر هدر">
            <div className={styles.overlay} aria-hidden="true" />

            {isAparat ? (
              aparatIframe ? (
                <div className={styles.embed} dangerouslySetInnerHTML={{ __html: aparatIframe }} />
              ) : aparat.url ? (
                <div className={styles.fallback}>
                  <PlayCircle className={styles.fallbackIcon} aria-hidden="true" />
                  <div className={styles.fallbackTitle}>ویدئوی آپارات</div>
                  <div className={styles.fallbackText}>
                    برای نمایش بهتر، iframe را در Media وارد کنید.
                  </div>
                </div>
              ) : (
                <div className={styles.fallback}>
                  <PlayCircle className={styles.fallbackIcon} aria-hidden="true" />
                  <div className={styles.fallbackTitle}>مدیای آپارات</div>
                  <div className={styles.fallbackText}>لینک/iframe ثبت نشده است.</div>
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
                  loading="eager"
                />
              )
            ) : (
              <div className={styles.fallback}>
                <ImageIcon className={styles.fallbackIcon} aria-hidden="true" />
                <div className={styles.fallbackTitle}>تصویر انتخاب نشده</div>
                <div className={styles.fallbackText}>از Media یک تصویر/ویدئو انتخاب کنید.</div>
              </div>
            )}
          </div>

          {/* Glass panel */}
          <div className={`sf-card ${styles.panel}`}>
            {kicker ? <div className={styles.kicker}>{kicker}</div> : null}

            <h1 id="lhi-heading" className={styles.title}>
              {title}
            </h1>

            {descLines.length ? (
              <div className={styles.desc}>
                {descLines.map((t: string, i: number) => (
                  <p key={i} className={styles.descLine}>
                    {t}
                  </p>
                ))}
              </div>
            ) : null}

            <div className={styles.actions}>
              <a className={styles.primaryBtn} href={pHref}>
                <span className={styles.pIcon} aria-hidden="true">
                  <PhoneCall className={styles.pIconSvg} />
                </span>
                <span className={styles.pText}>{pLabel}</span>
                <span className={styles.pArrow} aria-hidden="true">
                  <ArrowLeft className={styles.pArrowSvg} />
                </span>
              </a>

              <a className={styles.secondaryBtn} href={sHref}>
                {sLabel}
              </a>
            </div>

            {pillItems.length ? (
              <div className={styles.pills} aria-label="ویژگی‌ها">
                {pillItems.map((t: string, i: number) => (
                  <span key={`${i}-${t}`} className={styles.pill}>
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
