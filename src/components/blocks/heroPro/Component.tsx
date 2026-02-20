import React from 'react'
import type { Page } from '@/payload-types'
import styles from './heroPro.module.css'
import { cssVarStyle } from '../_shared/blockTheme'
import { heroProThemeVars } from '../_shared/heroProTheme'
import { ArrowLeft, PhoneCall, MessageCircle, MapPinned, CheckCircle2 } from 'lucide-react'

type Props = Extract<NonNullable<Page['layout']>[number], { blockType: 'heroPro' }>

export default function HeroProBlock(props: Props) {
  const {
    eyebrow,
    title,
    description,
    primaryButton,
    secondaryButton,
    badges,
    quickContact,
    theme,
  } = props as any
  const style = cssVarStyle(heroProThemeVars(theme as any))

  const pLabel = primaryButton?.label || 'ثبت سفارش و تماس'
  const pHref = primaryButton?.href || '/contact'
  const sLabel = secondaryButton?.label || 'مشاهده خدمات'
  const sHref = secondaryButton?.href || '#services'

  const qcTitle = quickContact?.title || 'راه های سریع تماس'
  const qcPhone = quickContact?.phone
  const qcPhoneDisplay = quickContact?.phoneDisplay || qcPhone
  const qcWhatsapp = quickContact?.whatsapp
  const qcAddrLabel = quickContact?.addressLinkLabel || 'آدرس شعب و فرم تماس'
  const qcAddrHref = quickContact?.addressLinkHref || '/contact'
  const qcHint = quickContact?.hint

  const badgeItems = (badges || []).filter(Boolean)

  return (
    <section
      className={`sf-section ${styles.rtl} ${styles.section}`}
      style={style}
      aria-labelledby="heropro-heading"
    >
      <div className="sf-container">
        <div className={styles.shell}>
          <div className={styles.spotlight} aria-hidden="true" />
          <div className={styles.gridDots} aria-hidden="true" />

          <div className={styles.grid}>
            {/* Main */}
            <div className={styles.main}>
              {eyebrow ? <div className={styles.eyebrow}>{eyebrow}</div> : null}

              <h1 id="heropro-heading" className={styles.title}>
                {title}
              </h1>

              {description ? <p className={styles.desc}>{description}</p> : null}

              <div className={styles.actions}>
                <a className={styles.primaryBtn} href={pHref}>
                  <span className={styles.primaryText}>{pLabel}</span>
                  <span className={styles.primaryArrow} aria-hidden="true">
                    <ArrowLeft className={styles.primaryArrowIcon} />
                  </span>
                </a>

                {sLabel && sHref ? (
                  <a className={styles.secondaryBtn} href={sHref}>
                    {sLabel}
                  </a>
                ) : null}
              </div>

              {badgeItems.length ? (
                <div className={styles.badges} aria-label="مزایا">
                  {badgeItems.map((b: any) => (
                    <div key={b.id ?? b.title} className={styles.badgeCard}>
                      <div className={styles.badgeTop}>
                        <CheckCircle2 className={styles.badgeIcon} aria-hidden="true" />
                        <div className={styles.badgeTitle}>{b.title}</div>
                      </div>
                      {b.desc ? <div className={styles.badgeDesc}>{b.desc}</div> : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Quick contact card */}
            <aside className={`sf-card ${styles.qc}`} aria-label="تماس سریع">
              <div className={styles.qcHeader}>
                <div className={styles.qcTitle}>{qcTitle}</div>
                <div className={styles.qcSub}>پاسخگویی سریع و هماهنگی ارسال</div>
              </div>

              <div className={styles.qcBody}>
                {qcPhone ? (
                  <a className={styles.qcPrimary} href={`tel:${qcPhone}`}>
                    <span className={styles.qcIconWrap} aria-hidden="true">
                      <PhoneCall className={styles.qcIcon} />
                    </span>
                    <span className={styles.qcPrimaryText}>
                      تماس: <span className={styles.qcNumber}>{qcPhoneDisplay}</span>
                    </span>
                    <span className={styles.qcArrow} aria-hidden="true">
                      <ArrowLeft className={styles.qcArrowIcon} />
                    </span>
                  </a>
                ) : (
                  <div className={styles.qcEmpty}>شماره تماس را در تنظیمات بلاک وارد کنید.</div>
                )}

                {qcWhatsapp ? (
                  <a className={styles.qcSecondary} href={qcWhatsapp} rel="noopener noreferrer">
                    <span className={styles.qcIconWrap2} aria-hidden="true">
                      <MessageCircle className={styles.qcIcon2} />
                    </span>
                    <span>پیام در واتساپ</span>
                  </a>
                ) : null}

                <a className={styles.qcLink} href={qcAddrHref}>
                  <span className={styles.qcLinkIcon} aria-hidden="true">
                    <MapPinned className={styles.qcMapIcon} />
                  </span>
                  <span className={styles.qcLinkText}>{qcAddrLabel}</span>
                  <span className={styles.qcLinkArrow} aria-hidden="true">
                    <ArrowLeft className={styles.qcLinkArrowIcon} />
                  </span>
                </a>

                {qcHint ? <div className={styles.qcHint}>{qcHint}</div> : null}
              </div>

              <div className={styles.qcGlow} aria-hidden="true" />
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}
