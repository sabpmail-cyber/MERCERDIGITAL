import Link from 'next/link'
import { Heading, Text, Stack, Label } from '@primer/react'
import { CheckCircleIcon, MailIcon } from '@primer/octicons-react'
import { fulfillCheckoutSession } from '@/lib/fulfill-order'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Surface } from '@/components/surface'
import { IconLinkButton } from '@/components/icon-link-button'

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams

  const order = session_id ? await fulfillCheckoutSession(session_id) : null

  return (
    <>
      <SiteHeader />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px 96px' }}>
        {order ? (
          <Stack direction="vertical" gap="spacious">
            <Stack direction="vertical" gap="condensed">
              <Stack direction="horizontal" gap="condensed" align="center">
                <CheckCircleIcon size={24} />
                <Label variant="success">Payment confirmed</Label>
              </Stack>
              <Heading as="h1" variant="large">
                Your download is ready
              </Heading>
              <Text size="large" style={{ color: 'var(--fgColor-muted)' }}>
                Thanks for your order. A receipt was sent to{' '}
                <strong style={{ color: 'var(--fgColor-default)' }}>
                  {order.email}
                </strong>
                .
              </Text>
            </Stack>

            <Surface>
              <Stack direction="vertical" gap="normal" padding="normal">
                <Stack
                  direction="horizontal"
                  justify="space-between"
                  align="center"
                >
                  <Stack direction="vertical" gap="none">
                    <Text weight="semibold" size="large">
                      {order.productName}
                    </Text>
                    <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
                      Order #{order.id}
                    </Text>
                  </Stack>
                  <Text weight="semibold">
                    {(order.amountCents / 100).toLocaleString('en-US', {
                      style: 'currency',
                      currency: order.currency.toUpperCase(),
                    })}
                  </Text>
                </Stack>
                <IconLinkButton
                  href={`/api/download?token=${order.downloadToken}`}
                  variant="primary"
                  icon="download"
                  block
                >
                  Download your files
                </IconLinkButton>
                <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
                  This link allows up to {order.downloadsRemaining} more
                  downloads. Save your files somewhere safe after
                  downloading.
                </Text>
              </Stack>
            </Surface>

            <Stack
              direction="horizontal"
              gap="condensed"
              align="center"
              style={{ color: 'var(--fgColor-muted)' }}
            >
              <MailIcon size={16} />
              <Text size="small">
                Questions? Email{' '}
                <a href="mailto:shop.mercer@outlook.com">
                  shop.mercer@outlook.com
                </a>
              </Text>
            </Stack>

            <Link href="/shop" style={{ color: 'var(--fgColor-accent)' }}>
              Continue browsing the shop →
            </Link>
          </Stack>
        ) : (
          <Stack direction="vertical" gap="normal">
            <Heading as="h1" variant="medium">
              We couldn&apos;t confirm that order
            </Heading>
            <Text style={{ color: 'var(--fgColor-muted)' }}>
              If you completed a payment, check your email for a receipt or
              contact{' '}
              <a href="mailto:shop.mercer@outlook.com">
                shop.mercer@outlook.com
              </a>{' '}
              for help.
            </Text>
            <Link href="/shop" style={{ color: 'var(--fgColor-accent)' }}>
              Back to shop
            </Link>
          </Stack>
        )}
      </main>
      <SiteFooter />
    </>
  )
}
