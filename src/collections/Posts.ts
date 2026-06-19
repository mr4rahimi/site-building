import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'مقاله', plural: 'مقالات' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'site', 'publishedAt', 'updatedAt'],
    description: 'مقالات و پست‌های وبلاگ سایت‌ها',
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
      label: 'سایت',
      type: 'relationship',
      relationTo: 'sites' as any,
      required: true,
      index: true,
      admin: { position: 'sidebar' },
    },

    { name: 'title', label: 'عنوان مقاله', type: 'text', required: true },

    {
      name: 'slug',
      label: 'آدرس (Slug)',
      type: 'text',
      required: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'بدون / اول — مثال: my-post-title',
      },
    },

    {
      name: 'excerpt',
      label: 'توضیحات کوتاه',
      type: 'textarea',
    },

    {
      name: 'featuredImage',
      label: 'عکس شاخص',
      type: 'upload',
      relationTo: 'media',
      admin: { position: 'sidebar' },
    },

    {
      name: 'categories',
      label: 'دسته‌بندی‌ها',
      type: 'relationship',
      relationTo: 'categories' as any,
      hasMany: true,
      admin: { position: 'sidebar' },
    },

    {
      name: 'publishedAt',
      label: 'تاریخ انتشار',
      type: 'date',
      admin: { position: 'sidebar' },
      index: true,
    },

    {
      name: 'content',
      label: 'متن',
      type: 'richText',
      required: true,
    },
  ],

  hooks: {
    beforeValidate: [
      ({ req, data = {} }) => {
        const user = req.user as any
        if (!user) return data

        // auto site
        if (user.role !== 'superadmin') {
          const firstSite = user.sites?.[0]
          const siteId = typeof firstSite === 'string' ? firstSite : firstSite?.id
          data.site = data.site || siteId
        }

        // auto slug
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
