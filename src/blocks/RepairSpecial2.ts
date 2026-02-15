import type { Block } from 'payload'

export const RepairSpecial2: Block = {
  slug: 'repairSpecial2',
  labels: { singular: 'Repair Special 2', plural: 'Repair Special 2' },
  fields: [
    { name: 'variant', type: 'text', defaultValue: 'ipad', admin: { position: 'sidebar' } },

    { name: 'title', type: 'text', required: true, defaultValue: 'تعمیر تخصصی' },

    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media' as any,
      required: true,
      admin: { description: 'تصویر بزرگ اصلی' },
    },
    {
      name: 'sideImage',
      type: 'upload',
      relationTo: 'media' as any,
      required: true,
      admin: { description: 'تصویر کناری/استیکی' },
    },

    { name: 'caption', type: 'text', admin: { description: 'زیرنویس تصویر اصلی' } },

    {
      name: 'intro',
      type: 'group',
      fields: [
        { name: 'headline', type: 'text', defaultValue: 'تعمیر دقیق و استاندارد' },
        { name: 'p1', type: 'textarea' },
        { name: 'p2', type: 'textarea' },
      ],
    },

    {
      name: 'serviceListTitle',
      type: 'text',
      defaultValue: 'خدمات شامل:',
    },
    {
      name: 'serviceList',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },

    {
      name: 'contentBlocks',
      type: 'array',
      admin: { description: 'بخش‌های متن طولانی (کارت‌های توضیحی)' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },

    {
      name: 'processStepsTitle',
      type: 'text',
      defaultValue: 'روند استاندارد تعمیر',
    },
    {
      name: 'processSteps',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
  ],
}
