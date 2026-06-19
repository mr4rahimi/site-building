'use client'
import React, { useState, useActionState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import styles from './contactForm.module.css'

interface Props {
  title?: string
  description?: string
  fields?: string[]
  submitLabel?: string
  successMessage?: string
  siteSlug?: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactFormBlock({
  title = 'با ما تماس بگیرید',
  description,
  fields = ['name', 'phone', 'message'],
  submitLabel = 'ارسال پیام',
  successMessage = 'پیام شما دریافت شد. به زودی با شما تماس می‌گیریم.',
  siteSlug,
}: Props) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' })

  const show = (f: string) => (fields || []).includes(f)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteSlug, ...form }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'خطا')
      setStatus('success')
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err.message || 'خطایی رخ داد. لطفاً دوباره تلاش کنید.')
    }
  }

  if (status === 'success') {
    return (
      <section className={`sf-section ${styles.section}`}>
        <div className={`sf-container ${styles.container}`}>
          <div className={`sf-card ${styles.success}`}>
            <CheckCircle size={48} className={styles.successIcon} />
            <h2 className={styles.successTitle}>پیام ارسال شد!</h2>
            <p className={styles.successMsg}>{successMessage}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`sf-section ${styles.section}`} dir="rtl">
      <div className={`sf-container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {description && <p className={styles.desc}>{description}</p>}
        </div>

        <div className={`sf-card ${styles.card}`}>
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.grid}>
              {show('name') && (
                <div className={`${styles.field} ${show('phone') ? '' : styles.fullWidth}`}>
                  <label htmlFor="cf-name" className={styles.label}>
                    نام <span className={styles.req}>*</span>
                  </label>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="نام و نام‌خانوادگی"
                    disabled={status === 'loading'}
                  />
                </div>
              )}

              {show('phone') && (
                <div className={styles.field}>
                  <label htmlFor="cf-phone" className={styles.label}>شماره تماس</label>
                  <input
                    id="cf-phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="۰۹۱۲..."
                    dir="ltr"
                    disabled={status === 'loading'}
                  />
                </div>
              )}

              {show('email') && (
                <div className={styles.field}>
                  <label htmlFor="cf-email" className={styles.label}>ایمیل</label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="example@email.com"
                    dir="ltr"
                    disabled={status === 'loading'}
                  />
                </div>
              )}

              {show('subject') && (
                <div className={styles.field}>
                  <label htmlFor="cf-subject" className={styles.label}>موضوع</label>
                  <input
                    id="cf-subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="موضوع پیام"
                    disabled={status === 'loading'}
                  />
                </div>
              )}

              {show('message') && (
                <div className={`${styles.field} ${styles.fullWidth}`}>
                  <label htmlFor="cf-message" className={styles.label}>
                    پیام <span className={styles.req}>*</span>
                  </label>
                  <textarea
                    id="cf-message"
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    className={styles.textarea}
                    placeholder="پیام خود را بنویسید..."
                    rows={5}
                    disabled={status === 'loading'}
                  />
                </div>
              )}
            </div>

            {status === 'error' && (
              <div className={styles.error}>
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className={styles.actions}>
              <button type="submit" className={styles.submit} disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <span className={styles.spinner} />
                ) : (
                  <Send size={18} />
                )}
                {status === 'loading' ? 'در حال ارسال...' : submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
