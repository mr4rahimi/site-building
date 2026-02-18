import React from 'react'
import type { Page } from '@/payload-types'
import styles from './contact3.module.css'
import { cssVarStyle } from '../_shared/blockTheme'
import { contact3ThemeVars } from '../_shared/contact3Theme'
import { PhoneCall, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react'

type Contact3Props = Extract<NonNullable<Page['layout']>[number], { blockType: 'contact3' }>

function normalizeTel(tel?: string | null) {
  if (!tel) return ''
  return tel.trim().replace(/[^\d+]/g, '')
}

export default function Contact3Block(props: Contact3Props) {
  const { variant, badgeText, title, description, primaryButton, sideCard, theme } = props
  const style = cssVarStyle(contact3ThemeVars(theme as any))

  const tel = normalizeTel(primaryButton?.tel)
  if (!tel) return null

  const phoneDisplay = (primaryButton?.phoneDisplay?.trim() || tel).trim()
  const href = `tel:${tel}`

  const animated = (variant || 'animated').toLowerCase().includes('anim')

  return (
    <section
      className={`sf-section ${styles.rtl}`}
      style={style}
      aria-labelledby="contact3-heading"
    >
      <div className="sf-container">
        <div className={`${styles.wrap} ${animated ? styles.animated : ''}`}>
          {/* main */}
          <div className={`sf-card ${styles.mainCard}`}>
            <div className={styles.badgeRow}>
              {badgeText ? (
                <div className={styles.badge}>
                  <Sparkles className={styles.badgeIcon} aria-hidden="true" />
                  <span>{badgeText}</span>
                </div>
              ) : null}

              <div className={styles.trust} aria-hidden="true">
                <ShieldCheck className={styles.trustIcon} />
                <span>گارانتی و قطعات اصلی</span>
              </div>
            </div>

            <h2 id="contact3-heading" className={styles.title}>
              {title}
            </h2>

            {description ? <p className={styles.desc}>{description}</p> : null}

            <div className={styles.ctaRow}>
              <a className={styles.primaryBtn} href={href}>
                <span className={styles.btnIconWrap} aria-hidden="true">
                  <PhoneCall className={styles.btnIcon} />
                </span>

                <span className={styles.btnText}>
                  <span className={styles.btnLabel}>{primaryButton?.label || 'تماس مستقیم'}</span>
                  <span className={styles.btnNumber}>{phoneDisplay}</span>
                </span>

                <span className={styles.btnArrow} aria-hidden="true">
                  <ArrowLeft className={styles.arrowIcon} />
                </span>
              </a>
            </div>
          </div>

          {/* side */}
          <aside
            className={`sf-card ${styles.sideCard}`}
            aria-label={sideCard?.headline || 'اطلاعات'}
          >
            <div className={styles.sideTop}>
              {sideCard?.brand ? <div className={styles.brand}>{sideCard.brand}</div> : null}
              {sideCard?.headline ? (
                <div className={styles.headline}>{sideCard.headline}</div>
              ) : null}
            </div>

            {!!sideCard?.items?.length ? (
              <ul className={styles.list}>
                {sideCard.items.map((it) => (
                  <li key={it.id ?? it.text} className={styles.item}>
                    <span className={styles.bullet} aria-hidden="true" />
                    <span className={styles.itemText}>{it.text}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </aside>

          {/* decorative */}
          <div className={styles.glow} aria-hidden="true" />
          <div className={styles.noise} aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
