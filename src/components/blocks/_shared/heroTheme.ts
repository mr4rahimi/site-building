export type HeroThemeInput = {
  colorMode?: 'site' | 'custom'

  sectionBg?: string | null
  borderColor?: string | null

  textColor?: string | null
  mutedTextColor?: string | null

  accentColor?: string | null

  primaryColor?: string | null
  primaryHoverColor?: string | null
  buttonTextColor?: string | null

  secondaryBg?: string | null
  secondaryText?: string | null
}

export function heroThemeVars(theme?: HeroThemeInput) {
  if (!theme || theme.colorMode !== 'custom') return {}

  return {
    ['--h-bg' as any]: theme.sectionBg,
    ['--h-border' as any]: theme.borderColor,

    ['--h-text' as any]: theme.textColor,
    ['--h-muted' as any]: theme.mutedTextColor,

    ['--h-accent' as any]: theme.accentColor,

    ['--h-primary' as any]: theme.primaryColor,
    ['--h-primary-hover' as any]: theme.primaryHoverColor,
    ['--h-btn-text' as any]: theme.buttonTextColor,

    ['--h-secondary-bg' as any]: theme.secondaryBg,
    ['--h-secondary-text' as any]: theme.secondaryText,
  }
}
