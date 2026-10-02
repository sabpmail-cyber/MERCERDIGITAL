import { redirect, notFound } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { products } from '@/lib/db/schema'
import { and, eq } from 'drizzle-orm'
import { AdminHeader } from '@/components/admin-header'
import { ProductForm } from '@/components/product-form'
import { updateProduct, deleteProduct, removeGalleryImage } from '@/app/admin/actions'

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')

  const { id } = await params
  const productId = Number(id)
  if (!Number.isFinite(productId)) notFound()

  const rows = await db
    .select()
    .from(products)
    .where(and(eq(products.id, productId), eq(products.userId, session.user.id)))
    .limit(1)
  const product = rows[0]
  if (!product) notFound()

  const boundUpdate = updateProduct.bind(null, productId)
  const boundDelete = deleteProduct.bind(null, productId)
  const boundRemoveGalleryImage = removeGalleryImage.bind(null, productId)

  return (
    <>
      <AdminHeader userEmail={session.user.email} />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px 96px' }}>
        <ProductForm
          mode="edit"
          product={product}
          action={boundUpdate}
          onDelete={boundDelete}
          onRemoveGalleryImage={boundRemoveGalleryImage}
        />
      </main>
    </>
  )
}
