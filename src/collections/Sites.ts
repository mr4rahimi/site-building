import type { CollectionConfig } from 'payload'

export const Sites: CollectionConfig = {
  slug: 'sites',
  labels: { singular: 'سایت', plural: 'سایت‌ها' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'primaryDomain', 'isActive'],
    description: 'مدیریت سایت‌های ثبت‌شده در پلتفرم',
  },
  access: {
    read: ({ req }) => {
      const user = req.user as any
      if (!user) return true  // public read for Astro static builds
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
    { name: 'name', label: 'نام سایت', type: 'text', required: true },
    {
      name: 'slug',
      label: 'شناسه URL',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'شناسه URL سایت (مثال: asus-repair)',
      },
    },
    { name: 'primaryDomain', label: 'دامنه اصلی', type: 'text', required: true },
    { name: 'isActive', label: 'فعال', type: 'checkbox', defaultValue: true },
    { name: 'logo', label: 'لوگو', type: 'upload', relationTo: 'media' },
    { name: 'brandPrimary', label: 'رنگ اصلی برند', type: 'text', defaultValue: '#111827' },
    {
      name: 'buildSite',
      type: 'ui',
      label: 'خروجی استاتیک',
      admin: {
        position: 'sidebar',
        components: {
          Field: '@/components/admin/BuildSiteButton',
        },
      },
    },
  ],
}
