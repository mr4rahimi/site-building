import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: { singular: 'پیام تماس', plural: 'پیام‌های تماس' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'site', 'createdAt'],
    description: 'پیام‌های دریافتی از فرم‌های تماس سایت‌ها',
    group: 'تنظیمات',
  },
  access: {
    read: ({ req }) => {
      const user = req.user as any
      if (!user) return false
      if (user.role === 'superadmin') return true
      const siteIDs = user.sites?.map((s: any) => (typeof s === 'string' ? s : s?.id)) || []
      return { site: { in: siteIDs } }
    },
    create: () => true,
    update: ({ req }) => (req.user as any)?.role === 'superadmin',
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
    {
      name: 'name',
      label: 'نام',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      label: 'شماره تماس',
      type: 'text',
    },
    {
      name: 'email',
      label: 'ایمیل',
      type: 'email',
    },
    {
      name: 'subject',
      label: 'موضوع',
      type: 'text',
    },
    {
      name: 'message',
      label: 'پیام',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      label: 'وضعیت',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'جدید', value: 'new' },
        { label: 'خوانده شده', value: 'read' },
        { label: 'پاسخ داده شده', value: 'replied' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
