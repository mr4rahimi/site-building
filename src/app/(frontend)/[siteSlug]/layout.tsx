import React from 'react'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import type { Metadata } from 'next'
import { getSiteData, mediaUrl } from '../_lib/getSiteData'
import SiteHeader from '@/components/site/Header'
import SiteFooter from '@/components/site/Footer'
import FloatingContact from '@/components/site/FloatingContact'

type Props = { children: React.ReactNode; params: Promise<{ siteSlug: string }> }

export default async function SiteLayout({ children, params }: Props) {
  const { siteSlug } = await params
  const data = await getSiteData(siteSlug)
  if (!data) return notFound()

  const { settings } = data
  const siteTitle = settings?.siteTitle || (data.site as any)?.name || siteSlug
  const logoUrl = mediaUrl(settings?.general?.logo)
  const gaId = settings?.seo?.googleAnalyticsId

  const navLinks = settings?.header?.navLinks || []
  const ctaButton = settings?.header?.ctaButton || null

  // Primary phone (first in list)
  const phones: any[] = settings?.contact?.phones || []
  const primaryPhone = phones[0]?.number || null

  // WhatsApp: prefer explicit social.whatsapp, else first phone with isWhatsApp
  const whatsapp =
    settings?.social?.whatsapp ||
    phones.find((p: any) => p.isWhatsApp)?.number ||
    null

  return (
    <>
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}')`}
          </Script>
        </>
      )}

      <SiteHeader
        siteSlug={siteSlug}
        siteTitle={siteTitle}
        logoUrl={logoUrl}
        navLinks={navLinks}
        ctaButton={ctaButton}
        primaryPhone={primaryPhone}
      />

      <main>{children}</main>

      <SiteFooter
        siteSlug={siteSlug}
        siteTitle={siteTitle}
        logoUrl={logoUrl}
        settings={settings}
      />

      <FloatingContact primaryPhone={primaryPhone} whatsapp={whatsapp} />
    </>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ siteSlug: string }> }): Promise<Metadata> {
  const { siteSlug } = await params
  const data = await getSiteData(siteSlug)
  if (!data) return {}

  const s = data.settings
  const siteTitle = s?.siteTitle || (data.site as any)?.name || siteSlug
  const description = s?.seo?.defaultMetaDescription || s?.general?.description || ''
  const ogImage = mediaUrl(s?.seo?.defaultOgImage)
  const faviconUrl = mediaUrl(s?.general?.favicon)

  const titleTemplate = (s?.seo?.metaTitleTemplate || '%s | {{title}}')
    .replace('{{siteTitle}}', siteTitle)
    .replace('{{title}}', siteTitle)

  return {
    title: {
      template: titleTemplate,
      default: siteTitle,
    },
    description,
    icons: faviconUrl ? { icon: faviconUrl } : undefined,
    openGraph: {
      siteName: siteTitle,
      locale: 'fa_IR',
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
  }
}
