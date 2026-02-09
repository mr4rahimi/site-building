import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
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
      // برای اینکه هر کاربر فقط به سایت(های) خودش دسترسی داشته باشه
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
