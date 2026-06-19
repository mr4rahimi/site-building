const PAYLOAD_URL = (import.meta.env.PAYLOAD_URL || 'http://localhost:3000').replace(/\/$/, '')
export const SITE_SLUG = import.meta.env.SITE_SLUG || ''

// ─── Query builder ────────────────────────────────────────────────────────────

function buildWhere(where: Record<string, any>, params: URLSearchParams, prefix = 'where') {
  for (const [key, val] of Object.entries(where)) {
    const k = `${prefix}[${key}]`
    if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
      buildWhere(val, params, k)
    } else if (Array.isArray(val)) {
      val.forEach((v, i) => {
        if (v !== null && typeof v === 'object') {
          buildWhere(v, params, `${k}[${i}]`)
        } else {
          params.append(`${k}[${i}]`, String(v))
        }
      })
    } else {
      params.set(k, String(val))
    }
  }
}

interface FetchOpts {
  where?: Record<string, any>
  depth?: number
  limit?: number
  sort?: string
  page?: number
}

async function query<T = any>(collection: string, opts: FetchOpts = {}): Promise<{ docs: T[]; totalDocs: number }> {
  const params = new URLSearchParams()
  if (opts.depth !== undefined) params.set('depth', String(opts.depth))
  if (opts.limit !== undefined) params.set('limit', String(opts.limit))
  if (opts.sort) params.set('sort', opts.sort)
  if (opts.page) params.set('page', String(opts.page))
  if (opts.where) buildWhere(opts.where, params)

  const url = `${PAYLOAD_URL}/api/${collection}?${params}`
  const res = await fetch(url, { headers: { 'Accept': 'application/json' } })
  if (!res.ok) throw new Error(`[api] ${res.status} ${url}`)
  return res.json()
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function mediaUrl(media: any): string | null {
  if (!media || typeof media !== 'object') return null
  if (media.url) return media.url
  if (media.filename) return `${PAYLOAD_URL}/api/media/file/${media.filename}`
  return null
}

// ─── Site ─────────────────────────────────────────────────────────────────────

export async function getSite() {
  const res = await query('sites', {
    depth: 0,
    limit: 1,
    where: { slug: { equals: SITE_SLUG } },
  })
  return res.docs[0] as any || null
}

export async function getSiteSettings(siteId: string) {
  const res = await query('site-settings', {
    depth: 2,
    limit: 1,
    where: { site: { equals: siteId } },
  })
  return (res.docs[0] as any) || null
}

// ─── Pages ────────────────────────────────────────────────────────────────────

export async function getAllPages(siteId: string) {
  const res = await query('pages', {
    depth: 0,
    limit: 200,
    where: { site: { equals: siteId } },
  })
  return res.docs as any[]
}

export async function getPage(siteId: string, slug: string) {
  const res = await query('pages', {
    depth: 3,
    limit: 1,
    where: { and: [{ slug: { equals: slug } }, { site: { equals: siteId } }] },
  })
  return (res.docs[0] as any) || null
}

// ─── Posts ────────────────────────────────────────────────────────────────────

export async function getAllPosts(siteId: string) {
  const now = new Date().toISOString()
  const res = await query('posts', {
    depth: 1,
    limit: 200,
    sort: '-publishedAt',
    where: {
      and: [
        { site: { equals: siteId } },
        { publishedAt: { less_than_equal: now } },
      ],
    },
  })
  return res.docs as any[]
}

export async function getPost(siteId: string, slug: string) {
  const res = await query('posts', {
    depth: 3,
    limit: 1,
    where: { and: [{ slug: { equals: slug } }, { site: { equals: siteId } }] },
  })
  return (res.docs[0] as any) || null
}

// ─── Services ─────────────────────────────────────────────────────────────────

export async function getAllServices(siteId: string) {
  const res = await query('services', {
    depth: 0,
    limit: 200,
    where: { site: { equals: siteId } },
  })
  return res.docs as any[]
}

export async function getService(siteId: string, slug: string) {
  const res = await query('services', {
    depth: 3,
    limit: 1,
    where: { and: [{ slug: { equals: slug } }, { site: { equals: siteId } }] },
  })
  return (res.docs[0] as any) || null
}

// ─── Batch site data ──────────────────────────────────────────────────────────

export async function getSiteData() {
  const site = await getSite()
  if (!site) throw new Error(`Site not found: "${SITE_SLUG}"`)
  const settings = await getSiteSettings(site.id)
  return { site, settings }
}
