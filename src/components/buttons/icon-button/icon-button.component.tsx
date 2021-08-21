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
}

export default function IconButton({
  children,
  size,
  to,
  tooltip,
  className
}: PropsWithChildren<IconButtonProps>) {
  let content
  content = (
    <Root $size={size} className={className}>
      {children}
    </Root>
  )

  if (to) {
    content = <Link to={to}>{content}</Link>
  }

  if (tooltip) {
    content = <Tooltip title={tooltip}>{content}</Tooltip>
  }

  return content
}
