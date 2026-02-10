import type { Block } from 'payload'

export const Features2: Block = {
  slug: 'features2',
  labels: { singular: 'Features 2', plural: 'Features 2' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'ویژگی‌ها' },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'desc', type: 'text', required: true },
        {
          name: 'icon',
          type: 'text',
          admin: { placeholder: 'lucide:shield-check (یا هر کلید آیکن)' },
        },
      ],
    },
  ],
}
