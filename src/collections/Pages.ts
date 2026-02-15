import type { CollectionConfig } from 'payload'
import { tenantReadAccess, canWrite, onlySuperadmin, enforceTenantSite } from '../utils/tenant'
import { COMMON_BLOCKS } from '../blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'pageType', 'site', 'updatedAt'],
  },

  access: {
    read: tenantReadAccess,
    create: canWrite,
    update: canWrite,
    delete: onlySuperadmin,
  },

  hooks: {
    beforeValidate: [({ req, data }) => enforceTenantSite(req, data)],
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

    { name: 'title', type: 'text', required: true },

    {
      name: 'slug',
      type: 'text',
      required: true,
      index: true,
      unique: true,
      admin: { position: 'sidebar' },
    },

    {
      name: 'pageType',
      type: 'select',
      required: true,
      options: [
        { label: 'Home', value: 'home' },
        { label: 'About', value: 'about' },
        { label: 'Contact', value: 'contact' },
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
