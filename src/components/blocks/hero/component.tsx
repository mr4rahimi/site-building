import React from 'react'
import type { Page } from '@/payload-types'
import styles from './hero.module.css'
import { cssVarStyle } from '../_shared/blockTheme'
import { heroThemeVars } from '../_shared/heroTheme'
import { ArrowLeft, Sparkles, PlayCircle, Image as ImageIcon } from 'lucide-react'

type Props = Extract<NonNullable<Page['layout']>[number], { blockType: 'hero' }>

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

export default function HeroBlock(props: Props) {
  const { headline, subheadline, badgeText, image, primaryCta, secondaryCta, theme } = props as any
  const style = cssVarStyle(heroThemeVars(theme as any))

  const mediaDoc = image as any
  const isAparat = mediaDoc?.mediaKind === 'aparat'
  const uploadUrl = getUploadUrl(mediaDoc)
  const aparat = getAparatEmbed(mediaDoc)
  const aparatIframe = sanitizeIframe(aparat.iframe)
  const video = isVideoMime(mediaDoc)

  const pLabel = primaryCta?.label || 'ثبت سفارش'
  const pHref = primaryCta?.href || '#contact'
  const sLabel = secondaryCta?.label || ''
  const sHref = secondaryCta?.href || ''

  return (
    <section
      className={`sf-section ${styles.rtl} ${styles.section}`}
      style={style}
      aria-labelledby="hero-heading"
    >
      <div className="sf-container">
        <div className={styles.wrap}>
          <div className={styles.glow} aria-hidden="true" />
          <div className={styles.noise} aria-hidden="true" />

          {/* content */}
          <div className={styles.content}>
            {badgeText ? (
              <div className={styles.badge}>
                <Sparkles className={styles.badgeIcon} aria-hidden="true" />
                <span>{badgeText}</span>
              </div>
            ) : null}

            <h1 id="hero-heading" className={styles.headline}>
              {headline}
            </h1>

            {subheadline ? <p className={styles.sub}>{subheadline}</p> : null}

            <div className={styles.actions}>
              <a className={styles.primaryBtn} href={pHref}>
                <span className={styles.primaryText}>{pLabel}</span>
                <span className={styles.arrow} aria-hidden="true">
                  <ArrowLeft className={styles.arrowIcon} />
                </span>
              </a>

              {sLabel && sHref ? (
                <a className={styles.secondaryBtn} href={sHref}>
                  {sLabel}
                </a>
              ) : null}
            </div>

            <div className={styles.trustRow} aria-label="مزایا">
              <span className={styles.trustPill}>گارانتی خدمات</span>
              <span className={styles.trustPill}>پیک رایگان</span>
              <span className={styles.trustPill}>قطعات اصلی</span>
            </div>
          </div>

          {/* media */}
          <aside className={`sf-card ${styles.mediaCard}`} aria-label="رسانه">
            <div className={styles.mediaFrame}>
              {isAparat ? (
                aparatIframe ? (
                  <div
                    className={styles.embed}
                    dangerouslySetInnerHTML={{ __html: aparatIframe }}
                  />
                ) : aparat.url ? (
                  <div className={styles.fallback}>
                    <PlayCircle className={styles.fallbackIcon} aria-hidden="true" />
                    <div className={styles.fallbackTitle}>ویدئوی آپارات</div>
                    <div className={styles.fallbackText}>
                      iframe تنظیم نشده. برای نمایش بهتر، iframe را در Media وارد کنید.
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
                    alt={mediaDoc?.alt || headline}
                    loading="eager"
                  />
                )
              ) : (
                <div className={styles.fallback}>
                  <ImageIcon className={styles.fallbackIcon} aria-hidden="true" />
                  <div className={styles.fallbackTitle}>تصویر/ویدئو Hero</div>
                  <div className={styles.fallbackText}>
                    از بخش Media یک تصویر یا ویدئو انتخاب کنید.
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
