import type { Block } from 'payload'

export const CoverageWithBranches: Block = {
  slug: 'coverageWithBranches',
  labels: { singular: 'Coverage + Branches', plural: 'Coverage + Branches' },
  fields: [
    { name: 'sectionId', type: 'text', defaultValue: 'coverage', admin: { position: 'sidebar' } },
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'array', fields: [{ name: 'text', type: 'textarea', required: true }] },

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
  ],
}
