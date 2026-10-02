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
        style={{ maxWidth: 960, margin: '0 auto', padding: '16px 24px' }}
      >
        <Link href="/admin" style={{ color: 'var(--fgColor-default)', textDecoration: 'none' }}>
          <Text weight="semibold">
            MERCER<span style={{ color: 'var(--fgColor-muted)' }}>DIGITAL</span>{' '}
            <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
              admin
            </Text>
          </Text>
        </Link>
        <Stack direction="horizontal" gap="normal" align="center">
          <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
            {userEmail}
          </Text>
          <Button as="a" href="/" size="small" variant="invisible" leadingVisual={HomeIcon}>
            View store
          </Button>
          <Button
            size="small"
            leadingVisual={SignOutIcon}
            onClick={async () => {
              await authClient.signOut()
              router.push('/sign-in')
              router.refresh()
            }}
          >
            Sign out
          </Button>
        </Stack>
      </Stack>
    </header>
  )
}
