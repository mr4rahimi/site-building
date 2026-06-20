import path from 'path'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { fa } from '@payloadcms/translations/languages/fa'
import { Users } from './collections/Users'
import { Sites } from './collections/Sites'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Services } from './collections/Services'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { SiteSettings } from './collections/SiteSettings'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { fileURLToPath } from 'url'

import {
  lexicalEditor,
  FixedToolbarFeature,
  InlineToolbarFeature,
  HeadingFeature,
  LinkFeature,
  UploadFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  OrderedListFeature,
  UnorderedListFeature,
  ChecklistFeature,
  BlockquoteFeature,
  HorizontalRuleFeature,
  InlineCodeFeature,
  AlignFeature,
  IndentFeature,
  SubscriptFeature,
  SuperscriptFeature,
} from '@payloadcms/richtext-lexical'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default buildConfig({
  serverURL: process.env.PUBLIC_SERVER_URL || 'http://localhost:3000',

  secret: process.env.PAYLOAD_SECRET || '',

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),

  i18n: {
    fallbackLanguage: 'fa',
    supportedLanguages: { fa },
  },

  admin: {
    user: Users.slug,
    theme: 'dark',
    meta: {
      titleSuffix: '— پنل مدیریت',
    },
    components: {
      graphics: {
        Logo: '@/components/admin/AdminLogo',
        Icon: '@/components/admin/AdminIcon',
      },
    },
  },

  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      StrikethroughFeature(),
      SubscriptFeature(),
      SuperscriptFeature(),
      InlineCodeFeature(),
      OrderedListFeature(),
      UnorderedListFeature(),
      ChecklistFeature(),
      BlockquoteFeature(),
      HorizontalRuleFeature(),
      AlignFeature(),
      IndentFeature(),
      LinkFeature(),
      UploadFeature({
        collections: {
          media: { fields: [] },
        },
      }),
    ],
  }),

  collections: [Users, Sites, Media, Pages, Services, Posts, Categories, SiteSettings, ContactSubmissions],

  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
