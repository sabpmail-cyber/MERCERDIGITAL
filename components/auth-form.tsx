'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, FormControl, TextInput, Stack, Heading, Text, Flash } from '@primer/react'
import { PersonIcon, LockIcon, MailIcon } from '@primer/octicons-react'
import { authClient } from '@/lib/auth-client'
import { Surface } from '@/components/surface'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const isSignUp = mode === 'sign-up'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = isSignUp
      ? await authClient.signUp.email({ email, password, name })
      : await authClient.signIn.email({ email, password })

    setLoading(false)

    if (error) {
      setError(error.message ?? 'Something went wrong')
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <main
      style={{
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <Surface style={{ width: '100%', maxWidth: 380 }}>
        <Stack direction="vertical" gap="normal" padding="spacious">
          <Stack direction="vertical" gap="condensed">
            <Heading as="h1" variant="medium">
              {isSignUp ? 'Create admin account' : 'Store admin'}
            </Heading>
            <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
              MERCERDIGITAL product management
            </Text>
          </Stack>

          <form onSubmit={handleSubmit}>
            <Stack direction="vertical" gap="normal">
              {isSignUp && (
                <FormControl required>
                  <FormControl.Label>Name</FormControl.Label>
                  <TextInput
                    leadingVisual={PersonIcon}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    block
                    autoComplete="name"
                  />
                </FormControl>
              )}
              <FormControl required>
                <FormControl.Label>Email</FormControl.Label>
                <TextInput
                  type="email"
                  leadingVisual={MailIcon}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  block
                  autoComplete="email"
                />
              </FormControl>
              <FormControl required>
                <FormControl.Label>Password</FormControl.Label>
                <TextInput
                  type="password"
                  leadingVisual={LockIcon}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  block
                  minLength={8}
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                />
              </FormControl>

              {error && <Flash variant="danger">{error}</Flash>}

              <Button
                type="submit"
                variant="primary"
                block
                loading={loading}
                loadingAnnouncement="Please wait"
              >
                {isSignUp ? 'Create account' : 'Sign in'}
              </Button>
            </Stack>
          </form>
        </Stack>
      </Surface>
    </main>
  )
}
