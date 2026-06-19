import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/app/(frontend)/_lib/payload'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { siteSlug, name, phone, email, subject, message } = body

    if (!siteSlug || !name || !message) {
      return NextResponse.json({ error: 'فیلدهای ضروری پر نشده است.' }, { status: 400 })
    }

    const payload = await getPayloadClient()

    // Resolve site id from slug
    const siteRes = await payload.find({
      collection: 'sites',
      limit: 1,
      depth: 0,
      where: { slug: { equals: siteSlug } },
    })
    const site = siteRes.docs?.[0]
    if (!site) {
      return NextResponse.json({ error: 'سایت یافت نشد.' }, { status: 404 })
    }

    await payload.create({
      collection: 'contact-submissions' as any,
      data: {
        site: (site as any).id,
        name,
        phone: phone || '',
        email: email || '',
        subject: subject || '',
        message,
        status: 'new',
      } as any,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact API]', err)
    return NextResponse.json({ error: 'خطای سرور. لطفاً دوباره تلاش کنید.' }, { status: 500 })
  }
}
