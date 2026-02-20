import type { Block } from 'payload'

export const Features2: Block = {
  slug: 'features2',
  labels: { singular: 'Features 2', plural: 'Features 2' },
  imageURL: 'gi/block-thumbnails/features2.webp',
  fields: [
    { name: 'title', type: 'text', defaultValue: 'ویژگی‌ها' },

    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'desc', type: 'text', required: true },
        {
          name: 'icon',
          type: 'text',
          admin: {
            placeholder: 'ShieldCheck | Wrench | Zap | BadgeCheck | Timer | Headphones ...',
            description: 'نام آیکن از lucide-react (PascalCase). خالی باشد پیش‌فرض می‌شود.',
          },
        },
      ],
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
            description: 'Title text (hex)',
          },
        },
        {
          name: 'mutedTextColor',
          type: 'text',
          admin: { condition: (_, s) => s?.colorMode === 'custom', description: 'Desc text (hex)' },
        },

        // Accent
        {
          name: 'accentColor',
          type: 'text',
          admin: { condition: (_, s) => s?.colorMode === 'custom', description: 'Accent (hex)' },
        },

        // Icon pill
        {
          name: 'iconBg',
          type: 'text',
          admin: { condition: (_, s) => s?.colorMode === 'custom', description: 'Icon bg (hex)' },
        },
      ],
    },
  ],
}
