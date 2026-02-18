import type { Block } from 'payload'

export const Contact3: Block = {
  slug: 'contact3',
  labels: { singular: 'Contact 3', plural: 'Contact 3' },
  fields: [
    { name: 'variant', type: 'text', defaultValue: 'animated', admin: { position: 'sidebar' } },

    {
      name: 'badgeText',
      type: 'text',
      defaultValue: 'مشاوره سریع • ثبت درخواست تعمیر • ارسال از سراسر کشور',
    },
    { name: 'title', type: 'text', required: true, defaultValue: 'همین الان تماس بگیرید' },
    { name: 'description', type: 'textarea' },

    {
      name: 'primaryButton',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'تماس مستقیم' },
        { name: 'tel', type: 'text', required: true },
        { name: 'phoneDisplay', type: 'text' },
      ],
    },

    {
      name: 'sideCard',
      type: 'group',
      fields: [
        { name: 'brand', type: 'text', defaultValue: 'Repair Center' },
        { name: 'headline', type: 'text', defaultValue: 'مسیر سریع تا تعمیر مطمئن' },
        {
          name: 'items',
          type: 'array',
          fields: [{ name: 'text', type: 'text', required: true }],
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

        // Surface
        {
          name: 'cardBg',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Main card bg (hex) مثل #0b1220 یا #ffffff',
          },
        },
        {
          name: 'sideCardBg',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Side card bg (hex)',
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
            description: 'Description / muted text (hex)',
          },
        },

        // Accent / badge
        {
          name: 'accentColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Accent (hex) مثل #2563eb یا #10b981',
          },
        },
        {
          name: 'badgeBg',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Badge bg (hex)',
          },
        },

        // Button
        {
          name: 'primaryColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Primary button bg (hex)',
          },
        },
        {
          name: 'primaryHoverColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Primary button hover (hex)',
          },
        },
        {
          name: 'buttonTextColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Primary button text (hex)',
          },
        },
      ],
    },
  ],
}
