import type { Block } from 'payload'

export const HeroPro: Block = {
  slug: 'heroPro',
  labels: { singular: 'Hero Pro', plural: 'Hero Pro' },
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

    // کارت تماس سریع سمت راست
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
  ],
}
