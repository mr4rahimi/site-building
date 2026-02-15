import type { Block } from 'payload'

export const IssuesAccordion: Block = {
  slug: 'issuesAccordion',
  labels: { singular: 'Issues Accordion', plural: 'Issues Accordion' },
  fields: [
    { name: 'sectionId', type: 'text', admin: { position: 'sidebar' } },
    { name: 'title', type: 'text', required: true },

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
    },
  ],
}
