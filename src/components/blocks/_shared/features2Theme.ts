export type Features2ThemeInput = {
  colorMode?: 'site' | 'custom'

  sectionBg?: string | null
  cardBg?: string | null
  borderColor?: string | null

  textColor?: string | null
  mutedTextColor?: string | null

  accentColor?: string | null
  iconBg?: string | null
}

export function features2ThemeVars(theme?: Features2ThemeInput) {
  if (!theme || theme.colorMode !== 'custom') return {}

  return {
    ['--f2-bg' as any]: theme.sectionBg,
    ['--f2-card-bg' as any]: theme.cardBg,
    ['--f2-border' as any]: theme.borderColor,

    ['--f2-text' as any]: theme.textColor,
    ['--f2-muted' as any]: theme.mutedTextColor,

    ['--f2-accent' as any]: theme.accentColor,
    ['--f2-ic-bg' as any]: theme.iconBg,
  }
}
