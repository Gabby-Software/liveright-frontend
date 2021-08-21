import { PropsWithChildren } from 'react'

import Root from './button.styles'

interface ButtonProps {
  variant?: 'secondary' | 'text'
  size?: 'sm'
  onClick?: any
  className?: string
}

export default function Button({
  children,
  size,
  variant,
  className
}: PropsWithChildren<ButtonProps>) {
  return (
    <Root $size={size} $var={variant} className={className}>
      {children}
    </Root>
  )
}
