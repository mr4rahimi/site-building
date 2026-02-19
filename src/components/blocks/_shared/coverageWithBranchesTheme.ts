export type CoverageWithBranchesThemeInput = {
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

  branchIconBg?: string | null
}

export function coverageWithBranchesThemeVars(theme?: CoverageWithBranchesThemeInput) {
  if (!theme || theme.colorMode !== 'custom') return {}

  return {
    ['--cwb-bg' as any]: theme.sectionBg,
    ['--cwb-card-bg' as any]: theme.cardBg,
    ['--cwb-border' as any]: theme.borderColor,

    ['--cwb-text' as any]: theme.textColor,
    ['--cwb-muted' as any]: theme.mutedTextColor,

    ['--cwb-accent' as any]: theme.accentColor,

    ['--cwb-primary' as any]: theme.primaryColor,
    ['--cwb-primary-hover' as any]: theme.primaryHoverColor,
    ['--cwb-btn-text' as any]: theme.buttonTextColor,

    ['--cwb-branch-ic-bg' as any]: theme.branchIconBg,
  }
}
