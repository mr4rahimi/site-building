import type { Block } from 'payload'

export const IssuesAccordion: Block = {
  slug: 'issuesAccordion',
  labels: { singular: 'Issues Accordion', plural: 'Issues Accordion' },
  imageURL: '/block-thumbnails/issuesAccordion.webp',
  fields: [
    { name: 'sectionId', type: 'text', admin: { position: 'sidebar' } },
    { name: 'title', type: 'text', required: true },

    {
      name: 'enableFAQSchema',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'اگر این محتوا واقعاً FAQ است، روشن کنید تا FAQPage schema رندر شود.',
        position: 'sidebar',
      },
    },

    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
        {
          name: 'bullets',
          type: 'array',
          fields: [{ name: 'text', type: 'text', required: true }],
          admin: { initCollapsed: true },
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
            description: 'Question/title text (hex)',
          },
        },
        {
          name: 'mutedTextColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Answer text (hex)',
          },
        },

        // Accent
        {
          name: 'accentColor',
          type: 'text',
          admin: { condition: (_, s) => s?.colorMode === 'custom', description: 'Accent (hex)' },
        },
      ],
    },
  ],
}
