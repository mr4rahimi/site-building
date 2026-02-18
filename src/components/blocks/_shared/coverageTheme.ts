export type CoverageThemeInput = {
  colorMode?: 'site' | 'custom'

  sectionBg?: string | null
  cardBg?: string | null
  borderColor?: string | null

  textColor?: string | null
  mutedTextColor?: string | null

  accentColor?: string | null

  chipBg?: string | null
  chipText?: string | null
}

export function coverageThemeVars(theme?: CoverageThemeInput) {
  if (!theme || theme.colorMode !== 'custom') return {}

  return {
    ['--cv-section-bg' as any]: theme.sectionBg,
    ['--cv-card-bg' as any]: theme.cardBg,
    ['--cv-border' as any]: theme.borderColor,

    ['--cv-text' as any]: theme.textColor,
    ['--cv-muted' as any]: theme.mutedTextColor,

    ['--cv-accent' as any]: theme.accentColor,

    ['--cv-chip-bg' as any]: theme.chipBg,
    ['--cv-chip-text' as any]: theme.chipText,
  }
}
