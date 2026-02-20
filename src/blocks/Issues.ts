import type { Block } from 'payload'

export const Issues: Block = {
  slug: 'issues',
  labels: { singular: 'Issues (ایرادات)', plural: 'Issues (ایرادات)' },
  imageURL: '/block-thumbnails/issues.webp',
  fields: [
    { name: 'title', type: 'text', defaultValue: 'ایرادات رایج' },
    { name: 'subtitle', type: 'text', defaultValue: 'عیب یابی تخصصی + اعلام هزینه قبل از تعمیر' },

    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [{ name: 'text', type: 'text', required: true }],
      admin: { initCollapsed: true },
    },

    {
      name: 'cta',
      type: 'group',
      label: 'CTA (اختیاری)',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'مشاوره و ثبت سفارش' },
        { name: 'href', type: 'text', defaultValue: '#contact' },
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
          admin: { condition: (_, s) => s?.colorMode === 'custom', description: 'Chip bg (hex)' },
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
            description: 'Title text (hex)',
          },
        },
        {
          name: 'mutedTextColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Subtitle text (hex)',
          },
        },

        // Accent
        {
          name: 'accentColor',
          type: 'text',
          admin: { condition: (_, s) => s?.colorMode === 'custom', description: 'Accent (hex)' },
        },

        // CTA
        {
          name: 'primaryColor',
          type: 'text',
          admin: { condition: (_, s) => s?.colorMode === 'custom', description: 'CTA bg (hex)' },
        },
        {
          name: 'primaryHoverColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'CTA hover bg (hex)',
          },
        },
        {
          name: 'buttonTextColor',
          type: 'text',
          admin: { condition: (_, s) => s?.colorMode === 'custom', description: 'CTA text (hex)' },
        },
      ],
    },
  ],
}
