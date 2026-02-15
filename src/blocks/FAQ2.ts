import type { Block } from 'payload'

export const FAQ2: Block = {
  slug: 'faq2',
  labels: { singular: 'FAQ 2', plural: 'FAQ 2' },
  fields: [
    { name: 'variant', type: 'text', defaultValue: 'animated', admin: { position: 'sidebar' } },
    { name: 'title', type: 'text', defaultValue: 'سوالات متداول' },
    { name: 'intro', type: 'textarea' },

    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'q', type: 'text', required: true },
        { name: 'a', type: 'textarea', required: true },
      ],
      admin: { initCollapsed: true },
    },
  ],
}
