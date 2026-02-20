import type { Block } from 'payload'

export const ImageWithFeatureList: Block = {
  slug: 'imageWithFeatureList',
  labels: { singular: 'Image + Feature List', plural: 'Image + Feature List' },
  imageURL: '/block-thumbnails/imageWithFeatureList.webp',
  fields: [
    { name: 'sectionId', type: 'text', defaultValue: 'why-us', admin: { position: 'sidebar' } },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media' as any,
      required: true,
    },
    { name: 'imageCaption', type: 'text' },

    { name: 'title', type: 'text', required: true },

    {
      name: 'features',
      type: 'array',
      required: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'desc', type: 'text' },
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
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Surface/card bg (hex)',
          },
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
            description: 'Muted/desc text (hex)',
          },
        },

        // Accent
        {
          name: 'accentColor',
          type: 'text',
          admin: { condition: (_, s) => s?.colorMode === 'custom', description: 'Accent (hex)' },
        },

        // Caption pill
        {
          name: 'captionBg',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Caption bg (hex)',
          },
        },
      ],
    },
  ],
}
