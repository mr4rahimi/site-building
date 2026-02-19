import React from 'react'
import type { Page } from '@/payload-types'
import styles from './faq2.module.css'
import { cssVarStyle } from '../_shared/blockTheme'
import { faq2ThemeVars } from '../_shared/faq2Theme'
import { HelpCircle, Sparkles, ShieldCheck, Plus, ArrowLeft } from 'lucide-react'

type FAQ2Props = Extract<NonNullable<Page['layout']>[number], { blockType: 'faq2' }>

function clampFaqItems(items: Array<{ q: string; a: string }> = [], max = 50) {
  // FAQ schema guidelines: keep it reasonable; also prevents huge payloads
  return items.slice(0, max).filter((x) => x?.q && x?.a)
}

export default function FAQ2Block(props: FAQ2Props) {
  const { variant, title, intro, items, aside, theme } = props

  const style = cssVarStyle(faq2ThemeVars(theme as any))

  const animated = (variant || 'animated').toLowerCase().includes('anim')
  const safeItems = clampFaqItems((items as any) || [])

  if (!safeItems.length) return null

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: safeItems.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: it.a,
      },
    })),
  }

  const asideTitle = aside?.title || 'اگر پاسخ را پیدا نکردید'
  const asideText =
    aside?.text ||
    'برای دریافت راهنمایی دقیق‌تر، بهتر است مدل دستگاه و مشکل را اعلام کنید تا سریع‌تر مسیر تعمیر مشخص شود.'

  const asideItems = aside?.items?.length
    ? aside.items
    : [
        { id: 'd1', text: 'عیب‌یابی شفاف قبل از شروع تعمیر' },
        { id: 'd2', text: 'قطعات اصلی و گارانتی خدمات' },
        { id: 'd3', text: 'ثبت درخواست و هماهنگی پیک' },
      ]

  const asideCtaLabel = aside?.cta?.label || 'رفتن به بخش تماس'
  const asideCtaHref = aside?.cta?.href || '#contact'

  return (
    <section
      className={`sf-section ${styles.rtl} ${styles.section}`}
      style={style}
      aria-labelledby="faq2-heading"
    >
      <div className="sf-container">
        <div className={`${styles.wrap} ${animated ? styles.animated : ''}`}>
          <header className={styles.header}>
            <div className={styles.headRow}>
              <div className={styles.iconBadge} aria-hidden="true">
                <HelpCircle className={styles.headIcon} />
              </div>

              <div className={styles.headText}>
                <h2 id="faq2-heading" className={styles.title}>
                  {title || 'سوالات متداول'}
                </h2>
                {intro ? <p className={styles.intro}>{intro}</p> : null}
              </div>
            </div>
          </header>

          <div className={styles.grid}>
            {/* FAQ list */}
            <div className={styles.list} aria-label="پرسش و پاسخ">
              {safeItems.map((it, idx) => (
                <details
                  key={(items as any)?.[idx]?.id ?? `${idx}-${it.q}`}
                  className={`sf-card ${styles.item}`}
                >
                  <summary className={styles.summary}>
                    <span className={styles.q}>{it.q}</span>
                    <span className={styles.plus} aria-hidden="true">
                      <Plus className={styles.plusIcon} />
                    </span>
                  </summary>

                  <div className={styles.answerWrap}>
                    <p className={styles.answer}>{it.a}</p>
                  </div>
                </details>
              ))}
            </div>

            {/* Aside */}
            <aside className={`sf-card ${styles.aside}`} aria-label="راهنمای سریع">
              <div className={styles.asideTop}>
                <div className={styles.asideBadge}>
                  <Sparkles className={styles.asideBadgeIcon} aria-hidden="true" />
                  <span>راهنمای سریع</span>
                </div>

                <div className={styles.asideTitle}>{asideTitle}</div>
                <p className={styles.asideText}>{asideText}</p>
              </div>

              <ul className={styles.asideList}>
                {asideItems.map((x: any) => (
                  <li key={x.id ?? x.text} className={styles.asideItem}>
                    <span className={styles.bullet} aria-hidden="true" />
                    <span>{x.text}</span>
                  </li>
                ))}
              </ul>

              <a className={styles.asideCta} href={asideCtaHref}>
                <span className={styles.asideCtaLeft} aria-hidden="true">
                  <ShieldCheck className={styles.asideCtaIcon} />
                </span>
                <span className={styles.asideCtaText}>{asideCtaLabel}</span>
                <span className={styles.asideCtaArrow} aria-hidden="true">
                  <ArrowLeft className={styles.asideCtaArrowIcon} />
                </span>
              </a>
            </aside>
          </div>

          {/* SEO JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        </div>
      </div>
    </section>
  )
}
