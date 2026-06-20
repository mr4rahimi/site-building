'use client'
import React from 'react'

export default function AdminIcon() {
  return (
    <div style={{
      width: 28,
      height: 28,
      borderRadius: 7,
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white" opacity="0.9"/>
        <rect x="10" y="2" width="6" height="6" rx="1.5" fill="white" opacity="0.6"/>
        <rect x="2" y="10" width="6" height="6" rx="1.5" fill="white" opacity="0.6"/>
        <rect x="10" y="10" width="6" height="6" rx="1.5" fill="white" opacity="0.9"/>
      </svg>
    </div>
  )
}
