import type { Block } from 'payload'

export const RepairSpecial1: Block = {
  slug: 'repairSpecial1',
  labels: { singular: 'Repair Special 1', plural: 'Repair Special 1' },
  fields: [
    { name: 'variant', type: 'text', defaultValue: 'macbook', admin: { position: 'sidebar' } },

    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media' as any,
      required: true,
      admin: { description: 'تصویر پس‌زمینه (SEO-friendly)' },
    },

    { name: 'badgeText', type: 'text', defaultValue: 'پشتیبانی از مدل‌های مختلف' },
    { name: 'title', type: 'text', required: true, defaultValue: 'تعمیر تخصصی' },
    { name: 'description', type: 'textarea' },

    {
      name: 'bullets',
      type: 'array',
      required: true,
      fields: [{ name: 'text', type: 'text', required: true }],
    },

    {
      name: 'sideCard',
      type: 'group',
      fields: [
        { name: 'kicker', type: 'text', defaultValue: 'پروسه استاندارد و دقیق' },
        { name: 'headline', type: 'text', defaultValue: 'عیب‌یابی → تعمیر → تست نهایی' },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'desc', type: 'text' },
          ],
        },
        {
          name: 'phoneCta',
          type: 'group',
          fields: [
            { name: 'label', type: 'text', defaultValue: 'شروع تماس' },
            { name: 'tel', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
}
