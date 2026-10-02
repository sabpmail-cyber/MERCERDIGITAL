import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

/**
 * MERCERDIGITAL is a single-operator storefront: any account that can sign
 * in through /sign-in (a page never linked from public navigation) is
 * treated as the store admin. Every admin route and action calls this to
 * get the authenticated user id, which scopes every products/orders query.
 */
export async function requireAdminUserId(): Promise<string> {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    throw new Error('Unauthorized')
  }
  return session.user.id
}

export async function getAdminSession() {
  return auth.api.getSession({ headers: await headers() })
}
