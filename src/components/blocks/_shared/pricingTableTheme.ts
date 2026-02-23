type PricingTableTheme = {
  colorMode?: 'site' | 'custom'
  background?: string
  cardBackground?: string
  textColor?: string
  mutedText?: string
  borderColor?: string
  accentColor?: string
}

export function getPricingTableThemeVars(theme?: PricingTableTheme) {
  if (!theme || theme.colorMode !== 'custom') return undefined

  return {
    '--pt-bg': theme.background || undefined,
    '--pt-card-bg': theme.cardBackground || undefined,
    '--pt-text': theme.textColor || undefined,
    '--pt-muted': theme.mutedText || undefined,
    '--pt-border': theme.borderColor || undefined,
    '--pt-accent': theme.accentColor || undefined,
  } as React.CSSProperties
}
