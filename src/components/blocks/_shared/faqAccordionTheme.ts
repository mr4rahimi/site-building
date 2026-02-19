export type FaqAccordionThemeInput = {
  colorMode?: 'site' | 'custom'

  sectionBg?: string | null
  cardBg?: string | null
  borderColor?: string | null

  textColor?: string | null
  mutedTextColor?: string | null

  accentColor?: string | null
}

export function faqAccordionThemeVars(theme?: FaqAccordionThemeInput) {
  if (!theme || theme.colorMode !== 'custom') return {}

  return {
    ['--fqa-bg' as any]: theme.sectionBg,
    ['--fqa-card-bg' as any]: theme.cardBg,
    ['--fqa-border' as any]: theme.borderColor,

    ['--fqa-text' as any]: theme.textColor,
    ['--fqa-muted' as any]: theme.mutedTextColor,

    ['--fqa-accent' as any]: theme.accentColor,
  }
}
