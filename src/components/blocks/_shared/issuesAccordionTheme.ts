export type IssuesAccordionThemeInput = {
  colorMode?: 'site' | 'custom'

  sectionBg?: string | null
  cardBg?: string | null
  borderColor?: string | null

  textColor?: string | null
  mutedTextColor?: string | null

  accentColor?: string | null
}

export function issuesAccordionThemeVars(theme?: IssuesAccordionThemeInput) {
  if (!theme || theme.colorMode !== 'custom') return {}

  return {
    ['--isa-bg' as any]: theme.sectionBg,
    ['--isa-card-bg' as any]: theme.cardBg,
    ['--isa-border' as any]: theme.borderColor,

    ['--isa-text' as any]: theme.textColor,
    ['--isa-muted' as any]: theme.mutedTextColor,

    ['--isa-accent' as any]: theme.accentColor,
  }
}
