import Link from 'next/link'
import { Stack, Text } from '@primer/react'

export function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--borderColor-default)',
        marginTop: 96,
      }}
    >
      <Stack
        direction="vertical"
        gap="normal"
        style={{ maxWidth: 1120, margin: '0 auto', padding: '40px 24px' }}
      >
        <Stack
          direction="horizontal"
          justify="space-between"
          align="start"
          wrap="wrap"
          gap="normal"
        >
          <Stack direction="vertical" gap="condensed">
            <Text weight="semibold">
              MERCER<span style={{ color: 'var(--fgColor-muted)' }}>DIGITAL</span>
            </Text>
            <Text size="small" style={{ color: 'var(--fgColor-muted)', maxWidth: 320 }}>
              Operating systems for life and money, built as calm,
              offline spreadsheet tools you own outright.
            </Text>
          </Stack>
          <Stack direction="horizontal" gap="spacious" wrap="wrap">
            <Stack direction="vertical" gap="condensed">
              <Text size="small" weight="semibold">
                Store
              </Text>
              <FooterLink href="/shop">Shop</FooterLink>
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </Stack>
            <Stack direction="vertical" gap="condensed">
              <Text size="small" weight="semibold">
                Policies
              </Text>
              <FooterLink href="/policies/terms">License terms</FooterLink>
              <FooterLink href="/policies/privacy">Privacy</FooterLink>
              <FooterLink href="/policies/refunds">Refunds</FooterLink>
            </Stack>
          </Stack>
        </Stack>
        <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
          © {new Date().getFullYear()} MERCERDIGITAL. All rights reserved.
        </Text>
      </Stack>
    </footer>
  )
}

function FooterLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      style={{
        color: 'var(--fgColor-muted)',
        textDecoration: 'none',
        fontSize: 14,
      }}
    >
      {children}
    </Link>
  )
}
