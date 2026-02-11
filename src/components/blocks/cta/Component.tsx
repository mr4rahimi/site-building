import React from 'react'

type Button = { label?: string; href?: string }

type Props = {
  title?: string
  description?: string
  buttons?: Button[]
}

export default function CTABlock(props: Props) {
  const { title, description, buttons } = props

  return (
    <section style={{ padding: 24, border: '1px solid #eee', borderRadius: 12 }}>
      {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}

      {!!buttons?.length && (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {buttons.map((b, i) => (
            <a
              key={i}
              href={b.href || '#'}
              style={{
                padding: '10px 14px',
                border: '1px solid #ddd',
                borderRadius: 10,
                textDecoration: 'none',
              }}
            >
              {b.label || 'Button'}
            </a>
          ))}
        </div>
      )}
    </section>
  )
}
