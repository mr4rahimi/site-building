import type { CollectionConfig } from 'payload'
import type { Where } from 'payload'

function getUserSiteIDs(user: any): string[] {
  return user?.sites?.map((s: any) => (typeof s === 'string' ? s : s?.id)).filter(Boolean) || []
}

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  labels: { singular: 'کاربر', plural: 'کاربران' },
  admin: {
    useAsTitle: 'email',
    description: 'مدیریت کاربران و سطح دسترسی',
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

      return user.role === 'superadmin'
    },
  },

  hooks: {
    beforeValidate: [
      ({ req, data }) => {
        const user = req.user as any
        if (!user || !data) return data

        if (user.role === 'superadmin') return data

        if (user.role === 'editor') {
          const { role, sites, ...safe } = data as any
          return safe
        }

        // siteadmin:

        if ((data as any).role === 'superadmin') {
          ;(data as any).role = 'editor'
        }

        const allowedSiteIDs = new Set(getUserSiteIDs(user))
        const incomingSites = (data as any).sites

        if (Array.isArray(incomingSites)) {
          const normalized = incomingSites
            .map((s: any) => (typeof s === 'string' ? s : s?.id))
            .filter(Boolean)
            .filter((id: string) => allowedSiteIDs.has(id))

          ;(data as any).sites = normalized
        } else if (incomingSites) {
          const id = typeof incomingSites === 'string' ? incomingSites : incomingSites?.id
          ;(data as any).sites = id && allowedSiteIDs.has(id) ? [id] : []
        } else {
          ;(data as any).sites = Array.from(allowedSiteIDs)
        }

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
      label: 'نقش',
      type: 'select',
      required: true,
      defaultValue: 'superadmin',
      options: [
        { label: 'سوپر ادمین', value: 'superadmin' },
        { label: 'ادمین سایت', value: 'siteadmin' },
        { label: 'ویرایشگر', value: 'editor' },
      ],
    },
    {
      name: 'sites',
      label: 'سایت‌های مجاز',
      type: 'relationship',
      relationTo: 'sites' as any,
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.role !== 'superadmin',
        description: 'سایت‌هایی که این کاربر به آن‌ها دسترسی دارد',
      },
    },
  ],
}
