import React from 'react'
import type { Page } from '@/payload-types'
import styles from './contact1.module.css'
import { cssVarStyle } from '../_shared/blockTheme'
import { contactThemeVars } from '../_shared/contactTheme'
import { PhoneCall, MessageCircle } from 'lucide-react'

type Contact1Props = Extract<NonNullable<Page['layout']>[number], { blockType: 'contact1' }>

function normalizeTel(tel?: string | null) {
  if (!tel) return ''
  const trimmed = tel.trim()
  // keep + and digits only
  const normalized = trimmed.replace(/[^\d+]/g, '')
  return normalized
}

export default function Contact1Block(props: Contact1Props) {
  const { title, subtitle, primaryButton, secondaryButton, theme } = props
  const style = cssVarStyle(contactThemeVars(theme as any))

  const tel = normalizeTel(primaryButton?.tel)
  const telHref = tel ? `tel:${tel}` : undefined

  const primaryLabel = primaryButton?.label || 'تماس فوری'
  const secondaryLabel = secondaryButton?.label || 'واتساپ'

  return (
    <section
      className={`sf-section ${styles.rtl}`}
      style={style}
      aria-labelledby="contact1-heading"
    >
      <div className="sf-container">
        <div className={`sf-card ${styles.card}`}>
          <div className={styles.inner}>
            <div className={styles.copy}>
              <div className={styles.kicker} aria-hidden="true">
                <span className={styles.pulseDot} />
                <span className={styles.kickerText}>پاسخ‌گویی سریع</span>
              </div>

              <h2 id="contact1-heading" className={styles.title}>
                {title}
              </h2>

              {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
            </div>

            <div className={styles.actions}>
              {telHref ? (
                <a className={styles.primaryBtn} href={telHref}>
                  <PhoneCall className={styles.btnIcon} aria-hidden="true" />
                  {primaryLabel}
                </a>
              ) : null}

              {secondaryButton?.href ? (
                <a
                  className={styles.secondaryBtn}
                  href={secondaryButton.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className={styles.btnIcon} aria-hidden="true" />
                  {secondaryLabel}
                </a>
              ) : null}
            </div>
          </div>

          <div className={styles.decor} aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
