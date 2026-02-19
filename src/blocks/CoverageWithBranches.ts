import type { Block } from 'payload'

export const CoverageWithBranches: Block = {
  slug: 'coverageWithBranches',
  labels: { singular: 'Coverage + Branches', plural: 'Coverage + Branches' },
  imageURL: '/block-thumbnails/coverage-with-branches.webp',
  fields: [
    { name: 'sectionId', type: 'text', defaultValue: 'coverage', admin: { position: 'sidebar' } },
    { name: 'title', type: 'text', required: true },
    {
      name: 'description',
      type: 'array',
      fields: [{ name: 'text', type: 'textarea', required: true }],
    },

    {
      name: 'branchesTitle',
      type: 'text',
      defaultValue: 'آدرس شعب حضوری',
    },
    {
      name: 'branches',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'address', type: 'textarea', required: true },
      ],
    },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media' as any,
      required: false,
    },

    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'ثبت سفارش و اعزام پیک رایگان' },
        { name: 'href', type: 'text', defaultValue: 'tel:02191300348' },
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

        // Section + surface
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
            description: 'Muted text (hex)',
          },
        },

        // Accent
        {
          name: 'accentColor',
          type: 'text',
          admin: { condition: (_, s) => s?.colorMode === 'custom', description: 'Accent (hex)' },
        },

        // CTA button
        {
          name: 'primaryColor',
          type: 'text',
          admin: { condition: (_, s) => s?.colorMode === 'custom', description: 'CTA bg (hex)' },
        },
        {
          name: 'primaryHoverColor',
          type: 'text',
          admin: { condition: (_, s) => s?.colorMode === 'custom', description: 'CTA hover (hex)' },
        },
        {
          name: 'buttonTextColor',
          type: 'text',
          admin: { condition: (_, s) => s?.colorMode === 'custom', description: 'CTA text (hex)' },
        },

        // Branch cards
        {
          name: 'branchIconBg',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Branch icon bg (hex)',
          },
        },
      ],
    },
  ],
}
