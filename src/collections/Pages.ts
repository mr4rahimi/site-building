import type { CollectionConfig } from 'payload'
import { tenantReadAccess, canWrite, onlySuperadmin, enforceTenantSite } from '../utils/tenant'
import { COMMON_BLOCKS } from '../blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'صفحه', plural: 'صفحات' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'pageType', 'site', 'updatedAt'],
    description: 'صفحات سایت‌ها را مدیریت کنید',
  },

  access: {
    read: tenantReadAccess,
    create: canWrite,
    update: canWrite,
    delete: onlySuperadmin,
  },

  hooks: {
    beforeValidate: [
      ({ req, data }) => {
        if (data?.pageType === 'home') {
          data.slug = 'home'
        } else if (data?.slug) {
          data.slug = (data.slug as string)
            .replace(/^\/+/, '')
            .toLowerCase()
            .replace(/\s+/g, '-')
            .trim()
        }
        return enforceTenantSite(req, data)
      },
    ],
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

    { name: 'title', label: 'عنوان صفحه', type: 'text', required: true },

    {
      name: 'slug',
      label: 'آدرس (Slug)',
      type: 'text',
      index: true,
      validate: (val: any, { data }: any) => {
        if (data?.pageType === 'home') return true
        if (!val || !(val as string).trim()) return 'آدرس صفحه الزامی است'
        return true
      },
      admin: {
        position: 'sidebar',
        description: 'بدون / اول — مثال: about یا services',
        condition: (data: any) => data?.pageType !== 'home',
        components: {
          Cell: '@/components/admin/SlugCell',
        },
      },
    },

    {
      name: 'pageType',
      label: 'نوع صفحه',
      type: 'select',
      required: true,
      options: [
        { label: 'صفحه اصلی', value: 'home' },
        { label: 'درباره ما', value: 'about' },
        { label: 'تماس با ما', value: 'contact' },
      ],
      admin: { position: 'sidebar' },
    },

    {
      name: 'layout',
      label: 'بخش‌های صفحه',
      type: 'blocks',
      blocks: COMMON_BLOCKS,
    },
  ],
}
