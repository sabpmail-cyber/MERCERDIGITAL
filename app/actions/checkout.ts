'use server'

import { stripe } from '@/lib/stripe'
import { getProductById } from '@/lib/queries'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

function getOrigin(headerList: Headers) {
  const explicit =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.V0_RUNTIME_URL ??
    process.env.VERCEL_URL
  if (explicit) {
    return explicit.startsWith('http') ? explicit : `https://${explicit}`
  }
  const host = headerList.get('host')
  const protocol = host?.includes('localhost') ? 'http' : 'https'
  return `${protocol}://${host}`
}

export async function startCheckout(productId: number) {
  const product = await getProductById(productId)
  if (!product || product.status !== 'active') {
    throw new Error('This product is not available.')
  }

  const origin = getOrigin(await headers())

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: product.currency,
          unit_amount: product.priceCents,
          product_data: {
            name: product.name,
            description: product.tagline ?? undefined,
            images: product.heroImageUrl ? [product.heroImageUrl] : undefined,
          },
        },
      },
    ],
    metadata: {
      productId: String(product.id),
    },
    success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/products/${product.slug}`,
  })

  if (!session.url) {
    throw new Error('Could not start checkout')
  }

  redirect(session.url)
}
