import type { Block } from 'payload'

export const Contact2: Block = {
  slug: 'contact2',
  labels: { singular: 'Contact 2', plural: 'Contact 2' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'نیاز به تعمیرات داری؟' },
    { name: 'subtitle', type: 'textarea' },

    {
      name: 'phone',
      type: 'group',
      fields: [
        { name: 'tel', type: 'text', required: true },
        { name: 'display', type: 'text' },
      ],
    },

    {
      name: 'buttonLabel',
      type: 'text',
      defaultValue: 'تماس بگیرید',
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

        // Background
        {
          name: 'bgFrom',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Gradient start (hex) مثل #020617',
          },
        },
        {
          name: 'bgVia',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Gradient middle (hex) مثل #0b1220',
          },
        },
        {
          name: 'bgTo',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Gradient end (hex) مثل #020617',
          },
        },

        // Text
        {
          name: 'textColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Title text (hex) مثل #ffffff',
          },
        },
        {
          name: 'mutedTextColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Subtitle text (hex) مثل #cbd5e1',
          },
        },

        // Accent / glow
        {
          name: 'accentColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Accent glow (hex) مثل #38bdf8 یا #a78bfa',
          },
        },

        // Button
        {
          name: 'buttonBg',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Button bg (hex) مثل #ffffff',
          },
        },
        {
          name: 'buttonText',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Button text (hex) مثل #0f172a',
          },
        },
        {
          name: 'buttonHoverBg',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Button hover bg (hex)',
          },
        },
      ],
    },
  ],
}
