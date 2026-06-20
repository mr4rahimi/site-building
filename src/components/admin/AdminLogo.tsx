'use client'
import React from 'react'

export default function AdminLogo() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: 'Vazirmatn, var(--font-body)',
      textDecoration: 'none',
    }}>
      <div style={{
        width: 34,
        height: 34,
        borderRadius: 9,
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 2px 10px rgba(99, 102, 241, 0.4)',
      }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white" opacity="0.9"/>
          <rect x="10" y="2" width="6" height="6" rx="1.5" fill="white" opacity="0.6"/>
          <rect x="2" y="10" width="6" height="6" rx="1.5" fill="white" opacity="0.6"/>
          <rect x="10" y="10" width="6" height="6" rx="1.5" fill="white" opacity="0.9"/>
        </svg>
      </div>
      <div style={{ lineHeight: 1.2 }}>
        <div style={{
          fontSize: 15,
          fontWeight: 700,
          color: 'var(--theme-elevation-900)',
          letterSpacing: '-0.01em',
        }}>
          سایت‌ساز
        </div>
        <div style={{
          fontSize: 10,
          fontWeight: 500,
          color: 'var(--theme-elevation-450)',
          letterSpacing: '0.05em',
        }}>
          ADMIN PANEL
        </div>
      </div>
    </div>
  )
}
