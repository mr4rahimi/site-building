export type LandingHeroImageThemeInput = {
  colorMode?: 'site' | 'custom'

  overlayFrom?: string | null
  overlayTo?: string | null

  panelBg?: string | null
  borderColor?: string | null

  textColor?: string | null
  mutedTextColor?: string | null

  accentColor?: string | null

  primaryColor?: string | null
  primaryHoverColor?: string | null
  buttonTextColor?: string | null

  secondaryTextColor?: string | null
  secondaryHoverBg?: string | null

  pillBg?: string | null
  pillText?: string | null
}

export function landingHeroImageThemeVars(theme?: LandingHeroImageThemeInput) {
  if (!theme || theme.colorMode !== 'custom') return {}

  return {
    ['--lhi-ov-from' as any]: theme.overlayFrom,
    ['--lhi-ov-to' as any]: theme.overlayTo,

    ['--lhi-panel' as any]: theme.panelBg,
    ['--lhi-border' as any]: theme.borderColor,

    ['--lhi-text' as any]: theme.textColor,
    ['--lhi-muted' as any]: theme.mutedTextColor,

    ['--lhi-accent' as any]: theme.accentColor,

    ['--lhi-primary' as any]: theme.primaryColor,
    ['--lhi-primary-hover' as any]: theme.primaryHoverColor,
    ['--lhi-btn-text' as any]: theme.buttonTextColor,

    ['--lhi-secondary-text' as any]: theme.secondaryTextColor,
    ['--lhi-secondary-hover' as any]: theme.secondaryHoverBg,

    ['--lhi-pill-bg' as any]: theme.pillBg,
    ['--lhi-pill-text' as any]: theme.pillText,
  }
}
