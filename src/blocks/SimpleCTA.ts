import type { Block } from 'payload'

export const SimpleCTA: Block = {
  slug: 'simpleCTA',
  labels: { singular: 'Simple CTA', plural: 'Simple CTA' },
  fields: [
    { name: 'sectionId', type: 'text', defaultValue: 'quick-order', admin: { position: 'sidebar' } },
    { name: 'title', type: 'text', required: true },
    { name: 'desc', type: 'text' },
    {
      name: 'button',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
  ],
}
