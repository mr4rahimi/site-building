import type { CollectionConfig } from 'payload'

export const Sites: CollectionConfig = {
  slug: 'sites',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'primaryDomain', 'isActive'],
  },
  access: {
    read: ({ req }) => {
      const user = req.user as any
      if (!user) return false
      if (user.role === 'superadmin') return true

      return { id: { in: user.sites?.map((s: any) => (typeof s === 'string' ? s : s.id)) || [] } }
    },
    create: ({ req }) => (req.user as any)?.role === 'superadmin',
    update: ({ req }) => (req.user as any)?.role === 'superadmin',
    delete: ({ req }) => (req.user as any)?.role === 'superadmin',
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && data.name) {
          data.slug = (data.name as string)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
        }
        return data
      },
    ],
  },

  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'شناسه URL سایت (مثال: asus-repair)',
      },
    },
    { name: 'primaryDomain', type: 'text', required: true },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'brandPrimary', type: 'text', defaultValue: '#111827' },
  ],
}
