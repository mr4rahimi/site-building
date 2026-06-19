import React from 'react'
import './styles.css'
import './globals.css'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
