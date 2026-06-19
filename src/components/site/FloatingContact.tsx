'use client'
import React, { useState } from 'react'
import { Phone, MessageCircle, X, ChevronUp } from 'lucide-react'
import styles from './floatingContact.module.css'

interface Props {
  primaryPhone: string | null
  whatsapp: string | null
}

export default function FloatingContact({ primaryPhone, whatsapp }: Props) {
  const [open, setOpen] = useState(false)

  if (!primaryPhone && !whatsapp) return null

  return (
    <div className={styles.wrap} aria-label="دکمه‌های تماس سریع">
      {/* Expanded buttons */}
      <div className={`${styles.btns} ${open ? styles.visible : ''}`} aria-hidden={!open}>
        {whatsapp && (
          <a
            href={whatsapp.startsWith('http') ? whatsapp : `https://wa.me/${whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noreferrer"
            className={`${styles.btn} ${styles.whatsapp}`}
            aria-label="واتساپ"
            tabIndex={open ? 0 : -1}
          >
            <MessageCircle size={22} />
            <span className={styles.btnLabel}>واتساپ</span>
          </a>
        )}
        {primaryPhone && (
          <a
            href={`tel:${primaryPhone.replace(/\D/g, '')}`}
            className={`${styles.btn} ${styles.phone}`}
            aria-label={`تماس: ${primaryPhone}`}
            tabIndex={open ? 0 : -1}
          >
            <Phone size={22} />
            <span className={styles.btnLabel} dir="ltr">{primaryPhone}</span>
          </a>
        )}
      </div>

      {/* Toggle */}
      <button
        className={`${styles.toggle} ${open ? styles.toggleOpen : ''}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? 'بستن منوی تماس' : 'باز کردن منوی تماس'}
        aria-expanded={open}
      >
        {open ? <X size={24} /> : <ChevronUp size={24} />}
        {!open && <span className={styles.toggleLabel}>تماس</span>}
      </button>
    </div>
  )
}
