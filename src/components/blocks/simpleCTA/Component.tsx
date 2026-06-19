import React from 'react'
import styles from './simpleCTA.module.css'

type Props = {
  sectionId?: string
  title: string
  desc?: string
  button?: { label?: string; href?: string }
}

export default function SimpleCTABlock({ sectionId, title, desc, button }: Props) {
  return (
    <section
      id={sectionId || undefined}
      className={`sf-section ${styles.section}`}
      dir="rtl"
      aria-labelledby="scta-heading"
    >
      <div className="sf-container">
        <div className={`sf-card ${styles.card}`}>
          <div className={styles.glow} aria-hidden="true" />

          <div className={styles.content}>
            <h2 id="scta-heading" className={styles.title}>{title}</h2>
            {desc && <p className={styles.desc}>{desc}</p>}
          </div>

          {button?.href && (
            <a href={button.href} className={styles.btn}>
              {button.label || 'اقدام کنید'}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
