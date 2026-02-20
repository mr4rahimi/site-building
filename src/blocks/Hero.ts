import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Hero' },
  imageURL: '/block-thumbnails/hero.webp',
  fields: [
    { name: 'headline', type: 'text', required: true },
    { name: 'subheadline', type: 'textarea' },

    { name: 'badgeText', type: 'text', defaultValue: 'خدمات تخصصی • قطعات اصلی • گارانتی' },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media' as any,
    },

    {
      name: 'primaryCta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'ثبت سفارش' },
        { name: 'href', type: 'text', defaultValue: '#contact' },
      ],
    },

    {
      name: 'secondaryCta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'مشاهده خدمات' },
        { name: 'href', type: 'text', defaultValue: '#services' },
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

        // Section
        {
          name: 'sectionBg',
          type: 'text',
          admin: { condition: (_, s) => s?.colorMode === 'custom', description: 'Hero bg (hex)' },
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
            description: 'Headline text (hex)',
          },
        },
        {
          name: 'mutedTextColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Subheadline text (hex)',
          },
        },

        // Accent
        {
          name: 'accentColor',
          type: 'text',
          admin: { condition: (_, s) => s?.colorMode === 'custom', description: 'Accent (hex)' },
        },

        // Primary CTA
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

        // Secondary CTA
        {
          name: 'secondaryBg',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Secondary button bg (hex)',
          },
        },
        {
          name: 'secondaryText',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Secondary button text (hex)',
          },
        },
      ],
    },
  ],
}
