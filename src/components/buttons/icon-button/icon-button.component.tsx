import { Tooltip } from 'antd'
import { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

import Root from './icon-button.styles'

interface IconButtonProps {
  size?: 'sm'
  tooltip?: string
  to?: string
  className?: string
  onClick?: any
  TooltipProps?: any
  LinkProps?: any
}

export default function IconButton({
  children,
  size,
  to,
  tooltip,
  className,
  TooltipProps,
  LinkProps
}: PropsWithChildren<IconButtonProps>) {
  let content
  content = (
    <Root $size={size} className={className}>
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

  if (tooltip) {
    content = (
      <Tooltip title={tooltip} {...TooltipProps}>
        {content}
      </Tooltip>
    )
  }

  return content
}
