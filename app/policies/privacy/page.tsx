import { PolicyPage } from '@/components/policy-page'

export const metadata = {
  title: 'Privacy Policy — MERCERDIGITAL',
}

export default function PrivacyPage() {
  return (
    <PolicyPage
      label="Policies"
      title="Privacy policy"
      updated="September 30, 2026"
      sections={[
        {
          heading: 'What we collect',
          body: [
            'When you make a purchase, our payment processor (Stripe) collects the billing information needed to complete checkout. We receive your email address and order details so we can deliver your download and provide support.',
            'We do not collect or store payment card numbers ourselves — Stripe handles that directly.',
          ],
        },
        {
          heading: 'Your product data stays with you',
          body: [
            'MERCERDIGITAL products are offline spreadsheet files. Any financial information you enter into a purchased workbook stays on your own device. We never see, collect, or have access to the data you enter into your files.',
          ],
        },
        {
          heading: 'How we use your information',
          body: [
            'We use order information to fulfill downloads, respond to support requests, and maintain records required for accounting and tax purposes.',
          ],
        },
        {
          heading: 'Sharing',
          body: [
            'We do not sell your personal information. We share only what is necessary with service providers (such as Stripe for payments and our hosting provider) to operate the store.',
          ],
        },
        {
          heading: 'Contact',
          body: ['Privacy questions: shop.mercer@outlook.com.'],
        },
      ]}
    />
  )
}
