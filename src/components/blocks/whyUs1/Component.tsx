import React from 'react'
import styles from './whyUs1.module.css'

type Item = { id?: string; title: string; desc: string }

type Props = {
  title?: string
  subtitle?: string
  items: Item[]
}

export default function WhyUs1Block({ title, subtitle, items }: Props) {
  if (!items?.length) return null

  return (
    <section className={`sf-section ${styles.section}`} dir="rtl" aria-labelledby="wu1-heading">
      <div className="sf-container">
        <header className={styles.header}>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          <h2 id="wu1-heading" className={styles.title}>
            {title || 'چرا ما؟'}
          </h2>
          <div className={styles.titleLine} aria-hidden="true" />
        </header>

        <div className={styles.grid}>
          {items.map((item, idx) => (
            <article
              key={item.id ?? `${idx}-${item.title}`}
              className={`sf-card ${styles.card}`}
            >
              <div className={styles.numBadge} aria-hidden="true">
                {String(idx + 1).padStart(2, '0')}
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
              <div className={styles.cardLine} aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
