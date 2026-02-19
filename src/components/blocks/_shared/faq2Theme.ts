export type Faq2ThemeInput = {
  colorMode?: 'site' | 'custom'

  sectionBg?: string | null
  cardBg?: string | null
  borderColor?: string | null

  textColor?: string | null
  mutedTextColor?: string | null

  accentColor?: string | null
  asideBg?: string | null
}

export function faq2ThemeVars(theme?: Faq2ThemeInput) {
  if (!theme || theme.colorMode !== 'custom') return {}

  return {
    ['--fq2-bg' as any]: theme.sectionBg,
    ['--fq2-card-bg' as any]: theme.cardBg,
    ['--fq2-border' as any]: theme.borderColor,

    ['--fq2-text' as any]: theme.textColor,
    ['--fq2-muted' as any]: theme.mutedTextColor,

    ['--fq2-accent' as any]: theme.accentColor,
    ['--fq2-aside-bg' as any]: theme.asideBg,
  }
}
