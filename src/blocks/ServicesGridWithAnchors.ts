import type { Block } from 'payload'

export const ServicesGridWithAnchors: Block = {
  slug: 'servicesGridWithAnchors',
  labels: { singular: 'Services Grid (Anchors)', plural: 'Services Grid (Anchors)' },
  fields: [
    { name: 'sectionId', type: 'text', defaultValue: 'services', admin: { position: 'sidebar' } },
    { name: 'title', type: 'text', required: true, defaultValue: 'خدمات' },
    { name: 'intro', type: 'text' },

    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'desc', type: 'text' },
        {
          name: 'iconImage',
          type: 'upload',
          relationTo: 'media' as any,
          required: false,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          admin: { placeholder: '#service-laptop' },
        },
      ],
    },
  ],
}
