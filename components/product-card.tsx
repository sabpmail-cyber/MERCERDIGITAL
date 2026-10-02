import Image from 'next/image'
import Link from 'next/link'
import { Stack, Text } from '@primer/react'
import { Surface } from '@/components/surface'
import type { Product } from '@/lib/queries'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Surface style={{ overflow: 'hidden', height: '100%' }}>
        <Stack direction="vertical" gap="none">
          <div style={{ position: 'relative', aspectRatio: '4 / 3', backgroundColor: 'var(--bgColor-muted)' }}>
            {product.heroImageUrl ? (
              <Image
                src={product.heroImageUrl || '/placeholder.svg'}
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
              />
            ) : null}
          </div>
          <Stack direction="vertical" gap="condensed" padding="normal">
            <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
              {product.category ?? 'Digital product'}
            </Text>
            <Text weight="semibold" size="large">
              {product.name}
            </Text>
            <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
              {product.tagline}
            </Text>
            <Text weight="semibold">
              {(product.priceCents / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: product.currency.toUpperCase(),
              })}
            </Text>
          </Stack>
        </Stack>
      </Surface>
    </Link>
  )
}
