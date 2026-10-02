'use client'

import { Button } from '@primer/react'
import {
  PlusIcon,
  EyeIcon,
  ArrowRightIcon,
  DownloadIcon,
} from '@primer/octicons-react'

// Icon component references cannot cross the Server -> Client prop boundary
// (they aren't serializable). This client component keeps the icon lookup
// local so Server Component pages can request an icon by name instead.
const ICONS = {
  plus: PlusIcon,
  eye: EyeIcon,
  arrowRight: ArrowRightIcon,
  download: DownloadIcon,
} as const

type IconName = keyof typeof ICONS

export function IconLinkButton({
  icon,
  trailingIcon,
  href,
  variant,
  size,
  target,
  block,
  children,
}: {
  icon?: IconName
  trailingIcon?: IconName
  href: string
  variant?: 'default' | 'primary' | 'danger' | 'invisible' | 'link'
  size?: 'small' | 'medium' | 'large'
  target?: string
  block?: boolean
  children: React.ReactNode
}) {
  return (
    <Button
      as="a"
      href={href}
      variant={variant}
      size={size}
      target={target}
      block={block}
      leadingVisual={icon ? ICONS[icon] : undefined}
      trailingVisual={trailingIcon ? ICONS[trailingIcon] : undefined}
    >
      {children}
    </Button>
  )
}
