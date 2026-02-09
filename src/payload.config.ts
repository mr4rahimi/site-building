import path from 'path'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'

import { Users } from './collections/Users'
import { Sites } from './collections/Sites'
import { Media } from './collections/Media'

export default buildConfig({
  serverURL: process.env.PUBLIC_SERVER_URL || 'http://localhost:3000',

  secret: process.env.PAYLOAD_SECRET || '',

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),

  admin: {
    user: Users.slug,
  },

  collections: [Users, Sites, Media],

  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
