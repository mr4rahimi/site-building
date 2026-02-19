import type { Block } from 'payload'

export const FAQAccordion: Block = {
  slug: 'faqAccordion',
  labels: { singular: 'FAQ Accordion', plural: 'FAQ Accordion' },
  imageURL: '/block-thumbnails/faqAccordion.webp',
  fields: [
    { name: 'sectionId', type: 'text', defaultValue: 'faq', admin: { position: 'sidebar' } },
    { name: 'title', type: 'text', required: true },

    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'q', type: 'text', required: true },
        { name: 'a', type: 'textarea', required: true },
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

        // Section/surface
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
          admin: { condition: (_, s) => s?.colorMode === 'custom', description: 'Item bg (hex)' },
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
