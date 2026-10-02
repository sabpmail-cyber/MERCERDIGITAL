import { Heading, Text, Stack, Label } from '@primer/react'
import { MailIcon, AlertIcon } from '@primer/octicons-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Surface } from '@/components/surface'

export const metadata = {
  title: 'Contact — MERCERDIGITAL',
  description: 'Get in touch with MERCERDIGITAL support.',
}

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main style={{ maxWidth: 640, margin: '0 auto', padding: '64px 24px 96px' }}>
        <Stack direction="vertical" gap="spacious">
          <Stack direction="vertical" gap="condensed">
            <Label variant="accent">Contact</Label>
            <Heading as="h1" variant="large">
              Get in touch
            </Heading>
            <Text size="large" style={{ color: 'var(--fgColor-muted)' }}>
              Questions about an order, a product, or a license? We read
              every email ourselves.
            </Text>
          </Stack>

          <Surface>
            <Stack direction="horizontal" gap="normal" align="center" padding="normal">
              <MailIcon size={24} />
              <Stack direction="vertical" gap="none">
                <Text weight="semibold">Email support</Text>
                <a
                  href="mailto:shop.mercer@outlook.com"
                  style={{ color: 'var(--fgColor-accent)' }}
                >
                  shop.mercer@outlook.com
                </a>
              </Stack>
            </Stack>
          </Surface>

          <Surface>
            <Stack direction="horizontal" gap="normal" align="start" padding="normal">
              <AlertIcon size={20} />
              <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
                For your safety, never email bank credentials, full account
                numbers, passwords, or other sensitive financial information.
                We will never ask for them.
              </Text>
            </Stack>
          </Surface>
        </Stack>
      </main>
      <SiteFooter />
    </>
  )
}
