export type Contact3ThemeInput = {
  colorMode?: 'site' | 'custom'

  cardBg?: string | null
  sideCardBg?: string | null
  borderColor?: string | null

  textColor?: string | null
  mutedTextColor?: string | null

  accentColor?: string | null
  badgeBg?: string | null

  primaryColor?: string | null
  primaryHoverColor?: string | null
  buttonTextColor?: string | null
}

export function contact3ThemeVars(theme?: Contact3ThemeInput) {
  if (!theme || theme.colorMode !== 'custom') return {}

  return {
    ['--c3-card-bg' as any]: theme.cardBg,
    ['--c3-side-bg' as any]: theme.sideCardBg,
    ['--c3-border' as any]: theme.borderColor,

    ['--c3-text' as any]: theme.textColor,
    ['--c3-muted' as any]: theme.mutedTextColor,

    ['--c3-accent' as any]: theme.accentColor,
    ['--c3-badge-bg' as any]: theme.badgeBg,

    ['--c3-primary' as any]: theme.primaryColor,
    ['--c3-primary-hover' as any]: theme.primaryHoverColor,
    ['--c3-btn-text' as any]: theme.buttonTextColor,
  }
}
