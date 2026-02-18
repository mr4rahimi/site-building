export type Contact2ThemeInput = {
  colorMode?: 'site' | 'custom'

  bgFrom?: string | null
  bgVia?: string | null
  bgTo?: string | null

  textColor?: string | null
  mutedTextColor?: string | null

  accentColor?: string | null

  buttonBg?: string | null
  buttonText?: string | null
  buttonHoverBg?: string | null
}

export function contact2ThemeVars(theme?: Contact2ThemeInput) {
  if (!theme || theme.colorMode !== 'custom') return {}

  return {
    ['--c2-bg-from' as any]: theme.bgFrom,
    ['--c2-bg-via' as any]: theme.bgVia,
    ['--c2-bg-to' as any]: theme.bgTo,

    ['--c2-text' as any]: theme.textColor,
    ['--c2-muted' as any]: theme.mutedTextColor,

    ['--c2-accent' as any]: theme.accentColor,

    ['--c2-btn-bg' as any]: theme.buttonBg,
    ['--c2-btn-text' as any]: theme.buttonText,
    ['--c2-btn-hover' as any]: theme.buttonHoverBg,
  }
}
