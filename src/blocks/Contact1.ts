import type { Block } from 'payload'

export const Contact1: Block = {
  slug: 'contact1',
  labels: { singular: 'Contact CTA (تماس)', plural: 'Contact CTA (تماس)' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'برای تعمیر آماده‌ای؟' },
    { name: 'subtitle', type: 'text', defaultValue: 'همین الان تماس بگیر یا در واتساپ پیام بده.' },

    {
      name: 'primaryButton',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'تماس فوری' },
        { name: 'tel', type: 'text', required: true, admin: { placeholder: '0912xxxxxxx' } },
      ],
    },

    {
      name: 'secondaryButton',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'واتساپ' },
        { name: 'href', type: 'text', required: true, admin: { placeholder: 'https://wa.me/...' } },
      ],
    },
  ],
}
