import { NextResponse } from 'next/server'
import { updateUserName } from '@/lib/actions/user.actions'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const res = await updateUserName(body)
    return NextResponse.json(res)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}
