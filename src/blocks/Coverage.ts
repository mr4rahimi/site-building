import type { Block } from 'payload'

export const Coverage: Block = {
  slug: 'coverage',
  labels: { singular: 'Coverage (پوشش)', plural: 'Coverage (پوشش)' },
  imageURL: '/block-thumbnails/coverage.webp',
  fields: [
    { name: 'title', type: 'text', defaultValue: 'نقاط تحت پوشش' },

    {
      name: 'pickup',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'پیک رایگان' },
        {
          name: 'description',
          type: 'textarea',
          defaultValue:
            'تنها با یک تماس میتوانید از خدمات پیک رایگان دریافت و ارسال دستگاه استفاده نمایید.',
        },
      ],
    },

    {
      name: 'branches',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'شعب حضوری' },
        {
          name: 'items',
          type: 'array',
          fields: [{ name: 'text', type: 'textarea', required: true }],
        },
      ],
    },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media' as any,
    },

    {
      name: 'areasServed',
      type: 'array',
      fields: [{ name: 'area', type: 'text', required: true }],
      admin: { initCollapsed: true },
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
            description: 'Section background (hex) مثل #ffffff یا #0b1220',
          },
        },
        {
          name: 'cardBg',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Card background (hex)',
          },
        },
        {
          name: 'borderColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Border color (hex)',
          },
        },

        // Typography
        {
          name: 'textColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Primary text (hex)',
          },
        },
        {
          name: 'mutedTextColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Muted text (hex)',
          },
        },

        // Accent
        {
          name: 'accentColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Accent (hex) مثل #2563eb یا #10b981',
          },
        },

        // Chips
        {
          name: 'chipBg',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Chip bg (hex)',
          },
        },
        {
          name: 'chipText',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Chip text (hex)',
          },
        },
      ],
    },
  ],
}
