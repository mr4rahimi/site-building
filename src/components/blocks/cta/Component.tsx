import React from 'react'
import type { Page } from '@/payload-types'
import styles from './cta.module.css'
import { cssVarStyle, themeVars } from '../_shared/blockTheme'

type CTAProps = Extract<NonNullable<Page['layout']>[number], { blockType: 'cta' }>

export default function CTABlock(props: CTAProps) {
  const { title, description, buttons, theme } = props
  const style = cssVarStyle(themeVars(theme))

  return (
    <section className={`sf-section ${styles.rtl}`} style={style}>
      <div className="sf-container">
        <div className={`sf-card ${styles.card}`}>
          <div className={styles.content}>
            <h2 className={styles.title}>{title}</h2>
            {description ? <p className={styles.desc}>{description}</p> : null}
          </div>

          {!!buttons?.length ? (
            <div className={styles.actions}>
              {buttons.map((b) => (
                <a key={b.id ?? b.href} href={b.href} className={styles.primaryBtn}>
                  {b.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
