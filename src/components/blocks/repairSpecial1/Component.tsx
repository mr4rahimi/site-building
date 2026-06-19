import React from 'react'
import styles from './repairSpecial1.module.css'
import { CheckCircle2, Image as ImageIcon, PhoneCall } from 'lucide-react'

type SideCardItem = { id?: string; title: string; desc?: string }

type Props = {
  variant?: string
  backgroundImage?: any
  badgeText?: string
  title: string
  description?: string
  bullets?: { id?: string; text: string }[]
  sideCard?: {
    kicker?: string
    headline?: string
    items?: SideCardItem[]
    phoneCta?: { label?: string; tel?: string }
  }
}

function getUploadUrl(doc: any): string | null {
  if (!doc || typeof doc !== 'object') return null
  return doc.url || doc?.sizes?.hero?.url || null
}

export default function RepairSpecial1Block({
  backgroundImage,
  badgeText,
  title,
  description,
  bullets,
  sideCard,
}: Props) {
  const bgUrl = getUploadUrl(backgroundImage)
  const bulletItems = (bullets || []).filter((b) => b?.text)
  const cardItems = (sideCard?.items || []).filter((i) => i?.title)
  const tel = sideCard?.phoneCta?.tel
  const telHref = tel ? `tel:${tel.replace(/\s/g, '')}` : undefined

  return (
    <section
      className={`sf-section ${styles.section}`}
      dir="rtl"
      aria-labelledby="rs1-sp-heading"
    >
      <div className="sf-container">
        <div className={styles.layout}>
          {/* Left: image + content */}
          <div className={styles.imageWrap}>
            {bgUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={bgUrl}
                alt={backgroundImage?.alt || title}
                className={styles.bgImg}
                loading="lazy"
              />
            ) : (
              <div className={styles.imgFallback} aria-hidden="true">
                <ImageIcon className={styles.imgFallbackIcon} />
              </div>
            )}
            <div className={styles.overlay} aria-hidden="true" />

            <div className={styles.imageContent}>
              {badgeText && (
                <div className={styles.badge}>{badgeText}</div>
              )}
              <h2 id="rs1-sp-heading" className={styles.title}>{title}</h2>
              {description && (
                <p className={styles.description}>{description}</p>
              )}
              {bulletItems.length > 0 && (
                <ul className={styles.bullets} aria-label="ویژگی‌ها">
                  {bulletItems.map((b, idx) => (
                    <li key={b.id ?? `${idx}-${b.text}`} className={styles.bullet}>
                      <CheckCircle2 className={styles.bulletIcon} aria-hidden="true" />
                      <span>{b.text}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Right: side card */}
          {sideCard && (
            <aside className={`sf-card ${styles.sideCard}`}>
              {sideCard.kicker && (
                <p className={styles.kicker}>{sideCard.kicker}</p>
              )}
              {sideCard.headline && (
                <h3 className={styles.headline}>{sideCard.headline}</h3>
              )}

              {cardItems.length > 0 && (
                <ul className={styles.cardItems} role="list">
                  {cardItems.map((item, idx) => (
                    <li key={item.id ?? `${idx}-${item.title}`} className={styles.cardItem}>
                      <div className={styles.cardItemDot} aria-hidden="true">
                        <span>{idx + 1}</span>
                      </div>
                      <div className={styles.cardItemContent}>
                        <strong className={styles.cardItemTitle}>{item.title}</strong>
                        {item.desc && (
                          <span className={styles.cardItemDesc}>{item.desc}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {telHref && (
                <a href={telHref} className={styles.phoneBtn}>
                  <PhoneCall className={styles.phoneBtnIcon} aria-hidden="true" />
                  <span>{sideCard.phoneCta?.label || 'تماس بگیرید'}</span>
                </a>
              )}
            </aside>
          )}
        </div>
      </div>
    </section>
  )
}
