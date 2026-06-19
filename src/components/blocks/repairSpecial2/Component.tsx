import React from 'react'
import styles from './repairSpecial2.module.css'
import { CheckCircle2, Image as ImageIcon } from 'lucide-react'

type ContentBlock = { id?: string; title: string; body: string }
type ListItem = { id?: string; text: string }

type Props = {
  variant?: string
  title: string
  heroImage?: any
  sideImage?: any
  caption?: string
  intro?: { headline?: string; p1?: string; p2?: string }
  serviceListTitle?: string
  serviceList?: ListItem[]
  contentBlocks?: ContentBlock[]
  processStepsTitle?: string
  processSteps?: ListItem[]
}

function getUploadUrl(doc: any): string | null {
  if (!doc || typeof doc !== 'object') return null
  return doc.url || doc?.sizes?.hero?.url || null
}

function ImageOrPlaceholder({
  doc,
  alt,
  className,
  loading = 'lazy',
}: {
  doc: any
  alt: string
  className: string
  loading?: 'lazy' | 'eager'
}) {
  const url = getUploadUrl(doc)
  if (url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={url} alt={doc?.alt || alt} className={className} loading={loading} />
  }
  return (
    <div className={`${className} ${styles.imgPlaceholder}`} aria-hidden="true">
      <ImageIcon className={styles.imgPlaceholderIcon} />
    </div>
  )
}

export default function RepairSpecial2Block({
  title,
  heroImage,
  sideImage,
  caption,
  intro,
  serviceListTitle,
  serviceList,
  contentBlocks,
  processStepsTitle,
  processSteps,
}: Props) {
  const serviceItems = (serviceList || []).filter((i) => i?.text)
  const blocks = (contentBlocks || []).filter((b) => b?.title && b?.body)
  const processItems = (processSteps || []).filter((s) => s?.text)

  return (
    <section
      className={`sf-section ${styles.section}`}
      dir="rtl"
      aria-labelledby="rs2-heading"
    >
      <div className="sf-container">
        <div className={styles.layout}>
          {/* Left: content */}
          <div className={styles.contentCol}>
            <h2 id="rs2-heading" className={styles.mainTitle}>{title}</h2>

            {/* Intro */}
            {(intro?.headline || intro?.p1 || intro?.p2) && (
              <div className={styles.intro}>
                {intro.headline && (
                  <h3 className={styles.introHeadline}>{intro.headline}</h3>
                )}
                {intro.p1 && <p className={styles.introPara}>{intro.p1}</p>}
                {intro.p2 && <p className={styles.introPara}>{intro.p2}</p>}
              </div>
            )}

            {/* Service list */}
            {serviceItems.length > 0 && (
              <div className={styles.serviceList}>
                {serviceListTitle && (
                  <h4 className={styles.listTitle}>{serviceListTitle}</h4>
                )}
                <ul className={styles.checkList} role="list">
                  {serviceItems.map((item, idx) => (
                    <li key={item.id ?? `${idx}-${item.text}`} className={styles.checkItem}>
                      <CheckCircle2 className={styles.checkIcon} aria-hidden="true" />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Content blocks */}
            {blocks.length > 0 && (
              <div className={styles.contentBlocks}>
                {blocks.map((block, idx) => (
                  <div
                    key={block.id ?? `${idx}-${block.title}`}
                    className={`sf-card ${styles.contentBlock}`}
                  >
                    <h4 className={styles.blockTitle}>{block.title}</h4>
                    <p className={styles.blockBody}>{block.body}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Process steps */}
            {processItems.length > 0 && (
              <div className={styles.processSection}>
                {processStepsTitle && (
                  <h4 className={styles.listTitle}>{processStepsTitle}</h4>
                )}
                <ol className={styles.processList} role="list">
                  {processItems.map((step, idx) => (
                    <li key={step.id ?? `${idx}-${step.text}`} className={styles.processItem}>
                      <div className={styles.processNum} aria-hidden="true">{idx + 1}</div>
                      <span className={styles.processText}>{step.text}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* Right: sticky images */}
          <div className={styles.imagesCol}>
            <div className={styles.stickyImages}>
              <figure className={`sf-card ${styles.heroImgCard}`}>
                <ImageOrPlaceholder
                  doc={heroImage}
                  alt={title}
                  className={styles.heroImg}
                  loading="eager"
                />
                {caption && (
                  <figcaption className={styles.caption}>{caption}</figcaption>
                )}
              </figure>

              <figure className={`sf-card ${styles.sideImgCard}`}>
                <ImageOrPlaceholder
                  doc={sideImage}
                  alt={`تصویر کناری - ${title}`}
                  className={styles.sideImg}
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
