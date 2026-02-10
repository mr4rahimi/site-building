import type { Block } from 'payload'

export const StepsTimeline: Block = {
  slug: 'stepsTimeline',
  labels: { singular: 'Steps Timeline', plural: 'Steps Timeline' },
  fields: [
    { name: 'sectionId', type: 'text', defaultValue: 'steps', admin: { position: 'sidebar' } },
    { name: 'title', type: 'text', required: true },
    {
      name: 'steps',
      type: 'array',
      required: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'desc', type: 'text' },
      ],
    },
  ],
}
