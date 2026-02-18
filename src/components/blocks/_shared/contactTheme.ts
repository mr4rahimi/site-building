export type ContactThemeInput = {
  colorMode?: 'site' | 'custom'

  cardBg?: string | null
  borderColor?: string | null
  glowColor?: string | null

  textColor?: string | null
  mutedTextColor?: string | null

  primaryColor?: string | null
  primaryHoverColor?: string | null
  buttonTextColor?: string | null

  secondaryBorderColor?: string | null
  secondaryHoverBg?: string | null
}

export function contactThemeVars(theme?: ContactThemeInput) {
  if (!theme || theme.colorMode !== 'custom') return {}

  return {
    ['--c1-card-bg' as any]: theme.cardBg,
    ['--c1-border' as any]: theme.borderColor,
    ['--c1-glow' as any]: theme.glowColor,

    ['--c1-text' as any]: theme.textColor,
    ['--c1-muted' as any]: theme.mutedTextColor,

    ['--c1-primary' as any]: theme.primaryColor,
    ['--c1-primary-hover' as any]: theme.primaryHoverColor,
    ['--c1-btn-text' as any]: theme.buttonTextColor,

    ['--c1-secondary-border' as any]: theme.secondaryBorderColor,
    ['--c1-secondary-hover' as any]: theme.secondaryHoverBg,
  }
}
