import type { Block } from 'payload'

export const WhyUs1: Block = {
  slug: 'whyUs1',
  labels: { singular: 'Why Us', plural: 'Why Us' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'چرا ما؟' },
    { name: 'subtitle', type: 'text', defaultValue: 'مزیت های کلیدی' },

    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'desc', type: 'textarea', required: true },
      ],
    },
  ],
}
