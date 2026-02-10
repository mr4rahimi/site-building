import type { Block } from 'payload'

export const FAQAccordion: Block = {
  slug: 'faqAccordion',
  labels: { singular: 'FAQ Accordion', plural: 'FAQ Accordion' },
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
  ],
}
