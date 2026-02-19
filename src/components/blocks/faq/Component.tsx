import React from 'react'
import type { Page } from '@/payload-types'
import styles from './faq.module.css'
import { cssVarStyle } from '../_shared/blockTheme'
import { faqThemeVars } from '../_shared/faqTheme'
import { HelpCircle, Plus } from 'lucide-react'

type FAQProps = Extract<NonNullable<Page['layout']>[number], { blockType: 'faq' }>

export default function FAQBlock(props: FAQProps) {
  const { title, items, theme } = props
  const style = cssVarStyle(faqThemeVars(theme as any))

  if (!items?.length) return null

  const safeItems = (items || []).filter((x) => x?.question && x?.answer).slice(0, 50)

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: safeItems.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: it.answer,
      },
    })),
  }

  return (
    <section
      className={`sf-section ${styles.rtl} ${styles.section}`}
      style={style}
      aria-labelledby="faq-heading"
    >
      <div className="sf-container">
        <header className={styles.header}>
          <div className={styles.headRow}>
            <div className={styles.iconBadge} aria-hidden="true">
              <HelpCircle className={styles.headIcon} />
            </div>
            <h2 id="faq-heading" className={styles.title}>
              {title || 'سوالات متداول'}
            </h2>
          </div>
          <p className={styles.sub}>پاسخ سوالات رایج درباره روند تعمیر، هزینه و زمان تحویل.</p>
        </header>

        <div className={styles.list}>
          {items.map((it, idx) => (
            <details key={it.id ?? `${idx}-${it.question}`} className={`sf-card ${styles.item}`}>
              <summary className={styles.summary}>
                <span className={styles.q}>{it.question}</span>
                <span className={styles.plus} aria-hidden="true">
                  <Plus className={styles.plusIcon} />
                </span>
              </summary>

              <div className={styles.answerWrap}>
                <p className={styles.answer}>{it.answer}</p>
              </div>
            </details>
          ))}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </div>
    </section>
  )
}
