import Link from 'next/link'
import { Stack, Text } from '@primer/react'

const links = [
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  return (
    <header
      style={{
        borderBottom: '1px solid var(--borderColor-default)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backgroundColor: 'var(--bgColor-default)',
      }}
    >
      <Stack
        direction="horizontal"
        justify="space-between"
        align="center"
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          padding: '18px 24px',
        }}
      >
        <Link
          href="/"
          style={{
            color: 'var(--fgColor-default)',
            textDecoration: 'none',
          }}
        >
          <Text weight="semibold" size="large" style={{ letterSpacing: '0.02em' }}>
            MERCER<span style={{ color: 'var(--fgColor-muted)' }}>DIGITAL</span>
          </Text>
        </Link>
        <nav aria-label="Primary">
          <Stack direction="horizontal" gap="spacious" align="center">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: 'var(--fgColor-muted)',
                  textDecoration: 'none',
                  fontSize: 14,
                }}
              >
                {link.label}
              </Link>
            ))}
          </Stack>
        </nav>
      </Stack>
    </header>
  )
}
