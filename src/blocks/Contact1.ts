import type { Block } from 'payload'

export const Contact1: Block = {
  slug: 'contact1',
  labels: { singular: 'Contact CTA (تماس)', plural: 'Contact CTA (تماس)' },
  imageURL: '/block-thumbnails/contact1.webp',
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
            description: 'Card background (hex) مثل #0b1220 یا #ffffff',
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

        // Gradient / glow
        {
          name: 'glowColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Glow / gradient color (hex) مثل #10b981',
          },
        },

        // Text
        {
          name: 'textColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Title text color (hex)',
          },
        },
        {
          name: 'mutedTextColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Subtitle text color (hex)',
          },
        },

        // Primary button
        {
          name: 'primaryColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Primary button bg (hex) مثل #10b981',
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

        // Secondary button
        {
          name: 'secondaryBorderColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Secondary border (hex)',
          },
        },
        {
          name: 'secondaryHoverBg',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Secondary hover bg (hex)',
          },
        },
      ],
    },
  ],
}
