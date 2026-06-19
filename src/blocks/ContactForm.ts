import type { Block } from 'payload'

export const ContactForm: Block = {
  slug: 'contactForm',
  labels: { singular: 'فرم تماس', plural: 'فرم‌های تماس' },
  fields: [
    {
      name: 'title',
      label: 'عنوان',
      type: 'text',
      defaultValue: 'با ما تماس بگیرید',
    },
    {
      name: 'description',
      label: 'توضیح',
      type: 'textarea',
    },
    {
      name: 'fields',
      label: 'فیلدهای فرم',
      type: 'select',
      hasMany: true,
      defaultValue: ['name', 'phone', 'message'],
      options: [
        { label: 'نام', value: 'name' },
        { label: 'شماره تماس', value: 'phone' },
        { label: 'ایمیل', value: 'email' },
        { label: 'موضوع', value: 'subject' },
        { label: 'پیام', value: 'message' },
      ],
    },
    {
      name: 'submitLabel',
      label: 'متن دکمه ارسال',
      type: 'text',
      defaultValue: 'ارسال پیام',
    },
    {
      name: 'successMessage',
      label: 'پیام پس از ارسال موفق',
      type: 'text',
      defaultValue: 'پیام شما دریافت شد. به زودی با شما تماس می‌گیریم.',
    },
    {
      name: 'siteId',
      label: 'شناسه سایت (خودکار)',
      type: 'text',
      admin: { position: 'sidebar', readOnly: true, hidden: true },
    },
  ],
}
