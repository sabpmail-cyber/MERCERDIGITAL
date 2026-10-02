import { Heading, Text, Stack, Label } from '@primer/react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Surface } from '@/components/surface'

export const metadata = {
  title: 'FAQ — MERCERDIGITAL',
  description: 'Answers to common questions about MERCERDIGITAL products.',
}

const faqs = [
  {
    q: 'What am I buying?',
    a: 'A digital file (or set of files) you download instantly after checkout — typically an Excel workbook, a quick-start guide, and a completed example. There is no physical product and nothing is shipped.',
  },
  {
    q: 'Do your products connect to my bank?',
    a: 'No. Every MERCERDIGITAL product is a fully offline spreadsheet. It never requests banking credentials and never transmits your data anywhere — you enter numbers by hand or paste them in yourself.',
  },
  {
    q: 'What software do I need?',
    a: 'Our products are designed for Microsoft Excel on a computer. Google Sheets compatibility is not guaranteed or verified end to end unless a product page says otherwise. Excel itself is not included.',
  },
  {
    q: 'Is this financial advice?',
    a: 'No. MERCERDIGITAL products are organizational and educational tools only. Nothing we sell is financial, tax, legal, accounting, or investment advice.',
  },
  {
    q: 'How many times can I download my file?',
    a: 'Your download link allows a handful of downloads so you can safely save a copy. If you run out, email us and we will reissue access.',
  },
  {
    q: 'Can I share or resell a file I bought?',
    a: 'No. Every purchase is a single-user personal license. Resale, sublicensing, sharing, and redistribution are not permitted. See our license terms for details.',
  },
  {
    q: 'What is your refund policy?',
    a: 'See our Refunds page. Because these are instant-download digital goods, refund eligibility is limited — reach out and we will take a look at your situation.',
  },
  {
    q: 'I need help — how do I reach you?',
    a: 'Email shop.mercer@outlook.com. Please never send bank credentials, full account numbers, or other sensitive financial information by email.',
  },
]

export default function FaqPage() {
  return (
    <>
      <SiteHeader />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px 96px' }}>
        <Stack direction="vertical" gap="spacious">
          <Stack direction="vertical" gap="condensed">
            <Label variant="accent">FAQ</Label>
            <Heading as="h1" variant="large">
              Frequently asked questions
            </Heading>
          </Stack>

          <Stack direction="vertical" gap="normal">
            {faqs.map((item) => (
              <Surface key={item.q}>
                <Stack direction="vertical" gap="condensed" padding="normal">
                  <Text weight="semibold">{item.q}</Text>
                  <Text size="small" style={{ color: 'var(--fgColor-muted)' }}>
                    {item.a}
                  </Text>
                </Stack>
              </Surface>
            ))}
          </Stack>
        </Stack>
      </main>
      <SiteFooter />
    </>
  )
}
