import React from 'react'
import type { Page } from '@/payload-types'
import styles from './issues.module.css'
import { cssVarStyle } from '../_shared/blockTheme'
import { issuesThemeVars } from '../_shared/issuesTheme'
import { ArrowLeft, AlertTriangle } from 'lucide-react'

type Props = Extract<NonNullable<Page['layout']>[number], { blockType: 'issues' }>

export default function IssuesBlock(props: Props) {
  const { title, subtitle, items, cta, theme } = props as any
  const style = cssVarStyle(issuesThemeVars(theme as any))

  const list = (items || []).filter((x: any) => x?.text)
  if (!list.length) return null

  const ctaLabel = cta?.label
  const ctaHref = cta?.href

  return (
    <section
      className={`sf-section ${styles.rtl} ${styles.section}`}
      style={style}
      aria-labelledby="issues-heading"
    >
      <div className="sf-container">
        <div className={styles.wrap}>
          <div className={styles.bg} aria-hidden="true" />

          {/* Right column (intro) */}
          <header className={styles.header}>
            <div className={styles.headIconWrap} aria-hidden="true">
              <AlertTriangle className={styles.headIcon} />
            </div>

            <h2 id="issues-heading" className={styles.title}>
              {title || 'ایرادات رایج'}
            </h2>

            {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}

            {ctaLabel && ctaHref ? (
              <a className={styles.cta} href={ctaHref}>
                <span className={styles.ctaText}>{ctaLabel}</span>
                <span className={styles.ctaArrow} aria-hidden="true">
                  <ArrowLeft className={styles.ctaArrowIcon} />
                </span>
              </a>
            ) : null}
          </header>

          {/* Left column (chips) */}
          <div className={styles.list} aria-label="لیست ایرادات رایج">
            {list.map((it: any, idx: number) => (
              <article key={it.id ?? `${idx}-${it.text}`} className={styles.chip}>
                <div className={styles.chipNum} aria-hidden="true">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className={styles.chipText}>{it.text}</div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
