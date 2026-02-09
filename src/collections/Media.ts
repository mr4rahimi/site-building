import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'mediaKind', 'updatedAt'],
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


  upload: {
    // فایل‌های آپلودی (عکس/ویدئو) اینجا مدیریت می‌شوند
    staticDir: process.env.MEDIA_DIR || 'media',
    mimeTypes: [
      'image/*',
      'video/*',
    ],
  },
  fields: [

    {
  name: 'site',
  type: 'relationship',
  relationTo: 'sites'as any,
  required: true,
  index: true,
  admin: {
    position: 'sidebar',
  },
 },



    { name: 'alt', type: 'text', required: true },

    {
      name: 'mediaKind',
      type: 'select',
      required: true,
      defaultValue: 'upload',
      options: [
        { label: 'Upload (Image/Video)', value: 'upload' },
        { label: 'Aparat Embed', value: 'aparat' },
      ],
    },

    // اگر آپارات بود، لینک/کد امبد
    {
      name: 'aparatUrl',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.mediaKind === 'aparat',
        placeholder: 'https://www.aparat.com/v/XXXXXX',
      },
    },

    // اگر آپارات بود، اختیاری: کد iframe کامل
    {
      name: 'aparatIframe',
      type: 'textarea',
      admin: {
        condition: (_, siblingData) => siblingData?.mediaKind === 'aparat',
        placeholder: '<iframe src="..."></iframe>',
      },
    },
  ],

  hooks: {
  beforeValidate: [
    ({ req, data }) => {
      const user = req.user as any
      if (!user) return data
      if (user.role === 'superadmin') return data

      const firstSite = user.sites?.[0]
      const siteId = typeof firstSite === 'string' ? firstSite : firstSite?.id

      // اگر کاربر سوپرادمین نیست و سایت مشخص نشده، اتومات ست کن
      return {
        ...data,
        site: data?.site || siteId,
      }
    },
  ],
 },

}
