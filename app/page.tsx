import Link from 'next/link'
import Image from 'next/image'
import { Heading, Text, Stack, Button, Label } from '@primer/react'
import { ShieldLockIcon, FileIcon, SyncIcon } from '@primer/octicons-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ProductCard } from '@/components/product-card'
import { Surface } from '@/components/surface'
import { IconLinkButton } from '@/components/icon-link-button'
import { getActiveProducts } from '@/lib/queries'

export default async function HomePage() {
  const products = await getActiveProducts()
  const featured = products[0]

  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderBottom: '1px solid var(--borderColor-default)',
          }}
        >
          <Image
            src="/brand/hero-texture.png"
            alt=""
            fill
            priority
            style={{ objectFit: 'cover', opacity: 0.5, zIndex: 0 }}
          />
          <Stack
            direction="vertical"
            gap="spacious"
            style={{
              position: 'relative',
              zIndex: 1,
              maxWidth: 1120,
              margin: '0 auto',
              padding: '96px 24px 80px',
            }}
          >
            <Stack direction="vertical" gap="condensed" style={{ maxWidth: 640 }}>
              <Label variant="accent">Digital operating systems</Label>
              <Heading as="h1" variant="large" style={{ fontSize: 56, lineHeight: 1.05 }}>
                Calm, well-built tools for running your life.
              </Heading>
              <Text size="large" style={{ color: 'var(--fgColor-muted)' }}>
                MERCERDIGITAL designs premium spreadsheet-based systems — no
                subscriptions, no bank connections, no app to log into. Buy
                once, own it outright, run it offline forever.
              </Text>
            </Stack>
            <Stack direction="horizontal" gap="normal" wrap="wrap">
              <IconLinkButton href="/shop" variant="primary" size="large" trailingIcon="arrowRight">
                Browse the shop
              </IconLinkButton>
              <IconLinkButton href="/about" size="large" variant="invisible">
                Why spreadsheets
              </IconLinkButton>
            </Stack>
          </Stack>
        </section>

        {/* Trust strip */}
        <section style={{ borderBottom: '1px solid var(--borderColor-default)' }}>
          <Stack
            direction="horizontal"
            gap="spacious"
            wrap="wrap"
            style={{ maxWidth: 1120, margin: '0 auto', padding: '32px 24px' }}
          >
            <TrustItem icon={ShieldLockIcon} label="Fully offline — your data never leaves your device" />
            <TrustItem icon={FileIcon} label="Built for Microsoft Excel" />
            <TrustItem icon={SyncIcon} label="Lifetime access to what you buy" />
          </Stack>
        </section>

        {/* Featured product */}
        {featured && (
          <section style={{ borderBottom: '1px solid var(--borderColor-default)' }}>
            <Stack
              direction="vertical"
              gap="normal"
              style={{ maxWidth: 1120, margin: '0 auto', padding: '80px 24px' }}
            >
              <Stack direction="horizontal" justify="space-between" align="end" wrap="wrap" gap="normal">
                <Stack direction="vertical" gap="condensed">
                  <Label variant="accent">Featured</Label>
                  <Heading as="h2" variant="medium">
                    The flagship system
                  </Heading>
                </Stack>
                <Link href="/shop" style={{ color: 'var(--fgColor-accent)', textDecoration: 'none' }}>
                  View full shop →
                </Link>
              </Stack>
              <Surface style={{ overflow: 'hidden' }}>
                <Stack direction={{ narrow: 'vertical', regular: 'horizontal' }} gap="none">
                  <div style={{ flex: '1 1 50%', position: 'relative', minHeight: 320 }}>
                    {featured.heroImageUrl ? (
                      <Image
                        src={featured.heroImageUrl || '/placeholder.svg'}
                        alt={featured.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    ) : null}
                  </div>
                  <Stack
                    direction="vertical"
                    gap="normal"
                    padding="spacious"
                    style={{ flex: '1 1 50%' }}
                  >
                    <Stack direction="vertical" gap="condensed">
                      <Text size="small" weight="semibold" style={{ color: 'var(--fgColor-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {featured.category ?? 'Personal finance'}
                      </Text>
                      <Heading as="h3" variant="medium">
                        {featured.name}
                      </Heading>
                      <Text style={{ color: 'var(--fgColor-muted)' }}>{featured.tagline}</Text>
                    </Stack>
                    <Text weight="semibold" size="large">
                      {(featured.priceCents / 100).toLocaleString('en-US', {
                        style: 'currency',
                        currency: featured.currency.toUpperCase(),
                      })}
                    </Text>
                    <Stack direction="horizontal" gap="normal">
                      <Button as="a" href={`/products/${featured.slug}`} variant="primary">
                        View details
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              </Surface>
            </Stack>
          </section>
        )}

        {/* All products grid */}
        <section>
          <Stack
            direction="vertical"
            gap="normal"
            style={{ maxWidth: 1120, margin: '0 auto', padding: '80px 24px 96px' }}
          >
            <Heading as="h2" variant="medium">
              Every system
            </Heading>
            {products.length === 0 ? (
              <Text style={{ color: 'var(--fgColor-muted)' }}>
                New systems are in the works. Check back soon.
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
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

function TrustItem({
  icon: Icon,
  label,
}: {
  icon: React.ElementType
  label: string
}) {
  return (
    <Stack direction="horizontal" gap="condensed" align="center">
      <Icon size={16} />
      <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
        {label}
      </Text>
    </Stack>
  )
}
