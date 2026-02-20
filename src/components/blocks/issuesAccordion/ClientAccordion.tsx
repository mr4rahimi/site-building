'use client'

import React from 'react'
import styles from './issuesAccordion.module.css'
import { ChevronDown, Wrench, CheckCircle2 } from 'lucide-react'

type Bullet = { id?: string | null; text: string }
type Item = { id?: string | null; question: string; answer: string; bullets?: Bullet[] }

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
    <div className={styles.list} role="region" aria-label="ایرادات و پاسخ‌ها">
      {items.map((it, idx) => {
        const isOpen = idx === openIndex
        const qId = `isa-q-${sectionId || 'issues'}-${idx}`
        const aId = `isa-a-${sectionId || 'issues'}-${idx}`
        const bullets = (it.bullets || []).filter((b) => b?.text)

        return (
          <div key={it.id ?? `${idx}-${it.question}`} className={`sf-card ${styles.item}`}>
            <button
              type="button"
              className={styles.trigger}
              aria-expanded={isOpen}
              aria-controls={aId}
              id={qId}
              onClick={() => setOpenIndex((cur) => (cur === idx ? -1 : idx))}
            >
              <span className={styles.qWrap}>
                <span className={styles.qIcon} aria-hidden="true">
                  <Wrench className={styles.qIconSvg} />
                </span>
                <span className={styles.q}>{it.question}</span>
              </span>

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
                <p className={styles.answer}>{it.answer}</p>

                {bullets.length ? (
                  <ul className={styles.bullets} aria-label="نکات">
                    {bullets.map((b) => (
                      <li key={b.id ?? b.text} className={styles.bulletItem}>
                        <CheckCircle2 className={styles.bulletIcon} aria-hidden="true" />
                        <span>{b.text}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
