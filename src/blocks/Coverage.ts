import type { Block } from 'payload'

export const Coverage: Block = {
  slug: 'coverage',
  labels: { singular: 'Coverage (پوشش)', plural: 'Coverage (پوشش)' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'نقاط تحت پوشش' },

    {
      name: 'pickup',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'پیک رایگان' },
        {
          name: 'description',
          type: 'textarea',
          defaultValue:
            'تنها با یک تماس میتوانید از خدمات پیک رایگان دریافت و ارسال دستگاه استفاده نمایید.',
        },
      ],
    },

    {
      name: 'branches',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'شعب حضوری' },
        {
          name: 'items',
          type: 'array',
          fields: [{ name: 'text', type: 'textarea', required: true }],
        },
      ],
    },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media' as any,
    },

    {
      name: 'areasServed',
      type: 'array',
      fields: [{ name: 'area', type: 'text', required: true }],
      admin: { initCollapsed: true },
    },
  ],
}
