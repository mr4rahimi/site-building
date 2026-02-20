import React from 'react'
import type { Page } from '@/payload-types'
import styles from './issuesAccordion.module.css'
import { cssVarStyle } from '../_shared/blockTheme'
import { issuesAccordionThemeVars } from '../_shared/issuesAccordionTheme'
import ClientAccordion from './ClientAccordion'
import { Stethoscope } from 'lucide-react'

type Props = Extract<NonNullable<Page['layout']>[number], { blockType: 'issuesAccordion' }>

function clamp(items: any[] = [], max = 50) {
  return items
    .slice(0, max)
    .filter((x) => x?.question && x?.answer)
    .map((x) => ({
      id: x.id ?? null,
      question: x.question,
      answer: x.answer,
      bullets: (x.bullets || []).filter((b: any) => b?.text).slice(0, 12),
    }))
}

export default function IssuesAccordionBlock(props: Props) {
  const { sectionId, title, items, theme, enableFAQSchema } = props as any
  const style = cssVarStyle(issuesAccordionThemeVars(theme as any))

  const safeItems = clamp(items || [])
  if (!safeItems.length) return null

  const faqJsonLd = enableFAQSchema
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: safeItems.map((it: any) => ({
          '@type': 'Question',
          name: it.question,
          acceptedAnswer: { '@type': 'Answer', text: it.answer },
        })),
      }
    : null

  return (
    <section
      id={sectionId || undefined}
      className={`sf-section ${styles.rtl} ${styles.section}`}
      style={style}
      aria-labelledby="isa-heading"
    >
      <div className="sf-container">
        <header className={styles.header}>
          <div className={styles.headIconWrap} aria-hidden="true">
            <Stethoscope className={styles.headIcon} />
          </div>
          <div className={styles.headText}>
            <h2 id="isa-heading" className={styles.title}>
              {title}
            </h2>
            <p className={styles.sub}>پاسخ‌های کوتاه و نکات کلیدی برای تصمیم‌گیری سریع‌تر</p>
          </div>
        </header>

        <ClientAccordion items={safeItems} sectionId={sectionId || 'issues'} defaultOpenIndex={0} />

        {faqJsonLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        ) : null}
      </div>
    </section>
  )
}
