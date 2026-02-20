import React from 'react'
import type { Page } from '@/payload-types'
import styles from './features2.module.css'
import { cssVarStyle } from '../_shared/blockTheme'
import { features2ThemeVars } from '../_shared/features2Theme'
import {
  Sparkles,
  ShieldCheck,
  Wrench,
  BadgeCheck,
  Zap,
  Timer,
  Headphones,
  Truck,
  MapPin,
  Cpu,
  Lock,
  Star,
} from 'lucide-react'

type Props = Extract<NonNullable<Page['layout']>[number], { blockType: 'features2' }>

const ICONS: Record<string, React.ComponentType<any>> = {
  Sparkles,
  ShieldCheck,
  Wrench,
  BadgeCheck,
  Zap,
  Timer,
  Headphones,
  Truck,
  MapPin,
  Cpu,
  Lock,
  Star,
}

function pickIcon(name?: string | null) {
  if (!name) return Sparkles
  const key = name.trim()
  return ICONS[key] || Sparkles
}

export default function Features2Block(props: Props) {
  const { title, items, theme } = props
  const style = cssVarStyle(features2ThemeVars(theme as any))

  if (!items?.length) return null

  return (
    <section
      className={`sf-section ${styles.rtl} ${styles.section}`}
      style={style}
      aria-labelledby="features2-heading"
    >
      <div className="sf-container">
        <header className={styles.header}>
          <h2 id="features2-heading" className={styles.title}>
            {title || 'ویژگی‌ها'}
          </h2>
          <p className={styles.sub}>چند دلیل برای انتخاب این سرویس</p>
        </header>

        <div className={styles.grid}>
          {items.map((it, idx) => {
            const Icon = pickIcon((it as any).icon)
            return (
              <article
                key={(it as any).id ?? `${idx}-${it.title}`}
                className={`sf-card ${styles.card}`}
              >
                <div className={styles.top}>
                  <div className={styles.iconWrap} aria-hidden="true">
                    <Icon className={styles.icon} />
                  </div>
                  <div className={styles.head}>
                    <div className={styles.cardTitle}>{it.title}</div>
                    <p className={styles.desc}>{it.desc}</p>
                  </div>
                </div>

                <div className={styles.footerLine} aria-hidden="true" />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
