import type { CollectionConfig } from 'payload'
import { tenantReadAccess, canWrite, onlySuperadmin, enforceTenantSite } from '../utils/tenant'
import { COMMON_BLOCKS } from '../blocks'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'site', 'updatedAt'],
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

    { name: 'title', type: 'text', required: true },

    {
      name: 'slug',
      type: 'text',
      required: true,
      index: true,
      admin: { position: 'sidebar' },
    },

    // Page Builder برای سرویس
    {
      name: 'sections',
      type: 'blocks',
      blocks: COMMON_BLOCKS,
      required: false,
    },
  ],
}
