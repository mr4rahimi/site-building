import type { CollectionConfig } from 'payload'
import { tenantReadAccess, canWrite, onlySuperadmin } from '../utils/tenant'

export const SiteSettings: CollectionConfig = {
  slug: 'site-settings',
  labels: { singular: 'تنظیمات سایت', plural: 'تنظیمات سایت‌ها' },
  admin: {
    useAsTitle: 'siteTitle',
    defaultColumns: ['siteTitle', 'site', 'updatedAt'],
    description: 'تنظیمات کلی هر سایت — هدر، فوتر، تماس و شبکه‌های اجتماعی',
    group: 'تنظیمات',
  },

  access: {
    read: tenantReadAccess,
    create: canWrite,
    update: canWrite,
    delete: onlySuperadmin,
  },

  hooks: {
    beforeValidate: [
      ({ req, data }) => {
        const user = req.user as any
        if (!user || user.role === 'superadmin') return data
        const firstSite = user.sites?.[0]
        const siteId = typeof firstSite === 'string' ? firstSite : firstSite?.id
        if (data) data.site = data.site || siteId
        return data
      },
    ],
  },

  fields: [
    // ── وابستگی به سایت ──
    {
      name: 'site',
      label: 'سایت',
      type: 'relationship',
      relationTo: 'sites' as any,
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'هر سایت فقط یک رکورد تنظیمات دارد',
      },
    },

    // عنوان در top-level برای useAsTitle
    {
      name: 'siteTitle',
      label: 'عنوان سایت',
      type: 'text',
      required: true,
      admin: { placeholder: 'مثال: تعمیرات تخصصی لپ‌تاپ آسوس' },
    },

    // ═══════════════════════════════════════
    // ۱. اطلاعات عمومی
    // ═══════════════════════════════════════
    {
      name: 'general',
      label: 'اطلاعات عمومی',
      type: 'group',
      fields: [
        {
          name: 'tagline',
          label: 'شعار / زیرعنوان',
          type: 'text',
          admin: { placeholder: 'مثال: سریع، مطمئن، با ضمانت' },
        },
        {
          name: 'description',
          label: 'توضیح کوتاه سایت',
          type: 'textarea',
          admin: { placeholder: 'یک یا دو جمله درباره سایت (برای SEO)' },
        },
        {
          name: 'logo',
          label: 'لوگو',
          type: 'upload',
          relationTo: 'media' as any,
        },
        {
          name: 'logoDark',
          label: 'لوگو (تیره)',
          type: 'upload',
          relationTo: 'media' as any,
          admin: { description: 'نسخه لوگو برای پس‌زمینه تیره (اختیاری)' },
        },
        {
          name: 'favicon',
          label: 'Favicon',
          type: 'upload',
          relationTo: 'media' as any,
          admin: { description: 'آیکون مرورگر — بهتر است ۳۲×۳۲ یا ۶۴×۶۴ پیکسل باشد' },
        },
      ],
    },

    // ═══════════════════════════════════════
    // ۲. اطلاعات تماس
    // ═══════════════════════════════════════
    {
      name: 'contact',
      label: 'اطلاعات تماس',
      type: 'group',
      fields: [
        {
          name: 'phones',
          label: 'شماره‌های تماس',
          type: 'array',
          admin: { description: 'می‌توانید چند شماره اضافه کنید' },
          fields: [
            {
              name: 'label',
              label: 'برچسب',
              type: 'text',
              admin: { placeholder: 'مثال: پشتیبانی، دفتر مرکزی' },
            },
            {
              name: 'number',
              label: 'شماره تلفن',
              type: 'text',
              required: true,
              admin: { placeholder: '۰۲۱۲۳۴۵۶۷۸۹' },
            },
            {
              name: 'isWhatsApp',
              label: 'واتساپ دارد',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
        {
          name: 'email',
          label: 'ایمیل',
          type: 'email',
          admin: { placeholder: 'info@example.com' },
        },
        {
          name: 'address',
          label: 'آدرس',
          type: 'textarea',
          admin: { placeholder: 'تهران، خیابان ...' },
        },
        {
          name: 'workingHours',
          label: 'ساعت کاری',
          type: 'text',
          admin: { placeholder: 'مثال: شنبه تا پنج‌شنبه ۹ الی ۱۸' },
        },
        {
          name: 'mapLink',
          label: 'لینک نقشه (Google Maps)',
          type: 'text',
          admin: { placeholder: 'https://maps.google.com/...' },
        },
      ],
    },

    // ═══════════════════════════════════════
    // ۳. شبکه‌های اجتماعی
    // ═══════════════════════════════════════
    {
      name: 'social',
      label: 'شبکه‌های اجتماعی',
      type: 'group',
      fields: [
        {
          name: 'instagram',
          label: 'اینستاگرام',
          type: 'text',
          admin: { placeholder: 'https://instagram.com/username' },
        },
        {
          name: 'telegram',
          label: 'تلگرام',
          type: 'text',
          admin: { placeholder: 'https://t.me/username' },
        },
        {
          name: 'whatsapp',
          label: 'واتساپ (لینک مستقیم)',
          type: 'text',
          admin: { placeholder: 'https://wa.me/989123456789' },
        },
        {
          name: 'aparat',
          label: 'آپارات',
          type: 'text',
          admin: { placeholder: 'https://www.aparat.com/username' },
        },
        {
          name: 'youtube',
          label: 'یوتیوب',
          type: 'text',
          admin: { placeholder: 'https://youtube.com/@channel' },
        },
        {
          name: 'linkedin',
          label: 'لینکدین',
          type: 'text',
          admin: { placeholder: 'https://linkedin.com/company/...' },
        },
        {
          name: 'twitter',
          label: 'توییتر / X',
          type: 'text',
          admin: { placeholder: 'https://x.com/username' },
        },
      ],
    },

    // ═══════════════════════════════════════
    // ۴. هدر
    // ═══════════════════════════════════════
    {
      name: 'header',
      label: 'هدر',
      type: 'group',
      fields: [
        {
          name: 'navLinks',
          label: 'لینک‌های منو',
          type: 'array',
          admin: { description: 'آیتم‌های منوی ناوبری هدر' },
          fields: [
            {
              name: 'label',
              label: 'متن لینک',
              type: 'text',
              required: true,
              admin: { placeholder: 'مثال: خدمات' },
            },
            {
              name: 'href',
              label: 'آدرس',
              type: 'text',
              required: true,
              admin: { placeholder: '/services یا #services' },
            },
            {
              name: 'isButton',
              label: 'نمایش به‌عنوان دکمه',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'openInNewTab',
              label: 'باز شدن در تب جدید',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
        {
          name: 'ctaButton',
          label: 'دکمه اصلی هدر (CTA)',
          type: 'group',
          fields: [
            {
              name: 'label',
              label: 'متن دکمه',
              type: 'text',
              admin: { placeholder: 'تماس با ما' },
            },
            {
              name: 'href',
              label: 'آدرس دکمه',
              type: 'text',
              admin: { placeholder: '/contact یا tel:09...' },
            },
          ],
        },
      ],
    },

    // ═══════════════════════════════════════
    // ۵. فوتر
    // ═══════════════════════════════════════
    {
      name: 'footer',
      label: 'فوتر',
      type: 'group',
      fields: [
        {
          name: 'aboutText',
          label: 'متن درباره (فوتر)',
          type: 'textarea',
          admin: { placeholder: 'توضیح کوتاه درباره کسب‌وکار برای نمایش در فوتر' },
        },
        {
          name: 'footerLinks',
          label: 'لینک‌های فوتر',
          type: 'array',
          fields: [
            {
              name: 'label',
              label: 'متن',
              type: 'text',
              required: true,
            },
            {
              name: 'href',
              label: 'آدرس',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'copyright',
          label: 'متن کپی‌رایت',
          type: 'text',
          admin: { placeholder: 'مثال: © ۱۴۰۴ تمامی حقوق محفوظ است.' },
        },
      ],
    },

    // ═══════════════════════════════════════
    // ۶. SEO پیش‌فرض
    // ═══════════════════════════════════════
    {
      name: 'seo',
      label: 'SEO پیش‌فرض',
      type: 'group',
      fields: [
        {
          name: 'metaTitleTemplate',
          label: 'قالب عنوان Meta',
          type: 'text',
          defaultValue: '%s | {{siteTitle}}',
          admin: {
            description: '%s جای عنوان صفحه قرار می‌گیرد',
            placeholder: '%s | نام سایت',
          },
        },
        {
          name: 'defaultMetaDescription',
          label: 'توضیحات Meta پیش‌فرض',
          type: 'textarea',
          admin: { placeholder: 'توضیح پیش‌فرض سایت برای موتورهای جستجو' },
        },
        {
          name: 'defaultOgImage',
          label: 'تصویر پیش‌فرض شبکه‌های اجتماعی (OG Image)',
          type: 'upload',
          relationTo: 'media' as any,
          admin: { description: 'بهتر است ۱۲۰۰×۶۳۰ پیکسل باشد' },
        },
        {
          name: 'googleAnalyticsId',
          label: 'شناسه Google Analytics',
          type: 'text',
          admin: { placeholder: 'G-XXXXXXXXXX' },
        },
        {
          name: 'googleSearchConsole',
          label: 'کد تأیید Google Search Console',
          type: 'text',
          admin: { placeholder: 'meta content verification code' },
        },
      ],
    },
  ],
}
