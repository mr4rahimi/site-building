import type { Block } from 'payload'

export const FAQ2: Block = {
  slug: 'faq2',
  labels: { singular: 'FAQ 2', plural: 'FAQ 2' },
  imageURL: '/block-thumbnails/faq2.webp',
  fields: [
    { name: 'variant', type: 'text', defaultValue: 'animated', admin: { position: 'sidebar' } },
    { name: 'title', type: 'text', defaultValue: 'سوالات متداول' },
    { name: 'intro', type: 'textarea' },

    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'q', type: 'text', required: true },
        { name: 'a', type: 'textarea', required: true },
      ],
      admin: { initCollapsed: true },
    },

    {
      name: 'aside',
      type: 'group',
      label: 'Aside (کارت کناری)',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'اگر پاسخ را پیدا نکردید' },
        {
          name: 'text',
          type: 'textarea',
          defaultValue:
            'برای دریافت راهنمایی دقیق‌تر، بهتر است مدل دستگاه و مشکل را اعلام کنید تا سریع‌تر مسیر تعمیر مشخص شود.',
        },
        {
          name: 'items',
          type: 'array',
          fields: [{ name: 'text', type: 'text', required: true }],
          defaultValue: [
            { text: 'عیب‌یابی شفاف قبل از شروع تعمیر' },
            { text: 'قطعات اصلی و گارانتی خدمات' },
            { text: 'ثبت درخواست و هماهنگی پیک' },
          ],
          admin: { initCollapsed: true },
        },
        {
          name: 'cta',
          type: 'group',
          fields: [
            { name: 'label', type: 'text', defaultValue: 'رفتن به بخش تماس' },
            { name: 'href', type: 'text', defaultValue: '#contact' },
          ],
        },
      ],
    },

    {
      name: 'theme',
      type: 'group',
      label: 'Theme',
      fields: [
        {
          name: 'colorMode',
          type: 'select',
          defaultValue: 'site',
          options: [
            { label: 'Use site default', value: 'site' },
            { label: 'Custom colors', value: 'custom' },
          ],
        },

        // Section / surface
        {
          name: 'sectionBg',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Section bg (hex)',
          },
        },
        {
          name: 'cardBg',
          type: 'text',
          admin: { condition: (_, s) => s?.colorMode === 'custom', description: 'Card bg (hex)' },
        },
        {
          name: 'borderColor',
          type: 'text',
          admin: { condition: (_, s) => s?.colorMode === 'custom', description: 'Border (hex)' },
        },

        // Text
        {
          name: 'textColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Title/question text (hex)',
          },
        },
        {
          name: 'mutedTextColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Muted/answer text (hex)',
          },
        },

        // Accent
        {
          name: 'accentColor',
          type: 'text',
          admin: { condition: (_, s) => s?.colorMode === 'custom', description: 'Accent (hex)' },
        },

        // Aside highlight
        {
          name: 'asideBg',
          type: 'text',
          admin: { condition: (_, s) => s?.colorMode === 'custom', description: 'Aside bg (hex)' },
        },
      ],
    },
  ],
}
