'use client'

import React from 'react'

type Props = {
  cellData?: unknown
  rowData?: Record<string, unknown>
}

export default function SlugCell({ cellData, rowData }: Props) {
  const pageSlug = (typeof cellData === 'string' ? cellData : '').replace(/^\//, '')
  const site = rowData?.site as any
  const siteSlug = typeof site === 'object' && site !== null && site?.slug
    ? (site.slug as string)
    : null

  const href = siteSlug ? `/${siteSlug}/${pageSlug}` : null

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  if (!href) {
    return (
      <span style={{ color: 'var(--theme-elevation-400, #999)', fontSize: 13 }}>
        /{pageSlug}
      </span>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      style={{
        color: 'var(--theme-text, inherit)',
        textDecoration: 'underline',
        textUnderlineOffset: 3,
        fontSize: 13,
        fontFamily: 'monospace',
      }}
    >
      {href}
    </a>
  )
}
