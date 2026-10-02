import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Heading, Text, Stack, Label } from '@primer/react'
import { CheckIcon, PackageIcon, ShieldLockIcon } from '@primer/octicons-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Surface } from '@/components/surface'
import { BuyButton } from '@/components/buy-button'
import { getActiveProductBySlug } from '@/lib/queries'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getActiveProductBySlug(slug)
  if (!product) return {}
  return {
    title: `${product.name} — MERCERDIGITAL`,
    description: product.tagline ?? product.description ?? undefined,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getActiveProductBySlug(slug)
  if (!product) notFound()

  const features = Array.isArray(product.features)
    ? (product.features as string[])
    : []
  const included = Array.isArray(product.included)
    ? (product.included as string[])
    : []
  const gallery = Array.isArray(product.galleryImages)
    ? (product.galleryImages as string[])
    : []

  return (
    <>
      <SiteHeader />
      <main style={{ maxWidth: 1120, margin: '0 auto', padding: '64px 24px 96px' }}>
        <Stack direction={{ narrow: 'vertical', regular: 'horizontal' }} gap="spacious">
          {/* Media column */}
          <Stack direction="vertical" gap="normal" style={{ flex: '1 1 55%', minWidth: 0 }}>
            <Surface style={{ overflow: 'hidden' }}>
              <div style={{ position: 'relative', aspectRatio: '4 / 3', backgroundColor: 'var(--bgColor-muted)' }}>
                {product.heroImageUrl ? (
                  <Image
                    src={product.heroImageUrl || '/placeholder.svg'}
                    alt={product.name}
                    fill
                    priority
                    style={{ objectFit: 'cover' }}
                  />
                ) : null}
              </div>
            </Surface>
            {gallery.length > 0 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                  gap: 'var(--base-size-12)',
                }}
              >
                {gallery.map((url) => (
                  <Surface key={url} style={{ overflow: 'hidden' }}>
                    <div style={{ position: 'relative', aspectRatio: '4 / 3' }}>
                      <Image src={url || '/placeholder.svg'} alt={product.name} fill style={{ objectFit: 'cover' }} />
                    </div>
                  </Surface>
                ))}
              </div>
            )}
          </Stack>

          {/* Info column */}
          <Stack direction="vertical" gap="normal" style={{ flex: '1 1 45%' }}>
            <Stack direction="vertical" gap="condensed">
              <Label variant="accent">{product.category ?? 'Digital product'}</Label>
              <Heading as="h1" variant="large">
                {product.name}
              </Heading>
              <Text size="large" style={{ color: 'var(--fgColor-muted)' }}>
                {product.tagline}
              </Text>
            </Stack>

            <Text weight="semibold" style={{ fontSize: 32 }}>
              {(product.priceCents / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: product.currency.toUpperCase(),
              })}
            </Text>

            <BuyButton productId={product.id} />

            <Stack direction="horizontal" gap="condensed" align="center">
              <ShieldLockIcon size={16} />
              <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
                Secure checkout via Stripe. Instant download link after payment.
              </Text>
            </Stack>

            {product.description && (
              <Text style={{ color: 'var(--fgColor-muted)' }}>
                {product.description}
              </Text>
            )}

            {features.length > 0 && (
              <Stack direction="vertical" gap="condensed">
                <Text weight="semibold">What&apos;s inside</Text>
                <Stack direction="vertical" gap="tight">
                  {features.map((feature) => (
                    <Stack key={feature} direction="horizontal" gap="condensed" align="start">
                      <CheckIcon size={16} />
                      <Text size="small">{feature}</Text>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            )}

            {included.length > 0 && (
              <Stack direction="vertical" gap="condensed">
                <Stack direction="horizontal" gap="condensed" align="center">
                  <PackageIcon size={16} />
                  <Text weight="semibold">Included in your download</Text>
                </Stack>
                <Stack direction="vertical" gap="tight">
                  {included.map((item) => (
                    <Text key={item} size="small" style={{ color: 'var(--fgColor-muted)' }}>
                      • {item}
                    </Text>
                  ))}
                </Stack>
              </Stack>
            )}

            {product.compatibility && (
              <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
                Compatibility: {product.compatibility}
              </Text>
            )}
            {product.version && (
              <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
                Version {product.version}
              </Text>
            )}
          </Stack>
        </Stack>
      </main>
      <SiteFooter />
    </>
  )
}
