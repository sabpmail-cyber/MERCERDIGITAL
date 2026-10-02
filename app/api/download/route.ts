import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { getProductById } from '@/lib/queries'

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')
  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 })
  }

  const rows = await db
    .select()
    .from(orders)
    .where(eq(orders.downloadToken, token))
    .limit(1)
  const order = rows[0]

  if (!order) {
    return NextResponse.json({ error: 'Invalid download link' }, { status: 404 })
  }
  if (order.downloadsRemaining <= 0) {
    return NextResponse.json(
      { error: 'Download limit reached for this order' },
      { status: 403 },
    )
  }

  const product = await getProductById(order.productId)
  if (!product?.filePathname) {
    return NextResponse.json({ error: 'File not available' }, { status: 404 })
  }

  // Resolve the private blob's download URL and redirect to it, decrementing
  // the remaining-downloads counter.
  const { head } = await import('@vercel/blob')
  const fileInfo = await head(product.filePathname)

  await db
    .update(orders)
    .set({ downloadsRemaining: order.downloadsRemaining - 1 })
    .where(eq(orders.downloadToken, token))

  return NextResponse.redirect(fileInfo.downloadUrl)
}
