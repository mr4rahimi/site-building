import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const parentSrc = path.resolve(__dirname, '../src')

export default defineConfig({
  output: 'static',
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        // Stub Payload types — only used for TypeScript, not runtime
        '@/payload-types': path.resolve(__dirname, 'src/lib/payload-types-stub.ts'),
        // Reuse existing block components & shared helpers directly
        '@/components': path.resolve(parentSrc, 'components'),
      },
    },
    // Allow importing from parent src directory
    server: {
      fs: { allow: ['..'] },
    },
  },
})
