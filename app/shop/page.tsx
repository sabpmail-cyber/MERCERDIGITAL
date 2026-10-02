import { Heading, Text, Stack } from '@primer/react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ProductCard } from '@/components/product-card'
import { getActiveProducts } from '@/lib/queries'

export const metadata = {
  title: 'Shop — MERCERDIGITAL',
  description:
    'Browse premium spreadsheet-based operating systems for personal finance and beyond.',
}

export default async function ShopPage() {
  const products = await getActiveProducts()

  return (
    <>
      <SiteHeader />
      <main style={{ maxWidth: 1120, margin: '0 auto', padding: '64px 24px 96px' }}>
        <Stack direction="vertical" gap="spacious">
          <Stack direction="vertical" gap="condensed">
            <Heading as="h1" variant="large">
              Shop
            </Heading>
            <Text size="large" style={{ color: 'var(--fgColor-muted)', maxWidth: 560 }}>
              Every system is a one-time purchase. Download instantly after
              checkout.
            </Text>
          </Stack>

          {products.length === 0 ? (
            <Text style={{ color: 'var(--fgColor-muted)' }}>
              No products are live yet. Check back soon.
            </Text>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 'var(--base-size-24)',
              }}
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </Stack>
      </main>
      <SiteFooter />
    </>
  )
}
