import React from 'react'
import type { Page } from '@/payload-types'
import styles from './branches1.module.css'
import { cssVarStyle } from '../_shared/blockTheme'
import { branchesThemeVars } from '../_shared/branchesTheme'
import { MapPin } from 'lucide-react'

type Branches1Props = Extract<NonNullable<Page['layout']>[number], { blockType: 'branches1' }>

export default function Branches1Block(props: Branches1Props) {
  const { title, items, theme } = props
  const style = cssVarStyle(branchesThemeVars(theme as any))

  if (!items?.length) return null

  return (
    <section
      className={`sf-section ${styles.rtl}`}
      style={style}
      aria-labelledby="branches1-heading"
    >
      <div className="sf-container">
        <header className={styles.header}>
          <h2 id="branches1-heading" className={styles.title}>
            {title || 'شعب'}
          </h2>
        </header>

        <div className={styles.list}>
          {items.map((b) => {
            const key = b.id ?? `${b.title}-${b.address}`

            return (
              <article key={key} className={`sf-card ${styles.card}`} aria-label={b.title}>
                <div className={styles.iconWrap} aria-hidden="true">
                  <MapPin className={styles.icon} />
                </div>

                <div className={styles.body}>
                  <h3 className={styles.cardTitle}>{b.title}</h3>
                  <address className={styles.address}>{b.address}</address>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
