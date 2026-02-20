import type { Block } from 'payload'

export const HeroPro: Block = {
  slug: 'heroPro',
  labels: { singular: 'Hero Pro', plural: 'Hero Pro' },
  imageURL: '/block-thumbnails/heroPro.webp',
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'تعمیرات تخصصی در تهران' },
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },

    {
      name: 'primaryButton',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'ثبت سفارش و تماس' },
        { name: 'href', type: 'text', defaultValue: '/contact' },
      ],
    },
    {
      name: 'secondaryButton',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'مشاهده خدمات' },
        { name: 'href', type: 'text', defaultValue: '#services' },
      ],
    },

    {
      name: 'badges',
      type: 'array',
      admin: { initCollapsed: true },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'desc', type: 'text' },
      ],
    },

    {
      name: 'quickContact',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'راه های سریع تماس' },
        { name: 'phone', type: 'text', admin: { placeholder: '02191300348' } },
        { name: 'phoneDisplay', type: 'text', admin: { placeholder: '۰۲۱-۹۱۳۰۰۳۴۸' } },
        { name: 'whatsapp', type: 'text', admin: { placeholder: 'https://wa.me/...' } },
        { name: 'addressLinkLabel', type: 'text', defaultValue: 'آدرس شعب و فرم تماس' },
        { name: 'addressLinkHref', type: 'text', defaultValue: '/contact' },
        { name: 'hint', type: 'text', defaultValue: '* زمان پاسخگویی سریع در ساعات کاری' },
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

        // Section / surface
        {
          name: 'sectionBg',
          type: 'text',
          admin: { condition: (_, s) => s?.colorMode === 'custom', description: 'Hero bg (hex)' },
        },
        {
          name: 'cardBg',
          type: 'text',
          admin: { condition: (_, s) => s?.colorMode === 'custom', description: 'Card bg (hex)' },
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
            description: 'Title text (hex)',
          },
        },
        {
          name: 'mutedTextColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Description text (hex)',
          },
        },

        // Accent
        {
          name: 'accentColor',
          type: 'text',
          admin: { condition: (_, s) => s?.colorMode === 'custom', description: 'Accent (hex)' },
        },

        // Primary button
        {
          name: 'primaryColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Primary bg (hex)',
          },
        },
        {
          name: 'primaryHoverColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Primary hover (hex)',
          },
        },
        {
          name: 'buttonTextColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Primary text (hex)',
          },
        },

        // Secondary button (outline)
        {
          name: 'secondaryTextColor',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Secondary text (hex)',
          },
        },
        {
          name: 'secondaryHoverBg',
          type: 'text',
          admin: {
            condition: (_, s) => s?.colorMode === 'custom',
            description: 'Secondary hover bg (hex)',
          },
        },
      ],
    },
  ],
}
