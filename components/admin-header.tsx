'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Stack, Text, Button } from '@primer/react'
import { SignOutIcon, HomeIcon } from '@primer/octicons-react'
import { authClient } from '@/lib/auth-client'

export function AdminHeader({ userEmail }: { userEmail: string }) {
  const router = useRouter()

  return (
    <header
      style={{
        borderBottom: '1px solid var(--borderColor-default)',
        backgroundColor: 'var(--bgColor-default)',
      }}
    >
      <Stack
        direction="horizontal"
        justify="space-between"
        align="center"
        style={{ maxWidth: 960, margin: '0 auto', padding: '12px 16px' }}
      >
        <Link href="/admin" style={{ color: 'var(--fgColor-default)', textDecoration: 'none' }}>
          <Text weight="semibold">
            MERCER<span style={{ color: 'var(--fgColor-muted)' }}>DIGITAL</span>{' '}
            <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
              admin
            </Text>
          </Text>
        </Link>
        <Stack direction="horizontal" gap="condensed" align="center">
          <Text
            size="small"
            className="hide-below-md"
            style={{ color: 'var(--fgColor-muted)' }}
          >
            {userEmail}
          </Text>
          <Button
            as="a"
            href="/"
            variant="invisible"
            leadingVisual={HomeIcon}
            aria-label="View store"
          >
            <span className="hide-below-sm">View store</span>
          </Button>
          <Button
            aria-label="Sign out"
            leadingVisual={SignOutIcon}
            onClick={async () => {
              await authClient.signOut()
              router.push('/sign-in')
              router.refresh()
            }}
          >
            <span className="hide-below-sm">Sign out</span>
          </Button>
        </Stack>
      </Stack>
    </header>
  )
}
