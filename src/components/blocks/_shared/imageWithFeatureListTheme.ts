export type ImageWithFeatureListThemeInput = {
  colorMode?: 'site' | 'custom'

  sectionBg?: string | null
  cardBg?: string | null
  borderColor?: string | null

  textColor?: string | null
  mutedTextColor?: string | null

  accentColor?: string | null
  captionBg?: string | null
}

export function imageWithFeatureListThemeVars(theme?: ImageWithFeatureListThemeInput) {
  if (!theme || theme.colorMode !== 'custom') return {}

  return {
    ['--iwfl-bg' as any]: theme.sectionBg,
    ['--iwfl-card-bg' as any]: theme.cardBg,
    ['--iwfl-border' as any]: theme.borderColor,

    ['--iwfl-text' as any]: theme.textColor,
    ['--iwfl-muted' as any]: theme.mutedTextColor,

    ['--iwfl-accent' as any]: theme.accentColor,
    ['--iwfl-cap-bg' as any]: theme.captionBg,
  }
}
