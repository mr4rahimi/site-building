import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import path from 'path'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

function runBuild(scriptPath: string, siteSlug: string, cwd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`bash "${scriptPath}" "${siteSlug}"`, { cwd, timeout: 180_000, env: { ...process.env } }, (err, stdout, stderr) => {
      if (err) reject(Object.assign(err, { stdout, stderr }))
      else resolve(stdout)
    })
  })
}

export async function POST(req: NextRequest) {
  const config = await configPromise
  const payload = await getPayload({ config })

  const authResult = await payload.auth({ headers: req.headers })
  if (!authResult.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { siteSlug } = await req.json()
  if (!siteSlug || typeof siteSlug !== 'string') {
    return NextResponse.json({ error: 'siteSlug required' }, { status: 400 })
  }

  const astroDir = path.join(process.cwd(), 'astro-template')
  const scriptPath = path.join(astroDir, 'build-site.sh')
  const outputPath = path.join(astroDir, 'sites', siteSlug)

  try {
    const log = await runBuild(scriptPath, siteSlug, astroDir)
    return NextResponse.json({ success: true, outputPath, log })
  } catch (err: any) {
    const log = (err.stdout || '') + (err.stderr || '')
    return NextResponse.json({ success: false, error: err.message, log }, { status: 500 })
  }
}
