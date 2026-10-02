import { Heading, Text, Stack, Label } from '@primer/react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export function PolicyPage({
  label,
  title,
  updated,
  sections,
}: {
  label: string
  title: string
  updated: string
  sections: { heading: string; body: string[] }[]
}) {
  return (
    <>
      <SiteHeader />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px 96px' }}>
        <Stack direction="vertical" gap="spacious">
          <Stack direction="vertical" gap="condensed">
            <Label variant="accent">{label}</Label>
            <Heading as="h1" variant="large">
              {title}
            </Heading>
            <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
              Last updated {updated}
            </Text>
          </Stack>

          <Stack direction="vertical" gap="normal">
            {sections.map((section) => (
              <Stack key={section.heading} direction="vertical" gap="condensed">
                <Heading as="h2" variant="small">
                  {section.heading}
                </Heading>
                {section.body.map((paragraph, i) => (
                  <Text key={i} style={{ color: 'var(--fgColor-muted)' }}>
                    {paragraph}
                  </Text>
                ))}
              </Stack>
            ))}
          </Stack>
        </Stack>
      </main>
      <SiteFooter />
    </>
  )
}
