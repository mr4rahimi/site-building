import type { Block } from 'payload'

export const Reviews1: Block = {
  slug: 'reviews1',
  labels: { singular: 'Reviews', plural: 'Reviews' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'نظرات کاربران' },
    { name: 'subtitle', type: 'text', defaultValue: 'تجربه مشتریان از خدمات ما' },
    { name: 'hint', type: 'text', defaultValue: 'برای دیدن نظرات بیشتر اسکرول کنید' },

    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'text', type: 'textarea', required: true },
      ],
      admin: { initCollapsed: true },
    },
  ],
}
