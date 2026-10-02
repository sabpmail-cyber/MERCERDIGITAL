import 'server-only'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { getProductById } from '@/lib/queries'
import { randomBytes } from 'node:crypto'

/**
 * Idempotently turns a completed Stripe Checkout Session into an order row
 * with a download token. Safe to call multiple times for the same session
 * (e.g. from both the success page and a webhook).
 */
export async function fulfillCheckoutSession(sessionId: string) {
  const existing = await db
    .select()
    .from(orders)
    .where(eq(orders.stripeSessionId, sessionId))
    .limit(1)
  if (existing[0]) return existing[0]

  const session = await stripe.checkout.sessions.retrieve(sessionId)
  if (session.payment_status !== 'paid') return null

  const productId = Number(session.metadata?.productId)
  const product = productId ? await getProductById(productId) : undefined
  if (!product) return null

  const downloadToken = randomBytes(24).toString('hex')

  const [created] = await db
    .insert(orders)
    .values({
      stripeSessionId: sessionId,
      productId: product.id,
      productName: product.name,
      email: session.customer_details?.email ?? 'unknown@unknown.com',
      amountCents: session.amount_total ?? product.priceCents,
      currency: session.currency ?? product.currency,
      downloadToken,
      downloadsRemaining: 5,
    })
    .onConflictDoNothing({ target: orders.stripeSessionId })
    .returning()

  if (created) return created

  const rows = await db
    .select()
    .from(orders)
    .where(eq(orders.stripeSessionId, sessionId))
    .limit(1)
  return rows[0] ?? null
}
