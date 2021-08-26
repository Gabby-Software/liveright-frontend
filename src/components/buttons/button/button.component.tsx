import { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

import Root from './button.styles'
import { ButtonProps } from './button.types'

export default function Button({
  children,
  size,
  variant,
  className,
  LinkProps,
  type,
  to,
  ...props
}: PropsWithChildren<ButtonProps>) {
  let content = (
    <Root
      $size={size}
      $var={variant}
      className={className}
      type={type}
      {...props}
    >
      {children}
    </Root>
  )

  if (to) {
    content = (
      <Link to={to} {...LinkProps}>
        {content}
      </Link>
    )
  }

  return content
}
