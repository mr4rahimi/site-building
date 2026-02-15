import type { Block } from 'payload'

export const Contact3: Block = {
  slug: 'contact3',
  labels: { singular: 'Contact 3', plural: 'Contact 3' },
  fields: [
    { name: 'variant', type: 'text', defaultValue: 'animated', admin: { position: 'sidebar' } },

    {
      name: 'badgeText',
      type: 'text',
      defaultValue: 'مشاوره سریع • ثبت درخواست تعمیر • ارسال از سراسر کشور',
    },
    { name: 'title', type: 'text', required: true, defaultValue: 'همین الان تماس بگیرید' },
    { name: 'description', type: 'textarea' },

    {
      name: 'primaryButton',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'تماس مستقیم' },
        { name: 'tel', type: 'text', required: true },
        { name: 'phoneDisplay', type: 'text' },
      ],
    },

    {
      name: 'sideCard',
      type: 'group',
      fields: [
        { name: 'brand', type: 'text', defaultValue: 'Repair Center' },
        { name: 'headline', type: 'text', defaultValue: 'مسیر سریع تا تعمیر مطمئن' },
        {
          name: 'items',
          type: 'array',
          fields: [{ name: 'text', type: 'text', required: true }],
        },
      ],
    },
  ],
}
