import type { Block } from 'payload'

export const LandingHeroImage: Block = {
  slug: 'landingHeroImage',
  labels: { singular: 'Landing Hero (Image)', plural: 'Landing Hero (Image)' },
  fields: [
    { name: 'kicker', type: 'text', defaultValue: 'برتر سرویس • تعمیرات تخصصی' },
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'array', fields: [{ name: 'text', type: 'textarea', required: true }] },

    // تصویر (می‌تونی یک تصویر و چند سایز خروجی را در Media مدیریت کنی)
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media' as any,
      required: true,
    },

    {
      name: 'primaryButton',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'تماس مستقیم' },
        { name: 'href', type: 'text', required: true, defaultValue: 'tel:02191300348' },
      ],
    },
    {
      name: 'secondaryButton',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'مشاهده خدمات' },
        { name: 'href', type: 'text', required: true, defaultValue: '#services' },
      ],
    },

    {
      name: 'pills',
      type: 'array',
      admin: { initCollapsed: true },
      fields: [{ name: 'text', type: 'text', required: true }],
    },
  ],
}
