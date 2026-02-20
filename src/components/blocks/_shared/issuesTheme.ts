export type IssuesThemeInput = {
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
}

export function issuesThemeVars(theme?: IssuesThemeInput) {
  if (!theme || theme.colorMode !== 'custom') return {}

  return {
    ['--is-bg' as any]: theme.sectionBg,
    ['--is-card-bg' as any]: theme.cardBg,
    ['--is-border' as any]: theme.borderColor,

    ['--is-text' as any]: theme.textColor,
    ['--is-muted' as any]: theme.mutedTextColor,

    ['--is-accent' as any]: theme.accentColor,

    ['--is-primary' as any]: theme.primaryColor,
    ['--is-primary-hover' as any]: theme.primaryHoverColor,
    ['--is-btn-text' as any]: theme.buttonTextColor,
  }
}
