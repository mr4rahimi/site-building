import React from 'react'
import type { Page } from '@/payload-types'
import styles from './contact2.module.css'
import { cssVarStyle } from '../_shared/blockTheme'
import { contact2ThemeVars } from '../_shared/contact2Theme'
import { Phone, PhoneCall, Sparkles } from 'lucide-react'

type Contact2Props = Extract<NonNullable<Page['layout']>[number], { blockType: 'contact2' }>

function normalizeTel(tel?: string | null) {
  if (!tel) return ''
  return tel.trim().replace(/[^\d+]/g, '')
}

export default function Contact2Block(props: Contact2Props) {
  const { title, subtitle, phone, buttonLabel, theme } = props
  const style = cssVarStyle(contact2ThemeVars(theme as any))

  const tel = normalizeTel(phone?.tel)
  if (!tel) return null

  const display = (phone?.display?.trim() || tel).trim()
  const href = `tel:${tel}`
  const label = buttonLabel || 'تماس بگیرید'

  return (
    <section
      className={`${styles.rtl} ${styles.hero}`}
      style={style}
      aria-labelledby="contact2-heading"
    >
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.badge}>
          <Sparkles className={styles.badgeIcon} aria-hidden="true" />
          <span>پشتیبانی و مشاوره</span>
        </div>

        <h2 id="contact2-heading" className={styles.title}>
          {title}
        </h2>

        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}

        <div className={styles.ctaRow}>
          <a className={styles.callBtn} href={href}>
            <span className={styles.callIconWrap} aria-hidden="true">
              <PhoneCall className={styles.callIcon} />
            </span>

            <span className={styles.callText}>
              <span className={styles.callLabel}>{label}</span>
              <span className={styles.callNumber}>{display}</span>
            </span>

            <span className={styles.trailing} aria-hidden="true">
              <Phone className={styles.trailingIcon} />
            </span>
          </a>
        </div>

        <div className={styles.hint} aria-hidden="true">
          <span className={styles.chev} />
        </div>
      </div>
    </section>
  )
}
