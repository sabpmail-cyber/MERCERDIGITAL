'use client'

import { useTransition } from 'react'
import { Button } from '@primer/react'
import { CreditCardIcon } from '@primer/octicons-react'
import { startCheckout } from '@/app/actions/checkout'

export function BuyButton({ productId }: { productId: number }) {
  const [isPending, startTransition] = useTransition()

  return (
    <Button
      variant="primary"
      size="large"
      leadingVisual={CreditCardIcon}
      loading={isPending}
      loadingAnnouncement="Starting checkout"
      onClick={() =>
        startTransition(async () => {
          await startCheckout(productId)
        })
      }
      block
    >
      Buy now
    </Button>
  )
}
