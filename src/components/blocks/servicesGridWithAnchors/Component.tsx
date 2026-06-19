import React from 'react'
import styles from './servicesGridWithAnchors.module.css'
import { Grid2X2 } from 'lucide-react'

type GridItem = {
  id?: string
  title: string
  desc?: string
  iconImage?: any
  href: string
}

type Props = {
  sectionId?: string
  title: string
  intro?: string
  items: GridItem[]
}

function getIconUrl(doc: any): string | null {
  if (!doc || typeof doc !== 'object') return null
  return doc.url || doc?.sizes?.thumbnail?.url || null
}

export default function ServicesGridWithAnchorsBlock({ sectionId, title, intro, items }: Props) {
  if (!items?.length) return null

  return (
    <section
      id={sectionId || undefined}
      className={`sf-section ${styles.section}`}
      dir="rtl"
      aria-labelledby="sga-heading"
    >
      <div className="sf-container">
        <header className={styles.header}>
          <h2 id="sga-heading" className={styles.title}>{title}</h2>
          {intro && <p className={styles.intro}>{intro}</p>}
        </header>

        <nav className={styles.grid} aria-label="لیست خدمات">
          {items.map((item, idx) => {
            const iconUrl = getIconUrl(item.iconImage)
            return (
              <a
                key={item.id ?? `${idx}-${item.title}`}
                href={item.href}
                className={`sf-card ${styles.anchor}`}
                aria-label={item.title}
              >
                <div className={styles.iconBox} aria-hidden="true">
                  {iconUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={iconUrl}
                      alt=""
                      className={styles.iconImg}
                      width={32}
                      height={32}
                    />
                  ) : (
                    <Grid2X2 className={styles.iconFallback} />
                  )}
                </div>
                <div className={styles.anchorContent}>
                  <span className={styles.anchorTitle}>{item.title}</span>
                  {item.desc && <span className={styles.anchorDesc}>{item.desc}</span>}
                </div>
                <div className={styles.anchorArrow} aria-hidden="true">↓</div>
              </a>
            )
          })}
        </nav>
      </div>
    </section>
  )
}
