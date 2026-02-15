import type { Block } from 'payload'

export const ServiceDetailSection: Block = {
  slug: 'serviceDetailSection',
  labels: { singular: 'Service Detail Section', plural: 'Service Detail Section' },
  fields: [
    { name: 'sectionId', type: 'text', required: true, admin: { position: 'sidebar' } },
    { name: 'title', type: 'text', required: true },

    { name: 'content', type: 'array', fields: [{ name: 'text', type: 'textarea', required: true }] },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media' as any,
      required: false,
    },

    {
      name: 'pills',
      type: 'array',
      admin: { initCollapsed: true },
      fields: [{ name: 'text', type: 'text', required: true }],
    },

    {
      name: 'layout',
      type: 'select',
      defaultValue: 'imageRight',
      options: [
        { label: 'Image Right', value: 'imageRight' },
        { label: 'Image Left', value: 'imageLeft' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
