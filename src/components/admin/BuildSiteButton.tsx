'use client'

import React, { useState } from 'react'
import { useFormFields } from '@payloadcms/ui'

type Status = 'idle' | 'building' | 'done' | 'error'

export default function BuildSiteButton() {
  const [status, setStatus] = useState<Status>('idle')
  const [outputPath, setOutputPath] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const slug = useFormFields(([fields]) => fields?.slug?.value as string | undefined) ?? ''

  async function handleBuild() {
    if (!slug || status === 'building') return
    setStatus('building')
    setOutputPath('')
    setErrorMsg('')

    try {
      const res = await fetch('/api/build-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ siteSlug: slug }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('done')
        setOutputPath(data.outputPath)
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'خطای ناشناخته')
      }
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 8 }}>
      <button
        type="button"
        onClick={handleBuild}
        disabled={status === 'building' || !slug}
        style={{
          background: status === 'building' ? 'var(--theme-elevation-200)' : 'var(--theme-success-500, #16a34a)',
          color: status === 'building' ? 'var(--theme-elevation-500)' : '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '9px 16px',
          cursor: status === 'building' ? 'wait' : 'pointer',
          fontFamily: 'Vazirmatn, var(--font-body)',
          fontSize: 13,
          fontWeight: 600,
          width: '100%',
          transition: 'background 0.2s',
        }}
      >
        {status === 'building' ? '⏳ در حال ساخت...' : '⬇ دریافت خروجی Astro'}
      </button>

      {status === 'done' && (
        <div
          style={{
            padding: '10px 12px',
            background: 'color-mix(in srgb, var(--theme-success-500, #16a34a) 10%, transparent)',
            border: '1px solid color-mix(in srgb, var(--theme-success-500, #16a34a) 30%, transparent)',
            borderRadius: 6,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: 'var(--theme-success-500, #16a34a)' }}>
            ✅ ساخت موفق
          </p>
          <p style={{ margin: 0, fontSize: 11, fontFamily: 'monospace', wordBreak: 'break-all', opacity: 0.8 }}>
            {outputPath}
          </p>
          <button
            type="button"
            onClick={() => fetch('/api/open-folder', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({ folderPath: outputPath }),
            })}
            style={{
              background: 'transparent',
              border: '1px solid var(--theme-success-500, #16a34a)',
              borderRadius: 5,
              padding: '5px 10px',
              cursor: 'pointer',
              fontFamily: 'Vazirmatn, var(--font-body)',
              fontSize: 12,
              color: 'var(--theme-success-500, #16a34a)',
              alignSelf: 'flex-start',
            }}
          >
            📂 باز کردن پوشه
          </button>
        </div>
      )}

      {status === 'error' && (
        <div
          style={{
            padding: '10px 12px',
            background: 'color-mix(in srgb, var(--theme-error-500, #dc2626) 10%, transparent)',
            border: '1px solid color-mix(in srgb, var(--theme-error-500, #dc2626) 30%, transparent)',
            borderRadius: 6,
          }}
        >
          <p style={{ margin: 0, fontSize: 13, color: 'var(--theme-error-500, #dc2626)' }}>
            ❌ {errorMsg}
          </p>
        </div>
      )}
    </div>
  )
}
