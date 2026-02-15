import type { CollectionConfig } from 'payload'
import type { Where } from 'payload'

function getUserSiteIDs(user: any): string[] {
  return (
    user?.sites?.map((s: any) => (typeof s === 'string' ? s : s?.id)).filter(Boolean) || []
  )
}

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },

  access: {
    read: ({ req }) => {
      const user = req.user as any
      if (!user) return false
      if (user.role === 'superadmin') return true

      if (user.role === 'editor') {
        const where: Where = { id: { equals: user.id } }
        return where
      }

      const siteIDs = getUserSiteIDs(user)
      const where: Where = {
        and: [{ role: { not_equals: 'superadmin' } }, { sites: { in: siteIDs } }],
      }
      return where
    },


    create: ({ req }) => {
      const user = req.user as any
      if (!user) return false
      if (user.role === 'superadmin') return true
      if (user.role === 'siteadmin') return true
      return false
    },

    update: ({ req }) => {
      const user = req.user as any
      if (!user) return false
      if (user.role === 'superadmin') return true

      if (user.role === 'editor') {
        const where: Where = { id: { equals: user.id } }
        return where
      }

      const siteIDs = getUserSiteIDs(user)
      const where: Where = {
        and: [{ role: { not_equals: 'superadmin' } }, { sites: { in: siteIDs } }],
      }
      return where
    },

    delete: ({ req }) => {
      const user = req.user as any
      if (!user) return false
      // برای شروع امن: حذف فقط دست superadmin
      return user.role === 'superadmin'
    },
  },

  hooks: {
    beforeValidate: [
      ({ req, data }) => {
        const user = req.user as any
        if (!user || !data) return data

        // superadmin محدودیت ندارد
        if (user.role === 'superadmin') return data

        // editor حق تغییر role/sites ندارد (حتی برای خودش)
        if (user.role === 'editor') {
          const { role, sites, ...safe } = data as any
          return safe
        }

        // siteadmin:
        // 1) هرگز نتواند کسی را superadmin کند
        if ((data as any).role === 'superadmin') {
          ;(data as any).role = 'editor'
        }

        // 2) sites فقط باید زیرمجموعه sites خود siteadmin باشد
        const allowedSiteIDs = new Set(getUserSiteIDs(user))
        const incomingSites = (data as any).sites

        if (Array.isArray(incomingSites)) {
          const normalized = incomingSites
            .map((s: any) => (typeof s === 'string' ? s : s?.id))
            .filter(Boolean)
            .filter((id: string) => allowedSiteIDs.has(id))

          ;(data as any).sites = normalized
        } else if (incomingSites) {
          // اگر تک مقدار آمد، باز هم محدود کن
          const id = typeof incomingSites === 'string' ? incomingSites : incomingSites?.id
          ;(data as any).sites = id && allowedSiteIDs.has(id) ? [id] : []
        } else {
          // اگر چیزی نفرستاد، برای کاهش خطاها: پیش‌فرض = سایت‌های خودش
          ;(data as any).sites = Array.from(allowedSiteIDs)
        }

        // 3) siteadmin نتواند کاربری بسازد بدون site
        // (اگر پروژه‌ات بعداً اجازه بده چندسایتی/خالی باشد، این را می‌توان تغییر داد)
        if (!(data as any).sites?.length) {
          ;(data as any).sites = Array.from(allowedSiteIDs)
        }

        return data
      },
    ],
  },

  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'superadmin',
      options: [
        { label: 'Super Admin', value: 'superadmin' },
        { label: 'Site Admin', value: 'siteadmin' },
        { label: 'Editor', value: 'editor' },
      ],
    },
    {
      name: 'sites',
      type: 'relationship',
      relationTo: 'sites' as any,
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.role !== 'superadmin',
      },
    },
  ],
}
