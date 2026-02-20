import React from 'react'
import type { Page } from '@/payload-types'
import styles from './imageWithFeatureList.module.css'
import { cssVarStyle } from '../_shared/blockTheme'
import { imageWithFeatureListThemeVars } from '../_shared/imageWithFeatureListTheme'
import { CheckCircle2, Image as ImageIcon, PlayCircle } from 'lucide-react'

type Props = Extract<NonNullable<Page['layout']>[number], { blockType: 'imageWithFeatureList' }>

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

export default function ImageWithFeatureListBlock(props: Props) {
  const { sectionId, image, imageCaption, title, features, theme } = props as any
  const style = cssVarStyle(imageWithFeatureListThemeVars(theme as any))

  const mediaDoc = image as any
  const isAparat = mediaDoc?.mediaKind === 'aparat'
  const uploadUrl = getUploadUrl(mediaDoc)
  const aparat = getAparatEmbed(mediaDoc)
  const aparatIframe = sanitizeIframe(aparat.iframe)
  const video = isVideoMime(mediaDoc)

  const list = (features || []).filter(Boolean)
  if (!list.length) return null

  return (
    <section
      id={sectionId || undefined}
      className={`sf-section ${styles.rtl} ${styles.section}`}
      style={style}
      aria-labelledby="iwfl-heading"
    >
      <div className="sf-container">
        <div className={styles.wrap}>
          {/* Media side */}
          <aside className={`sf-card ${styles.mediaCard}`} aria-label="تصویر">
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
                    loading="lazy"
                  />
                )
              ) : (
                <div className={styles.fallback}>
                  <ImageIcon className={styles.fallbackIcon} aria-hidden="true" />
                  <div className={styles.fallbackTitle}>تصویر انتخاب نشده</div>
                  <div className={styles.fallbackText}>
                    از بخش Media یک تصویر/ویدئو انتخاب کنید.
                  </div>
                </div>
              )}
            </div>

            {imageCaption ? <div className={styles.caption}>{imageCaption}</div> : null}
          </aside>

          {/* Content side */}
          <div className={styles.content}>
            <h2 id="iwfl-heading" className={styles.title}>
              {title}
            </h2>

            <div className={styles.timeline} role="list" aria-label="ویژگی‌ها">
              {list.map((f: any, idx: number) => (
                <div key={f.id ?? `${idx}-${f.title}`} className={styles.row} role="listitem">
                  <div className={styles.dotCol} aria-hidden="true">
                    <div className={styles.dot} />
                    {idx !== list.length - 1 ? <div className={styles.line} /> : null}
                  </div>

                  <div className={`sf-card ${styles.featureCard}`}>
                    <div className={styles.featureTop}>
                      <CheckCircle2 className={styles.check} aria-hidden="true" />
                      <div className={styles.featureTitle}>{f.title}</div>
                    </div>
                    {f.desc ? <p className={styles.featureDesc}>{f.desc}</p> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.glow} aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
