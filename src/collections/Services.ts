import type { CollectionConfig } from 'payload'
import { tenantReadAccess, canWrite, onlySuperadmin, enforceTenantSite } from '../utils/tenant'
import { COMMON_BLOCKS } from '../blocks'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'خدمت', plural: 'خدمات' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'site', 'updatedAt'],
    description: 'صفحات خدمات سایت‌ها',
  },

  access: {
    read: tenantReadAccess,
    create: canWrite,
    update: canWrite,
    delete: onlySuperadmin,
  },

  hooks: {
    beforeValidate: [
      ({ req, data }) => enforceTenantSite(req, data),
    ],
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

    { name: 'title', label: 'عنوان خدمت', type: 'text', required: true },

    {
      name: 'slug',
      label: 'آدرس (Slug)',
      type: 'text',
      required: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'بدون / اول — مثال: laptop-repair',
      },
    },

    {
      name: 'sections',
      label: 'بخش‌های صفحه',
      type: 'blocks',
      blocks: COMMON_BLOCKS,
      required: false,
    },
  ],
}
