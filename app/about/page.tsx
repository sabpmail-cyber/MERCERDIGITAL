import { Heading, Text, Stack, Label } from '@primer/react'
import { ShieldLockIcon, FileIcon, HeartIcon } from '@primer/octicons-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Surface } from '@/components/surface'

export const metadata = {
  title: 'About — MERCERDIGITAL',
  description: 'Why MERCERDIGITAL builds operating systems as spreadsheets.',
}

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main style={{ maxWidth: 760, margin: '0 auto', padding: '64px 24px 96px' }}>
        <Stack direction="vertical" gap="spacious">
          <Stack direction="vertical" gap="condensed">
            <Label variant="accent">About</Label>
            <Heading as="h1" variant="large">
              Software that doesn&apos;t own you back
            </Heading>
            <Text size="large" style={{ color: 'var(--fgColor-muted)' }}>
              MERCERDIGITAL designs premium operating systems for the parts of
              life that deserve more structure — starting with money. Every
              product is a spreadsheet: no login, no subscription, no app
              that can disappear or change its pricing on you.
            </Text>
          </Stack>

          <Stack direction="vertical" gap="normal">
            <Heading as="h2" variant="small">
              Why spreadsheets
            </Heading>
            <Text style={{ color: 'var(--fgColor-muted)' }}>
              Spreadsheets are durable, transparent, and private. You can see
              every formula, change anything, and keep using the file for as
              long as you have a copy of Excel. There&apos;s no server
              that holds your financial data and no account that can be
              deactivated.
            </Text>
          </Stack>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--base-size-16)',
            }}
          >
            <Principle icon={ShieldLockIcon} title="Private by design" body="Your numbers stay on your machine. We never see them." />
            <Principle icon={FileIcon} title="Built to last" body="Plain spreadsheet files you can open for decades." />
            <Principle icon={HeartIcon} title="Made with care" body="Every sheet, formula and label is reviewed by hand." />
          </div>

          <Surface>
            <Stack direction="vertical" gap="condensed" padding="normal">
              <Text weight="semibold">A note on scope</Text>
              <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
                MERCERDIGITAL products are organizational and educational
                tools. They are not financial, tax, legal, accounting, or
                investment advice, and they don&apos;t connect to your bank.
              </Text>
            </Stack>
          </Surface>
        </Stack>
      </main>
      <SiteFooter />
    </>
  )
}

function Principle({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ElementType
  title: string
  body: string
}) {
  return (
    <Surface>
      <Stack direction="vertical" gap="condensed" padding="normal">
        <Icon size={20} />
        <Text weight="semibold">{title}</Text>
        <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
          {body}
        </Text>
      </Stack>
    </Surface>
  )
}
