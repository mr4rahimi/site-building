import type { Block } from 'payload'

export const Contact2: Block = {
  slug: 'contact2',
  labels: { singular: 'Contact 2', plural: 'Contact 2' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'نیاز به تعمیرات داری؟' },
    { name: 'subtitle', type: 'textarea' },

    {
      name: 'phone',
      type: 'group',
      fields: [
        { name: 'tel', type: 'text', required: true },
        { name: 'display', type: 'text' },
      ],
    },

    {
      name: 'buttonLabel',
      type: 'text',
      defaultValue: 'تماس بگیرید',
    },
  ],
}
