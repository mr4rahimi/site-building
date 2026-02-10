import type { Block } from 'payload'

export const RepairSteps1: Block = {
  slug: 'repairSteps1',
  labels: { singular: 'Repair Steps', plural: 'Repair Steps' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'مراحل تعمیر' },
    {
      name: 'steps',
      type: 'array',
      required: true,
      fields: [{ name: 'text', type: 'text', required: true }],
    },
  ],
}
