export type ColorMode = 'site' | 'custom'

export type BlockThemeInput = {
  colorMode?: ColorMode
  primaryColor?: string | null
  primaryHoverColor?: string | null
  buttonTextColor?: string | null
  cardBg?: string | null
  textColor?: string | null
}

export function cssVarStyle(vars: Record<string, string | undefined | null>) {
  const style: Record<string, string> = {}
  for (const [k, v] of Object.entries(vars)) {
    if (v) style[k] = v
  }
  return style
}

export function themeVars(theme?: BlockThemeInput) {
  if (!theme || theme.colorMode !== 'custom') return {}

  return {
    ['--cta-primary' as any]: theme.primaryColor,
    ['--cta-primary-hover' as any]: theme.primaryHoverColor,
    ['--cta-btn-text' as any]: theme.buttonTextColor,
    ['--cta-card-bg' as any]: theme.cardBg,
    ['--cta-text' as any]: theme.textColor,
  }
}
