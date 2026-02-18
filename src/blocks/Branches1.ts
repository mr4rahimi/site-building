import type { Block } from 'payload'

export const Branches1: Block = {
  slug: 'branches1',
  labels: { singular: 'Branches', plural: 'Branches' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'شعب' },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'address', type: 'textarea', required: true },
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

        // Surface / Card
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
            description: 'Border color (hex) مثل #334155',
          },
        },

        // Typography
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
            description: 'Address / secondary text color (hex)',
          },
        },

        // Accent / Icon
        {
          name: 'accentColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Accent color (hex) مثل #2563eb',
          },
        },
        {
          name: 'accentSoftBg',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Soft background for icon (hex) مثل #eff6ff',
          },
        },
      ],
    },
  ],
}
