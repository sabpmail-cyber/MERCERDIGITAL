import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { Heading, Text, Stack, Button, Label } from '@primer/react'
import { auth } from '@/lib/auth'
import { getAllProductsForAdmin } from '@/lib/queries'
import { Surface } from '@/components/surface'
import { AdminHeader } from '@/components/admin-header'
import { IconLinkButton } from '@/components/icon-link-button'

export default async function AdminDashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')

  const products = await getAllProductsForAdmin(session.user.id)

  return (
    <>
      <AdminHeader userEmail={session.user.email} />
      <main style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px 96px' }}>
        <Stack direction="vertical" gap="spacious">
          <Stack direction="horizontal" justify="space-between" align="center" wrap="wrap" gap="normal">
            <Stack direction="vertical" gap="condensed">
              <Heading as="h1" variant="large">
                Products
              </Heading>
              <Text style={{ color: 'var(--fgColor-muted)' }}>
                Manage what&apos;s for sale in the shop.
              </Text>
            </Stack>
            <IconLinkButton href="/admin/products/new" variant="primary" icon="plus">
              New product
            </IconLinkButton>
          </Stack>

          {products.length === 0 ? (
            <Surface>
              <Stack direction="vertical" gap="condensed" padding="spacious" align="center">
                <Text weight="semibold">No products yet</Text>
                <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
                  Create your first product to start selling.
                </Text>
                <IconLinkButton href="/admin/products/new" variant="primary" icon="plus">
                  New product
                </IconLinkButton>
              </Stack>
            </Surface>
          ) : (
            <Stack direction="vertical" gap="condensed">
              {products.map((product) => (
                <Surface key={product.id}>
                  <Stack
                    direction="horizontal"
                    justify="space-between"
                    align="center"
                    gap="normal"
                    padding="normal"
                    wrap="wrap"
                  >
                    <Stack direction="vertical" gap="none">
                      <Stack direction="horizontal" gap="condensed" align="center">
                        <Text weight="semibold">{product.name}</Text>
                        <Label variant={product.status === 'active' ? 'success' : 'attention'}>
                          {product.status === 'active' ? 'Active' : 'Draft'}
                        </Label>
                      </Stack>
                      <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
                        {(product.priceCents / 100).toLocaleString('en-US', {
                          style: 'currency',
                          currency: product.currency.toUpperCase(),
                        })}
                        {' · '}
                        {product.fileName ?? 'No file uploaded'}
                      </Text>
                    </Stack>
                    <Stack direction="horizontal" gap="condensed">
                      {product.status === 'active' && (
                        <IconLinkButton
                          href={`/products/${product.slug}`}
                          target="_blank"
                          variant="invisible"
                          icon="eye"
                        >
                          View
                        </IconLinkButton>
                      )}
                      <Button as="a" href={`/admin/products/${product.id}`}>
                        Edit
                      </Button>
                    </Stack>
                  </Stack>
                </Surface>
              ))}
            </Stack>
          )}
        </Stack>
      </main>
    </>
  )
}
