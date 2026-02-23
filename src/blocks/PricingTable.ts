import type { Block } from 'payload'

export const PricingTable: Block = {
  slug: 'pricingTable',
  labels: { singular: 'Pricing Table', plural: 'Pricing Tables' },
  imageURL: '/block-thumbnails/PricingTable.webp',
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      admin: { position: 'sidebar' },
    },

    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'تعرفه خدمات',
    },

    {
      name: 'intro',
      type: 'textarea',
      defaultValue: 'لیست قیمت‌ خدمات به‌صورت شفاف و به‌روز.',
    },

    {
      name: 'rows',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'service',
          type: 'text',
          required: true,
          defaultValue: 'نام سرویس',
        },
        {
          name: 'priceRange',
          type: 'text',
          required: true,
          defaultValue: 'از ۱۰ تا ۲۰ میلیون تومان',
        },
        {
          name: 'eta',
          type: 'text',
          defaultValue: '۷ تا ۱۴ روز کاری',
        },
        {
          name: 'note',
          type: 'text',
          defaultValue: 'توضیحات تکمیلی در صورت نیاز',
        },
      ],
    },

    {
      name: 'footnote',
      type: 'text',
      defaultValue: 'قیمت‌ها تقریبی بوده و پس از بررسی دقیق اعلام نهایی می‌شوند.',
    },

    // Theme استاندارد
    {
      name: 'theme',
      type: 'group',
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
        {
          name: 'background',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.colorMode === 'custom',
          },
        },
        {
          name: 'cardBackground',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.colorMode === 'custom',
          },
        },
        {
          name: 'textColor',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.colorMode === 'custom',
          },
        },
        {
          name: 'mutedText',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.colorMode === 'custom',
          },
        },
        {
          name: 'borderColor',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.colorMode === 'custom',
          },
        },
        {
          name: 'accentColor',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.colorMode === 'custom',
          },
        },
      ],
    },
  ],
}
