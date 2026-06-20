import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import path from 'path'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function POST(req: NextRequest) {
  const config = await configPromise
  const payload = await getPayload({ config })

  const authResult = await payload.auth({ headers: req.headers })
  if (!authResult.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { folderPath } = await req.json()
  if (!folderPath || typeof folderPath !== 'string') {
    return NextResponse.json({ error: 'folderPath required' }, { status: 400 })
  }

  // Only allow opening paths inside astro-template/sites/
  const allowedBase = path.join(process.cwd(), 'astro-template', 'sites')
  const resolved = path.resolve(folderPath)
  if (!resolved.startsWith(allowedBase)) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 403 })
  }

  exec(`xdg-open "${resolved}"`)
  return NextResponse.json({ success: true })
}
