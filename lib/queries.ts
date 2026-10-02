import { db } from '@/lib/db'
import { products } from '@/lib/db/schema'
import { and, desc, eq } from 'drizzle-orm'

export type Product = typeof products.$inferSelect

export async function getActiveProducts(): Promise<Product[]> {
  return db
    .select()
    .from(products)
    .where(eq(products.status, 'active'))
    .orderBy(desc(products.createdAt))
}

export async function getActiveProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  const rows = await db
    .select()
    .from(products)
    .where(and(eq(products.slug, slug), eq(products.status, 'active')))
    .limit(1)
  return rows[0]
}

export async function getProductById(
  id: number,
): Promise<Product | undefined> {
  const rows = await db.select().from(products).where(eq(products.id, id)).limit(1)
  return rows[0]
}

export async function getAllProductsForAdmin(
  userId: string,
): Promise<Product[]> {
  return db
    .select()
    .from(products)
    .where(eq(products.userId, userId))
    .orderBy(desc(products.updatedAt))
}
