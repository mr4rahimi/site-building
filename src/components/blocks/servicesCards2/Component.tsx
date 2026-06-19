import React from 'react'
import styles from './servicesCards2.module.css'
import { ArrowLeft, ChevronDown } from 'lucide-react'

type ServiceItem = {
  id?: string
  title: string
  desc: string
  href: string
  ctaLabel?: string
}

type Props = {
  title?: string
  moreLink?: { label?: string; href?: string }
  items: ServiceItem[]
}

export default function ServicesCards2Block({ title, moreLink, items }: Props) {
  if (!items?.length) return null

  return (
    <section className={`sf-section ${styles.section}`} dir="rtl" aria-labelledby="sc2-heading">
      <div className="sf-container">
        <div className={styles.topRow}>
          <h2 id="sc2-heading" className={styles.title}>
            {title || 'خدمات'}
          </h2>
          {moreLink?.href && (
            <a href={moreLink.href} className={styles.moreLink}>
              {moreLink.label || 'صفحه خدمات'}
              <ArrowLeft className={styles.moreLinkIcon} aria-hidden="true" />
            </a>
          )}
        </div>

        <div className={styles.grid}>
          {items.map((item, idx) => (
            <a
              key={item.id ?? `${idx}-${item.title}`}
              href={item.href}
              className={`sf-card ${styles.card}`}
              aria-label={item.title}
            >
              <div className={styles.cardInner}>
                <div className={styles.accent} aria-hidden="true" />
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
                <div className={styles.cta}>
                  <span className={styles.ctaLabel}>
                    {item.ctaLabel || 'مشاهده جزئیات'}
                  </span>
                  <ChevronDown className={styles.ctaIcon} aria-hidden="true" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
