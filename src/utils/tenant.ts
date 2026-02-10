import type { Where } from 'payload'

export function getUserSiteIDs(user: any): string[] {
  return (
    user?.sites?.map((s: any) => (typeof s === 'string' ? s : s?.id)).filter(Boolean) || []
  )
}

export function tenantReadAccess({ req }: { req: any }): boolean | Where {
  const user = req.user as any
  if (!user) return false
  if (user.role === 'superadmin') return true

  const siteIDs = getUserSiteIDs(user)
  return { site: { in: siteIDs } }
}

export function canWrite({ req }: { req: any }): boolean {
  return !!req.user
}

export function onlySuperadmin({ req }: { req: any }): boolean {
  return (req.user as any)?.role === 'superadmin'
}
export function enforceTenantSite(req: any, data: any) {
  const user = req.user as any
  if (!user || !data) return data
  if (user.role === 'superadmin') return data

  const siteIDs = getUserSiteIDs(user)
  const firstSite = siteIDs[0]

  const incoming = data.site
  const incomingId = typeof incoming === 'string' ? incoming : incoming?.id

  const finalSite = incomingId && siteIDs.includes(incomingId) ? incomingId : firstSite

  return {
    ...data,
    site: finalSite,
  }
}
