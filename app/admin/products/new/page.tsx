import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { AdminHeader } from '@/components/admin-header'
import { ProductForm } from '@/components/product-form'
import { createProduct } from '@/app/admin/actions'

export default async function NewProductPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')

  return (
    <>
      <AdminHeader userEmail={session.user.email} />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px 96px' }}>
        <ProductForm mode="create" action={createProduct} />
      </main>
    </>
  )
}
