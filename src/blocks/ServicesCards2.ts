import type { Block } from 'payload'

export const ServicesCards2: Block = {
  slug: 'servicesCards2',
  labels: { singular: 'Services Cards 2', plural: 'Services Cards 2' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'خدمات' },
    {
      name: 'moreLink',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'رفتن به صفحه خدمات' },
        { name: 'href', type: 'text', defaultValue: '/services' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'desc', type: 'textarea', required: true },
        { name: 'href', type: 'text', required: true, defaultValue: '#services' },
        { name: 'ctaLabel', type: 'text', defaultValue: 'مشاهده جزئیات ↓' },
      ],
    },
  ],
}
