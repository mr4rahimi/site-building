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
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'primaryDomain', type: 'text', required: true },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'brandPrimary', type: 'text', defaultValue: '#111827' },
  ],
}
