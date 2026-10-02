import { PolicyPage } from '@/components/policy-page'

export const metadata = {
  title: 'Refund Policy — MERCERDIGITAL',
}

export default function RefundsPage() {
  return (
    <PolicyPage
      label="Policies"
      title="Refund policy"
      updated="September 30, 2026"
      sections={[
        {
          heading: 'Digital goods',
          body: [
            'Our products are delivered instantly as digital downloads. Because files are available immediately and can be copied, refund eligibility is limited compared to physical goods.',
          ],
        },
        {
          heading: 'When we offer a refund',
          body: [
            'If a product is materially broken, missing a file listed on its product page, or you were charged in error, email us within 14 days of purchase and we will make it right — a repaired file, a replacement, or a refund.',
          ],
        },
        {
          heading: 'When we generally do not refund',
          body: [
            'Change of mind after downloading, incompatibility with software we did not list as supported on the product page, or difficulty using a feature that is documented in the included quick-start guide.',
          ],
        },
        {
          heading: 'How to request one',
          body: [
            'Email shop.mercer@outlook.com with your order number and a short description of the issue. We respond to every request personally.',
          ],
        },
      ]}
    />
  )
}
