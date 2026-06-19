import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'رسانه', plural: 'رسانه‌ها' },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'mediaKind', 'updatedAt'],
    description: 'تصاویر، ویدئوها و فایل‌های آپلود‌شده',
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



    { name: 'alt', label: 'متن جایگزین (Alt)', type: 'text', required: true },

    {
      name: 'mediaKind',
      label: 'نوع رسانه',
      type: 'select',
      required: true,
      defaultValue: 'upload',
      options: [
        { label: 'آپلود (تصویر/ویدئو)', value: 'upload' },
        { label: 'امبد آپارات', value: 'aparat' },
      ],
    },

    {
      name: 'aparatUrl',
      label: 'لینک آپارات',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.mediaKind === 'aparat',
        placeholder: 'https://www.aparat.com/v/XXXXXX',
        description: 'آدرس مستقیم ویدئو در آپارات',
      },
    },

    {
      name: 'aparatIframe',
      label: 'کد iframe آپارات',
      type: 'textarea',
      admin: {
        condition: (_, siblingData) => siblingData?.mediaKind === 'aparat',
        placeholder: '<iframe src="..."></iframe>',
        description: 'کد کامل امبد که آپارات در اختیار می‌گذارد',
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
