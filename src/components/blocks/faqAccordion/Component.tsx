import React from 'react'
import type { Page } from '@/payload-types'
import styles from './faqAccordion.module.css'
import { cssVarStyle } from '../_shared/blockTheme'
import { faqAccordionThemeVars } from '../_shared/faqAccordionTheme'
import { HelpCircle } from 'lucide-react'
import ClientAccordion from './ClientAccordion'

type Props = Extract<NonNullable<Page['layout']>[number], { blockType: 'faqAccordion' }>

function clampItems(items: Array<{ id?: string | null; q: string; a: string }> = [], max = 50) {
  return items.slice(0, max).filter((x) => x?.q && x?.a)
}

export default function FAQAccordionBlock(props: Props) {
  const { sectionId, title, items, theme } = props
  const style = cssVarStyle(faqAccordionThemeVars(theme as any))

  const safeItems = clampItems((items as any) || [])
  if (!safeItems.length) return null

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: safeItems.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  }

  return (
    <section
      id={sectionId || undefined}
      className={`sf-section ${styles.rtl} ${styles.section}`}
      style={style}
      aria-labelledby="fqa-heading"
    >
      <div className="sf-container">
        <header className={styles.header}>
          <div className={styles.headRow}>
            <div className={styles.iconBadge} aria-hidden="true">
              <HelpCircle className={styles.headIcon} />
            </div>
            <div className={styles.headText}>
              <h2 id="fqa-heading" className={styles.title}>
                {title}
              </h2>
              <p className={styles.sub}>برای مشاهده پاسخ، روی سوال کلیک کنید.</p>
            </div>
          </div>
        </header>

        <ClientAccordion items={safeItems} sectionId={sectionId || 'faq'} defaultOpenIndex={0} />

        {/* SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </div>
    </section>
  )
}
