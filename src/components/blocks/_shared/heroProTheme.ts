export type HeroProThemeInput = {
  colorMode?: 'site' | 'custom'

  sectionBg?: string | null
  cardBg?: string | null
  borderColor?: string | null

  textColor?: string | null
  mutedTextColor?: string | null

  accentColor?: string | null

  primaryColor?: string | null
  primaryHoverColor?: string | null
  buttonTextColor?: string | null

  secondaryTextColor?: string | null
  secondaryHoverBg?: string | null
}

export function heroProThemeVars(theme?: HeroProThemeInput) {
  if (!theme || theme.colorMode !== 'custom') return {}

  return {
    ['--hp-bg' as any]: theme.sectionBg,
    ['--hp-card-bg' as any]: theme.cardBg,
    ['--hp-border' as any]: theme.borderColor,

    ['--hp-text' as any]: theme.textColor,
    ['--hp-muted' as any]: theme.mutedTextColor,

    ['--hp-accent' as any]: theme.accentColor,

    ['--hp-primary' as any]: theme.primaryColor,
    ['--hp-primary-hover' as any]: theme.primaryHoverColor,
    ['--hp-btn-text' as any]: theme.buttonTextColor,

    ['--hp-secondary-text' as any]: theme.secondaryTextColor,
    ['--hp-secondary-hover' as any]: theme.secondaryHoverBg,
  }
}
