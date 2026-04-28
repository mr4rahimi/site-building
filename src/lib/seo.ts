export function buildMeta({
  title,
  description,
  image,
  url,
}: {
  title?: string
  description?: string
  image?: string
  url?: string
}) {
  const siteName = 'Your Site Name'

  const finalTitle = title ? `${title} | ${siteName}` : siteName

  return {
    title: finalTitle,
    description,
    openGraph: {
      title: finalTitle,
      description,
      url,
      images: image ? [{ url: image }] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description,
      images: image ? [image] : [],
    },
    alternates: {
      canonical: url,
    },
  }
}
