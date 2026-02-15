import type { Block } from 'payload'

export const PricingTable: Block = {
  slug: 'pricingTable',
  labels: { singular: 'Pricing Table', plural: 'Pricing Table' },
  fields: [
    { name: 'sectionId', type: 'text', admin: { position: 'sidebar' } },
    { name: 'title', type: 'text', required: true },
    { name: 'intro', type: 'text' },

    {
      name: 'rows',
      type: 'array',
      required: true,
      fields: [
        { name: 'service', type: 'text', required: true },
        { name: 'priceRange', type: 'text', required: true },
        { name: 'eta', type: 'text' },
        { name: 'note', type: 'text' },
      ],
    },

    { name: 'footnote', type: 'text' },
  ],
}
