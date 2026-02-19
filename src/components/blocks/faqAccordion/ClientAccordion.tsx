'use client'

import React from 'react'
import styles from './faqAccordion.module.css'
import { ChevronDown } from 'lucide-react'

type Item = { id?: string | null; q: string; a: string }

export default function ClientAccordion({
  items,
  sectionId,
  defaultOpenIndex = 0,
}: {
  items: Item[]
  sectionId?: string
  defaultOpenIndex?: number
}) {
  const [openIndex, setOpenIndex] = React.useState<number>(defaultOpenIndex)

  React.useEffect(() => {
    if (openIndex >= items.length) setOpenIndex(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length])

  return (
    <div className={styles.list} role="region" aria-label="سوالات متداول">
      {items.map((it, idx) => {
        const isOpen = idx === openIndex
        const qId = `fqa-q-${sectionId || 'faq'}-${idx}`
        const aId = `fqa-a-${sectionId || 'faq'}-${idx}`

        return (
          <div key={it.id ?? `${idx}-${it.q}`} className={`sf-card ${styles.item}`}>
            <button
              type="button"
              className={styles.trigger}
              aria-expanded={isOpen}
              aria-controls={aId}
              id={qId}
              onClick={() => setOpenIndex((cur) => (cur === idx ? -1 : idx))}
            >
              <span className={styles.q}>{it.q}</span>
              <span
                className={`${styles.chev} ${isOpen ? styles.chevOpen : ''}`}
                aria-hidden="true"
              >
                <ChevronDown className={styles.chevIcon} />
              </span>
            </button>

            <div
              id={aId}
              role="region"
              aria-labelledby={qId}
              className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
            >
              <div className={styles.panelInner}>
                <p className={styles.answer}>{it.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
