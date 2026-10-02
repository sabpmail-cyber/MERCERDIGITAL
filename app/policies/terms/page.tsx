import { PolicyPage } from '@/components/policy-page'

export const metadata = {
  title: 'License Terms — MERCERDIGITAL',
}

export default function TermsPage() {
  return (
    <PolicyPage
      label="Policies"
      title="License terms"
      updated="September 30, 2026"
      sections={[
        {
          heading: 'Single-user personal license',
          body: [
            'Each purchase grants a single-user personal license to use the downloaded files for your own organizational and educational purposes. The license is non-transferable.',
            'Resale, sublicensing, sharing, public distribution, or redistribution of any file — in original or modified form — is not permitted.',
          ],
        },
        {
          heading: 'What the license does not cover',
          body: [
            'This license does not grant any rights to MERCERDIGITAL trademarks, branding, or source design files beyond the delivered product.',
            'You may not represent a MERCERDIGITAL product as your own work when distributing it to others.',
          ],
        },
        {
          heading: 'Not financial, tax, legal, or investment advice',
          body: [
            'MERCERDIGITAL products are organizational and educational tools only. Nothing provided constitutes financial, tax, legal, accounting, or investment advice. Consult a qualified professional for advice specific to your situation.',
          ],
        },
        {
          heading: 'No warranty',
          body: [
            'Products are provided "as is." While we test each release, we do not warrant that calculations are error-free or suitable for every use case. Keep backups before making large changes to any workbook.',
          ],
        },
        {
          heading: 'Capacity and compatibility',
          body: [
            'Each product page lists tested capacity (for example, the number of transactions or entries a workbook supports) and compatibility notes. Using a product beyond its documented capacity may require formula changes you make yourself.',
          ],
        },
        {
          heading: 'Contact',
          body: ['Questions about licensing: shop.mercer@outlook.com.'],
        },
      ]}
    />
  )
}
