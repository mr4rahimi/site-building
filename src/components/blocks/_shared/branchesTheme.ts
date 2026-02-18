import type { BlockThemeInput } from './blockTheme'

export type BranchesThemeInput = BlockThemeInput & {
  borderColor?: string | null
  mutedTextColor?: string | null
  accentColor?: string | null
  accentSoftBg?: string | null
}

export function branchesThemeVars(theme?: BranchesThemeInput) {
  if (!theme || theme.colorMode !== 'custom') return {}

  return {
    ['--br-card-bg' as any]: theme.cardBg,
    ['--br-border' as any]: theme.borderColor,
    ['--br-text' as any]: theme.textColor,
    ['--br-muted' as any]: theme.mutedTextColor,
    ['--br-accent' as any]: theme.accentColor,
    ['--br-accent-soft' as any]: theme.accentSoftBg,
  }
}
