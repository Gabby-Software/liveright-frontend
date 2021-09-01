import { PropsWithChildren } from 'react'

import Styles from './status.badge.styles'

interface StatusBadgeProps {
  status: string
  className?: string
}

export default function StatusBadge({
  status,
  children,
  className
}: PropsWithChildren<StatusBadgeProps>) {
  return (
    <Styles $type={status} className={className}>
      {children}
    </Styles>
  )
}
