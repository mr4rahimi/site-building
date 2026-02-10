import type { Block } from 'payload'

export const ServicesCards1: Block = {
  slug: 'servicesCards1',
  labels: { singular: 'Services Cards 1', plural: 'Services Cards 1' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'خدمات تخصصی' },
    {
      name: 'moreLink',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'جزئیات بیشتر در صفحه خدمات' },
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
        {
          name: 'button',
          type: 'group',
          fields: [
            { name: 'label', type: 'text', defaultValue: 'مشاوره و ثبت سفارش' },
            { name: 'href', type: 'text', defaultValue: '/contact' },
          ],
        },
      ],
    },
  ],
}
