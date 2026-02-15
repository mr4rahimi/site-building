import type { Block } from 'payload'

export const Branches1: Block = {
  slug: 'branches1',
  labels: { singular: 'Branches', plural: 'Branches' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'شعب' },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'address', type: 'textarea', required: true },
      ],
    },
  ],
}
