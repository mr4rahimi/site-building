import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'دسته‌بندی', plural: 'دسته‌بندی‌ها' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'site', 'updatedAt'],
    description: 'دسته‌بندی مقالات وبلاگ',
  },

  access: {
    read: ({ req }) => {
      const user = req.user as any
      if (!user) return false
      if (user.role === 'superadmin') return true
      const siteIDs = user.sites?.map((s: any) => (typeof s === 'string' ? s : s.id)) || []
      return { site: { in: siteIDs } }
    },
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => (req.user as any)?.role === 'superadmin',
  },

  fields: [
    {
      name: 'site',
      type: 'relationship',
      relationTo: 'sites' as any,
      required: true,
      index: true,
      admin: { position: 'sidebar' },
    },

    { name: 'title', label: 'عنوان', type: 'text', required: true },

    {
      name: 'slug',
      type: 'text',
      required: true,
      index: true,
      admin: { position: 'sidebar' },
    },
  ],

  hooks: {
    beforeValidate: [
      ({ req, data = {} }) => {
        const user = req.user as any
        if (!user) return data

        if (user.role !== 'superadmin') {
          const firstSite = user.sites?.[0]
          const siteId = typeof firstSite === 'string' ? firstSite : firstSite?.id
          data.site = data.site || siteId
        }

        if (!data.slug && data.title) {
          data.slug = String(data.title)
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9\-آ-ی]+/g, '')
        }

        return data
      },
    ],
  },
}
