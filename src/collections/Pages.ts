import type { CollectionConfig } from 'payload'
import { tenantReadAccess, canWrite, onlySuperadmin, enforceTenantSite } from '../utils/tenant'
import { COMMON_BLOCKS } from '../blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'pageType', 'site', 'updatedAt'],
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

    // فقط برای Home: Page Builder با blocks و reorder داخلی payload
    {
  name: 'sections',
  type: 'blocks',
  blocks: COMMON_BLOCKS,
  admin: {
    condition: (_, siblingData) => siblingData?.pageType === 'home',
  },
},


    // About fields
    {
  name: 'aboutContent',
  type: 'textarea',
  admin: { condition: (_, siblingData) => siblingData?.pageType === 'about' },
},


    // Contact fields
    {
      name: 'contact',
      type: 'group',
      admin: { condition: (_, siblingData) => siblingData?.pageType === 'contact' },
      fields: [
        { name: 'phone', type: 'text' },
        { name: 'address', type: 'textarea' },
        { name: 'mapEmbed', type: 'textarea' },
      ],
    },
  ],
}
