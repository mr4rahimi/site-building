import React from 'react'
import styles from './serviceDetailSection.module.css'
import { Image as ImageIcon } from 'lucide-react'

type ContentItem = { id?: string; text: string }
type PillItem = { id?: string; text: string }

type Props = {
  sectionId: string
  title: string
  content?: ContentItem[]
  image?: any
  pills?: PillItem[]
  layout?: 'imageRight' | 'imageLeft'
}

function getUploadUrl(doc: any): string | null {
  if (!doc || typeof doc !== 'object') return null
  return doc.url || doc?.sizes?.hero?.url || doc?.sizes?.card?.url || null
}

export default function ServiceDetailSectionBlock({
  sectionId,
  title,
  content,
  image,
  pills,
  layout = 'imageRight',
}: Props) {
  const uploadUrl = getUploadUrl(image)
  const paragraphs = (content || []).filter((c) => c?.text).map((c) => c.text)
  const pillItems = (pills || []).filter((p) => p?.text).map((p) => p.text)
  const hasImage = !!uploadUrl
  const imageOnRight = layout === 'imageRight'

  return (
    <section
      id={sectionId || undefined}
      className={`sf-section ${styles.section}`}
      dir="rtl"
      aria-labelledby={`sds-${sectionId}-heading`}
    >
      <div className="sf-container">
        <div
          className={`${styles.layout} ${imageOnRight ? styles.imgRight : styles.imgLeft}`}
        >
          {/* Content */}
          <div className={styles.content}>
            <h2 id={`sds-${sectionId}-heading`} className={styles.title}>{title}</h2>

            {paragraphs.length > 0 && (
              <div className={styles.paragraphs}>
                {paragraphs.map((p, idx) => (
                  <p key={idx} className={styles.paragraph}>{p}</p>
                ))}
              </div>
            )}

            {pillItems.length > 0 && (
              <div className={styles.pills} aria-label="برچسب‌ها">
                {pillItems.map((text, idx) => (
                  <span key={idx} className={styles.pill}>{text}</span>
                ))}
              </div>
            )}
          </div>

          {/* Image */}
          {hasImage ? (
            <aside className={`sf-card ${styles.imageCard}`} aria-label="تصویر سرویس">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={uploadUrl!}
                alt={image?.alt || title}
                className={styles.img}
                loading="lazy"
              />
            </aside>
          ) : null}

          {!hasImage && (
            <aside className={`sf-card ${styles.imagePlaceholder}`} aria-hidden="true">
              <ImageIcon className={styles.placeholderIcon} />
              <span>تصویری انتخاب نشده</span>
            </aside>
          )}
        </div>
      </div>
    </section>
  )
}
