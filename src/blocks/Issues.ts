import type { Block } from 'payload'

export const Issues: Block = {
  slug: 'issues',
  labels: { singular: 'Issues (ایرادات)', plural: 'Issues (ایرادات)' },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'ایرادات رایج',
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'عیب یابی تخصصی + اعلام هزینه قبل از تعمیر',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [{ name: 'text', type: 'text', required: true }],
      admin: { initCollapsed: true },
    },
  ],
}
