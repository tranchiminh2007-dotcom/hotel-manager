import { contactSchema } from '@/lib/validators'

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = contactSchema.safeParse(body)

  if (!parsed.success) {
    const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0]
    return Response.json({ error: firstError || 'Dữ liệu không hợp lệ' }, { status: 400 })
  }

  // In production, send email or save to DB
  console.log('Contact form submission:', parsed.data)

  return Response.json({ success: true })
}
