import type { Block } from 'payload'

export const ImageWithFeatureList: Block = {
  slug: 'imageWithFeatureList',
  labels: { singular: 'Image + Feature List', plural: 'Image + Feature List' },
  fields: [
    { name: 'sectionId', type: 'text', defaultValue: 'why-us', admin: { position: 'sidebar' } },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media' as any,
      required: true,
    },
    { name: 'imageCaption', type: 'text' },

    { name: 'title', type: 'text', required: true },

    {
      name: 'features',
      type: 'array',
      required: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'desc', type: 'text' },
      ],
    },
  ],
}
