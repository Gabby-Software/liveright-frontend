import { PropsWithChildren } from 'react'

import { Link, Styles } from './button.styles'
import { ButtonProps } from './button.types'

export default function Button({
  children,
  size,
  variant,
  className,
  LinkProps,
  type,
  to,
  disabled,
  htmlType,
  form,
  linkClassName,
  ...props
}: PropsWithChildren<ButtonProps>) {
  let content = (
    <Styles
      $size={size}
      $var={variant}
      className={className}
      type={type}
      disabled={disabled}
      htmlType={htmlType}
      form={form}
      {...props}
    >
      {children}
    </Styles>
  )

  if (to) {
    content = (
      <Link to={to} className={linkClassName} {...LinkProps}>
        {content}
      </Link>
    )
  }

  return content
}
