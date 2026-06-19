'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone } from 'lucide-react'
import styles from './header.module.css'

interface NavLink {
  label: string
  href: string
  isButton?: boolean
  openInNewTab?: boolean
}

interface CtaButton {
  label?: string
  href?: string
}

interface Props {
  siteSlug: string
  siteTitle: string
  logoUrl: string | null
  navLinks: NavLink[]
  ctaButton: CtaButton | null
  primaryPhone: string | null
}

export default function SiteHeader({ siteSlug, siteTitle, logoUrl, navLinks, ctaButton, primaryPhone }: Props) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const homeHref = `/${siteSlug}`

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`sf-container ${styles.inner}`}>
        {/* Logo */}
        <Link href={homeHref} className={styles.logo} aria-label={siteTitle}>
          {logoUrl ? (
            <Image src={logoUrl} alt={siteTitle} width={140} height={48} className={styles.logoImg} />
          ) : (
            <span className={styles.logoText}>{siteTitle}</span>
          )}
        </Link>

        {/* Desktop nav */}
        <nav className={styles.nav} aria-label="منوی اصلی">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href.startsWith('/') && !link.href.startsWith('//') ? link.href : link.href}
              className={link.isButton ? styles.navBtn : styles.navLink}
              target={link.openInNewTab ? '_blank' : undefined}
              rel={link.openInNewTab ? 'noreferrer' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className={styles.actions}>
          {primaryPhone && (
            <a href={`tel:${primaryPhone.replace(/\D/g, '')}`} className={styles.phoneBtn}>
              <Phone size={16} />
              <span>{primaryPhone}</span>
            </a>
          )}
          {ctaButton?.href && ctaButton?.label && (
            <Link href={ctaButton.href} className={styles.ctaBtn}>
              {ctaButton.label}
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className={styles.toggle}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'بستن منو' : 'باز کردن منو'}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${open ? styles.mobileOpen : ''}`} aria-hidden={!open}>
        <div className={`sf-container ${styles.mobileInner}`}>
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setOpen(false)}
              target={link.openInNewTab ? '_blank' : undefined}
              rel={link.openInNewTab ? 'noreferrer' : undefined}
            >
              {link.label}
            </Link>
          ))}
          {primaryPhone && (
            <a href={`tel:${primaryPhone.replace(/\D/g, '')}`} className={styles.mobilePhone} onClick={() => setOpen(false)}>
              <Phone size={16} />
              {primaryPhone}
            </a>
          )}
          {ctaButton?.href && ctaButton?.label && (
            <Link href={ctaButton.href} className={styles.mobileCtaBtn} onClick={() => setOpen(false)}>
              {ctaButton.label}
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
