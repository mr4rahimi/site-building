import type { Block } from 'payload'

export const VideoHero: Block = {
  slug: 'videoHero',
  labels: { singular: 'Video Hero', plural: 'Video Hero' },
  fields: [
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media' as any,
      required: true,
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media' as any,
      required: true,
      admin: {
        description: 'فایل mp4 آپلودی (در Astro به <video> تبدیل می‌شود).',
      },
    },
    { name: 'alt', type: 'text', defaultValue: 'ویدئو معرفی خدمات' },

    {
      name: 'preload',
      type: 'select',
      defaultValue: 'none',
      options: [
        { label: 'none', value: 'none' },
        { label: 'metadata', value: 'metadata' },
        { label: 'auto', value: 'auto' },
      ],
      admin: { position: 'sidebar' },
    },

    { name: 'aspect', type: 'text', defaultValue: '16/9', admin: { position: 'sidebar' } },
    { name: 'muted', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'playsInline', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'loop', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
  ],
}
