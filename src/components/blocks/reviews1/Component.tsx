import React from 'react'
import styles from './reviews1.module.css'

type Item = { id?: string; name: string; text: string }

type Props = {
  title?: string
  subtitle?: string
  hint?: string
  items: Item[]
}

function StarRating() {
  return (
    <div className={styles.stars} aria-label="امتیاز ۵ از ۵" role="img">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={styles.star}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Reviews1Block({ title, subtitle, hint, items }: Props) {
  if (!items?.length) return null

  return (
    <section className={`sf-section ${styles.section}`} dir="rtl" aria-labelledby="rv1-heading">
      <div className="sf-container">
        <header className={styles.header}>
          <h2 id="rv1-heading" className={styles.title}>
            {title || 'نظرات کاربران'}
          </h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </header>

        <div className={styles.trackWrapper} aria-label="نظرات مشتریان">
          <div className={styles.track}>
            {items.map((item, idx) => (
              <figure
                key={item.id ?? `${idx}-${item.name}`}
                className={`sf-card ${styles.card}`}
              >
                <StarRating />
                <blockquote className={styles.quote}>
                  <p className={styles.reviewText}>{item.text}</p>
                </blockquote>
                <figcaption className={styles.reviewer}>
                  <div className={styles.avatar} aria-hidden="true">
                    {item.name.charAt(0)}
                  </div>
                  <span className={styles.name}>{item.name}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {hint && <p className={styles.hint}>{hint}</p>}
      </div>
    </section>
  )
}
