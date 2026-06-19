import React from 'react'
import styles from './servicesCards1.module.css'
import { ArrowLeft } from 'lucide-react'

type ServiceItem = {
  id?: string
  title: string
  desc: string
  button?: { label?: string; href?: string }
}

type Props = {
  title?: string
  moreLink?: { label?: string; href?: string }
  items: ServiceItem[]
}

export default function ServicesCards1Block({ title, moreLink, items }: Props) {
  if (!items?.length) return null

  return (
    <section className={`sf-section ${styles.section}`} dir="rtl" aria-labelledby="sc1-heading">
      <div className="sf-container">
        <div className={styles.topRow}>
          <h2 id="sc1-heading" className={styles.title}>
            {title || 'خدمات تخصصی'}
          </h2>
          {moreLink?.href && (
            <a href={moreLink.href} className={styles.moreLink}>
              {moreLink.label || 'جزئیات بیشتر'}
              <ArrowLeft className={styles.moreLinkIcon} aria-hidden="true" />
            </a>
          )}
        </div>

        <div className={styles.grid}>
          {items.map((item, idx) => (
            <article
              key={item.id ?? `${idx}-${item.title}`}
              className={`sf-card ${styles.card}`}
            >
              <div className={styles.cardNum} aria-hidden="true">{String(idx + 1).padStart(2, '0')}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
              {item.button?.href && (
                <a href={item.button.href} className={styles.cardBtn}>
                  {item.button.label || 'مشاوره و ثبت سفارش'}
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
