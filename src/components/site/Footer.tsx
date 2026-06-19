import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Phone, Mail, MapPin, Clock, Instagram, Send,
  Linkedin, Youtube, Twitter, ExternalLink,
} from 'lucide-react'
import styles from './footer.module.css'

interface Props {
  siteSlug: string
  siteTitle: string
  logoUrl: string | null
  settings: any
}

export default function SiteFooter({ siteSlug, siteTitle, logoUrl, settings }: Props) {
  const general = settings?.general || {}
  const contact = settings?.contact || {}
  const social = settings?.social || {}
  const footer = settings?.footer || {}

  const phones: any[] = contact.phones || []
  const footerLinks: any[] = footer.footerLinks || []

  const year = new Intl.DateTimeFormat('fa-IR', { calendar: 'persian', year: 'numeric' })
    .format(new Date())

  return (
    <footer className={styles.footer}>
      <div className={`sf-container ${styles.grid}`}>

        {/* Col 1: brand */}
        <div className={styles.brand}>
          {logoUrl ? (
            <Link href={`/${siteSlug}`} aria-label={siteTitle}>
              <Image src={logoUrl} alt={siteTitle} width={130} height={44} className={styles.logo} />
            </Link>
          ) : (
            <Link href={`/${siteSlug}`} className={styles.brandName}>{siteTitle}</Link>
          )}
          {(footer.aboutText || general.description) && (
            <p className={styles.about}>{footer.aboutText || general.description}</p>
          )}
          {/* Social icons */}
          <div className={styles.socials}>
            {social.instagram && (
              <a href={social.instagram} target="_blank" rel="noreferrer" aria-label="اینستاگرام" className={styles.socialIcon}>
                <Instagram size={20} />
              </a>
            )}
            {social.telegram && (
              <a href={social.telegram} target="_blank" rel="noreferrer" aria-label="تلگرام" className={styles.socialIcon}>
                <Send size={20} />
              </a>
            )}
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noreferrer" aria-label="لینکدین" className={styles.socialIcon}>
                <Linkedin size={20} />
              </a>
            )}
            {social.youtube && (
              <a href={social.youtube} target="_blank" rel="noreferrer" aria-label="یوتیوب" className={styles.socialIcon}>
                <Youtube size={20} />
              </a>
            )}
            {social.twitter && (
              <a href={social.twitter} target="_blank" rel="noreferrer" aria-label="توییتر" className={styles.socialIcon}>
                <Twitter size={20} />
              </a>
            )}
            {social.aparat && (
              <a href={social.aparat} target="_blank" rel="noreferrer" aria-label="آپارات" className={styles.socialIcon}>
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>

        {/* Col 2: quick links */}
        {footerLinks.length > 0 && (
          <div className={styles.col}>
            <h3 className={styles.colTitle}>دسترسی سریع</h3>
            <ul className={styles.linkList}>
              {footerLinks.map((link: any, i: number) => (
                <li key={i}>
                  <Link href={link.href} className={styles.footerLink}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Col 3: contact */}
        {(phones.length > 0 || contact.email || contact.address) && (
          <div className={styles.col}>
            <h3 className={styles.colTitle}>تماس با ما</h3>
            <ul className={styles.contactList}>
              {phones.map((ph: any, i: number) => (
                <li key={i} className={styles.contactItem}>
                  <Phone size={15} className={styles.contactIcon} />
                  <a href={`tel:${ph.number?.replace(/\D/g, '')}`} className={styles.contactLink} dir="ltr">
                    {ph.number}
                    {ph.label && <span className={styles.phoneLabel}> ({ph.label})</span>}
                  </a>
                </li>
              ))}
              {contact.email && (
                <li className={styles.contactItem}>
                  <Mail size={15} className={styles.contactIcon} />
                  <a href={`mailto:${contact.email}`} className={styles.contactLink}>{contact.email}</a>
                </li>
              )}
              {contact.workingHours && (
                <li className={styles.contactItem}>
                  <Clock size={15} className={styles.contactIcon} />
                  <span>{contact.workingHours}</span>
                </li>
              )}
              {contact.address && (
                <li className={styles.contactItem}>
                  <MapPin size={15} className={styles.contactIcon} />
                  <span>{contact.address}</span>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className={`sf-container ${styles.bottomInner}`}>
          <span>
            {footer.copyright || `© ${year} ${siteTitle} — تمامی حقوق محفوظ است.`}
          </span>
          <span className={styles.poweredBy}>طراحی و توسعه با سایت‌ساز</span>
        </div>
      </div>
    </footer>
  )
}
