import type { Block } from 'payload'

export const LandingHeroImage: Block = {
  slug: 'landingHeroImage',
  labels: { singular: 'Landing Hero (Image)', plural: 'Landing Hero (Image)' },
  imageURL: '/block-thumbnails/LandingHeroImage.webp',
  fields: [
    { name: 'kicker', type: 'text', defaultValue: 'برتر سرویس • تعمیرات تخصصی' },
    { name: 'title', type: 'text', required: true },
    {
      name: 'description',
      type: 'array',
      fields: [{ name: 'text', type: 'textarea', required: true }],
    },

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

        // Section / overlay
        {
          name: 'overlayFrom',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Overlay from (hex) e.g. #020617',
          },
        },
        {
          name: 'overlayTo',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Overlay to (hex)',
          },
        },

        // Panel
        {
          name: 'panelBg',
          type: 'text',
          admin: { condition: (_, s) => s?.colorMode === 'custom', description: 'Panel bg (hex)' },
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
            description: 'Description text (hex)',
          },
        },

        // Accent
        {
          name: 'accentColor',
          type: 'text',
          admin: { condition: (_, s) => s?.colorMode === 'custom', description: 'Accent (hex)' },
        },

        // Buttons
        {
          name: 'primaryColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Primary bg (hex)',
          },
        },
        {
          name: 'primaryHoverColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Primary hover (hex)',
          },
        },
        {
          name: 'buttonTextColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Primary text (hex)',
          },
        },

        {
          name: 'secondaryTextColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Secondary text (hex)',
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

        // Pills
        {
          name: 'pillBg',
          type: 'text',
          admin: { condition: (_, s) => s?.colorMode === 'custom', description: 'Pill bg (hex)' },
        },
        {
          name: 'pillText',
          type: 'text',
          admin: { condition: (_, s) => s?.colorMode === 'custom', description: 'Pill text (hex)' },
        },
      ],
    },
  ],
}
