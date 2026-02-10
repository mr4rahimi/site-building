import type { CollectionConfig } from 'payload'
import { tenantReadAccess, canWrite, onlySuperadmin, enforceTenantSite } from '../utils/tenant'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'site', 'publishedAt', 'updatedAt'],
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

    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },

    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media' as any,
    },

    {
  name: 'content',
  type: 'textarea',
  required: true,
},

    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
  ],
}
