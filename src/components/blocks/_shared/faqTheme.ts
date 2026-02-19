export type FaqThemeInput = {
  colorMode?: 'site' | 'custom'

  sectionBg?: string | null
  cardBg?: string | null
  borderColor?: string | null

  textColor?: string | null
  mutedTextColor?: string | null

  accentColor?: string | null
}

export function faqThemeVars(theme?: FaqThemeInput) {
  if (!theme || theme.colorMode !== 'custom') return {}

  return {
    ['--faq-bg' as any]: theme.sectionBg,
    ['--faq-card-bg' as any]: theme.cardBg,
    ['--faq-border' as any]: theme.borderColor,

    ['--faq-text' as any]: theme.textColor,
    ['--faq-muted' as any]: theme.mutedTextColor,

    ['--faq-accent' as any]: theme.accentColor,
  }
}
